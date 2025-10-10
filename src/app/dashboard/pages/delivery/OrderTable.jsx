import React from "react";
import { useNavigate } from "react-router-dom";

const OrderTable = ({ orders, filters, setFilters, onOrderSelect }) => {
  const navigate = useNavigate();

  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order) => {
        return (
          (filters.status ? order.status === filters.status : true) &&
          (filters.search
            ? order.id.includes(filters.search) ||
              order.productName.includes(filters.search)
            : true)
        );
      })
    : [];

  return (
    <div>
      <div className="flex justify-between mb-4">
        {/* Filters */}
        <select
          className="p-2 border rounded"
          value={filters.status}
          onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
        >
          <option value="">All Statuses</option>
          <option value="Delivered">Delivered</option>
          <option value="In Progress">In Progress</option>
          <option value="Canceled">Canceled</option>
        </select>

        {/* Search */}
        <input
          type="text"
          className="p-2 border rounded"
          placeholder="Search orders"
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
        />
      </div>

      {/* Orders Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            console.log(order.items?.[0]?.image || ''),
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="p-2 border">
                <img
                  src={order.items?.[0]?.image || ''}

                  alt={order.productName}
                  className="h-12 w-12 object-cover rounded"
                />
              </td>
              <td className="p-2 border">{order.trackingId}</td>
              <td className="p-2 border">
                {order.items && order.items.length > 0 ? (
                  <>
                    {order.items[0].name}
                    {order.items.length > 1 && (
                      <span className="text-gray-400"> +{order.items.length - 1} more</span>
                    )}
                  </>
                ) : (
                  <span className="text-gray-400 italic">No products</span>
                )}
              </td>

              <td className="p-2 border">{order.status}</td>
              <td className="p-2 border">₦{order.amount.toFixed(2)}</td>
              <td className="p-2 border">
                <button
                  className="text-blue-600"
                  onClick={() => navigate("/dashboard/delivery/deliveryDetails/" + order.trackingId)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
