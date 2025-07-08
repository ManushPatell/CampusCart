import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function UnauthenticatedNav() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isListingsOpen, setIsListingsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log("scrolling");
      const currentScrollY = window.scrollY;
      const scrollDifference = lastScrollY - currentScrollY;

      if (scrollDifference > 25) {
        // Scrolled up more than 25px
        setShowNavbar(true);
        setLastScrollY(currentScrollY);
      } else if (scrollDifference < -5) {
        // Slight scroll down, hide immediately
        setShowNavbar(false);
        setLastScrollY(currentScrollY);
      }
      // If difference is between -5 and 25, do nothing
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinkClassName = "text";
  return (
    <>
      <nav
        className={`top-0 left-0 w-full z-50 animate-all duration-300 px-6 py-4 flex items-center justify-between backdrop-blur-3xl bg-black/30 fixed ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Logo */}
        <h1
          style={{ fontFamily: '"Press Start 2P", monospace' }}
          className="text-black text-center text-1xl"
        >
          Logo
        </h1>

        {/* Navigation Links */}
        <div className="space-x-6 text-sm z-50 md:flex">
          <Link to="/#about" className={navLinkClassName}>
            About Us
          </Link>
          <span className="relative inline-block flex-col items-center">
            <button onClick={() => setIsListingsOpen((prev) => !prev)}>
              Listings
            </button>
            {isListingsOpen && (
              <div className="absolute right-[50%] border-4 translate-x-1/2 border-pink-400 flex top-5 flex-col gap-[1rem]">
                <Link to="/rentals">Rentals</Link>
                <Link to="/textbooks">Textbooks</Link>
                <Link to="/extras">Extras</Link>
                {/*IDK what to call this one yet*/}
              </div>
            )}
          </span>

          <Link to="/register" className={navLinkClassName}>
            Sign Up
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
