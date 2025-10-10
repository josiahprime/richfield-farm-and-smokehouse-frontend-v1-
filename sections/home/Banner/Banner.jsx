"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // React Icons

const images = [
  "/assets/banner-3.jpg",
  "/assets/banner-4.jpg",
  "/assets/banner-5.jpg"
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // Auto change slide every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          <Link href="/offer">
            <img
              src={images[current]}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          </Link>
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow */}
      <button
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 transition"
        onClick={prevSlide}
      >
        <FaChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 transition"
        onClick={nextSlide}
      >
        <FaChevronRight size={24} />
      </button>

      {/* Custom Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all ${
              i === current ? "bg-black scale-110" : "bg-white opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;