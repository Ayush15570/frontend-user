import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Cookies from "js-cookie";
import { FaPaperPlane, FaUser, FaPhoneAlt, FaCheckCircle } from "react-icons/fa";

const RequestService = () => {
  const navigate = useNavigate();
  const { serviceId, serviceName } = useParams();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const city = Cookies.get("location");

    if (!city) {
      alert("Please select your city first");
      return;
    }

    try {
      setLoading(true);
      await api.post("/service/request-service", {
        name,
        serviceId,
        
        phoneNumber,
        city
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/services");
      }, 1500);
    } catch (error) {
      alert("Some error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 animate-fadeInUp">

        {/* SUCCESS STATE */}
        {success ? (
          <div className="flex flex-col items-center text-center gap-4 animate-scaleIn">
            <FaCheckCircle className="text-green-500 text-6xl animate-pulse" />
            <h2 className="text-2xl font-bold text-gray-800">
              Request Submitted!
            </h2>
            <p className="text-gray-500">
              Our team will contact you shortly.
            </p>
          </div>
        ) : (
          <>
            {/* HEADER */}
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Request Service
            </h2>
            <p className="text-center text-indigo-600 font-medium mt-1">
              {serviceName}
            </p>

            {/* CITY INFO */}
            <p className="text-center text-sm text-gray-500 mt-2">
              📍 Service location: <span className="font-semibold">{Cookies.get("location")}</span>
            </p>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              {/* NAME */}
              <div className="relative">
                <FaUser className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* PHONE */}
              <div className="relative">
                <FaPhoneAlt className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl text-white font-semibold transition-all shadow-lg
                  ${loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02]"
                  }`}
              >
                {loading ? (
                  "Sending request..."
                ) : (
                  <>
                    Send Query <FaPaperPlane />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestService;