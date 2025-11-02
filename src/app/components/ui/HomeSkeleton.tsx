'use client';

import React from 'react';

const HomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Hero Banner Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Banner Skeleton */}
            <div className="lg:col-span-2">
              <div className="relative h-60 sm:h-72 lg:h-80 rounded-2xl overflow-hidden bg-gray-200">
                <div className="absolute inset-0 bg-gray-300"></div>
                <div className="relative z-10 p-6 sm:p-8 h-full flex flex-col justify-center space-y-4">
                  <div className="h-5 sm:h-6 w-32 sm:w-40 bg-gray-300 rounded"></div>
                  <div className="h-7 sm:h-8 w-48 sm:w-64 bg-gray-300 rounded"></div>
                  <div className="h-4 w-40 sm:w-48 bg-gray-300 rounded"></div>
                  <div className="h-9 sm:h-10 w-32 sm:w-40 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>

            {/* Side Banners Skeleton */}
            <div className="space-y-4 sm:space-y-6">
              {[1, 2].map((_, i) => (
                <div
                  key={i}
                  className="relative h-28 sm:h-32 lg:h-36 rounded-xl bg-gray-200 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gray-300"></div>
                  <div className="relative z-10 p-4 h-full flex flex-col justify-center space-y-2">
                    <div className="h-4 sm:h-5 w-28 sm:w-32 bg-gray-300 rounded"></div>
                    <div className="h-3 sm:h-4 w-20 sm:w-24 bg-gray-300 rounded"></div>
                    <div className="h-2 sm:h-3 w-32 sm:w-40 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section Skeleton */}
      <section className="bg-white py-8 border-t">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 bg-white"
              >
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSkeleton;
