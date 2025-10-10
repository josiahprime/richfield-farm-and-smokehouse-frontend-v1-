import { axiosInstance } from 'lib/axios';
import socket from '../../lib/socket'
import { Notification } from "./notificationTypes";

export const fetchNotifications = async (): Promise<Notification[]> => {
  const res = await axiosInstance.get("/notifications/get-notifications");
  return res.data;
};

export const connectNotificationSocket = (
  userId: string,
  onNotification: (notification: Notification) => void
) => {
  if (!socket.connected) {
    socket.connect();
  }

  socket.emit("join", userId);
  socket.on("newNotification", onNotification);

  return () => {
    socket.off("newNotification", onNotification);
    socket.disconnect();
  };
};
