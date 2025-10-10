"use client"
import React, { useState, useEffect } from "react";
import { useOrderStore } from "store/order/useOrderStore";
import OrderTable from "./OrderTable";
import OrderDetails from "./order-details/[id]/page";


const DeliveryPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState({ status: "", search: "", dateRange: null });
  const orders = useOrderStore((state)=>(state.orders))
  const error = useOrderStore((state)=>(state.error))
  const loading = useOrderStore((state)=>(state.loading))
  const fetchOrders = useOrderStore((state)=>(state.fetchOrders))
  console.log(orders)
  

  useEffect(() => {
    fetchOrders()
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-red-600">Oops! Something went wrong.</h2>
          <p className="text-red-400 mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      {/* <h1 className="text-2xl font-bold">Delivery Page</h1>
      <p className="text-gray-600">Track and manage your orders easily.</p> */}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Overview */}
        <div className={`bg-white rounded-lg shadow ${selectedOrder ? "lg:col-span-2" : "lg:col-span-3"}`}>
          <OrderTable orders={orders} filters={filters} setFilters={setFilters} />
        </div>

        {/* Order Details */}
        {selectedOrder && (
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-1">
            <OrderDetails order={selectedOrder} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryPage;
