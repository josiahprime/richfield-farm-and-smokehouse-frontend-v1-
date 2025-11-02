"use client";

import { useEffect, useRef, useState } from "react";
import PopularProductCard from "app/components/PopularProductCard/PopularProductCard";
import type { Product } from "store/product/productTypes";


interface Props {
  products: Product[];
}



const ProductSlider = ({ products }: Props) => {
  // console.log('products from product slider', products)
  const visibleCount = 5;
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const total = products.length;

  // Rotate through products
  const nextSlide = () => {
    setAnimating(true);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % total);
      setAnimating(false);
    }, 500); // Match with CSS transition duration
  };

  const prevSlide = () => {
    setAnimating(true);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + total) % total);
      setAnimating(false);
    }, 500);
  };

  // Get visible products in a loop
  const getVisibleProducts = () => {
    return Array.from({ length: visibleCount }, (_, i) => {
      const current = (index + i) % total;
      return products[current];
    });
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 2000); // 2s interval

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);


  return (
    <div className="relative max-w-7xl mx-auto py-10 overflow-hidden">
      {/* Sliding wrapper */}
      <div
        className={`flex gap-4 transition-transform duration-500 ease-in-out ${
          animating ? "transform translate-x-0" : ""
        }`}
      >
        {getVisibleProducts()?.map((product) =>
          product?.id ? (
            <div
              key={product.id}
              className="flex-1 min-w-[200px] max-w-[300px] shrink-0"
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
