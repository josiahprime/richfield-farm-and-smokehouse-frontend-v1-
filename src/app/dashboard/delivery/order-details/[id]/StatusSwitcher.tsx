"use client";

import React, { useState } from "react";
import { Package, Ship, Bus, Box, ChevronDown } from "lucide-react";
import { FulfillmentStatus } from "store/order/orderTypes";

interface StatusSwitcherProps {
  currentStatus: string;
  onStatusChange: (status: FulfillmentStatus) => void;
}


const statuses = [
  {
    key: "Processing",
    label: "Processing",
    icon: Package,
    color: "text-blue-600",
    bg: "bg-blue-100",
    description: "Order is being prepared",
  },
  {
    key: "Shipped",
    label: "Shipped",
    icon: Ship,
    color: "text-orange-600",
    bg: "bg-orange-100",
    description: "Order has left the warehouse",
  },
  {
    key: "OutForDelivery",
    label: "Out For Delivery",
    icon: Bus,
    color: "text-purple-600",
    bg: "bg-purple-100",
    description: "Order is on its way",
  },
  {
    key: "Delivered",
    label: "Delivered",
    icon: Box,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    description: "Order has been delivered",
  },
];

const StatusSwitcher: React.FC<StatusSwitcherProps> = ({
  currentStatus,
  onStatusChange,
}) => {
  const [open, setOpen] = useState(false);

  const selected = statuses.find(
    (s) => s.key.toLowerCase() === currentStatus.toLowerCase()
  );

  const handleSelect = (key: FulfillmentStatus) => {
    onStatusChange(key);
    console.log('current status', key)
    setOpen(false);
  };

  return (
    <div className="relative w-full max-w-xs">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Update Fulfillment Status
      </label>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {selected && (
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 ${selected.bg} rounded-full flex items-center justify-center`}
            >
              <selected.icon className={`w-4 h-4 ${selected.color}`} />
            </div>
            <span className="font-medium text-gray-900">{selected.label}</span>
          </div>
        )}
        <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
      </button>

      {open && (
        <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {statuses.map((status) => {
            const Icon = status.icon;
            return (
              <li
                key={status.key}
                onClick={() => handleSelect(status.key as FulfillmentStatus)}
                className="flex gap-3 items-start px-4 py-3 cursor-pointer hover:bg-gray-50 transition"
              >
                <div
                  className={`w-8 h-8 ${status.bg} rounded-full flex items-center justify-center mt-0.5`}
                >
                  <Icon className={`w-4 h-4 ${status.color}`} />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {status.label}
                  </div>
                  <div className="text-xs text-gray-500">{status.description}</div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default StatusSwitcher;
