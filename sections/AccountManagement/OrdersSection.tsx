"use client";
import React from "react";
import { Package, RotateCcw } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
}

const mockOrders: Order[] = [
  { id: "#ORD-2024-001", date: "Jan 15, 2024", status: "Delivered", total: "$89.99" },
  { id: "#ORD-2024-002", date: "Jan 8, 2024", status: "Shipped", total: "$124.50" },
  { id: "#ORD-2023-158", date: "Dec 20, 2023", status: "Delivered", total: "$54.99" },
];

export const OrdersSection = () => {
  const handleReorder = (orderId: string) => {
    toast.success(`Reordering ${orderId}`);
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-2xl">
          <Package className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
          <p className="text-gray-600">View your latest purchases and reorder easily</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-5">
        {mockOrders.map((order) => (
          <div
            key={order.id}
            className="bg-green-50/50 border border-green-100 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Order Info */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-gray-900">{order.id}</span>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {order.date} • <span className="font-semibold">{order.total}</span>
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => handleReorder(order.id)}
              className="mt-4 sm:mt-0 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium 
                hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
            >
              <RotateCcw className="h-4 w-4" />
              Reorder
            </button>
          </div>
        ))}
      </div>

      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </div>
  );
};
