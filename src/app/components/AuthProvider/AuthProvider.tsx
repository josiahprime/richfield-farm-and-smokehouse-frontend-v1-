// components/AuthWrapper.tsx
'use client';

import { useEffect } from 'react';
import { useAuthStore } from 'store/auth/useAuthStore';

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const checkAuth = useAuthStore(state => state.checkAuth);
  const isCheckingAuth = useAuthStore(state => (state.isCheckingAuth))

  

  useEffect(() => {
    console.log('checking auth')
    checkAuth();
  }, []);

  console.log('is checking auth state',isCheckingAuth)


  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return <>{children}</>;
};
