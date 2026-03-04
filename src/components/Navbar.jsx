import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import logo from "../assets/Kunchika.png";
import { translations } from "../utils/translations";
import { useLocation } from "react-router-dom";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [location, setLocation] = useState("Select Location");
  const [language, setLanguage] = useState(Cookies.get("language") || "en");
  const [scrolled, setScrolled] = useState(false);
  const Location = useLocation()
  const isHome = Location.pathname === "/";
  
  const t = translations[language];

  useEffect(() => {
    const saved = Cookies.get("location");
    setLocation(saved || t.navbar.selectLocation);
  }, [language]);

  // ⭐ Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectLocation = (city) => {
    if (city === t.navbar.allServices) {
      Cookies.remove("location");
      setLocation(t.navbar.selectLocation);
    } else {
      Cookies.set("location", city, { expires: 7 });
      setLocation(city);
    }

    setIsLocationOpen(false);
    window.dispatchEvent(new Event("location-change"));
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "hi" : "en";
    Cookies.set("language", newLang, { expires: 7 });
    setLanguage(newLang);
    window.dispatchEvent(new Event("language-change"));
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 backdrop-blur-lg transition-all duration-300
      ${scrolled
        ? "bg-white/90 shadow-md"
        : "bg-gradient-to-b from-white via-indigo-50 to-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">

        <div className="flex items-center justify-between gap-3">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Kuncika Logo"
              className="w-32 md:w-40 h-16 md:h-20 object-contain transition-transform hover:scale-105"
            />
          </Link>

          {/* LOCATION */}
        { !isHome &&  ( <div className="relative">
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
              <div className="absolute right-0 mt-2 w-44 md:w-56 bg-white shadow-xl rounded-xl border border-gray-200 py-2 z-50 animate-fadeIn">
                {[t.navbar.allServices, "Bhopal", "Indore", "Delhi", "Pune"].map((city) => (
                  <button
                    key={city}
                    onClick={() => handleSelectLocation(city)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>)}

          {/* LANGUAGE TOGGLE */}
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 border border-gray-300 rounded-xl bg-white shadow-sm hover:bg-gray-100 transition text-sm font-medium"
          >
            {language === "en" ? "हिंदी" : "EN"}
          </button>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8 text-[17px] font-medium text-gray-700">

            <Link
              to="/"
              className="relative group hover:text-indigo-600 transition"
            >
              {t.navbar.home}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all group-hover:w-full"></span>
            </Link>

            <Link
              to="/services"
              className="relative group hover:text-indigo-600 transition"
            >
              {t.navbar.services}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all group-hover:w-full"></span>
            </Link>

          </nav>

          {/* HAMBURGER */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 space-y-3 animate-fadeIn">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block font-medium text-gray-700 hover:text-indigo-600"
            >
              {t.navbar.home}
            </Link>

            <Link
              to="/services"
              onClick={() => setIsMenuOpen(false)}
              className="block font-medium text-gray-700 hover:text-indigo-600"
            >
              {t.navbar.services}
            </Link>
          </div>
        )}

      </div>
    </header>
  );
}