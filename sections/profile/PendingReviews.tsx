"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, MessageCircle, ImageOff, ShoppingBag, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DemoNotice from "app/components/DemoNotice";

interface ReviewItem {
  id: number;
  productName: string;
  productImage: string;
  orderDate: string;
  price: string;
  quantity: number;
  seller: string;
  status: "pending" | "completed";
}

export default function PendingReviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  useEffect(() => {
    const generateDummyReviews = () => {
      const randomProducts = [
        "Organic Honey 500ml",
        "Farm Fresh Eggs 12pcs",
        "Avocado Basket",
        "Mango Juice Pack",
        "Fresh Tomatoes 1kg",
        "Strawberry Jam Jar",
      ];

      const sellers = [
        "Green Market",
        "Farmville",
        "Healthy Harvest",
        "Nature's Best",
      ];

      const dummy = randomProducts.map((name, i) => ({
        id: i + 1,
        productName: name,
        productImage: `https://picsum.photos/seed/${encodeURIComponent(name)}-demo/600/600`,
        orderDate: new Date(
          Date.now() - Math.random() * 10000000000
        ).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        price: `₦${(Math.random() * 15000 + 2500).toFixed(0)}`,
        quantity: Math.floor(Math.random() * 3) + 1,
        seller: sellers[Math.floor(Math.random() * sellers.length)],
        status: "pending" as const,
      }));

      setReviews(dummy);
    };

    generateDummyReviews();
  }, []);

  return (
    <div className="relative min-h-screen rounded-md shadow p-4 sm:p-6 md:p-8">
      {/* 🟡 Floating Dummy Data Notice */}
      <DemoNotice/>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
          <Star className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
          Pending Reviews
        </h1>

        <AnimatePresence>
          {reviews.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-emerald-50 flex items-center gap-4 hover:shadow-md transition-shadow md:h-44"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                    <Image
                      src={review.productImage}
                      alt={review.productName}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
                        {review.productName}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Ordered on {review.orderDate}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Seller:{" "}
                        <span className="font-medium text-gray-700">
                          {review.seller}
                        </span>
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Qty:{" "}
                        <span className="font-medium text-gray-700">
                          {review.quantity}
                        </span>
                      </p>
                    </div>

                    {/* Bottom Price + Button */}
                    <div className="flex items-center justify-between mt-3 sm:mt-4">
                      <p className="text-sm sm:text-base font-semibold text-emerald-700">
                        {review.price}
                      </p>

                      <button className="text-xs sm:text-sm font-medium text-white bg-emerald-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow hover:bg-emerald-700 active:scale-95 transition">
                        <MessageCircle className="inline w-4 h-4 mr-1" />
                        Rate Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            // Empty State
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center text-center bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-emerald-100 mt-16"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-50 flex items-center justify-center mb-5">
                <ImageOff className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold text-gray-700">
                No Pending Reviews
              </h2>
              <p className="text-sm text-gray-500 mt-2 max-w-sm">
                You haven’t made any reviews yet. Once you receive your orders,
                you can rate and share feedback here.
              </p>

              <button
                className="mt-6 flex items-center gap-2 bg-emerald-600 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-medium shadow hover:bg-emerald-700 active:scale-95 transition"
                onClick={() => (window.location.href = "/")}
              >
                <ShoppingBag className="w-4 sm:w-5 h-4 sm:h-5" />
                Start Shopping
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
