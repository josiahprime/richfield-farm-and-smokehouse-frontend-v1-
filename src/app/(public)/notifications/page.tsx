"use client";

import { useEffect, ButtonHTMLAttributes, ReactNode } from "react";
import useNotificationsStore from "store/notification/useNotificationStore";
import { useAuthStore } from "store/auth/useAuthStore";
import { formatDistanceToNow } from "date-fns";
import { FaBell, FaSlidersH, FaCog } from "react-icons/fa";

// Button component
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "default" | "secondary" | "outline";
};

const Button = ({ children, variant = "default", ...props }: ButtonProps) => {
  const base = "inline-flex items-center px-4 py-2 rounded text-sm font-medium transition";

  const variants: Record<"default" | "secondary" | "outline", string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    outline: "border border-gray-300 text-gray-800 hover:bg-gray-100",
  };

  const variantClass = variants[variant]; // safe now because variant always has default

  return (
    <button className={`${base} ${variantClass}`} {...props}>
      {children}
    </button>
  );
};



// Input component
const Input = ({ className = "", ...props }) => (
  <input
    className={`px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const NotificationsPage = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const notifications = useNotificationsStore((state) => state.notifications);
  const fetchNotifications = useNotificationsStore((state) => state.fetchNotifications);
  const connectSocket = useNotificationsStore((state) => state.connectSocket);
  const isLoading = useNotificationsStore((state) => state.isLoading);

  useEffect(() => {
    if (!authUser?.id) return;

    const load = async () => {
      await fetchNotifications();
    };

    load();
    const cleanup = connectSocket(authUser.id);
    return () => cleanup();
  }, [authUser, fetchNotifications, connectSocket]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground text-sm">
              Stay updated with your latest activities and messages
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">Mark All as Read</Button>
            <Button variant="outline">
              <FaCog className="w-4 h-4 mr-2" /> Settings
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Input placeholder="Search notifications..." className="flex-1 min-w-[200px]" />
          <Button variant="outline">
            <FaSlidersH className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button variant="outline">Type</Button>
          <Button variant="outline">Analytics</Button>
        </div>

        {/* Notification Cards */}
        <div className="grid gap-4">
          {notifications.map((notification, index) => {
            let iconColor = "bg-gray-100 text-gray-600"; // Default fallback

            if (notification.message === "Order Shipped") {
              iconColor = "bg-blue-100 text-blue-600";
            } else if (notification.message === "Out for Delivery") {
              iconColor = "bg-green-100 text-green-600";
            } else if (notification.message === "Order Delivered") {
              iconColor = "bg-purple-100 text-purple-600";
            }

            return (
              <div
                key={index}
                className={`rounded-lg shadow-sm p-5 flex gap-4 items-start transition hover:shadow-md ${
                  notification.seen ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className={`rounded-full p-2 ${iconColor}`}>
                  <FaBell className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="font-medium text-sm">{notification.message}</h2>
                      <p className="text-sm text-gray-600">{notification.type.toLowerCase()}</p>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <p>{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</p>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded-full font-medium capitalize ${
                          notification.seen
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {notification.seen ? "read" : "unread"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
