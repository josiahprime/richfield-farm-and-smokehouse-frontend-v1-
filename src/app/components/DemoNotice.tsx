"use client";

import { motion } from "framer-motion";
import { Info, X } from "lucide-react";
import React, { useState } from "react";

interface DemoNoticeProps {
  message?: string;
}

const DemoNotice: React.FC<DemoNoticeProps> = ({
  message = "This page is currently running in demo mode with random sample data and images.",
}) => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-900 border border-amber-300 shadow-lg rounded-xl px-4 sm:px-5 py-3 text-sm sm:text-base font-medium backdrop-blur-sm max-w-xs sm:max-w-sm flex items-start gap-3"
    >
      <Info className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-700" />
      <p className="leading-snug">{message}</p>

      <button
        onClick={() => setVisible(false)}
        className="ml-auto text-amber-600 hover:text-amber-800 transition"
        aria-label="Close demo notice"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default DemoNotice;
