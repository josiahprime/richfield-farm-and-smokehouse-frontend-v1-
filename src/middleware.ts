// src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';


console.log("🌍 NODE_ENV:", process.env.NODE_ENV);
console.log("🔗 BACKEND base URL:", BACKEND);

const protectedRoutes = [
  { path: '/dashboard', roles: ['admin', 'user'] },
  { path: '/account', roles: ['user', 'admin', 'customer'] },
  { path: '/cart/checkout', roles: ['customer', 'user'] },
  { path: '/notifications', roles: ['user', 'admin'] },
  { path: '/settings', roles: ['user', 'admin'] },
];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const matchedRoute = protectedRoutes.find(route => path.startsWith(route.path));
  if (!matchedRoute) return NextResponse.next();

  try {
    const verifyRes = await fetch(`${BACKEND}/api/auth/verify`, {
      method: 'GET',
      headers: {
        cookie: req.headers.get('cookie') || '',
      },
      credentials: 'include',
    });

    console.log(
      `[Next.js Middleware Handler] 🧭 verify URL: ${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify`
    );


    console.log("🔍 verifyRes.status:", verifyRes.status);

    // Attempt to parse JSON even if status is 401
    let data;
    try {
      data = await verifyRes.json();
      console.log("🧾 verify response JSON:", data);
    } catch (err) {
      console.error("❌ Failed to parse verify response:", err);
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const { valid, user, reason } = data || {};

    // Handle expired token: pass through and mark for frontend
    if (verifyRes.status === 401 && reason === 'expired') {
      const res = NextResponse.next();
      res.headers.set('x-token-expired', 'true');
      return res;
    }

    // Any other invalid response: kick out
    if (!verifyRes.ok || !valid) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Role-based authorization check
    const role = user?.role?.toLowerCase?.();
    if (!role || !matchedRoute.roles.includes(role)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    console.log('✅ Access granted to', path, 'for role', role);
    return NextResponse.next();
  } catch (err) {
    console.error('💥 Middleware auth check failed:', err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/account/:path*',
    '/cart/checkout/:path*',
    '/notifications/:path*',
    '/settings/:path*'
  ]
};

