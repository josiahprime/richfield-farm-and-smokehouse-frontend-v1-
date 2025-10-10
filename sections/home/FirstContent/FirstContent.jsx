"use client";

import React, { useEffect, useState } from "react";

const images = [
  '/assets/banner-4.jpg',
  '/assets/banner-two.jpg',
  '/assets/sale-banner.jpg',
  '/assets/banner-3.jpg',
];

const FirstContent = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="h-56 mx-6 my-5 md:mx-12 sm:h-64 xl:h-80 2xl:h-96 relative overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`slide-${idx}`}
            className="w-full flex-shrink-0 object-cover"
          />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-black bg-opacity-40 p-2 text-white hover:bg-opacity-70 transition"
        aria-label="Previous Slide"
      >
        &#10094;
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-black bg-opacity-40 p-2 text-white hover:bg-opacity-70 transition"
        aria-label="Next Slide"
      >
        &#10095;
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 w-2 rounded-full ${
              idx === current ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FirstContent;
