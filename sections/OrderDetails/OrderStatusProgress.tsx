'use client'

import React from "react";
import { motion } from "framer-motion";
import { Package, Ship, Bus, Box, CheckCircle } from "lucide-react";

interface OrderStatusProgressProps {
  fulfillmentStatus: string;
}

const statuses = [
  {
    key: "Processing",
    label: "Processing",
    icon: Package,
    description: "Order is being prepared",
    color: "from-blue-500 to-indigo-600",
  },
  {
    key: "Shipped",
    label: "Shipped",
    icon: Ship,
    description: "Order has left warehouse",
    color: "from-orange-500 to-red-600",
  },
  {
    key: "OutForDelivery",
    label: "In Transit",
    icon: Bus,
    description: "Order is on its way",
    color: "from-purple-500 to-pink-600",
  },
  {
    key: "Delivered",
    label: "Delivered",
    icon: Box,
    description: "Order has been delivered",
    color: "from-emerald-500 to-green-600",
  },
];

const OrderStatusProgress: React.FC<OrderStatusProgressProps> = ({ fulfillmentStatus }) => {
  const currentIndex = statuses.findIndex(
    (status) => status.key.toLowerCase() === fulfillmentStatus.toLowerCase()
  );

  const getStepStyles = (index: number) => {
    const status = statuses[index];
    const isActive = index <= currentIndex;

    return {
      circle: isActive
        ? `bg-gradient-to-r ${status.color} border-4 border-white shadow-lg scale-105`
        : "bg-slate-200 border-4 border-white shadow-md",
      icon: isActive ? "text-white" : "text-slate-500",
      label: isActive ? "text-slate-900" : "text-slate-400",
      description: isActive ? "text-slate-600" : "text-slate-400",
    };
  };

  return (
    <div className="w-full px-4 py-6 bg-white rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">Order Status</h3>

      {/* Step bar and progress */}
      <div className="relative flex justify-between items-center mb-6 overflow-x-auto">
        {/* Background Line */}
        <div className="absolute top-[27px] left-[6%] right-[6%] h-1.5 bg-slate-200 rounded-full z-0" />

        {/* Foreground Progress Line */}
        <motion.div
          className="absolute top-[27px] left-[6%] h-1.5 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full z-10"
          initial={{ width: 0 }}
          animate={{
            width:
              currentIndex > 0
                ? `${(currentIndex / (statuses.length - 1)) * 88}%`
                : "0%",
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Steps */}
        {statuses.map((status, index) => {
          const Icon = status.icon;
          const isCurrent = index === currentIndex;
          const isCompleted = index < currentIndex;
          const styles = getStepStyles(index);

          return (
            <div
              key={status.key}
              className="relative z-20 flex flex-col items-center flex-1 min-w-[80px]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.15 }}
                className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${styles.circle} ${
                  isCurrent ? "animate-pulse" : ""
                }`}
              >
                <Icon className={`w-5 h-5 ${styles.icon}`} />
                {isCompleted && (
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
              </motion.div>

              <div className="mt-3 text-center">
                <div className={`font-bold text-sm ${styles.label}`}>{status.label}</div>
                <div className={`text-xs mt-1 leading-snug ${styles.description}`}>
                  {status.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Percentage */}
      <div className="text-center mt-4">
        <span className="text-sm font-semibold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
          {Math.round(((currentIndex + 1) / statuses.length) * 100)}% Complete
        </span>
      </div>
    </div>
  );
};

export default OrderStatusProgress;
