import Link from 'next/link';
import { useEffect } from 'react';
import { Bell } from 'lucide-react';
import useNotificationsStore from 'store/notification/useNotificationStore';

const Notifications = () => {
  const notifications = useNotificationsStore((state) => state.notifications);
  const fetchNotifications = useNotificationsStore((state) => state.fetchNotifications);

  // Count only unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <Link href="/account?section=notifications">
      <div className="item flex items-center mr-5 relative cursor-pointer">
        <div className="p-2 rounded-md transition-all duration-300 hover:bg-gray-200">
          <Bell className="icon text-2xl" />
        </div>

        <div className="counter w-[15px] h-[15px] bg-red-500 rounded-full text-white flex items-center justify-center text-[10px] font-bold absolute right-1 bottom-6">
          {unreadCount || 0}
        </div>
      </div>
    </Link>
  );
};

export default Notifications;
