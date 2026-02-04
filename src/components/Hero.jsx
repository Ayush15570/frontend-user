import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import hero from "../assets/Hero.png";
import { FaKey } from "react-icons/fa";

export default function Hero() {
  const navigate = useNavigate();
  const [unlocking, setUnlocking] = useState(false);
 
  const handleExplore = () => {
    setUnlocking(true);

    
        navigate("/services");
      
  };

  return (
    <section className="w-full bg-white min-h-[90vh] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">

        {/* LEFT SIDE */}
        <div className="flex-1 space-y-6 text-center md:text-left md:space-y-4">

          {/* SMALL TAG */}
          <span
            className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium opacity-0 animate-fadeSlideUp delay-100"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            ON-DEMAND SERVICE PLATFORM
          </span>

          {/* MAIN HEADING */}
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight opacity-0 animate-fadeSlideUp delay-200 text-center"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Setu for all your worries
          </h1>

          {/* ENGLISH BRAND NAME */}
          <p
            className="text-xl md:text-2xl font-semibold text-gray-800 opacity-0 animate-fadeSlideUp delay-300 text-center"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            “Kuncika”
          </p>

          {/* HINDI BRAND NAME */}
          <p
            className="text-2xl md:text-3xl font-bold text-gray-900 opacity-0 animate-fadeSlideUp delay-400 text-center"
            style={{ fontFamily: "Noto Sans Devanagari, sans-serif" }}
          >
            कुंजीका
          </p>

          {/* HINDI TAGLINE */}
          <p
            className="text-lg md:text-xl text-gray-600 opacity-0 animate-fadeSlideUp delay-500 text-center"
            style={{ fontFamily: "Noto Sans Devanagari, sans-serif" }}
          >
            आपकी सभी समस्याओं की कुंजीका
          </p>

          {/* SEARCH BAR + BUTTON */}
          <div
            className="flex items-center bg-gray-100 rounded-full mt-8 p-2 pl-5 shadow-sm 
            w-full max-w-lg mx-auto opacity-0 animate-fadeSlideUp delay-600"
          >
            <input
              className="bg-transparent outline-none flex-1 text-gray-700"
              placeholder="Search for a service..."
              disabled
            />

            <button
              onClick={handleExplore}
              className={`
                relative overflow-hidden
                px-6 py-3 rounded-full font-medium text-white flex items-center gap-3
                bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md mx-auto
                ${unlocking ? "animate-unlockPulse" : ""}
              `}
            >
              Explore Services

              {/* Key Animation */}
              <FaKey
                className={`
                  text-xl text-yellow-300 drop-shadow-glow
                  ${unlocking ? "animate-premiumKey" : ""}
                `}
              />
            </button>
          </div>

        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src={hero}
            alt="hero"
            className="w-[90%] max-w-[480px] rounded-3xl shadow-lg object-cover 
            opacity-0 animate-slideInRight delay-300"
          />
        </div>

      </div>
    </section>
  );
}