"use client";

import React from "react";

const DotLoader = () => {
  const dots = [0, 1, 2, 3, 4];

  return (
    <div className="fixed inset-0 bg-white backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex space-x-3">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full bg-gradient-to-br from-green-500 to-emerald-600"
            style={{
              animation: `pulse 1.5s infinite ease-in-out`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }
          50% {
            transform: scale(1.2);
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
          }
          100% {
            transform: scale(0.8);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
          }
        }
      `}</style>
    </div>
  );
};

export default DotLoader;
