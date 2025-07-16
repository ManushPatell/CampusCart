import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function UnauthenticatedNav() {
  const [isListingsOpen, setIsListingsOpen] = useState<boolean>(false);

  const navLinkClassName = "text";
  return (
    <div>
      <nav
        className={`left-0 w-full z-1000 animate-all duration-300 px-6 py-4 flex items-center justify-between backdrop-blur-3xl bg-black/30 sticky top-0`}
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
    </div>
  );
}
