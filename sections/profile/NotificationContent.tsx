"use client";

import {
  Bell,
  BellOff,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Clock,
  Leaf,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import useNotificationsStore from "store/notification/useNotificationStore";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import Button from "app/components/Button/Button";

const notificationIconMap = {
  order: { icon: Package, color: "text-orange-600", bgColor: "bg-orange-100" },
  delivered: { icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-100" },
  shipping: { icon: Truck, color: "text-blue-600", bgColor: "bg-blue-100" },
  promotion: { icon: Leaf, color: "text-emerald-600", bgColor: "bg-emerald-100" },
  alert: { icon: AlertCircle, color: "text-red-600", bgColor: "bg-red-100" },
  review: { icon: Star, color: "text-yellow-600", bgColor: "bg-yellow-100" },
  default: { icon: Bell, color: "text-gray-600", bgColor: "bg-gray-100" },
};

export function NotificationsContent() {
  const [visibleCount, setVisibleCount] = useState(10);
  const searchParams = useSearchParams();
  const currentSection = searchParams.get("section");
  const router = useRouter();

  const notifications = useNotificationsStore((state) => state.notifications);
  const fetchNotifications = useNotificationsStore((state) => state.fetchNotifications);
  const markAsRead = useNotificationsStore((state) => state.markAsRead);
  const markAllAsSeen = useNotificationsStore((state) => state.markAllAsSeen);
  const isLoading = useNotificationsStore((state) => state.isLoading);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    markAllAsSeen();
  }, []);

  const unreadCount = notifications.filter((n) => !n.seen).length;
  const visibleNotifications = notifications.slice(0, visibleCount);

  const handleNotificationClick = async (notificationId: string) => {
    const notification = notifications.find((n) => n.id === notificationId);
    if (notification && !notification.read) {
      const success = await markAsRead(notificationId);
      if (!success) {
        toast.error("Failed to mark notification as read.");
        return;
      }
    }
    router.push(`/account?section=${currentSection}&id=${notification?.id}`);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-2xl">
            <Bell className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
            <p className="text-gray-600 text-sm">
              Stay updated with your orders and farm news
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <div className="px-4 py-1 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-full text-sm font-semibold shadow-md">
            {unreadCount} Unread
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Button
          variant="outline"
          size="sm"
          className="border-green-300 text-green-600 hover:bg-green-50"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Mark All as Read
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-green-300 text-green-600 hover:bg-green-50"
        >
          Filter by Orders
        </Button>
      </div>

      {/* Notification List */}
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
          <BellOff className="w-16 h-16 mb-4 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            You're All Caught Up!
          </h3>
          <p className="text-sm max-w-sm">
            You don’t have any notifications right now. We'll keep you updated
            when something comes up.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {visibleNotifications.map((notification) => {
            const {
              icon: IconComponent,
              color,
              bgColor,
            } =
              notificationIconMap[notification.type] ||
              notificationIconMap.default;

            return (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification.id)}
                className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent hover:border-green-200 hover:shadow-md transform hover:scale-[1.01] ${
                  !notification.seen
                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500"
                    : "bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-2xl ${bgColor} flex-shrink-0 shadow-inner`}
                  >
                    <IconComponent className={`w-5 h-5 ${color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4
                        className={`font-semibold text-gray-900 text-sm ${
                          !notification.seen ? "text-green-800" : ""
                        }`}
                      >
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {notification.message}
                    </p>
                    <p className="text-green-600 text-xs mt-1 font-medium">
                      Click to read more...
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Load More */}
      {visibleCount < notifications.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
