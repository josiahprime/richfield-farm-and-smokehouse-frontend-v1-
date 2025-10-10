import { create } from "zustand";
import { axiosInstance } from "../../lib/axios";
import { Notification } from "./notificationTypes";
import { fetchNotifications, connectNotificationSocket } from "./createNotificationActions";

interface NotificationStore {
  notifications: Notification[];
  isLoading: boolean; // ✅ add this
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  fetchNotifications: () => Promise<void>;
  connectSocket: (userId: string) => () => void;
  markAsRead: (id: string) => Promise<boolean>;
  markAllAsSeen: (id: string) => Promise<boolean>;
  unreadCount: () => number;
}

const useNotificationsStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  isLoading: false, // ✅ initialize here

  setNotifications: (notifications) => set({ notifications }),

  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),

  fetchNotifications: async () => {
    try {
      set({ isLoading: true }); // ✅ start loading
      const data = await fetchNotifications();
      set({ notifications: data });
    } catch (err) {
      console.error("❌ Failed to fetch notifications:", err);
    } finally {
      set({ isLoading: false }); // ✅ end loading
    }
  },

   markAsRead: async (id) => {
    try {
      const res = await axiosInstance.patch(`/notifications/${id}/read`);

      if (res.data.success) {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        }));
        return true;
      }

    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
    return false; 
  },
  
  markAllAsSeen: async () => {
    try {
      const res = await axiosInstance.patch('/notifications/seen');

      if (res.data.success) {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.seen ? n : { ...n, seen: true }
          ),
        }));
        return true
      } else {
        console.error('Failed to mark as seen');
      }
    } catch (err) {
      console.error('Error marking notifications as seen:', err);
    }
    return false; 
  },



  unreadCount: () => {
    return get().notifications.filter((n) => !n.read).length;
  },

  connectSocket: (userId) => {
    const handler = (notification: Notification) => {
      get().addNotification(notification);
      console.log("🔔 New notification received:", notification);
    };

    return connectNotificationSocket(userId, handler);
  },
}));

export default useNotificationsStore;
