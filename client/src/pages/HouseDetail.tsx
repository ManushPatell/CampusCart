// src/pages/HouseDetail.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/Nav";
import useUserById from "../hooks/useUserById";

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

function buildApiUrl(path: string) {
  const base = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

const FeatureChip = ({ on, label }: { on?: boolean; label: string }) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-sm border mr-2 mb-2 ${
      on
        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
        : "bg-gray-50 border-gray-200 text-gray-400 line-through"
    }`}
    title={label}
  >
    {label}
  </span>
);

export default function HouseDetail() {
  const { id } = useParams<{ id: string }>();
  const [house, setHouse] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fetch the house
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError("");
        if (!id) {
          setError("No rental id provided.");
          return;
        }
        const url = buildApiUrl(`/api/rentals/${encodeURIComponent(id)}`);
        const res = await fetch(url, { credentials: "include" });
        if (!res.ok) {
          setError(res.status === 404 ? "House not found." : "Failed to load house.");
          return;
        }
        const data = await res.json();
        if (!cancelled) setHouse(data);
      } catch (e) {
        console.error(e);
        if (!cancelled) setError("Failed to fetch rental data.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // Derive photos (accepts array, JSON string, or CSV string)
  const photos: string[] = useMemo(() => {
    const p = house?.photos;
    if (!p) return [];
    if (Array.isArray(p)) return p;
    if (typeof p === "string") {
      try {
        const parsed = JSON.parse(p);
        if (Array.isArray(parsed)) return parsed.filter(Boolean);
      } catch {
        return p.split(",").map((s: string) => s.trim()).filter(Boolean);
      }
    }
    return [];
  }, [house?.photos]);

  // === Seller resolution via hook ===
  const sellerId =
    typeof house?.seller === "number"
      ? house.seller
      : house?.seller?.id;

  const { data: seller, isLoading: sellerLoading } = useUserById(sellerId);

  // Prefer fields already included on the rental, otherwise fall back to /users/:id
  const sellerName =
    house?.seller?.name ??
    seller?.name ??
    (sellerId ? `Seller #${sellerId}` : "Unknown");

  const sellerEmail =
    house?.seller?.contact ??
    house?.seller?.email ??
    seller?.email ??
    "—";

  // Feature chips
  const features = useMemo(
    () => [
      { on: !!house?.is_cost_per_room, label: "Per-room pricing" },
      { on: !!house?.is_utilities_included, label: "Utilities included" },
      { on: !!house?.is_sublet, label: "Sublet" },
      { on: !!house?.has_laundry, label: "Laundry" },
      { on: !!house?.has_cooking, label: "Kitchen" },
      { on: !!house?.has_parking, label: "Parking" },
      { on: !!house?.no_smoking, label: "No smoking" },
      { on: !!house?.is_shared, label: "Shared" },
    ],
    [house]
  );

  // Loading / error states
  if (loading) {
    return (
      <>
        <NavBar />
        <div className="max-w-5xl mx-auto p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-gray-200 rounded w-1/3" />
            <div className="h-80 bg-gray-200 rounded" />
            <div className="h-6 bg-gray-200 rounded w-1/2" />
            <div className="h-24 bg-gray-200 rounded" />
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="max-w-5xl mx-auto p-6 text-center text-red-600">
          {error}
        </div>
      </>
    );
  }

  if (!house) return null;

  return (
    <>
      <NavBar />
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-sm text-gray-500 mb-3">
          <Link to="/rentals" className="hover:underline">
            Rentals
          </Link>{" "}
          / <span className="text-gray-700">Details</span>
        </div>

        {/* Title + price */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-[#4A4032]">
              {house.title || house.house_type || "Rental"}
            </h1>
            <div className="text-[#6B5B45]">
              {house.num_beds ? `${house.num_beds} beds • ` : ""}
              {house.address}
            </div>
          </div>
          <div className="text-3xl font-semibold text-[#4A4032]">
            {formatCurrency(house.cost)}
            {house.is_cost_per_room ? (
              <span className="ml-1 text-base text-[#6B5B45]">/room</span>
            ) : null}
          </div>
        </div>

        {/* Photos */}
        <div className="mb-6">
          {photos.length > 0 ? (
            <>
              <div className="relative w-full h-[22rem] md:h-[26rem]">
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
                          (currentImageIndex - 1 + photos.length) % photos.length
                        )
                      }
                      className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 backdrop-blur px-3 py-2 rounded-full shadow"
                    >
                      ◀
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(
                          (currentImageIndex + 1) % photos.length
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
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
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
              className="w-full h-[22rem] md:h-[26rem] object-cover rounded-xl shadow"
            />
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <section className="md:col-span-2 space-y-4">
            <div className="text-[#6B5B45]">
              <div>
                <span className="font-semibold text-[#4A4032]">Available:</span>{" "}
                {formatDate(house.date_available)}
              </div>
              <div>
                <span className="font-semibold text-[#4A4032]">Posted:</span>{" "}
                {formatDate(house.post_date)}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#4A4032] mb-2">
                Description
              </h2>
              <p className="text-[#6B5B45] whitespace-pre-wrap">
                {house.description || "No description provided."}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#4A4032] mb-2">
                Features
              </h2>
              <div className="flex flex-wrap">
                {features.map((f) => (
                  <FeatureChip key={f.label} on={f.on} label={f.label} />
                ))}
              </div>
            </div>
          </section>

          {/* Contact / CTA */}
          <aside className="border rounded-xl p-4 h-fit shadow-sm">
            <h3 className="text-lg font-semibold text-[#4A4032] mb-2">
              Contact Seller
            </h3>

            <div className="text-[#6B5B45] space-y-1 mb-4">
              <div>
                <span className="font-semibold text-[#4A4032]">Name:</span>{" "}
                {sellerLoading ? "Loading…" : sellerName}
              </div>
              <div>
                <span className="font-semibold text-[#4A4032]">Email:</span>{" "}
                {sellerLoading ? "Loading…" : sellerEmail}
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={
                  sellerEmail && sellerEmail !== "—"
                    ? `mailto:${sellerEmail}?subject=Inquiry about rental #${house.id}`
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
                onClick={() => navigator.clipboard.writeText(window.location.href)}
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
