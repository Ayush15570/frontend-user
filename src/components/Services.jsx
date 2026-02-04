import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Cookies from "js-cookie";
import ServiceSlider from "./ServiceSlider";

// Importing images
import cleaning from "../assets/cleaning.png";
import repairing from "../assets/repairing.png";
import consultant from "../assets/consultant.png";
import cooking from "../assets/cooking.png";
import fitness from "../assets/fitness.png";
import makeup from "../assets/makeup.png";
import medical from "../assets/medical.png";
import sales from "../assets/Sales.png";
import education from "../assets/education.png";
import astrology from "../assets/astrology.png";
import agriculture from "../assets/agriculture.png";
import photography from "../assets/photography.png";
import government from "../assets/government.png";
import startup from "../assets/startup.png";
import film from "../assets/film.jpeg";
import AI from "../assets/AI.webp";
import coding from "../assets/coding.png";
import air from "../assets/air.jpg";
import rail from "../assets/rail-yatra.png";
import pest from "../assets/pest.png";
import stock from "../assets/stock.avif";
import parttime from "../assets/part-time.webp";
import law from "../assets/law.jpeg";
import bank from "../assets/bank.jpg";
import editing from "../assets/editing.jpg";

const Services = () => {
  const [services, setServices] = useState([]);
  const [location, setLocation] = useState(Cookies.get("location") || "");

  const serviceImages = {
    Cleaning: cleaning,
    "Sales & Manager": sales,
    "Legal Consultant": consultant,
    "Medical & Nursing": medical,
    Cooking: cooking,
    "Beauty & Makeup": makeup,
    Fitness: fitness,
    Education: education,
    Astrology: astrology,
    "Government Services": government,
    Repair: repairing,
    Photography: photography,
    Agriculture: agriculture,
    "Startup Help": startup,
    "Pest Control": pest,
    "Law & Order Consultant": law,
    "Rail Yatra": rail,
    "Air Yatra": air,
    "Banking & Finance": bank,
    "Stock Market": stock,
    "Part Time Jobs": parttime,
    "Film & Documentary": film,
    "Artificial Intelligence": AI,
    Editing: editing,
    "Coding & Development": coding,
  };

  useEffect(() => {
    const handleLocationUpdate = () => {
      setLocation(Cookies.get("location") || "");
    };

    window.addEventListener("location-change", handleLocationUpdate);
    return () =>
      window.removeEventListener("location-change", handleLocationUpdate);
  }, []);

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* SLIDER */}
      <ServiceSlider />

      {/* TITLE */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        {location ? `Services in ${location}` : "All Services"}
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {services.map((service) => (
          <Link
            key={service._id}
            to={`/services/request/${service._id}/${service.name}`}
            className="group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative w-full h-28 sm:h-44 lg:h-60 overflow-hidden">
              <img
                src={serviceImages[service.name]}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>
            </div>

            {/* TEXT */}
            <div className="p-2 sm:p-3 text-center">
              <h2 className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                {service.name}
              </h2>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                View →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
