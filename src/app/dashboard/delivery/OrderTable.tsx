"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { Calendar, Package } from "lucide-react";
import type { Order } from "store/order/orderTypes";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface OrderTableProps {
  orders: Order[];
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onOrderSelect: (order: Order) => void;
}





interface Filters {
  status: string;
  search: string;
  dateRange: null;
}


const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  filters,
  setFilters,
}) => {

  const router = useRouter();

  // const filteredOrders = Array.isArray(orders)
  //   ? orders.filter((order) => {
  //       return (
  //         (filters.status ? order.status === filters.status : true) &&
  //         (filters.search
  //           ? order.id.toLowerCase().includes(filters.search.toLowerCase()) ||
  //             order.items.productName?.toLowerCase().includes(filters.search.toLowerCase())
  //           : true)
  //       );
  //     })
  //   : [];

  const filteredOrders = Array.isArray(orders)
  ? orders.filter((order) => {
      return (
        (filters.status ? order.status === filters.status : true) &&
        (filters.search
          ? order.id.toLowerCase().includes(filters.search.toLowerCase()) ||
            order.items.some((item) =>
              item.productName
                .toLowerCase()
                .includes(filters.search.toLowerCase())
            )
          : true)
      );
    })
  : [];


  return (
    <div className="min-h-screen py-8 px-4 sm:px-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Order Management</h1>
        <p className="text-gray-500">Track and manage all your orders in one place</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-4 flex-1 w-full">
          <select
            className="w-44 px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm font-medium shadow-inner"
            value={filters.status}
            onChange={(e) =>
              setFilters((prev: Filters) => ({ ...prev, status: e.target.value }))
            }
          >
            <option value="">All Statuses</option>
            <option value="Delivered">Delivered</option>
            <option value="Shipped">Shipped</option>
            <option value="Processing">Processing</option>
            <option value="Canceled">Canceled</option>
          </select>

          <input
            type="text"
            placeholder="Search orders, customers, or products..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm shadow-inner"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev: Filters) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>

        <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg shadow-sm">
          <Package className="w-4 h-4 mr-2" />
          {filteredOrders.length} order{filteredOrders.length !== 1 && "s"} found
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f3f7fb] text-gray-600 text-xs uppercase font-semibold">
            <tr>
              <th className="text-left px-6 py-4">Product</th>
              <th className="text-left px-6 py-4">Order ID</th>
              <th className="text-left px-6 py-4">Customer</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Amount</th>
              <th className="text-left px-6 py-4">Date</th>
              <th className="text-right px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 divide-y divide-gray-100">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-5">
                  <div className="flex gap-3 items-center">
                    <div className="relative">
                      {order.items?.[0]?.image?.url ? (
                        <Image
                          src={order.items[0].image.url}
                          alt={order.items[0].productName || "Product image"}
                          width={56} // w-14
                          height={56} // h-14
                          className="object-cover rounded-xl shadow-sm"
                        />
                      ) : (
                        <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-xl shadow-sm">
                          <ImageOff className="w-6 h-6 text-gray-400" />
                        </div>
                      )}

                      {order.items.length > 1 && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-md">
                          +{order.items.length - 1}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{order.items[0].productName}</div>
                      {order.items.length > 1 && (
                        <div className="text-xs text-gray-400">and {order.items.length - 1} more item</div>
                      )}
                      <div className="text-xs text-blue-600 font-medium mt-1">
                        Qty:{" "}
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className="inline-block font-mono bg-gray-100 px-2 py-1 rounded-md text-xs">
                    {order.trackingId}
                  </span>
                </td>

                <td className="px-4 py-5">
                  <div className="font-medium font-sans">{order.name}</div>
                  <div className="text-xs text-gray-500 font">{order.email}</div>
                  <div className="text-xs text-gray-400">{order.shipping.phone}</div>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      order.status === "paid"
                        ? "bg-green-600"
                        : order.status === "pending"
                        ? "bg-yellow-600"
                        : order.status === "failed"
                        ? "bg-red-600"
                        : order.status === "cancelled"
                        ? "bg-gray-600"
                        // : order.status === "refunded"
                        // ? "bg-blue-600"
                        : ''
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-1 text-green-600 font-semibold">
                    {/* <DollarSign className="w-4 h-4" /> */}
                    <span>₦{order.amount.toLocaleString()}</span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5 text-right">
                  <button
                    onClick={() =>
                      router.push(
                        `/dashboard/delivery/order-details/${order.trackingId}`
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-2 py-2 rounded-xl shadow-md flex items-center gap-2"
                  >
                    <FaEye size={14} />
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <h3 className="text-base font-semibold text-gray-800">No orders found</h3>
            <p className="text-sm text-gray-500">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTable;
