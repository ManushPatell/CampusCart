import { useState, useRef, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";

export default function UnauthenticatedNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div>
      <nav className="left-0 w-full z-1000 animate-all duration-300 px-6 py-4 flex items-center justify-between backdrop-blur-3xl bg-white/30 sticky top-0">
        {/* Logo */}
        <h1
          className="text-shadow-zinc-900 text-center text-2xl font-['Kavoon'] text-primary-fg"
        >
          Campus Cart
        </h1>

        {/* Hamburger Icon for mobile */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <Menu className="w-8 h-8" />
        </button>

        {/* Desktop Nav */}
        <div className="space-x-6 text-m z-50 md:flex items-center hidden font-semibold text-primary-fg ">
          <Link to="/#about" className="text">
            About Us
          </Link>
          <span className="relative inline-block text-primary-fg" ref={useRef<HTMLDivElement>(null)}>
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="flex items-center gap-1 px-3 py-2 rounded-md transition"
            >
              Listings
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {/* Dropdown */}
            <div
              className={`absolute right-0 mt-2 min-w-[160px] bg-white border rounded-xl shadow-lg py-2 flex flex-col transition-all duration-200  ${
                isMobileMenuOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
              style={{ zIndex: 1000 }}
            >
              <Link
                to="/rentals"
                className="px-5 py-2  transition rounded-md  text-primary-fg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Rentals
              </Link>
              <Link
                to="/textbooks"
                className="px-5 py-2 text-primary-fg transition rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Textbooks
              </Link>
              <Link
                to="/misc"
                className="px-5 py-2  text-gray-800 transition rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Extras
              </Link>
            </div>
          </span>
          <Link to="/register" className="text">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Side Drawer for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-[2000] transform transition-transform duration-300 text-primary-fg font-bold ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <button
          className="absolute top-4 left-4 text-black"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          ✕
        </button>
        <nav className="flex flex-col mt-16 space-y-6 px-8">
          <Link to="/#about" onClick={() => setIsMobileMenuOpen(false)}>
            About Us
          </Link>
          <Link to="/rentals" onClick={() => setIsMobileMenuOpen(false)}>
            Rentals
          </Link>
          <Link to="/textbooks" onClick={() => setIsMobileMenuOpen(false)}>
            Textbooks
          </Link>
          <Link to="/misc" onClick={() => setIsMobileMenuOpen(false)}>
            Extras
          </Link>
          <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
            Login
          </Link>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
