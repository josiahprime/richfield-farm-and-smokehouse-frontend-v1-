import { create } from 'zustand';
import { AuthState, AuthSlice } from './types';
import { createAuthActions } from './createAuthActions';

export const useAuthStore = create<AuthState & AuthSlice>()((set, get, store) => ({
  // ✅ Initial state
  authUser: null,
  accessToken: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isLoggingIn: false,
  isVerifyingEmail: false,
  isUpdatingProfile: false,
  isRequestingReset: false,
  isResettingPassword: false,
  isLoading: false,

  // ✅ Auth actions
  ...createAuthActions(set, get, store),
}));
