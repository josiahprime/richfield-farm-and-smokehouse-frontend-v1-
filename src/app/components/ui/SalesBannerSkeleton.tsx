'use client'

import React from 'react'

const SaleBannerSkeleton = () => {
  return (
    <div className="w-full h-10 bg-gradient-to-r from-green-600 to-emerald-700 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.8s_infinite]" />
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

export default SaleBannerSkeleton
