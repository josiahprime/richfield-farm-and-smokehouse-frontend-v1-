"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "store/auth/useAuthStore";
import DotLoader from "./ui/DotLoader";

interface Props {
  children: React.ReactNode;
  requiredRoles?: string[]; // optional roles, e.g., ["admin", "user"]
}

export default function ProtectedRoute({
  children,
  requiredRoles = [], // empty means any authenticated user
}: Props) {
  const router = useRouter();
  const authUser = useAuthStore((state) => state.authUser);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isHydrated) setIsLoading(false);
  }, [isHydrated]);

  if (isLoading) {
    return (
      <DotLoader/>
    );
  }

  if (!authUser) {
    router.replace("/login");
    return null;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(authUser.role?.toLowerCase())) {
    router.replace("/unauthorized");
    return null;
  }

  return <>{children}</>;
}

