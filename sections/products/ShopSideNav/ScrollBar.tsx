"use client";

import { useRef, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const categories = [
  { name: "All Products", slug: "" },
  { name: "Meat & Poultry", slug: "meat-poultry" },
  { name: "Fresh Produce", slug: "fresh-produce" },
  { name: "Fish & Seafoods", slug: "fish-seafoods" },
  { name: "Dairy & Eggs", slug: "dairy-eggs" },
  { name: "Animal Feeds & Supplements", slug: "animal-feeds-supplements" },
  { name: "Pantry & Sweeteners", slug: "pantry-sweeteners" },
];

export default function MobileCategoryNav() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeTag, setActiveTag] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category") || "";
    setActiveTag(categoryFromUrl);
  }, [searchParams]);

  const handleFilter = (category: { name: string; slug: string }) => {
    setActiveTag(category.slug);
    if (category.slug) {
      router.push(`/products?category=${category.slug}`);
    } else {
      router.push("/products");
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <nav className="block md:hidden bg-white shadow-sm sticky top-14 z-40">
      <div className="relative">
        {/* Gradient fade left/right to hint scroll */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div
          ref={scrollRef}
          className="flex gap-3 px-2 py-3 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing scroll-smooth"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {categories.map((category) => {
            const isActive = activeTag === category.slug;
            return (
              <motion.button
                key={category.slug || "all"}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap border transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
                onClick={() => handleFilter(category)}
              >
                {category.name}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
