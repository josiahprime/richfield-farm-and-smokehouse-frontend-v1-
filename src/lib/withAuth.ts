// src/lib/withAuth.ts
import axiosInstance from "./axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface AuthOptions {
  allowedRoles?: string[];
}

export async function withAuth<T>(
  fetcher: () => Promise<T>,
  options: AuthOptions = {}
): Promise<T> {
  try {
    // Await cookies before using them
    const cookieStore = await cookies(); 

    const jwt = cookieStore.get("jwt")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    // Forward cookies to backend
    const res = await axiosInstance.get("/auth/verify", {
      headers: {
        Cookie: `jwt=${jwt || ""}; refreshToken=${refreshToken || ""}`,
      },
      withCredentials: true,
    });

    const { valid, user } = res.data;

    if (!valid || !user) {
      console.warn("❌ Invalid session, redirecting to /login");
      redirect("/login");
    }

    if (
      options.allowedRoles?.length &&
      !options.allowedRoles.includes(user.role.toLowerCase())
    ) {
      console.warn("🚫 Role not allowed:", user.role);
      redirect("/unauthorized");
    }

    return await fetcher();
  } catch (err) {
    console.error("💥 Auth check failed:", err);
    redirect("/login");
  }
}
