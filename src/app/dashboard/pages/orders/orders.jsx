import React, {useEffect} from "react";
import DashboardLayout from "../../components/dashboardLayout/DashboardLayout";
import useOrderStore from "../../../store/useOrderStore";

const Orders = () => {

  const { orders, loading, error, fetchOrders } = useOrderStore()
  console.log(orders)

  useEffect(() => {
    fetchOrders()
  }, [])

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
    <DashboardLayout>
      <div className="bg-gray-50 min-h-screen p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Summary Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
              <p className="text-2xl font-semibold text-gray-800">102</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
              <p className="text-2xl font-semibold text-yellow-500">12</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">Delivered Orders</h3>
              <p className="text-2xl font-semibold text-green-500">78</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">Canceled Orders</h3>
              <p className="text-2xl font-semibold text-red-500">8</p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
            <input
              type="text"
              placeholder="Search by Order ID or Customer"
              className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
            />
            <select className="p-2 border border-gray-300 rounded-md ml-4">
              <option value="">Filter by Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ml-4">
              Add New Order
            </button>
          </div>

          {/* Orders Table */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Current Orders</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order, index) => (
                    <tr key={order.id || index} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{order.trackingId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`font-semibold ${
                            order.status === "completed"
                              ? "text-green-600"
                              : order.status === "pending"
                              ? "text-yellow-600"
                              : order.status === 'failed'
                              ? "text-red-600"
                              : order.status === 'paid'
                              ? "text-blue-600" 
                              : order.status === 'shipped'
                              ? 'text-indigo-600'
                              : order.status === 'canceled'
                              ? '	text-gray-500'
                              : ''
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                        ₦{order.amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                        <button className="text-blue-600 hover:underline">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// import mongoose from "mongoose";

// const OrderSchema = new mongoose.Schema({
//   tx_ref: { type: String, unique: true, required: true }, // Flutterwave transaction reference
//   trackingId: { type: String, unique: true, required: true },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   items: [{ name: String, quantity: Number, price: Number }],
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String },
//   address: { type: String, required: true },
//   amount: { type: Number, required: true },
//   status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
//   createdAt: { type: Date, default: Date.now }
// });


export default Orders;
