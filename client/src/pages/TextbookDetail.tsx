// src/pages/TextbookDetail.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/Nav";
import { Textbook } from "../types/types";

function formatCurrency(v: any) {
  const n =
    typeof v === "number"
      ? v
      : parseFloat(String(v ?? "").replace(/[^0-9.]/g, "")) || 0;
  return n ? `$${n.toLocaleString()}` : "—";
}

function formatDate(d?: string | null) {
  if (!d) return "—";
  const dt = new Date(d);
  return isNaN(dt.getTime())
    ? String(d)
    : dt.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
}

export default function TextbookDetail() {
  const { id } = useParams();
  const [textbook, setTextbook] = useState<Textbook | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const base = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
        const res = await fetch(`${base}/textbooks/${id}`, {
          credentials: "include",
        });
        if (!res.ok) {
          setError("Textbook not found");
          return;
        }
        const data = await res.json();
        if (!cancelled) setTextbook(data);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Failed to fetch textbook data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Photos (accept array | JSON string | CSV); support 'images' too
  const photos: string[] = useMemo(() => {
    const raw = (textbook as any)?.photos ?? (textbook as any)?.images;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.filter(Boolean);
    if (typeof raw === "string") {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.filter(Boolean);
      } catch {
        return raw
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);
      }
    }
    return [];
  }, [textbook?.photos, (textbook as any)?.images]);

  // Read seller directly from API (nested object or raw id fallback)
  const sellerObj =
    typeof (textbook as any)?.seller === "object" && (textbook as any)?.seller
      ? (textbook as any).seller
      : undefined;
  const sellerId =
    typeof (textbook as any)?.seller === "string" ||
    typeof (textbook as any)?.seller === "number"
      ? (textbook as any).seller
      : sellerObj?.id;
  const sellerName =
    sellerObj?.name ?? (sellerId ? `Seller #${sellerId}` : "Unknown");
  const sellerEmail = sellerObj?.email ?? sellerObj?.contact ?? "—";

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="h-24" aria-hidden="true" />
        {/* navbar offset */}
        <div className="max-w-5xl mx-auto px-6 pb-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="h-64 bg-gray-200 rounded" />
            <div className="h-5 bg-gray-200 rounded w-1/2" />
            <div className="h-20 bg-gray-200 rounded" />
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="h-24" aria-hidden="true" />
        <div className="max-w-5xl mx-auto px-6 pb-8 text-center text-red-600">
          {error}
        </div>
      </>
    );
  }

  if (!textbook) return null;

  return (
    <>
      <NavBar />
      <div className="h-24" aria-hidden="true" />
      {/* navbar offset */}

      <div className="max-w-5xl mx-auto px-4 md:px-6 pb-8">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-3">
          <Link to="/textbooks" className="hover:underline">
            Textbooks
          </Link>{" "}
          / <span className="text-gray-700">Details</span>
        </div>

        {/* Title + price */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-3 mb-4 md:mb-5">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold leading-snug text-[#4A4032]">
              {textbook.book_title || "Textbook"}
            </h1>
            <div className="text-[#6B5B45] mt-1">
              {textbook.author ? `${textbook.author} • ` : ""}
              {textbook.edition ? `Edition ${textbook.edition}` : ""}
            </div>
          </div>
          <div className="text-3xl md:text-4xl font-semibold text-[#4A4032]">
            {formatCurrency((textbook as any)?.price)}
          </div>
        </div>

        {/* Photos */}
        <div className="mb-4">
          {photos.length > 0 ? (
            <>
              <div className="relative w-full h-[18rem] md:h-[22rem]">
                <img
                  src={photos[currentImageIndex]}
                  alt={`Photo ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover rounded-xl shadow"
                />
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          (currentImageIndex - 1 + photos.length) %
                            photos.length,
                        )
                      }
                      className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 backdrop-blur px-3 py-2 rounded-full shadow"
                    >
                      ◀
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          (currentImageIndex + 1) % photos.length,
                        )
                      }
                      className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 backdrop-blur px-3 py-2 rounded-full shadow"
                    >
                      ▶
                    </button>
                  </>
                )}
              </div>
              {photos.length > 1 && (
                <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                  {photos.map((p, i) => (
                    <button
                      key={p + i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`h-16 w-24 flex-none rounded overflow-hidden border ${
                        i === currentImageIndex
                          ? "border-[#4A4032]"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={p}
                        alt={`Thumbnail ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <img
              src="https://via.placeholder.com/1200x600?text=No+Image"
              alt="No image"
              className="w-full h-[18rem] md:h-[22rem] object-cover rounded-xl shadow"
            />
          )}
        </div>

        {/* Two-column layout (details + contact) */}
        <div className="grid md:grid-cols-3 gap-4">
          <section className="md:col-span-2 space-y-3">
            <div className="text-[#6B5B45]">
              <div>
                <span className="font-semibold text-[#4A4032]">Condition:</span>{" "}
                {textbook.condition || "—"}
              </div>
              <div>
                <span className="font-semibold text-[#4A4032]">
                  Course Code:
                </span>{" "}
                {(textbook as any)?.course_code ?? "—"}
              </div>
              <div>
                <span className="font-semibold text-[#4A4032]">Faculty:</span>{" "}
                {textbook.faculty || "—"}
              </div>
              <div>
                <span className="font-semibold text-[#4A4032]">Year:</span>{" "}
                {(textbook as any)?.year ?? "—"}
              </div>
              <div>
                <span className="font-semibold text-[#4A4032]">Posted:</span>{" "}
                {formatDate((textbook as any)?.date_posted)}
              </div>
            </div>

            {textbook.description && (
              <div>
                <h2 className="text-xl font-semibold text-[#4A4032] mb-1.5">
                  Description
                </h2>
                <p className="text-[#6B5B45] whitespace-pre-wrap">
                  {textbook.description}
                </p>
              </div>
            )}
          </section>

          {/* Contact Seller */}
          <aside className="border rounded-xl p-3 md:p-4 h-fit shadow-sm">
            <h3 className="text-lg font-semibold text-[#4A4032] mb-2">
              Contact Seller
            </h3>

            <div className="text-[#6B5B45] space-y-1.5 mb-3">
              <div>
                <span className="font-semibold text-[#4A4032]">Name:</span>{" "}
                {sellerName}
              </div>
              <div>
                <span className="font-semibold text-[#4A4032]">Email:</span>{" "}
                {sellerEmail}
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={
                  sellerEmail && sellerEmail !== "—"
                    ? `mailto:${sellerEmail}?subject=Inquiry about textbook #${
                        (textbook as any)?.id ?? id
                      }`
                    : undefined
                }
                onClick={(e) => {
                  if (!sellerEmail || sellerEmail === "—") e.preventDefault();
                }}
                className="flex-1 text-center rounded-lg px-4 py-2 bg-[#4A4032] text-white hover:opacity-90"
              >
                Email Seller
              </a>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
                className="rounded-lg px-4 py-2 border border-gray-300 hover:bg-gray-50"
              >
                Share
              </button>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
