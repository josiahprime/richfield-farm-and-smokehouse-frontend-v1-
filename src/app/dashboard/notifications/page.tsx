"use client"
import React, { useState } from "react";
import { FaClock, FaBell, FaExclamationCircle } from "react-icons/fa";

const notificationsData = [
  {
    id: 1,
    title: "New Order Received",
    description: "An order for 5 items has been placed by John Doe.",
    timestamp: "2025-01-25 14:20",
    type: "order",
  },
  {
    id: 2,
    title: "Product Stock Low",
    description: "Stock for 'Fresh Milk' is running low. Consider restocking.",
    timestamp: "2025-01-24 18:05",
    type: "alert",
  },
  {
    id: 3,
    title: "Feedback Received",
    description: "A customer has left feedback on 'Sweet Corn'.",
    timestamp: "2025-01-24 12:45",
    type: "feedback",
  },
  {
    id: 4,
    title: "Order Cancelled",
    description: "An order by Jane Smith was cancelled.",
    timestamp: "2025-01-23 09:15",
    type: "order",
  },
  {
    id: 5,
    title: "New Admin Login",
    description: "Admin 'admin1' logged in from IP 192.168.1.10.",
    timestamp: "2025-01-23 08:00",
    type: "info",
  },
];

const Notifications = () => {
  const [notifications] = useState(notificationsData);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-6 w-screen">
        <div className="p-6">
          <div className="text-center mb-6">
            <h1
              className="shadow-md border border-gray-300 text-center py-6 px-4 rounded-2xl
                bg-gradient-to-r from-green-300 via-white to-blue-300
                hover:from-green-400 hover:to-blue-400 text-2xl font-extrabold text-gray-700"
            >
              Notifications
            </h1>
          </div>

          {/* Notifications Section */}
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`relative flex items-center justify-between p-4 bg-white shadow-lg rounded-lg border-l-8 ${
                  notification.type === "order"
                    ? "border-blue-500"
                    : notification.type === "alert"
                    ? "border-red-500"
                    : notification.type === "feedback"
                    ? "border-yellow-500"
                    : "border-gray-500"
                }`}
              >
                {/* Icon Section */}
                <div className="flex items-center space-x-4">
                  <div className="text-3xl text-gray-500">
                    {notification.type === "order" && <FaBell />}
                    {notification.type === "alert" && <FaExclamationCircle />}
                    {notification.type === "feedback" && <FaBell />}
                    {notification.type === "info" && <FaBell />}
                  </div>
                  {/* Notification Details */}
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {notification.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {notification.description}
                    </p>
                  </div>
                </div>
                {/* Timestamp */}
                <div className="text-xs text-gray-400 flex items-center space-x-1">
                  <FaClock />
                  <span>{notification.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;


// const notificationSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   title: String,
//   message: String,
//   type: String, // e.g. 'order', 'promo'
//   read: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now }
// })
