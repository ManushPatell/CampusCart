import React from "react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  const slides = [
    {
      image: "zak.jpg",
      title: "Super Simple to Use",
      steps: [
        {
          icon: "👋",
          text: "Sign up with your @uwaterloo.ca or @mylaurier.ca email",
        },
        { icon: "👀", text: "Browse what other students are selling" },
        { icon: "🤝", text: "Meet up safely on campus & exchange" },
      ],
      label: "How It Works",
    },
  ];

  return (
    <section
      id="why-campuscart-section"
      // Use ONE consistent scroll-mt (96px) to match navbar height and the hero scroll.
      className="bg-[#F5F1EA] pt-0 pb-12 md:pb-16 scroll-mt-24"
    >
      {/* Why CampusCart (inline, card) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className="rounded-2xl border shadow-lg overflow-hidden"
          style={{ background: "#FFF7ED", borderColor: "#E7E0D6" }}
        >
          <div className="p-5 sm:p-6 lg:p-8">
            <div className="text-xs md:text-sm uppercase tracking-wider text-[#8B7355] font-semibold">
              Why CampusCart
            </div>

            <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-['Kavoon'] text-[#3A3127] leading-[1.15]">
              Ditch chaotic FB groups and sketchy Snap stories.
            </h3>

            <div
              className="my-3 md:my-4"
              style={{ height: 1, backgroundColor: "#E7E0D6" }}
            />

            <p className="text-lg md:text-xl lg:text-[1.35rem] leading-[1.7] text-[#4A4032]">
              Campus-only listings, real student profiles, and on-campus meetups
              — so you can buy, sell, or rent faster and safer.
            </p>

            {/* quick categories strip */}
            <div
              className="mt-4 rounded-xl border px-3 sm:px-4 py-3"
              style={{ background: "#FFF3E6", borderColor: "#E7E0D6" }}
            >
              <div className="mb-2 text-[11px] sm:text-xs uppercase tracking-wider text-[#8B7355] font-semibold">
                What students post
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
                <Link
                  to="/misc"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
                  style={{
                    color: "#4A4032",
                    background: "rgba(74,64,50,0.06)",
                    border: "1px solid rgba(74,64,50,0.20)",
                  }}
                >
                  <span>🎟️</span> Concert tickets
                </Link>
                <Link
                  to="/misc"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
                  style={{
                    color: "#4A4032",
                    background: "rgba(74,64,50,0.06)",
                    border: "1px solid rgba(74,64,50,0.20)",
                  }}
                >
                  <span>🎉</span> Frosh events
                </Link>
                <Link
                  to="/textbooks"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
                  style={{
                    color: "#4A4032",
                    background: "rgba(74,64,50,0.06)",
                    border: "1px solid rgba(74,64,50,0.20)",
                  }}
                >
                  <span>📚</span> Textbooks
                </Link>
                <Link
                  to="/rentals"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
                  style={{
                    color: "#4A4032",
                    background: "rgba(74,64,50,0.06)",
                    border: "1px solid rgba(74,64,50,0.20)",
                  }}
                >
                  <span>🏠</span> Rentals & sublets
                </Link>
                <Link
                  to="/misc"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium"
                  style={{
                    color: "#4A4032",
                    background: "rgba(74,64,50,0.06)",
                    border: "1px solid rgba(74,64,50,0.20)",
                  }}
                >
                  <span>🛍️</span> Other stuff
                </Link>
              </div>
            </div>

            <div className="mt-5"></div>
          </div>
        </div>
      </div>

      {/* Slides */}
      <div className="mx-auto max-w-7xl px-4 mt-8 md:mt-10">
        <div className="space-y-8 md:space-y-10">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative mx-auto w-full overflow-hidden rounded-2xl border shadow-xl"
              style={{ background: "#FFF7ED", borderColor: "#E7E0D6" }}
            >
              <div
                className={`p-6 md:p-8 lg:p-10 flex flex-col ${
                  index === 0 ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-6 md:gap-10`}
              >
                {/* Text */}
                <div className="w-full md:w-1/2 text-primary-fg">
                  <div className="text-xs md:text-sm uppercase tracking-wider text-[#8B7355] font-semibold">
                    {slide.label}
                  </div>

                  <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold font-['Kavoon'] text-[#3A3127] leading-[1.15]">
                    {slide.title}
                  </h3>

                  <div
                    className="my-3 md:my-4"
                    style={{ height: 1, backgroundColor: "#E7E0D6" }}
                  />

                  {slide.description && (
                    <p className="text-lg md:text-xl lg:text-[1.35rem] leading-[1.7] text-[#4A4032]">
                      {slide.description}
                    </p>
                  )}

                  {slide.steps && (
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-[#4A4032]">
                      {slide.steps.map((step, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 md:gap-4"
                        >
                          <span className="text-2xl md:text-3xl leading-none">
                            {step.icon}
                          </span>
                          <span className="text-lg md:text-xl leading-relaxed">
                            {step.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    loading="lazy"
                    className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center py-8 md:py-10">
          <Link to="/register">
            <button className="bg-primary-fg hover:bg-[#3A3127] text-white text-base md:text-lg lg:text-xl font-semibold md:font-bold py-2.5 md:py-3.5 px-6 md:px-9 rounded-xl transition-all duration-200 shadow-sm">
              Join The Community!
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
