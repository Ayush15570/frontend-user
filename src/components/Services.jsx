import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Cookies from "js-cookie";
import ServiceSlider from "./ServiceSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { translations } from "../utils/translations";
import "swiper/css";

const BASE_URL = "http://Kunchikaa-env.eba-gydrvjhb.ap-south-1.elasticbeanstalk.com/kuncika/v1/";

const categories = [
  { key: "home", title: "Home Services", routes: ["cleaning", "repair", "pest-control", "cooking"] },
  { key: "personal", title: "Personal Care", routes: ["beauty", "fitness", "medical"] },
  { key: "business", title: "Business", routes: ["banking-finance", "stock-market", "part-time-job"] },
  { key: "education", title: "Education", routes: ["education"] },
  { key: "legal", title: "Legal Help", routes: ["legal", "law-order", "govt"] },
  { key: "creative", title: "Creative Support", routes: ["photography", "film-documentary", "editing"] },
  { key: "startup", title: "Start Up", routes: ["startup", "ai", "coding"] },
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [location, setLocation] = useState(Cookies.get("location") || "");
  const [language, setLanguage] = useState(Cookies.get("language") || "en");

  const t = translations[language];

  /* -------- LISTEN LOCATION -------- */
  useEffect(() => {
    const handleLocationUpdate = () => {
      setLocation(Cookies.get("location") || "");
    };
    window.addEventListener("location-change", handleLocationUpdate);
    return () =>
      window.removeEventListener("location-change", handleLocationUpdate);
  }, []);

  /* -------- LISTEN LANGUAGE -------- */
  useEffect(() => {
    const handleLanguageUpdate = () => {
      setLanguage(Cookies.get("language") || "en");
    };
    window.addEventListener("language-change", handleLanguageUpdate);
    return () =>
      window.removeEventListener("language-change", handleLanguageUpdate);
  }, []);

  /* -------- FETCH SERVICES -------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
          !location || location === "All Services"
            ? await api.get("/service")
            : await api.get(`/service/filter?location=${location}`);

        setServices(response.data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, [location]);

  if (!services.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ServiceSlider />
        <p className="text-center mt-10 text-gray-500">
          {language === "hi" ? "लोड हो रहा है..." : "Loading services..."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white via-gray-50/40 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">

        <ServiceSlider />

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-16 mb-16 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900">
              {location
                ? `${t.header.servicesIn} ${location}`
                : t.header.allServices}
            </h1>
            <p className="mt-3 text-lg text-gray-500">
              {t.header.subtitle}
            </p>
          </div>

          <Link
            to="/track"
            className="px-7 py-3 rounded-2xl bg-neutral-900 text-white font-medium shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {t.header.trackRequest} →
          </Link>
        </div>

        {categories.map((category) => {
          const filtered = services.filter((service) =>
            category.routes.includes(service.route)
          );

          if (!filtered.length) return null;

          const cleanTitle = category.title.replace(/\s+/g, "");

          return (
            <section key={category.title} className="mb-24">

              {/* CATEGORY TITLE */}
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900">
                  {t.categories[category.key]}
                </h2>
                <div className="h-[1px] flex-1 bg-gray-200 ml-6"></div>
              </div>

              {/* ARROWS */}
              <div className="flex justify-end gap-3 mb-6">
                <button className={`prev-${cleanTitle} w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center`}>
                  ‹
                </button>
                <button className={`next-${cleanTitle} w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center`}>
                  ›
                </button>
              </div>

              {/* SWIPER */}
              <Swiper
                key={location + category.title + filtered.length}
                modules={[Autoplay, Navigation]}
                navigation={{
                  nextEl: `.next-${cleanTitle}`,
                  prevEl: `.prev-${cleanTitle}`,
                }}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                speed={900}
                grabCursor
                spaceBetween={28}
                loop={filtered.length > 3}
                breakpoints={{
                  320: { slidesPerView: 1.2 },
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {filtered.map((service, index) => (
                  <SwiperSlide key={service._id}>
                    <Link
                      to={`/services/request/${service._id}/${service.name}`}
                      className="block"
                    >
                      <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

                        <div className="relative h-44 overflow-hidden">
                          {index < 2 && (
                            <div className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full z-10">
                              {t.common.popular}
                            </div>
                          )}

                          <img
                            src={`${BASE_URL}${service.image}`}
                            alt={service.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <div className="p-4">
                          <h3 className="text-base font-semibold text-gray-900">
                            {service.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {t.common.bookTrusted}
                          </p>
                        </div>

                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>

            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Services;