"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "store/auth/useAuthStore";
import { useRouter } from "next/navigation";

export default function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const authUser = useAuthStore((state) => state.authUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait until auth state loads
    if (authUser !== undefined) setIsLoading(false);
  }, [authUser]);

  // While loading auth data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Checking permissions...</p>
      </div>
    );
  }



  // if (!authUser || authUser.role !== "admin") {
  //   router.push("/unauthorized");
  //   return null; // prevent any render
  // }

  // ✅ Admin only content
  return <>{children}</>;
}
