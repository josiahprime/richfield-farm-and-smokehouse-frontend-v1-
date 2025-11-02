"use client";

import { useState, useEffect } from "react";
import useNotificationsStore from "store/notification/useNotificationStore";
import { useAuthStore } from "store/auth/useAuthStore";
import {
  FaBell,
  FaTruck,
  FaBoxOpen,
  FaStar,
  FaTags,
  FaEnvelope,
  FaUserCircle,
  FaReply,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: number;
  from: string;
  subject: string;
  message: string;
  time: string;
}

const getIcon = (type: string) => {
  switch (type) {
    case "order":
      return <FaTruck className="text-[#153d38] text-lg" />;
    case "review":
      return <FaStar className="text-yellow-400 text-lg" />;
    case "promotion":
      return <FaTags className="text-pink-400 text-lg" />;
    default:
      return <FaBoxOpen className="text-gray-500 text-lg" />;
  }
};

const NotificationsPage = () => {
  const mockMessages = [
    {
      id: 1,
      from: "Customer Support",
      subject: "Refund Processed",
      message: "Hi there, your refund has been successfully processed. Thank you for shopping with us!",
      time: "1h ago",
    },
    {
      id: 2,
      from: "Seller John’s Gadgets",
      subject: "Shipping Confirmation",
      message: "We've shipped your order today. You can expect it within 3-5 days.",
      time: "3h ago",
    },
    {
      id: 3,
      from: "Support",
      subject: "Ticket Resolved",
      message: "Your support ticket #456 has been resolved. Let us know if you need anything else!",
      time: "1d ago",
    },
  ];

  const [messages] = useState(mockMessages);
  const [activeMessage, setActiveMessage] =  useState<Message | null>(null);
  const authUser = useAuthStore((state) => state.authUser);
  const notifications = useNotificationsStore((state) => state.notifications);
  const fetchNotifications = useNotificationsStore((state) => state.fetchNotifications);
  const connectSocket = useNotificationsStore((state) => state.connectSocket);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser?.id) return;

    const load = async () => {
      await fetchNotifications();
      setLoading(false);
    };

    load();
    const cleanup = connectSocket(authUser.id);
    return () => cleanup();
  }, [authUser, fetchNotifications, connectSocket]);

  const closeModal = () => setActiveMessage(null);

  return (
    <div className="p-6 max-w-7xl mx-auto text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-2 text-[#153d38] dark:text-white">
        <FaBell />
        Notifications Center
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="bg-white dark:bg-[#1f1f1f] rounded-3xl p-6 shadow-[inset_6px_6px_12px_#d1d9e6,inset_-6px_-6px_12px_#ffffff] dark:shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_12px_#2a2a2a]">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#153d38]">
            <FaBell /> Notifications
          </h2>

          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 bg-gray-300 rounded w-full"></div>
              ))}
            </div>
          ) : !notifications || notifications.length === 0 ? (
            <div className="p-10 text-center text-gray-500 flex flex-col items-center justify-center">
              <FaBoxOpen className="text-5xl mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold mb-2">No Notifications</h3>
              <p className="text-sm">You’re all caught up!</p>
            </div>
          ) : (
            <ul className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {notifications.map((notif) => (
                <li
                  key={notif.id}
                  className={`flex items-start gap-4 p-5 rounded-xl transition-all duration-300 ${
                    !notif.read ? "bg-[#f1f5f9]" : "bg-white"
                  } hover:shadow-[4px_4px_10px_#ccc,-4px_-4px_10px_#fff] dark:hover:shadow-[4px_4px_10px_#111,-4px_-4px_10px_#333]`}
                >
                  <div className="mt-1">{getIcon(notif.type)}</div>
                  <div className="flex-1">
                    <p className="font-medium">{notif.message}</p>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  {!notif.read && (
                    <button className="ml-auto text-xs flex items-center gap-1 text-[#153d38] hover:text-black">
                      <FaCheck /> Mark as read
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Messages */}
        <div className="bg-white dark:bg-[#1f1f1f] rounded-3xl p-6 shadow-[inset_6px_6px_12px_#d1d9e6,inset_-6px_-6px_12px_#ffffff] dark:shadow-[inset_6px_6px_12px_#0a0a0a,inset_-6px_-6px_12px_#2a2a2a]">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-[#153d38]">
            <FaEnvelope /> Messages
          </h2>
          <ul className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {messages.map((msg) => (
              <li
                key={msg.id}
                className="flex items-start gap-4 p-5 rounded-xl bg-white hover:shadow-[4px_4px_10px_#ccc,-4px_-4px_10px_#fff] dark:hover:shadow-[4px_4px_10px_#111,-4px_-4px_10px_#333] transition-all"
              >
                <FaUserCircle className="text-2xl text-gray-500 mt-1" />
                <div className="flex-1">
                  <p className="font-medium">{msg.from}</p>
                  <p className="text-sm text-gray-600">{msg.subject}</p>
                  <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setActiveMessage(msg)}
                    className="text-sm text-[#153d38] hover:underline flex items-center gap-1"
                  >
                    <FaEnvelope /> View
                  </button>
                  <button className="text-sm text-green-600 hover:underline flex items-center gap-1">
                    <FaReply /> Reply
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
      {activeMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-[#1f1f1f] rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
            >
              <FaTimes />
            </button>
            <h3 className="text-xl font-semibold mb-2 text-[#153d38]">{activeMessage.subject}</h3>
            <p className="text-sm text-gray-600 mb-4">
              <strong>From:</strong> {activeMessage.from}
            </p>
            <p className="text-gray-700">{activeMessage.message}</p>
            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm bg-[#153d38] text-white rounded hover:bg-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
