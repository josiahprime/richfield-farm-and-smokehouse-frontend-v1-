"use client";
import React from "react";

const CartSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 sm:w-1/4 md:w-1/5"></div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-3 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/70 backdrop-blur rounded-xl p-4 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto mb-4 sm:mb-0">
                  <div className="w-20 h-20 bg-gray-200 rounded-xl flex-shrink-0"></div>
                  <div className="flex flex-col space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/5"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-1/4 sm:w-20 self-end sm:self-center"></div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
              <div className="h-5 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
