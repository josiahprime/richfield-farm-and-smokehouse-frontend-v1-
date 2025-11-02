"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle2 } from "lucide-react";
import DemoNotice from "app/components/DemoNotice";

export default function NewsletterPreferencesPage() {
  const [preferences, setPreferences] = useState({
    promotions: true,
    productUpdates: true,
    blogPosts: false,
    reminders: false,
  });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <DemoNotice/>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-lg sm:text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
          Newsletter Preferences
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-emerald-50 p-6 sm:p-8 space-y-6"
        >
          <p className="text-sm sm:text-base text-gray-600">
            Manage how you receive emails from us. Customize your preferences
            below to stay informed without getting overwhelmed.
          </p>

          <div className="space-y-4">
            {/* Preference Item */}
            {[
              {
                key: "promotions",
                label: "Promotions & Exclusive Offers",
                desc: "Be the first to hear about special discounts, deals, and events.",
              },
              {
                key: "productUpdates",
                label: "Product Updates",
                desc: "Get notified when we launch new features or improvements.",
              },
              {
                key: "blogPosts",
                label: "Blog & Educational Articles",
                desc: "Stay inspired with our latest blog posts and guides.",
              },
              {
                key: "reminders",
                label: "Order & Account Reminders",
                desc: "Receive helpful notifications about your orders and account.",
              },
            ].map((item) => (
              <motion.div
                key={item.key}
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl p-4 transition"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800 text-sm sm:text-base">
                    {item.label}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {item.desc}
                  </span>
                </div>

                <button
                  onClick={() =>
                    togglePreference(item.key as keyof typeof preferences)
                  }
                  className={`relative w-12 h-6 flex items-center rounded-full transition-all duration-300 ${
                    preferences[item.key as keyof typeof preferences]
                      ? "bg-emerald-600"
                      : "bg-gray-300"
                  }`}
                >
                  <motion.div
                    layout
                    className={`absolute w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
                      preferences[item.key as keyof typeof preferences]
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              alert("Demo Mode — Changes are not saved in this version.")
            }
            className="mt-6 w-full bg-emerald-600 text-white py-3 rounded-xl font-medium shadow hover:bg-emerald-700 transition"
          >
            <CheckCircle2 className="inline w-5 h-5 mr-2" />
            Save Preferences
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
