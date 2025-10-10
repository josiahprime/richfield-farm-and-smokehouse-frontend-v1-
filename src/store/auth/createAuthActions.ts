// createAuthActions.ts

import { StateCreator } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../lib/axios';
import { useAuthStore } from './useAuthStore';
import {
  AuthSlice,
  AuthActions,
  SignupPayload,
  LoginPayload,
  VerifyEmailPayload,
  UpdateProfilePayload,
  ResetPasswordPayload,
  AuthUser,
} from './types';

// ✅ Only return the actions here — not the state
export const createAuthActions: StateCreator<
  AuthSlice & AuthActions,
  [],
  [],
  AuthActions
> = (set, get) => ({

  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),

  setAuthUser: (user) => set({ authUser: user }),

  checkAuth: async () => {
    console.log('🔁 Starting auth check...');
    // set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get('/auth/check');
      console.log('✅ Auth success:', res.data);
      set({ authUser: res.data });
    } catch (err) {
      console.error('❌ Full error response:', err.response);
      // console.error('❌ Auth check failed:', err);
      set({ authUser: null });
    } finally {
      console.log('🔚 Auth check finished');
      set({ isCheckingAuth: false });
    }
  },


  signup: async (data: SignupPayload) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      return {
        success: true,
        message: res.data.message || 'User registered successfully. Check your email.',
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || 'Signup failed',
      };
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: LoginPayload) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', data);
      
      const token = res.data.accessToken;
      
      // Set axios default headers for future requests
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // get().setAccessToken(token);
      set({ authUser: res.data.user });

      toast.success('Logged in successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    console.log('trying to logout')
    const method = get().authUser?.authProvider;

    try {
      if (method === 'google') {
        await axiosInstance.get('/auth/google/logout');
      } else {
        await axiosInstance.post('/auth/logout');
      }

      // ✅ Clear axios headers
      delete axiosInstance.defaults.headers.common['Authorization'];
      console.log('axios instance default headers after delete',axiosInstance.defaults.headers.common)

      // ✅ Clear Zustand accessToken synchronously
      set({
        accessToken: null,
        authUser: null,
      });

      // ✅ Reset auth state
      set({ authUser: null, isCheckingAuth: false });

      // ✅ Clear persisted Zustand storage if you're using persist
       console.log('Access token after logout:', useAuthStore.getState().accessToken);
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  },



  fetchUser: async () => {
    try {
      const res = await axiosInstance.get('/auth/fetch');
      set({ authUser: res.data });
    } catch {
      set({ authUser: null });
    }
  },

  verifyEmail: async (data: VerifyEmailPayload) => {
    set({ isVerifyingEmail: true });
    try {
      const res = await axiosInstance.post('/auth/verify-email', data);
      toast.success(res.data.message || 'Email verified');
      set({ authUser: res.data });
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Verification failed');
      return false;
    } finally {
      set({ isVerifyingEmail: false });
    }
  },

  updateProfile: async (data: UpdateProfilePayload) => {
    console.log('updating profile pics')
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.post('/auth/update-profile', data);
      set({ authUser: res.data });
      toast.success('Profile updated');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  requestPasswordReset: async (email: string) => {
    if (!email) {
      toast.error('Email required');
      return
    }
    set({ isRequestingReset: true });
    try {
      const res = await axiosInstance.post('/auth/forgot-password', { email });
      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Reset request failed');
    } finally {
      set({ isRequestingReset: false });
    }
  },

  resetPassword: async (data: ResetPasswordPayload): Promise<boolean> => {
    set({ isResettingPassword: true });
    try {
      await axiosInstance.post('/auth/reset-password', data);
      toast.success('Password reset successfully');
      return true;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Reset failed');
      return false;
    } finally {
      set({ isResettingPassword: false });
    }
  },

  refreshAccessToken: async () => {
    console.log('🔄 Starting token refresh...');

    try {
      const res = await axiosInstance.get('/auth/refresh', {
        withCredentials: true, // Ensure cookies are sent
      });

      const newAccessToken = res.data.accessToken;
      console.log('✅ Token refreshed successfully:', newAccessToken);

      // Save to store
      useAuthStore.getState().setAccessToken(newAccessToken);
      console.log('🧠 Stored new access token in Zustand');

      return newAccessToken;
    } catch (error: any) {
      console.error('❌ Failed to refresh access token:', error?.response?.data || error.message);
      throw error;
    }
  },



  getAuthMethod: () => get().authUser?.authProvider || '',
  getRole: () => get().authUser?.role || 'guest',
});
