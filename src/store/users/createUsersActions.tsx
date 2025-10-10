import { StateCreator } from "zustand";
import { UserSlice, UserActions } from "./usersTypes";
import toast from 'react-hot-toast';
import { axiosInstance } from '../../lib/axios';

export const createUsersActions: StateCreator<
  UserSlice & UserActions,
  [],
  [],
  UserSlice & UserActions
> = (set, get) => ({
  users: [],
  currentUser: null,
  isLoading: false,
  error: null,
  success: false,

  fetchCurrentUser: async () => {
    const res = await axiosInstance.get('/users/current-user');
    const data = res.data; // ✅
    set({ currentUser: data });
  },

  fetchUsers: async () => {
    set({ isLoading: true, error: null, success: false });
    try {
      const res = await axiosInstance.get('/users/fetch-users');
      set({ users: res.data, isLoading: false, success: true });
      toast.success('Users fetched successfully');
    } catch (err) {
      console.error('Failed to fetch users:', err);
      set({ isLoading: false, error: 'Failed to fetch users' });
      toast.error('Failed to fetch users');
    }
  },

  updateUserRole: async (userId, newRole) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.patch(`/users/${userId}/role`, {
        role: newRole,
      });

      const updatedUser = res.data;

      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? updatedUser : user
        ),
        isLoading: false,
      }));

      toast.success(`User role updated to ${newRole}`);
    } catch (err: any) {
      console.error('Role update failed:', err);
      set({ isLoading: false, error: 'Failed to update role' });
      toast.error('Failed to update user role');
    }
  },

  promoteToAdmin: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.patch(`/users/${userId}/promote`, {
        role: 'admin',
      });
      const updatedUser = res.data;
      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? updatedUser : user
        ),
        isLoading: false,
        success: true,
      }));
      toast.success('User promoted to admin');
    } catch (err) {
      console.error('Promotion failed:', err);
      set({ isLoading: false, error: 'Failed to promote user' });
      toast.error('Failed to promote user');
    }
  },

  promoteToModerator: async (userId:string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.patch(`/users/${userId}/promote`, {
        role: 'moderator',
      });
      const updatedUser = res.data;
      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? updatedUser : user
        ),
        isLoading: false,
        success: true,
      }));
      toast.success('User promoted to admin');
    } catch (err) {
      console.error('Promotion failed:', err);
      set({ isLoading: false, error: 'Failed to promote user' });
      toast.error('Failed to promote user');
    }
  },

  demoteToCustomer: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.patch(`/users/${userId}/demote`, {
        role: 'user',
      });
      const updatedUser = res.data;
      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? updatedUser : user
        ),
        isLoading: false,
        success: true,
      }));
      toast.success('User demoted to regular user');
    } catch (err) {
      console.error('Demotion failed:', err);
      set({ isLoading: false, error: 'Failed to demote user' });
      toast.error('Failed to demote user');
    }
  },

  banUser: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.patch(`/users/${userId}/ban`);
      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
        isLoading: false,
        success: true,
      }));
      toast.success('User banned successfully');
    } catch (err) {
      console.error('Failed to ban user:', err);
      set({ isLoading: false, error: 'Failed to ban user' });
      toast.error('Failed to ban user');
    }
  },
});
