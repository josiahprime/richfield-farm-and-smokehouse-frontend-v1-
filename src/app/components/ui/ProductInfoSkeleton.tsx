'use client';

import React from 'react';

const ProductInfoSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="max-w-screen-xl mx-auto rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200/30 shadow-xl lg:h-[600px] flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 flex-1">
          
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-gray-200 h-[350px]" />
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 bg-gray-200 rounded-lg"
                />
              ))}
            </div>
            <div className="flex justify-center gap-1 mt-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-gray-300"
                />
              ))}
            </div>
          </div>

          {/* Product Details Skeleton */}
          <div className="flex flex-col space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="flex gap-2 items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-3 h-3 bg-gray-300 rounded" />
              ))}
              <div className="w-6 h-3 bg-gray-200 rounded" />
            </div>

            <div className="flex items-baseline gap-3">
              <div className="h-6 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-10 bg-gray-200 rounded" />
            </div>

            <div className="h-16 bg-gray-100 rounded-lg" />

            <div className="grid grid-cols-2 gap-2 p-3 rounded-xl border border-gray-200 bg-white/70">
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="flex items-center gap-2">
                <div className="w-20 h-8 bg-gray-200 rounded-lg" />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="flex-1 h-8 bg-gray-200 rounded-lg" />
                <div className="flex-1 h-8 bg-gray-200 rounded-lg" />
                <div className="w-10 h-8 bg-gray-200 rounded-lg" />
              </div>
              <div className="h-8 bg-gray-200 rounded-lg w-full" />
            </div>

            {/* Footer badges */}
            <div className="flex items-center gap-4 pt-2 border-t border-gray-200 mt-2">
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSkeleton;
