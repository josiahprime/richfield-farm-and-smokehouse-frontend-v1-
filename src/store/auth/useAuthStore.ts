import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from './types';
import { createAuthActions } from './createAuthActions';


export const useAuthStore = create<AuthState>()(
  persist(
    (set, get, store) => ({
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
      isHydrated: false,
      isLoggedOut: false,
      ...createAuthActions(set, get, store),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        authUser: state.authUser,
        isLoggedOut: state.isLoggedOut,
        logoutReason: state.logoutReason,
      }),
      onRehydrateStorage: () => (state) => {
        console.log('🌀 Auth store rehydrated');
        if (state) state.isHydrated = true;
      },
    }
  )
);
