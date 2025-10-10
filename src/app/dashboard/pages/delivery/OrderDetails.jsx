import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderStatusProgress from "./OrderStatusProgress";
import axios from "axios";
import useOrderStore from "../../../store/useOrderStore";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiPackage,
  FiLink,
  FiTruck,
  FiDollarSign,
  FiClock,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBox,
} from "react-icons/fi";
import DashboardLayout from "../../components/dashboardLayout/DashboardLayout";

const statusOptions = ["pending", "paid", "failed", "cancelled"];
const fulfillmentOptions = ["Processing", "Shipped", "Out for Delivery", "Delivered"];

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("");
  const [fulfillmentStatus, setFulfillmentStatus] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const { orders, loading, error, fetchOrders, updateOrder } = useOrderStore();
  const order = orders.find((o) => o.trackingId === id);

  useEffect(() => {
    if (order) {
      setStatus(order.status || "pending");
      setFulfillmentStatus(order.fulfillmentStatus || "processing");
    }
  }, [order]);

  useEffect(() => {
    if (order) {
      const isChanged = order.status !== status || order.fulfillmentStatus !== fulfillmentStatus;
      setHasChanges(isChanged);
    }
  }, [status, fulfillmentStatus, order]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleFulfillmentChange = (e) => {
    setFulfillmentStatus(e.target.value);
  };

  const handleApplyChanges = async () => {
    if (!order) return;
    try {
      await updateOrder(order._id, {
        status,
        fulfillmentStatus,
      });
      setHasChanges(false);
    } catch (error) {
      console.error("Error applying changes:", error);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!order) return <div className="p-6 text-red-600">Order not found.</div>;

  const progressMap = {
    processing: 33,
    shipped: 66,
    delivered: 100,
    completed: 100,
  };
  const progress = progressMap[fulfillmentStatus] || 0;

  return (
    <DashboardLayout>
      <motion.div
        className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-lg"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-6">
          <OrderStatusProgress currentStatus={fulfillmentStatus} />
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center mb-6 text-blue-600 hover:underline"
        >
          <FiArrowLeft className="mr-2" /> Back to Orders
        </button>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-3xl font-bold mb-1">Order #{order.trackingId}</h1>
          <p className="text-gray-600 flex items-center gap-1">
            <FiClock /> Placed on: {new Date(order.createdAt).toLocaleString()}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Customer Info */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FiUser /> Customer Info
            </h2>
            <p><FiUser className="inline mr-2" /> {order.name}</p>
            <p><FiMail className="inline mr-2" /> {order.email}</p>
            <p><FiPhone className="inline mr-2" /> {order.phone || "N/A"}</p>
            <p><FiMapPin className="inline mr-2" /> {order.address}</p>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FiPackage /> Order Summary
            </h2>
            <p><FiDollarSign className="inline mr-2" /> Total: ₦{order.amount.toFixed(2)}</p>

            <div>
              <label className="text-sm font-medium">Status:</label>
              <select
                value={status}
                onChange={handleStatusChange}
                className={`block w-full mt-1 p-2 rounded border ${getStatusColor(status)} text-white`}
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option} className="text-black">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Fulfillment:</label>
              <select
                value={fulfillmentStatus}
                onChange={handleFulfillmentChange}
                className={`block w-full mt-1 p-2 rounded border ${getStatusColor(fulfillmentStatus)} text-white`}
              >
                {fulfillmentOptions.map((option) => (
                  <option key={option} value={option} className="text-black">
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {hasChanges && (
              <button
                onClick={handleApplyChanges}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Apply Changes
              </button>
            )}

            <p><strong>Transaction Ref:</strong> {order.tx_ref}</p>

            {order.deliveryProvider && (
              <p><FiTruck className="inline mr-2" /> {order.deliveryProvider}</p>
            )}
            {order.deliveryTrackingUrl && (
              <p className="flex items-center gap-2">
                <FiLink />
                <a href={order.deliveryTrackingUrl} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                  Track Shipment
                </a>
              </p>
            )}
          </motion.div>
        </div>

        {/* Items Table */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <FiBox /> Items
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-2 border">Name</th>
                  <th className="text-left px-4 py-2 border">Qty</th>
                  <th className="text-left px-4 py-2 border">Price</th>
                  <th className="text-left px-4 py-2 border">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{item.name}</td>
                    <td className="px-4 py-2 border">{item.quantity}</td>
                    <td className="px-4 py-2 border">₦{item.priceInKobo.toFixed(2)}</td>
                    <td className="px-4 py-2 border">₦{(item.quantity * item.priceInKobo).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default OrderDetailsPage;

// Status badge color helper
function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "paid":
    case "success":
    case "completed":
      return "bg-green-600";
    case "pending":
      return "bg-yellow-500";
    case "processing":
    case "shipped":
      return "bg-blue-500";
    case "cancelled":
    case "failed":
      return "bg-red-500";
    case "delivered":
      return "bg-emerald-600";
    default:
      return "bg-gray-600";
  }
}
