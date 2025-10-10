"use client";

import { useEffect, useRef, useState } from "react";
import PopularProductCard from "app/components/PopularProductCard/PopularProductCard";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  badge: string;
  weight: string;
  farm: string;
  freshness: string;
  description: string;
}

interface Props {
  products: Product[];
}

const ProductSlider = ({ products }: Props) => {
  const visibleCount = 5;
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const total = products?.length ?? 0;

  const nextSlide = () => {
    if (total === 0) return;
    setAnimating(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % total);
      setAnimating(false);
    }, 500);
  };

  const prevSlide = () => {
    if (total === 0) return;
    setAnimating(true);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + total) % total);
      setAnimating(false);
    }, 500);
  };

  const getVisibleProducts = () => {
    if (!products || total === 0) return [];
    return Array.from({ length: visibleCount }, (_, i) => {
      const current = (index + i) % total;
      return products[current] ?? null;
    });
  };

  useEffect(() => {
    if (total === 0) return;
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [total]);

  if (!products || total === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No products available
      </div>
    );
  }

  return (
    <div className="relative max-w-7xl mx-auto py-10 overflow-hidden">
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
