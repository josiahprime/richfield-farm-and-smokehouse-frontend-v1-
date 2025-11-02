'use client'

import React from 'react'

// Simple shimmer gradient
const shimmer =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent'

export default function ProductCardSkeleton() {
  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col relative ${shimmer} w-[220px] sm:w-[235px] mx-auto`}
    >
      {/* Image placeholder */}
      <div className="w-full h-52 sm:h-60 bg-gray-200" />

      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Product title */}
        <div className="h-5 w-4/5 bg-gray-200 rounded mb-3" />
        {/* Description lines */}
        <div className="h-4 w-full bg-gray-200 rounded mb-2" />
        <div className="h-4 w-5/6 bg-gray-200 rounded mb-4" />

        <div className="mt-auto space-y-3">
          {/* Rating stars */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-200 rounded" />
            ))}
            <div className="h-4 w-8 bg-gray-200 rounded ml-1" />
          </div>

          {/* Price section */}
          <div className="flex items-center gap-3">
            <div className="h-5 w-24 bg-gray-200 rounded" />
            <div className="h-5 w-14 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Floating icons (wishlist + cart) */}
      <div className="absolute top-3 left-3 w-7 h-7 bg-gray-200 rounded-full" />
      <div className="absolute top-3 right-3 w-7 h-7 bg-gray-200 rounded-full" />
      {/* Badge placeholder */}
      {/* <div className="absolute bottom-3 right-3 h-5 w-12 bg-gray-200 rounded" /> */}
    </div>
  )
}
