export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  status: string;
  authProvider: string;
  profilePic: string;
  createdAt: string;
}

export interface UserSlice {
  users: User[];
  isLoading: boolean;
  error: string | null;
  success: boolean;
  currentUser: User | null;
}

export interface UserActions {
  fetchUsers: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  promoteToAdmin: (id: string) => Promise<void>;
  promoteToModerator: (id: string) => Promise<void>;
  demoteToCustomer: (id: string) => Promise<void>;
  updateUserRole: (id: string, role: string) => Promise<void>;
  banUser: (id: string) => Promise<void>;
}

export type UserState = UserSlice & UserActions;
