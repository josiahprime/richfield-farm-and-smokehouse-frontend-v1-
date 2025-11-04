// src/app/api/verify/route.ts
import { NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";

  // ✅ Extract only the jwt cookie (the access token)
  const jwtCookie = cookieHeader
    .split(";")
    .find(c => c.trim().startsWith("jwt="));

  if (!jwtCookie) {
    console.warn("🚫 No jwt cookie found in request");
  }

  try {
    const res = await fetch(`${BACKEND}/api/auth/verify`, {
      method: "GET",
      headers: {
        // ✅ Forward only the jwt cookie
        cookie: jwtCookie || "",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log("📬 Response from backend /verify:", data);
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("💥 Failed to verify:", err);
    return NextResponse.json(
      { valid: false, reason: "network", message: "Verification failed" },
      { status: 500 }
    );
  }
}
