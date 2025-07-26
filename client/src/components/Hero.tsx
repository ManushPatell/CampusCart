import { ChevronDownIcon } from "@heroicons/react/24/solid";
export default function Hero() {
  const handleScroll = () => {
    const contentSection = document.getElementById("content-section");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen">
      {/* Background Image */}
      <img
        src="isaiah.jpg"
        alt="Dorm"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-50"
      />

      {/* Overlay Content */}
      <div className="flex flex-col justify-center items-center min-h-screen w-full relative z-10 p-4 md:p-12 text-center">
        <h1
          style={{ fontFamily: "RetroCustom" }}
          className="text-white text-4xl md:text-8xl tracking-wider drop-shadow-lg"
        >
          Campus Cart
        </h1>

        <h2
          style={{ fontFamily: "RetroCustom" }}
          className="font-extrabold text-xl md:text-3xl text-fuchsia-200 tracking-wide p-2 md:p-5 drop-shadow-md"
        >
          The Marketplace Made For Campus Life
        </h2>

        <ChevronDownIcon
          onClick={handleScroll}
          className="w-10 h-10 md:w-12 md:h-12 text-cyan-100 animate-bounce cursor-pointer absolute bottom-8 left-1/2 transform -translate-x-1/2"
        />
      </div>
    </section>
  );
}
