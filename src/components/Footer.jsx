import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-gray-300 mt-24 relative overflow-hidden">

      {/* SUBTLE GLOW */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/10 via-transparent to-purple-900/10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 relative z-10">

        {/* TRUST BADGES */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 text-xs sm:text-sm">
          <div className="bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800">
            🔒 Secure
          </div>
          <div className="bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800">
            ✔ Verified
          </div>
          <div className="bg-neutral-900 px-3 py-1.5 rounded-full border border-neutral-800">
            🕑 24/7 Support
          </div>
        </div>

        {/* GRID → 2 COL MOBILE */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-left">

          {/* COMPANY */}
          <div>
            <h3 className="text-white text-sm sm:text-base font-semibold mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {[
                "About us",
                "Investor Relations",
                "Terms & conditions",
                "Privacy policy",
                "Careers",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="hover:text-white transition duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CUSTOMERS */}
          <div>
            <h3 className="text-white text-sm sm:text-base font-semibold mb-4">
              For customers
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {["Reviews", "Categories", "Contact us"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="hover:text-white transition duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* PROFESSIONALS */}
          <div>
            <h3 className="text-white text-sm sm:text-base font-semibold mb-4">
              For professionals
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="#"
                  className="hover:text-white transition duration-300"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL + APPS */}
          <div>
            <h3 className="text-white text-sm sm:text-base font-semibold mb-4">
              Social
            </h3>

            {/* SOCIAL ICONS */}
            <div className="flex gap-3 mb-4">
              {["T", "F", "I", "L"].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center bg-neutral-900 border border-neutral-800 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-xs"
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* APP BADGES SMALLER ON MOBILE */}
            <div className="flex flex-col gap-3">
              <a href="#">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  className="h-9 sm:h-11 transition duration-300 hover:scale-105"
                />
              </a>
              <a href="#">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-9 sm:h-11 transition duration-300 hover:scale-105"
                />
              </a>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-neutral-800 mt-10 pt-5 text-center text-xs sm:text-sm text-gray-500">
          © {new Date().getFullYear()} Kuncika. All rights reserved.
        </div>

      </div>
    </footer>
  );
}