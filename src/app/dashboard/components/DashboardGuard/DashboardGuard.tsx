"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "store/auth/useAuthStore";

interface Props {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export default function DashboardGuard({
  children,
  requiredRoles = ["admin"],
}: Props) {
  const router = useRouter();
  const authUser = useAuthStore((state) => state.authUser);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        "🔹 DashboardGuard mounted, authUser:",
        authUser,
        "hydrated:",
        isHydrated
      );
    }

    if (isHydrated) {
      setIsLoading(false);

      if (process.env.NODE_ENV !== "production") {
        console.log("⏳ DashboardGuard finished loading authUser:", authUser);
      }
    }
  }, [authUser, isHydrated]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">
          Checking authentication...
        </p>
      </div>
    );
  }

  // const redirectWithDelay = (path: string) => {
  //   if (process.env.NODE_ENV !== "production") {
  //     console.log(`🛑 Dev redirect to ${path} in 10s for log reading`);
  //     setTimeout(() => router.replace(path), 10000);
  //   } else {
  //     router.replace(path);
  //   }
  // };

  if (!authUser) {
    if (process.env.NODE_ENV !== "production") {
      console.log("🚨 No authUser, redirecting to /login");
    }
    router.replace("/login");
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg animate-pulse">
          No user found. Redirecting to login...
        </p>
      </div>
    );
  }

  if (!requiredRoles.includes(authUser.role?.toLowerCase())) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`🚨 Unauthorized role "${authUser.role}", redirecting to /unauthorized`);
    }
    router.replace("/unauthorized");
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">Unauthorized role. Redirecting...</p>
      </div>
    );
  }

  if (process.env.NODE_ENV !== "production") {
    console.log(`✅ Authorized: role "${authUser.role}"`);
  }

  return <>{children}</>;
}
