export interface Notification {
  id: string;
  userId: string;
  title: string;
  type: string;
  message: string;
  createdAt: string;
  seen: boolean;
  read: boolean;
}




export interface NotificationSlice{
  isLoading: boolean;
}
