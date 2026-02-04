import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import logo from "../assets/kuncika-logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [location, setLocation] = useState("Select Location");

  useEffect(() => {
    const saved = Cookies.get("location");
    setLocation(saved || "Select Location");
  }, []);

  const handleSelectLocation = (city) => {
    if (city === "All Services") {
      Cookies.remove("location");
      setLocation("Select Location");
    } else {
      Cookies.set("location", city, { expires: 7 });
      setLocation(city);
    }

    setIsLocationOpen(false);
    window.dispatchEvent(new Event("location-change"));
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-white via-blue-50/30 to-white backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">

        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-3">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Kuncika Logo"
              className="w-32 md:w-40 h-16 md:h-20 object-contain"
            />
          </Link>

          {/* LOCATION FILTER (ALWAYS VISIBLE) */}
          <div className="relative">
            <button
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="flex items-center justify-between w-44 md:w-56 px-3 py-2 border border-gray-300 rounded-xl bg-white shadow-sm hover:border-indigo-400 transition text-sm md:text-base"
            >
              <span className="flex items-center gap-2">
                📍 {location}
              </span>

              <svg
                className={`w-4 h-4 transition-transform ${
                  isLocationOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isLocationOpen && (
              <div className="absolute right-0 mt-2 w-44 md:w-56 bg-white shadow-xl rounded-xl border border-gray-200 py-2 z-50">
                {[
                  "All Services",
                  "Jinsi Circle",
                  "Bhopal",
                  "Indore",
                  "Delhi",
                  "Pune",
                ].map((city) => (
                  <button
                    key={city}
                    onClick={() => handleSelectLocation(city)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-[17px] font-medium text-gray-700">
            <Link to="/" className="hover:text-indigo-600 transition">
              Home
            </Link>
            <Link to="/services" className="hover:text-indigo-600 transition">
              Services
            </Link>
          </nav>

          {/* HAMBURGER (NAV ONLY) */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE NAV LINKS ONLY */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 space-y-3">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block font-medium text-gray-700"
            >
              Home
            </Link>

            <Link
              to="/services"
              onClick={() => setIsMenuOpen(false)}
              className="block font-medium text-gray-700"
            >
              Services
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}