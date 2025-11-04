// createAuthActions.ts

import { StateCreator } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../lib/axios';
// import { setIsLoggingOut } from '../../lib/axios';
import { useAuthStore } from './useAuthStore';
import { useCartStore } from 'store/cart/useCartStore';
import { AxiosError } from 'axios';
import { persist } from 'zustand/middleware';
import {
  AuthSlice,
  AuthActions,
  SignupPayload,
  LoginPayload,
  VerifyEmailPayload,
  ResetPasswordPayload,
  UpdateProfilePayload,
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
    set({ isCheckingAuth: true });
    try {
      console.log('👀 hitting /auth/check');
      const res = await axiosInstance.get('/auth/check');
      console.log('✅ got response');
      set({ authUser: res.data });
    } catch (err) {
      console.log('❌ error or timeout', err);
      set({ authUser: null });
    } finally {
      console.log('🔚 setting isCheckingAuth=false');
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
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return {
        success: false,
        message: error?.response?.data?.error || 'Signup failed',
      };
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: LoginPayload) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', data, { withCredentials: true });

      const token = res.data.accessToken;
      console.log('token from backend', token);

      // ✅ Clear persisted auth storage first
      // Clear persisted auth storage first
      await Promise.resolve(useAuthStore.persist?.clearStorage?.());


      set({
        authUser: res.data.user,
        accessToken: token,
        isLoggedOut: false,       // ✅ clear the logged out flag
        logoutReason: undefined, 
      });

      
      // Save in memory (Zustand)
      // set({ accessToken: token, authUser: res.data.user });

      // Sync local cart with backend
      const cart = useCartStore.getState();
      await cart.mergeCart();

      toast.success('Logged in successfully');
      return true;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      console.log(error.response?.data?.error || 'Login failed');
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },


  // login: async (data: LoginPayload) => {
  //   set({ isLoggingIn: true });
  //   try {
  //     const res = await axiosInstance.post('/auth/login', data, { withCredentials: true });
      
  //     const token = res.data.accessToken;
  //     console.log('token from backend', token)
      
  //     // Set axios default headers for future requests
  //     axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
  //     // get().setAccessToken(token);
  //     set({ authUser: res.data.user });

  //     // Sync local cart with backend
  //     const cart = useCartStore.getState();
  //     await cart.mergeCart();

  //     toast.success('Logged in successfully');
  //     return true
  //   } catch (err) {
  //     const error = err as AxiosError<{ error: string }>;
  //     console.log(error.response?.data?.error || 'Login failed');
  //     return false
  //   } finally {
  //     set({ isLoggingIn: false });
  //   }
  // },


  logout: async (reason: "manual" | "auto" = "manual") => {
    console.log('trying to logout');
    const method = get().authUser?.authProvider;

    try {
      if (method === 'google') {
        await axiosInstance.get('/auth/google/logout');
      } else {
        await axiosInstance.post('/auth/logout');
      }

      delete axiosInstance.defaults.headers.common['Authorization'];

      set({
        accessToken: null,
        authUser: null,
        isCheckingAuth: false,
        isLoggedOut: true,        // ✅ mark logged out
        logoutReason: reason,     // ✅ store the reason
      });

      console.log('isLoggedOut after set:', get().isLoggedOut);

      if (reason === 'manual') {
        toast.success('Logged out successfully');
      }
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      if (reason === 'manual') {
        toast.error(error.response?.data?.error || 'Logout failed');
      }
    } finally {
      set({ isLoggedOut: true });
      console.log('logged out');
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
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error || 'Verification failed');
      return false;
    } finally {
      set({ isVerifyingEmail: false });
    }
  },

  updateProfile: async (data: UpdateProfilePayload) => {
    console.log("Updating profile picture...");
    set({ isUpdatingProfile: true });

    try {
      const formData = new FormData();
      formData.append("profilePic", data.profilePic);

      const res = await axiosInstance.post("/auth/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      set({ authUser: res.data });
      toast.success("Profile updated successfully!");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      console.error("Update failed:", error);
      toast.error(error.response?.data?.error || "Update failed");
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
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error || 'Reset request failed');
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
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error || 'Reset failed');
      return false;
    } finally {
      set({ isResettingPassword: false });
    }
  },

  refreshAccessToken: async () => {
    if (!useAuthStore.getState().authUser) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🚫 No authenticated user, skipping token refresh.');
      }
      return null;
    }

    console.log('🔄 Starting token refresh...');
    try {
      const res = await axiosInstance.get('/auth/refresh', {
        withCredentials: true,
      });

      const newAccessToken = res.data.accessToken;
      console.log('✅ Token refreshed successfully:', newAccessToken);

      useAuthStore.getState().setAccessToken(newAccessToken);
      console.log('🧠 Stored new access token in Zustand');

      return newAccessToken;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      console.error('❌ Failed to refresh access token:', error?.response?.data || error.message);
      throw error;
    }
  },



  
  getAuthMethod: () => get().authUser?.authProvider || '',
  getRole: () => get().authUser?.role || 'guest',
});
