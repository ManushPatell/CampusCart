import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

/* --- single-row, seamless, no-fade, fixed-width tiles --- */
function ScrollingGalleryInline({
  items = [],
  speedSec = 40, // full loop duration (0 -> -50%)
  tileWidthClass = "w-[260px] sm:w-[300px] md:w-[360px] lg:w-[420px]",
  tileHeightClass = "h-36 sm:h-40 md:h-48 lg:h-56",
}: {
  items?: Array<{
    src: string;
    alt?: string;
    href?: string;
    from?: string;
    badge?: string;
  }>;
  speedSec?: number;
  tileWidthClass?: string;
  tileHeightClass?: string;
}) {
  // shuffle once for variety
  const base = React.useMemo(() => {
    const a = [...items];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }, [items]);

  // Seamless loop: render A + A (exactly twice)
  const loopList = React.useMemo(() => [...base, ...base], [base]);

  const labelFor = (from?: string) =>
    from === "rentals" ? "Rental" : from === "textbooks" ? "Textbook" : "Misc";

  const prefersReduce =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      className="group relative w-full overflow-hidden rounded-2xl border-2 shadow-md"
      style={{
        borderColor: "#D6C6B2",
        background: "linear-gradient(180deg, #FFF7ED 0%, #FFF3E6 100%)",
      }}
    >
      {/* inner inset ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[6px] rounded-xl border"
        style={{ borderColor: "#E7E0D6" }}
      />

      {/* animation */}
      <style>{`
        @keyframes cc-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) {
          .cc-track { animation: none !important; }
        }
      `}</style>

      {/* TRACK (A + A) */}
      <div
        className="cc-track relative z-10 flex items-center gap-3 sm:gap-4 [width:200%]"
        style={{
          animation: prefersReduce
            ? undefined
            : `cc-marquee ${speedSec}s linear infinite`,
          animationPlayState: "running",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.animationPlayState = "paused")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.animationPlayState = "running")
        }
      >
        {loopList.map((item, idx) => {
          const Tile = (
            <div
              className={[
                "relative shrink-0 rounded-xl overflow-hidden",
                "border bg-white/60 backdrop-blur-[1px] shadow-sm",
                "transition-transform duration-200 hover:-translate-y-0.5 focus-within:-translate-y-0.5",
                tileWidthClass,
              ].join(" ")}
              style={{ borderColor: "#E7E0D6" }}
            >
              {/* fixed-size frame so track always has width */}
              <div className={`relative ${tileHeightClass}`}>
                <img
                  src={item.src}
                  alt={item.alt || labelFor(item.from)}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover block"
                />
                {/* subtle label bar */}
                <div
                  className="absolute inset-x-0 bottom-0 h-8"
                  style={{
                    background: "rgba(255, 247, 237, 0.88)",
                    backdropFilter: "blur(2px)",
                  }}
                />
                {(item.badge || item.from) && (
                  <span
                    className="absolute bottom-2 left-2 rounded-md px-2.5 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wide"
                    style={{
                      color: "#3A3127",
                      background: "rgba(255,255,255,0.96)",
                      border: "1px solid #E7E0D6",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.badge || labelFor(item.from)}
                  </span>
                )}
              </div>
            </div>
          );

          return (
            <div key={`${item.src}-${idx}`}>
              {item.href ? (
                <Link
                  to={item.href}
                  className="block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#4A4032]/40 focus-visible:ring-offset-2"
                >
                  {Tile}
                </Link>
              ) : (
                Tile
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* --- helpers --- */
function buildApiUrl(path: string) {
  const base = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`; // with VITE_API_URL="", returns relative "/api/..."
}

function makeAbsolute(src: string) {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  const base = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
  if (!base) return src;
  return src.startsWith("/") ? `${base}${src}` : `${base}/${src}`;
}

function parsePhotos(raw: any): string[] {
  if (!raw) return [];

  // 1) Normalize to a flat array of values
  let arr: any[] = [];
  if (Array.isArray(raw)) {
    arr = raw.flat(Infinity); // <-- handles [["url"]] correctly
  } else if (typeof raw === "string") {
    try {
      arr = JSON.parse(raw);
    } catch {
      arr = raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    if (!Array.isArray(arr)) arr = [raw]; // fallback to single string
  } else {
    arr = [raw];
  }

  // 2) Map each item to a URL string, supporting object shapes too
  const urlKeys = ["url", "src", "path", "href"];
  const urls = arr.map((v) => {
    if (typeof v === "string") return v;
    if (v && typeof v === "object") {
      for (const k of urlKeys) {
        if (typeof v[k] === "string") return v[k];
      }
    }
    return "";
  });

  // 3) Clean up blanks and absolutize if needed
  return urls.filter(Boolean).map(makeAbsolute).filter(Boolean);
}

/* --- UPDATED HERO --- */
export default function Hero() {
  // Temporary placeholder images to confirm layout while API is wired
  const [whyOpen, setWhyOpen] = useState(false);
  const [items, setItems] = useState([]);

  // Scroll to the section below the hero using scrollIntoView.
  const handleScroll = useCallback(() => {
    document
      .getElementById("why-campuscart-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchSection(path, hrefPrefix, fromLabel) {
      const res = await fetch(buildApiUrl(path), { credentials: "include" });
      const url = buildApiUrl(path);

      console.debug(`[Hero] requesting ${fromLabel}:`, url);

      if (!res.ok) return [];

      const data = await res.json();
      const arr = Array.isArray(data?.results)
        ? data.results
        : Array.isArray(data)
          ? data
          : [];

      const normalized = arr
        .map((x) => {
          const photos = parsePhotos(x?.photos ?? x?.images ?? x?.photoUrls);
          return {
            photos,
            src: photos[0] || "",
            alt:
              x?.title ??
              x?.book_title ??
              x?.name ??
              x?.address ??
              x?.course ??
              fromLabel,
            href: `${hrefPrefix}/${x?.id ?? x?.slug ?? ""}`,
            from: fromLabel,
          };
        })
        .filter((it) => it.photos.length > 0);

      for (let i = normalized.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [normalized[i], normalized[j]] = [normalized[j], normalized[i]];
      }

      return normalized.slice(0, 8);
    }

    const load = async () => {
      try {
        const paths = [
          ["/misc?limit=24&order=new", "/misc", "misc"],
          ["/rentals?limit=24&order=new", "/rentals", "rentals"],
          ["/textbooks?limit=24&order=new", "/textbooks", "textbooks"],
        ];

        const debugUrls = paths.map(([p]) => buildApiUrl(p));
        console.debug("Hero fetching:", debugUrls);

        const [misc, rentals, textbooks] = await Promise.all([
          fetchSection(paths[0][0], paths[0][1], paths[0][2]),
          fetchSection(paths[1][0], paths[1][1], paths[1][2]),
          fetchSection(paths[2][0], paths[2][1], paths[2][2]),
        ]);

        const merged = [
          ...(misc || []),
          ...(rentals || []),
          ...(textbooks || []),
        ];
        console.debug("Hero merged count:", merged.length, {
          misc: misc?.length,
          rentals: rentals?.length,
          textbooks: textbooks?.length,
        });
        if (merged.length === 0) {
          console.warn(
            "Hero: API returned no items with usable photos. Check photo field names and VITE_API_URL.",
          );
        }
        if (!cancelled) setItems(merged);
      } catch (e) {
        console.error("Hero gallery fetch failed", e);
        if (!cancelled) setItems([]);
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const hasGallery = items.length > 0;

  return (
    <section
      /* add bottom padding; prevent overlaps; establish stacking context */
      className="relative w-full min-h-[100svh] overflow-hidden text-[#3A3127] pb-24 md:pb-28"
      style={{ backgroundColor: "#F5F1EA", contain: "paint" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-[-20%] w-[85vw] max-w-[1100px] h-[560px] opacity-70 rounded-[999px] z-0"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent), #F5F1EA00 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20  right-[-20%] w-[85vw] max-w-[1100px] h-[560px] opacity-70 rounded-[999px] z-0"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent), #F5F1EA00 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[1000px] h-[360px] opacity-80 rounded-[999px] z-0"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,244,230,0.45), rgba(255,244,230,0.18) 60%, rgba(255,244,230,0) 72%)",
          animation: "glowPanA 18s ease-in-out infinite alternate",
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
      />

      {/* subtle grid + vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.10] z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(58,49,39,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(58,49,39,0.07) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          backgroundPosition: "-1px -1px",
          animation: "grainShift 22s linear infinite alternate",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.03) 45%, rgba(0,0,0,0) 70%), " +
            "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.06) 100%)",
        }}
      />

      {/* content */}
      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-28 md:pt-40 pb-8 md:pb-10 text-center">
          <div className="max-w-4xl mx-auto flex items-center flex-col justify-center">
            {/* trust pill */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm ring-1 shadow-sm backdrop-blur mt-6 sm:mt-0"
              style={{
                background: "rgba(255,255,255,0.9)",
                borderColor: "rgba(74,64,50,0.22)",
                borderWidth: 1,
              }}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: "#8B7355" }}
              />
              <span className="font-medium">Trusted by students on campus</span>
            </div>
            <h1
              style={{ fontFamily: "RetroCustom" }}
              className="mt-5 tracking-tight text-[2.6rem] sm:text-6xl md:text-7xl leading-[1.08] font-extrabold"
            >
              Buy, Sell, and Rent. Right on Campus.
            </h1>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl text-[#4A4032]/85 leading-relaxed">
              A simpler, safer way to find rentals and swap essentials — no
              spam, no bots, just students.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-2xl px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl font-semibold text-white shadow-lg ring-1 transition
                           bg-[#4A4032] hover:bg-[#3A3127] ring-[#4A4032]/20"
              >
                Join Waterloo & Laurier&apos;s Community
              </Link>
            </div>
          </div>
        </div>

        {/* Scrolling gallery band */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 md:pb-20 relative z-10">
          <div className="mb-2 text-center text-[11px] sm:text-xs uppercase tracking-wider text-[#8B7355] font-semibold">
            Fresh from the community
          </div>
          {hasGallery ? (
            <ScrollingGalleryInline
              items={items}
              speed="40s"
              heightClass="h-36 sm:h-40 md:h-48 lg:h-56"
            />
          ) : (
            <div
              className="rounded-2xl border shadow-lg h-36 sm:h-40 md:h-48 lg:h-56 animate-pulse"
              style={{ background: "#FFF7ED", borderColor: "#E7E0D6" }}
            />
          )}
        </div>
      </header>

      {/* scroll cue */}
      <button
        type="button"
        onClick={handleScroll}
        className="group absolute bottom-6 left-1/2 -translate-x-1/2 z-20 inline-flex flex-col items-center text-[#3A3127] hover:text-[#3A3127] transition"
        aria-label="Scroll to Why CampusCart"
      >
        <span className="text-xs sm:text-sm md:text-base font-extrabold tracking-widest uppercase mb-2">
          WHY CAMPUS CART
        </span>
        <ChevronDownIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 group-hover:translate-y-1 transition-transform drop-shadow" />
      </button>

      {/* WHY modal */}
      {whyOpen && (
        <div
          id="why-campuscart"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          onClick={() => setWhyOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative w-full sm:w-[560px] mx-0 sm:mx-auto rounded-2xl shadow-2xl border"
            style={{ background: "#FBF4EA", borderColor: "#E7E0D6" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: "#E7E0D6" }}
            >
              <h3 className="text-lg font-bold text-[#4A4032]">
                Why CampusCart?
              </h3>
              <button
                onClick={() => setWhyOpen(false)}
                className="text-[#4A4032]/70 hover:text-[#4A4032] text-xl"
              >
                ✕
              </button>
            </div>

            <div className="px-5 py-4 text-[#4A4032]" />

            <div
              className="flex flex-col sm:flex-row gap-2 px-5 py-4 border-t"
              style={{ borderColor: "#E7E0D6" }}
            >
              <Link
                to="/register"
                className="flex-1 inline-flex items-center justify-center rounded-xl px-4 py-2.5 font-semibold text-white shadow ring-1
                           bg-[#4A4032] hover:bg-[#3A3127] ring-[#4A4032]/20"
                onClick={() => setWhyOpen(false)}
              >
                Join your campus community
              </Link>
              <button
                onClick={() => setWhyOpen(false)}
                className="rounded-xl px-4 py-2.5 font-semibold"
                style={{
                  color: "#4A4032",
                  background: "#FFF7ED",
                  border: "1px solid #E7E0D6",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
