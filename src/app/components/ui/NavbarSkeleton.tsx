'use client'

import React from 'react'

const NavbarSkeleton = () => {
  return (
    <div className="w-full border-b bg-white shadow-sm overflow-hidden relative">
      <div className="flex items-center justify-between px-6 py-3 relative z-10">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full" />
          <div className="h-5 w-24 bg-gray-200 rounded" />
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center space-x-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-4 w-12 bg-gray-200 rounded" />
            ))}
        </div>

        {/* Search bar */}
        <div className="flex-1 mx-8 max-w-md hidden md:flex">
          <div className="w-full h-10 bg-gray-200 rounded-lg" />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <div className="w-5 h-5 bg-gray-200 rounded-full" />
          <div className="w-5 h-5 bg-gray-200 rounded-full" />
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-gray-200 rounded-full" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/60 to-transparent animate-[shimmer_1.8s_infinite]" />

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}

export default NavbarSkeleton
