import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { motion } from "framer-motion";
import hero from "../assets/Hero.png";
import { FaKey, FaTools, FaCar, FaUserTie, FaPaintBrush } from "react-icons/fa";

export default function Hero() {
  const navigate = useNavigate();
  const [unlocking, setUnlocking] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleExplore = () => {
    setUnlocking(true);
    setTimeout(() => navigate("/services"), 700);
  };

  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 20;
    const y = (e.clientY / innerHeight - 0.5) * 20;
    setMouse({ x, y });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.18 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const services = [
    "Car Wash",
    "Salon at Home",
    "Legal Consultation",
    "Home Tutor",
    "Fitness Trainer",
    "Photography",
    "Civil Construction",
  ];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[90vh] flex flex-col items-center overflow-hidden
      bg-gradient-to-b from-white via-indigo-50 to-white"
    >

      {/* Background Glow */}
      <motion.div
        className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-indigo-300 rounded-full blur-3xl opacity-30"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-[360px] h-[360px] bg-purple-300 rounded-full blur-3xl opacity-30"
        animate={{ x: [0, -60, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">

        {/* LEFT SIDE */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex-1 space-y-6 text-center md:text-left"
        >

          <motion.span
            variants={item}
            className="inline-block bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium shadow-sm"
          >
            ON-DEMAND SERVICE PLATFORM
          </motion.span>

          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Setu for all your worries
          </motion.h1>

  <motion.div
  variants={item}
  className="relative inline-block"
>

  <motion.p
    className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600
    bg-[length:200%_200%] bg-clip-text text-transparent"
    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
    transition={{ duration: 6, repeat: Infinity }}
  >
    Kuncika
  </motion.p>

  {/* glowing underline */}
  <motion.div
    className="h-[3px] mt-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"
    initial={{ width: 0 }}
    animate={{ width: "100%" }}
    transition={{ duration: 1.2, ease: "easeOut" }}
  />

</motion.div>

          <motion.p
            variants={item}
            className="text-3xl font-bold text-gray-900"
            style={{ fontFamily: "Noto Sans Devanagari" }}
          >
            कुञ्चिका
          </motion.p>

       <motion.p
  variants={item}
  className="text-lg text-gray-600 max-w-xl"
  style={{ fontFamily: "Noto Sans Devanagari" }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.8 }}
>
  आपकी सभी समस्याओं की कुंजीका
</motion.p>

          {/* SEARCH + CTA */}
          <motion.div
            variants={item}
            className="flex items-center backdrop-blur-md bg-white/70 border border-gray-200
            rounded-full mt-8 p-2 pl-6 shadow-xl w-full max-w-lg mx-auto md:mx-0"
          >
            <input
              className="bg-transparent outline-none flex-1 text-gray-700"
              placeholder="Search for a service..."
              disabled
            />

            <motion.button
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 25px rgba(99,102,241,0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExplore}
              className="px-6 py-3 rounded-full font-medium text-white flex items-center gap-3
              bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
            >
              Explore Services

              <motion.span
                animate={
                  unlocking
                    ? { rotate: 360, scale: [1, 1.4, 1] }
                    : { rotate: 0 }
                }
                transition={{ duration: 0.8 }}
              >
                <FaKey className="text-xl text-yellow-300" />
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center">
          <motion.div
            className="relative"
            animate={{ x: mouse.x, y: mouse.y }}
            transition={{ type: "spring", stiffness: 40 }}
          >
            <img
              src={hero}
              alt="hero"
              className="w-[95%] max-w-[520px] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] object-cover"
            />

            {/* Floating Icons */}
            <motion.div
              className="absolute -top-8 left-10 text-indigo-500 text-3xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <FaTools />
            </motion.div>

            <motion.div
              className="absolute top-20 -right-6 text-purple-500 text-3xl"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
            >
              <FaCar />
            </motion.div>

            <motion.div
              className="absolute bottom-10 left-0 text-indigo-500 text-3xl"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
            >
              <FaUserTie />
            </motion.div>

            <motion.div
              className="absolute bottom-0 right-10 text-purple-500 text-3xl"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <FaPaintBrush />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* SERVICES ROW */}
      <div className="mt-20 flex flex-wrap justify-center gap-6 px-6">

        {services.map((service, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8 }}
            className="px-6 py-3 bg-white shadow-md rounded-xl border border-gray-200
            cursor-pointer hover:shadow-xl transition"
          >
            {service}
          </motion.div>
        ))}

      </div>

    </section>
  );
}