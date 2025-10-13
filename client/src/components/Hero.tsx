import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function Hero() {
  const [whyOpen, setWhyOpen] = useState(false);

  // Scroll to the section below the hero using scrollIntoView.
  // The target section has scroll-mt-* so it clears the navbar without a manual JS offset.
  const handleScroll = useCallback(() => {
    document
      .getElementById("why-campuscart-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section
      className="relative w-full min-h-[100svh] overflow-hidden text-[#3A3127]"
      style={{ backgroundColor: "#F5F1EA", contain: "paint" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-[-20%] w-[85vw] max-w-[1100px] h-[560px] opacity-70 rounded-[999px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent), #F5F1EA00 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-20  right-[-20%] w-[85vw] max-w-[1100px] h-[560px] opacity-70 rounded-[999px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent), #F5F1EA00 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-15%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[1000px] h-[360px] opacity-80 rounded-[999px]"
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
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
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
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.03) 45%, rgba(0,0,0,0) 70%), " +
            "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.06) 100%)",
        }}
      />

      {/* content */}
      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-28 md:pt-40 pb-16 md:pb-24 text-center">
          <div className="max-w-4xl mx-auto flex items-center flex-col justify-center">
            {/* trust pill */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm ring-1 shadow-sm backdrop-blur mt-[30%] sm:mt-[0rem]"
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
                Join McMaster&apos;s Community
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* scroll cue */}
      <button
        type="button"
        onClick={handleScroll}
        className="group absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex flex-col items-center text-[#3A3127] hover:text-[#3A3127] transition"
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
