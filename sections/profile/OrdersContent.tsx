"use client";

import { useEffect, useState} from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { formatCurrency } from "utils/FormatCurrency";
import { useOrderStore } from "store/order/useOrderStore";
import { InfiniteScroll } from "app/components/InfiniteScroll";
import Image from "next/image";

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
  }, [getUserOrders, userOrders.length]);

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
      <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 p-6 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">My Orders</h1>
          <p className="text-white/80 text-sm">Track, manage, and review your recent purchases.</p>
        </div>
        <button className="text-sm text-white/80 font-medium hover:underline">
          Deleted Orders
        </button>
      </div>

      {/* Tabs */}
      <div className="w-full">
        <div className="flex sm:grid sm:grid-cols-5 gap-2 sm:gap-0 overflow-x-auto scrollbar-hide rounded-2xl border border-gray-200 shadow-sm bg-white p-2 sm:p-0">
          {[
            { label: "All", value: "all" },
            { label: "Processing", value: "processing" },
            { label: "Shipped", value: "shipped" },
            { label: "Delivered", value: "delivered" },
            { label: "Completed", value: "completed" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setActiveTab(tab.value);
              }}
              className={`flex-shrink-0 px-4 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-full sm:rounded-none transition-all whitespace-nowrap 
                ${
                  activeTab === tab.value
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md sm:border-b-2 sm:border-emerald-600"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 sm:bg-white sm:hover:bg-gray-50"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
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
            className="pl-10 pr-3 w-full h-11 rounded-xl border border-gray-200 bg-gray-50 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
          <>
            <InfiniteScroll
              key={activeTab + searchQuery} 
              items={filteredOrders}
              initialItems={4} // show 4 initially
              loadCount={4} // load 4 more each scroll
              renderItem={(order) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
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
                      className="text-emerald-700 text-sm font-medium hover:underline"
                    >
                      View Details →
                    </button>
                  </div>

                  {/* Order Items */}
                  <div className="flex flex-col gap-5">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex gap-4 items-center bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition"
                      >
                        <Image
                          src={item.image?.url || "/placeholder.jpg"}
                          alt={item.productName || "Product image"}
                          width={80}
                          height={80}
                          className="object-cover rounded-xl border"
                        />
                        <div className="flex-1">
                          <h4 className="text-base font-semibold text-gray-900 mb-1">
                            {item.productName}
                          </h4>
                          <p className="text-sm text-gray-500 mb-1">Qty: {item.quantity}</p>
                          <p className="text-emerald-700 font-bold text-lg">
                            {formatCurrency(item.priceInKobo)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                    <div className="flex gap-3">
                      {order.fulfillmentStatus === "delivered" ? (
                        <>
                          <button className="bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-emerald-700 transition">
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
                </motion.div>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
}
