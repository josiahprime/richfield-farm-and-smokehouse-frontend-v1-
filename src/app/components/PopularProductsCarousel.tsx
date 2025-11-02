"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import PopularProductCard from "app/components/PopularProductCard/PopularProductCard";
import type { Product } from "store/product/productTypes";





interface Props {
  products: Product[];
}


const ProductSlider = ({ products }: Props) => {
  const visibleCount = 5;
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);

  const total = products?.length ?? 0;

  // ✅ Wrap in useCallback
  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setAnimating(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % total);
      setAnimating(false);
    }, 500);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setAnimating(true);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + total) % total);
      setAnimating(false);
    }, 500);
  }, [total]);

  const getVisibleProducts = useCallback(() => {
    if (!products || total === 0) return [];
    return Array.from({ length: visibleCount }, (_, i) => {
      const current = (index + i) % total;
      return products[current] ?? null;
    });
  }, [products, index, total]);

  // Auto-slide logic
  useEffect(() => {
    if (total === 0) return;

    const startAutoSlide = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (!isHoveredRef.current) nextSlide(); // only slide if not hovered
      }, 2000);
    };

    startAutoSlide();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [total, nextSlide]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    intervalRef.current = setInterval(() => {
      if (!isHoveredRef.current) nextSlide();
    }, 2000);
  };

  if (!products || total === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No products available
      </div>
    );
  }

  return (
    <div
      className="relative max-w-7xl mx-auto py-10 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sliding wrapper */}
      <div
        className={`flex gap-4 transition-transform duration-500 ease-in-out ${
          animating ? "transform translate-x-0" : ""
        }`}
      >
        {getVisibleProducts().map((product, idx) =>
          product ? (
            <div
              key={product.id ?? `fallback-${idx}`}
              className="flex-1 min-w-[220px] max-w-[280px] shrink-0"
            >
              <PopularProductCard product={product} />
            </div>
          ) : null
        )}
      </div>

      {/* Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10 hover:bg-gray-600"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10 hover:bg-gray-600"
      >
        ❯
      </button>
    </div>
  );
};

export default ProductSlider;
