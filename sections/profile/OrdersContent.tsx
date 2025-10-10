"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Copy, Truck } from "lucide-react";
import { formatCurrency } from "utils/FormatCurrency";
import { useOrderStore } from "store/order/useOrderStore";

export default function OrdersContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const getUserOrders = useOrderStore((state) => state.getUserOrders);
  const userOrders = useOrderStore((state) => state.userOrders);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSection = searchParams.get("section");

  useEffect(() => {
    if (userOrders.length === 0) getUserOrders();
  }, []);

  const filteredOrders = userOrders.filter((order) => {
    const matchSearch =
      order.id.includes(searchQuery) ||
      order.items.some((item) =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchTab = activeTab === "all" ? true : order.fulfillmentStatus === activeTab;
    return matchSearch && matchTab;
  });

  const getStatusChip = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-300";
      case "shipped":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "processing":
        return "bg-amber-100 text-amber-700 border-amber-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-green-50 to-emerald-100 p-6 shadow-sm border border-emerald-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 text-sm">Track, manage and review your recent purchases.</p>
        </div>
        <button className="text-sm text-blue-600 font-medium hover:underline">
          Deleted Orders
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        {[
          { label: "All", value: "all" },
          { label: "Processing", value: "processing" },
          { label: "Shipped", value: "shipped" },
          { label: "Delivered", value: "delivered" },
          { label: "Completed", value: "completed" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`py-3 text-sm font-medium transition-all ${
              activeTab === tab.value
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by order ID or product"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-3 w-full h-11 rounded-xl border border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button className="border border-gray-200 text-sm rounded-xl px-4 py-2 bg-white hover:bg-gray-100">
          All / Last year
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center text-gray-500 py-10 border rounded-2xl bg-white shadow-sm">
            No orders found.
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="relative group border border-gray-200 rounded-3xl p-6 backdrop-blur-md bg-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all hover:-translate-y-1"
            >
              {/* Status & Meta */}
              <div className="flex flex-wrap justify-between items-center mb-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${getStatusChip(
                      order.fulfillmentStatus
                    )}`}
                  >
                    {order.fulfillmentStatus.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-600">
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={() =>
                    router.push(`/account?section=${currentSection}&id=${order.id}`)
                  }
                  className="text-green-700 text-sm font-medium hover:underline"
                >
                  View Details →
                </button>
              </div>

              {/* Order Items */}
              <div className="flex flex-col gap-5">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-center bg-gradient-to-r from-gray-50/50 to-gray-100/30 rounded-2xl p-4 border border-gray-100"
                  >
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-xl border"
                    />
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-gray-900 mb-1">
                        {item.productName}
                      </h4>
                      <p className="text-sm text-gray-500 mb-1">Qty: {item.quantity}</p>
                      <p className="text-green-700 font-bold text-lg">
                        {formatCurrency(item.priceInKobo)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Truck className="w-4 h-4" />
                  Estimated Delivery:{" "}
                  <span className="text-gray-700 font-medium">
                    {order.deliveryEstimate || "Processing"}
                  </span>
                </div>

                <div className="flex gap-3">
                  {order.fulfillmentStatus === "delivered" ? (
                    <>
                      <button className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition">
                        Buy Again
                      </button>
                      <button className="border border-gray-300 px-5 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition">
                        Remove
                      </button>
                    </>
                  ) : (
                    <button className="border border-gray-300 px-5 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition">
                      Track Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
