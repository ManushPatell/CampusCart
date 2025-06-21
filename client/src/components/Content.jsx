import { useState } from 'react';
import { Link } from 'react-router-dom';

const zak = "/zak.jpg";
const stella = "/stella.jpg";

const AboutSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: stella,
      title: "Your Campus Marketplace",
      description: "We're that friendly neighbor who helps you find affordable textbooks, cute dorm decor, and gently-used furniture without having to leave campus.",
      icon: "🏠",
      subtext: "Make your dorm feel like home"
    },
    {
      image: zak,
      title: "Super Simple to Use",
      steps: [
        { icon: "👋", text: "Sign up with your .edu email" },
        { icon: "👀", text: "Browse what other students are selling" },
        { icon: "💬", text: "Chat directly with sellers/buyers" },
        { icon: "🤝", text: "Meet up safely on campus & exchange" }
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="min-h-screen bg-[#F5F1EA] py-16 relative">
      <div className="max-w-8xl mx-auto px-4">
        <h2 className="text-6xl md:text-7xl font-bold mb-32 text-center text-[#4A4032] font-['RetroCustom'] tracking-wide">
          Why Campus Cart?
        </h2>

        <div className="relative p-12 mx-auto border-2 border-[#E8DFD0] rounded-xl bg-[#FAF9F6] shadow-xl w-full max-w-[2400px]">
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-[#E8DFD0] p-2 rounded-md text-[#4A4032] transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-[#E8DFD0] p-2 rounded-md text-[#4A4032] transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="flex flex-col md:flex-row items-start gap-16 p-6">
            <div className="w-full md:w-3/5 transition-all duration-500">
              <img 
                src={slides[currentSlide].image} 
                alt={slides[currentSlide].title}
                className="w-full h-[550px] object-cover rounded-lg shadow-lg"
              />
            </div>

            <div className="w-full md:w-2/5 text-[#4A4032] space-y-8 py-4">
              <div className="text-lg uppercase tracking-wider text-[#8B7355] font-semibold">
                {currentSlide === 0 ? 'About Us' : 'How It Works'}
              </div>
              
              <h3 className="text-4xl font-bold font-['Kavoon'] text-[#4A4032]">
                {slides[currentSlide].title}
              </h3>
              
              {slides[currentSlide].description && (
                <p className="text-xl leading-relaxed text-[#6B5B45]">
                  {slides[currentSlide].description}
                </p>
              )}
              
              {slides[currentSlide].steps && (
                <div className="grid gap-6 text-lg text-[#6B5B45]">
                  {slides[currentSlide].steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="text-2xl">{step.icon}</span>
                      <span>{step.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  currentSlide === index 
                  ? 'w-8 bg-[#4A4032]' 
                  : 'w-4 bg-[#8B7355]'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center py-16 mt-16">
          <Link to="/login">
            <button className="bg-[#4A4032] hover:bg-[#5C503E] text-white text-xl font-bold py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md">
              Join Your Campus Community
            </button>
          </Link>
          <p className="mt-6 text-[#4A4032] text-lg italic">
            Already over 10,000 students saving money!
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;