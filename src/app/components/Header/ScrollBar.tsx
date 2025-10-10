"use client";
import { useRef, useState } from "react";

const categories = [
  "Vegetables",
  "Fruits",
  "Herbs & Spices",
  "Organic Produce",
  "Beef",
  "Chicken",
  "Goat & Lamb",
  "Pork",
  "Fish & Seafoods",
];

export default function MobileCategoryNav() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
    const walk = (x - startX) * 1.5; // scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <nav className="block md:hidden bg-white shadow-sm sticky top-14 z-40">
      <div
        ref={scrollRef}
        className="flex gap-4 px-4 py-3 overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {categories.map((category) => (
          <button
            key={category}
            className="text-lg font-medium text-slate-700 whitespace-nowrap hover:text-emerald-600 focus:outline-none focus:text-emerald-600 relative after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:scale-x-0 after:bg-emerald-600 focus:after:scale-x-100 after:transition-transform"
          >
            {category}
          </button>
        ))}
      </div>
    </nav>
  );
}
