import { useState, useRef, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user } = useAuth();

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header
        className="
        fixed top-0
         w-full h-16
          flex items-center justify-between
          px-6
          bg-white/30 backdrop-blur-3xl
          z-50
        "
      >
        {/* Logo */}
        <h1 className="text-2xl font-['Kavoon'] text-primary-fg cursor-pointer select-none">
          Campus Cart
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-semibold text-primary-fg items-center">
          <Link to="/#about" className="hover:text-fuchsia-500 transition">
            About Us
          </Link>

          {/* Listings Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 hover:text-fuchsia-500 transition font-semibold"
            >
              Listings
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 min-w-[160px] bg-white border rounded-xl shadow-lg py-2 flex flex-col z-50">
                <Link
                  to="/rentals"
                  className="px-5 py-2 hover:bg-gray-100 hover:text-fuchsia-500 transition rounded-md text-primary-fg"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Rentals
                </Link>
                <hr className="my-1 mx-4 border-t border-gray-200" />
                <Link
                  to="/textbooks"
                  className="px-5 py-2 hover:bg-gray-100 hover:text-fuchsia-500 transition rounded-md text-primary-fg"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Textbooks
                </Link>
                <hr className="my-1 mx-4 border-t border-gray-200" />
                <Link
                  to="/misc"
                  className="px-5 py-2 hover:bg-gray-100 hover:text-fuchsia-500 transition rounded-md text-primary-fg"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Extras
                </Link>
              </div>
            )}
          </div>

          {user ? (
            <Link to="/dashboard" className="hover:text-fuchsia-500 transition">
              Dashboard
            </Link>
          ) : (
            <Link to="/register" className="hover:text-fuchsia-500 transition">
              Sign Up
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-primary-fg"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-8 h-8" />
        </button>
      </header>

      {/* Mobile Fullscreen Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center text-white px-6">
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-8 h-8" />
          </button>

          <nav className="flex flex-col space-y-8 text-2xl text-center">
            <Link
              to="/#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-fuchsia-500 transition"
            >
              About Us
            </Link>
            <Link
              to="/rentals"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-fuchsia-500 transition"
            >
              Rentals
            </Link>
            <Link
              to="/textbooks"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-fuchsia-500 transition"
            >
              Textbooks
            </Link>
            <Link
              to="/misc"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-fuchsia-500 transition"
            >
              Extras
            </Link>

            {user ? (
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-fuchsia-500 transition"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-fuchsia-500 transition"
              >
                Sign Up
              </Link>
            )}
          </nav>
        </div>
      )}
      <Outlet />
    </>
  );
}
