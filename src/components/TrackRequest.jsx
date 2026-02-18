import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import { FaPhoneAlt, FaLock, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const TrackRequest = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendOTP = async () => {
    try {
      setLoading(true);
      await api.post("/service/send-tracking-otp", {
        phoneNumber: phone,
      });
      setStep("otp");
    } catch (err) {
      alert("No requests found for this number");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    try {
      setLoading(true);
      const res = await api.post("/service/verify-tracking-otp", {
        phoneNumber: phone,
        otp,
      });
      setRequests(res.data.requests);
      setStep("results");
    } catch (err) {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Track Your Request
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Enter your phone number to view service updates
        </p>

        {/* STEP 1 */}
        {step === "phone" && (
          <div className="space-y-4">
            <div className="relative">
              <FaPhoneAlt className="absolute left-4 top-4 text-gray-400" />
              <input
                type="tel"
                placeholder="Enter Phone Number"
                className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button
              onClick={sendOTP}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md"
            >
              {loading ? "Sending..." : <>Send OTP <FaSearch /></>}
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === "otp" && (
          <div className="space-y-4">
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full pl-11 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none transition"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button
              onClick={verifyOTP}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-all shadow-md"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === "results" && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Your Requests
            </h3>

            {requests.map((req) => (
              <motion.div
                key={req._id}
                whileHover={{ scale: 1.02 }}
                className="bg-white shadow-md rounded-xl p-4 mb-3 border border-gray-100"
              >
                <p className="font-semibold text-gray-800">
                  {req.serviceName}
                </p>
                <p className="text-sm text-gray-500">{req.city}</p>
                <p className="text-xs mt-2 text-indigo-600 font-medium">
                  Status: {req.trackingStatus.replaceAll("_", " ")}
                </p>

                <Link
  to={`/track/${req._id}`}
  className="text-sm text-indigo-500 mt-2 inline-block hover:underline"
>
  View Details →
</Link>

              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TrackRequest;
