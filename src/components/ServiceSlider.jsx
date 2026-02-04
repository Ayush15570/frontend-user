import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import government from "../assets/government.png";
import beauty from "../assets/beauty.png";
import education from "../assets/education.png";
import trading from "../assets/trading.png";

export default function ServiceSlider() {
  const slides = [
    {
      img: government,
      title: "Government Services",
      subtitle: "PAN, Aadhar, license, certificates and other govt form help.",
    },
    {
      img: beauty,
      title: "Beauty & Grooming at Home",
      subtitle: "Salon-quality services by trained professionals",
    },
    {
      img: education,
      title: "Education",
      subtitle: "Home tutors, competitive exam preparation and classes.",
    },
    {
      img: trading,
      title: "Business & Finance Guidance",
      subtitle: "Get expert advice for smarter financial decisions",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto mt-6 mb-12 px-4">
      <div className="rounded-3xl overflow-hidden shadow-xl relative">

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          slidesPerView={1}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={`${slide.title}-${index}`}>
              <div className="relative w-full h-[240px] sm:h-[300px] md:h-[420px]">

                {/* Image */}
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover scale-105 animate-zoomSlow"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Text */}
                <div
                  className="
                    absolute bottom-6 sm:bottom-10
                    left-1/2 sm:left-10
                    -translate-x-1/2 sm:translate-x-0
                    text-center sm:text-left
                    text-white
                    px-4
                  "
                >
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold drop-shadow-lg animate-slideFade">
                    {slide.title}
                  </h2>

                  <p className="mt-2 text-sm sm:text-base md:text-lg opacity-90 animate-slideFadeDelay">
                    {slide.subtitle}
                  </p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
}