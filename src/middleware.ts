// src/middleware.ts
// src/middleware.ts
import { jwtVerify } from 'jose'
import axios from 'axios'
import { NextResponse, type NextRequest } from 'next/server'

type VerifyResult =
  | { valid: true; payload: Record<string, any> }
  | { valid: false; reason: 'expired' | 'invalid' }

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'

async function verifyAccessToken(token: string): Promise<VerifyResult> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  try {
    const { payload } = await jwtVerify(token, secret)
    return { valid: true, payload: payload as Record<string, any> }
  } catch (err: any) {
    if (err.code === 'ERR_JWT_EXPIRED') {
      return { valid: false, reason: 'expired' }
    }
    return { valid: false, reason: 'invalid' }
  }
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const path = url.pathname

  // 1) Only protect these routes:
  const protectedRoutes = ['/dashboard', '/cart/checkout', '/notifications', '/settings']
  const isProtected = protectedRoutes.some(route => path.startsWith(route))
  if (!isProtected) return NextResponse.next()

  // 2) Pull the access token (if any)
  const accessToken = req.cookies.get('jwt')?.value

  // 3) Attempt to verify if we have a token
  let validPayload: Record<string, any> | null = null
  if (accessToken) {
    const result = await verifyAccessToken(accessToken)
    if (result.valid) {
      validPayload = result.payload
    } else if (result.reason !== 'expired') {
      // invalid for any reason other than expiration → force login
      return NextResponse.redirect(new URL('/login', req.url))
    }
    // if expired, fall through to refresh below
  }

  // 4) If no token at all or it was expired, try silent refresh
  if (!validPayload) {
    try {
      const refreshRes = await axios.get(`${BACKEND}/api/auth/refresh`, {
        withCredentials: true,
        headers: { Cookie: req.headers.get('cookie') || '' },
      })
      const newToken = refreshRes.data.accessToken

      // issue new cookie and continue
      const response = NextResponse.next()
      response.cookies.set({
        name: 'jwt',
        value: newToken,
        maxAge: 15 * 60,                // 15 minutes in seconds
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV !== 'development',
        path: '/',
      })
      // re-verify so we can get payload for role-check below
      const { payload } = await jwtVerify(
        newToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      )
      validPayload = payload as Record<string, any>
      return response

    } catch (err) {
      // refresh failed → force login
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // 5) At this point we have a validPayload—enforce any role restrictions
  const roleMap: Record<string, string> = { '/dashboard': 'admin' }
  const requiredRole = Object.entries(roleMap).find(([route]) =>
    path.startsWith(route)
  )?.[1]
  if (requiredRole && validPayload.role !== requiredRole) {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  // 6) All good: let the request through
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/cart/checkout/:path*',
    '/notifications/:path*',
    '/settings/:path*',
  ],
  runtime: 'nodejs',
}

// import { jwtVerify } from 'jose'
// import axios from 'axios'
// import { NextResponse, type NextRequest } from 'next/server'

// type VerifyResult =
//   | { valid: true; payload: { userId: string; role: string; [k: string]: any } }
//   | { valid: false; reason: 'expired' | 'invalid' }

// /** 
//  * Returns `{ valid: true, payload }` if token unexpired,
//  * or `{ valid: false, reason: ... }` if expired/invalid 
//  */
// const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
// async function verifyAccessToken(token: string): Promise<VerifyResult> {
  
//   const secret = new TextEncoder().encode(process.env.JWT_SECRET)
//   try {
//     const { payload } = await jwtVerify(token, secret)
//     console.log('JWT payload:', payload)
//     return { valid: true, payload: payload as any }
//   } catch (err: any) {
//     console.error('verifyAccessToken error:', err)
//     if (err.code === 'ERR_JWT_EXPIRED') {
//       return { valid: false, reason: 'expired' }
//     }
//     return { valid: false, reason: 'invalid' }
//   }
// }

// export async function middleware(req: NextRequest) {
//   console.log('Reached middleware for:', req.nextUrl.pathname)
//   const accessToken = req.cookies.get('jwt')?.value
//   const currentPath = req.nextUrl.pathname

//   // your protected routes
//   const protectedRoutes = [
//     '/dashboard',
//     '/cart/checkout',
//     '/notifications',
//     '/settings',
//   ]
//   // role requirements per-route
//   const roleProtectedRoutes: Record<string, 'admin' | 'customer' | 'moderator'> = {
//     '/dashboard': 'admin',
//   }

//   // only run on matching routes
//   const isProtected = protectedRoutes.some(route => currentPath.startsWith(route))
//   if (!isProtected) {
//     return NextResponse.next()
//   }

//   // no access token → redirect to login
//   if (!accessToken) {
//     console.log('no access token found')
//     return NextResponse.redirect(new URL('/login', req.url))
//   }

//   const result = await verifyAccessToken(accessToken)

//   if (result.valid) {
//     // token is good → check roles
//     const requiredRole = Object.entries(roleProtectedRoutes).find(([route]) =>
//       currentPath.startsWith(route)
//     )?.[1]
//     if (requiredRole && result.payload.role !== requiredRole) {
//       return NextResponse.redirect(new URL('/unauthorized', req.url))
//     }
//     return NextResponse.next()
//   }

//   if (result.reason === 'expired') {
//     console.log('🔄 Trying to refresh token')

//     try {
//       const refreshRes = await axios.get(`${backendBaseUrl}/api/auth/refresh`, {
//         withCredentials: true,
//         headers: {
//           Cookie: req.headers.get('cookie') || '',
//         },
//       });

//       const newToken = refreshRes.data.accessToken;
//       console.log('📡 Refresh response status:', refreshRes.status, refreshRes.statusText);

//       const response = NextResponse.next();
//       response.cookies.set({
//         name: 'jwt',
//         value: newToken,
//         maxAge: 15 * 60, // 15 minutes in seconds
//         httpOnly: true,
//         sameSite: 'lax',
//         secure: process.env.NODE_ENV !== 'development',
//         path: '/',
//       });

//       return response;
//     } catch (err: any) {
//       console.error('❌ Failed to refresh token:', err.response?.status, err.response?.data || err.message);
//       return NextResponse.redirect(new URL('/login', req.url));
//     }

//   }



//   // invalid token (malformed, signature mismatch, etc.)
//   return NextResponse.redirect(new URL('/login', req.url))
// }

// export const config = {
//   matcher: [
//     '/dashboard/:path*',
//     '/cart/checkout/:path*',
//     '/notifications/:path*',
//     '/settings/:path*',
//   ],
//   runtime: 'nodejs', 
// }

// import { jwtVerify } from 'jose';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// async function verifyJWT(token: string) {
//   const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//   try {
//     const { payload } = await jwtVerify(token, secret);
//     console.log('JWT payload:', payload);
//     return payload;
//   } catch (err) {
//     console.error('Invalid token:', err);
//     return null;
//   }
// }

// export async function middleware(req: NextRequest) {
//   console.log('we reached here');
//   const token = req.cookies.get('jwt')?.value;
//   const currentPath = req.nextUrl.pathname;

//   const protectedRoutes = ['/dashboard', '/cart/checkout', '/notifications', '/settings'];
//   const roleProtectedRoutes: { [key: string]: 'admin' | 'customer' | 'moderator' } = {
//     '/dashboard': 'admin',
//   };

//   const isProtected = protectedRoutes.some(route => currentPath.startsWith(route));

//   if (isProtected) {
//     if (!token) {
//       return NextResponse.redirect(new URL('/login', req.url));
//     }

//     const payload = await verifyJWT(token);
//     if (!payload) {
//       return NextResponse.redirect(new URL('/login', req.url));
//     }

//     const requiredRole = Object.entries(roleProtectedRoutes).find(([route]) =>
//       currentPath.startsWith(route)
//     )?.[1];

//     if (requiredRole && payload.role !== requiredRole) {
//       return NextResponse.redirect(new URL('/unauthorized', req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/dashboard/:path*',
//     '/cart/checkout/:path*',
//     '/notifications/:path*',
//     '/settings/:path*'
//   ],
// };

// meme coin landing page figma template
