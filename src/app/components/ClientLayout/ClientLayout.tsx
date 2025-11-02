// components/ClientLayout.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useAuthStore } from 'store/auth/useAuthStore';
import { Toaster } from 'react-hot-toast';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const checkAuth = useAuthStore(state => state.checkAuth);
  const isCheckingAuth = useAuthStore(state => state.isCheckingAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      {children}
      <Footer />
    </>
  );
}

