import UnauthenticatedNav from "./Nav";

const AboutSection = () => {
  const slides = [
    {
      image: "stella.jpg",
      title: "Your Campus Marketplace",
      description:
        "We're that friendly neighbor who helps you find affordable textbooks, cute dorm decor, and gently-used furniture without having to leave campus.",
      icon: "🏠",
      subtext: "Make your dorm feel like home",
      label: "About Us",
    },
    {
      image: "zak.jpg",
      title: "Super Simple to Use",
      steps: [
        { icon: "👋", text: "Sign up with your .edu email" },
        { icon: "👀", text: "Browse what other students are selling" },
        { icon: "💬", text: "Chat directly with sellers/buyers" },
        { icon: "🤝", text: "Meet up safely on campus & exchange" },
      ],
      label: "How It Works",
    },
  ];

  return (
    <section className="min-h-screen bg-bg py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-20 text-center text-primary-fg font-['RetroCustom'] tracking-wide">
          Why Campus Cart?
        </h2>

        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative mb-20 mx-auto border-2 border-[#E8DFD0] rounded-xl bg-[#FAF9F6] shadow-xl w-full max-w-[2400px] overflow-hidden"
          >
            <div
              className={`p-6 flex flex-col-reverse ${
                index === 0 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-8`}
            >
              {/* Text */}
              <div className="w-full md:w-1/2 text-primary-fg space-y-6 py-4">
                <div className="text-base uppercase tracking-wider text-secondary-fg font-semibold">
                  {slide.label}
                </div>

                <h3 className="text-2xl md:text-4xl font-bold font-['Kavoon'] text-primary-fg">
                  {slide.title}
                </h3>

                {slide.description && (
                  <p className="text-base md:text-xl leading-relaxed text-[#6B5B45]">
                    {slide.description}
                  </p>
                )}

                {slide.steps && (
                  <div className="grid gap-4 text-base md:text-lg text-[#6B5B45]">
                    {slide.steps.map((step, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-xl">{step.icon}</span>
                        <span>{step.text}</span>
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
                  className="w-full h-[300px] md:h-[550px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="text-center py-12 mt-12">
          <button className="bg-primary-fg hover:bg-bg/75 text-white text-lg md:text-xl font-bold py-3 px-6 md:py-4 md:px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md">
            Join Your Campus Community
          </button>
          <p className="mt-4 text-primary-fg text-base md:text-lg italic">
            Already over 10,000 students saving money!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
