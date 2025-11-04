// hooks/useAuthGuard.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from 'store/auth/useAuthStore';

export const useAuthGuard = (requiredRoles: string[] = []) => {
  const router = useRouter();
  const { authUser, accessToken } = useAuthStore();

  useEffect(() => {
    if (!authUser || !accessToken) {
      router.replace('/login'); // not logged in
      return;
    }

    if (!requiredRoles.includes(authUser.role.toLowerCase())) {
      router.replace('/unauthorized'); // wrong role
    }
  }, [authUser, accessToken, router, requiredRoles]);
};
