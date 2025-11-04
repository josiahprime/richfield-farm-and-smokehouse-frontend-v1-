"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../AuthProvider";

export default function RoleGuard({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace("/login");
      else if (!allowedRoles.includes(user.role)) router.replace("/unauthorized");
    }
  }, [user, loading, router, allowedRoles]);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
}
