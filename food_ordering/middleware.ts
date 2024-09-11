import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { NextRequestWithAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';


interface TokenInterface {
  role: string;
}

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth?.token;

    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    console.log(token);

    if (token.role === "admin" && req.nextUrl.pathname.startsWith('/api/admin')) {
      return NextResponse.next();
    }

    if (token.role === "user" && req.nextUrl.pathname.startsWith('/api/user')) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/signin', req.url));
  },
);

export const config = {
  matcher: ['/api/admin/:path*', '/api/user/:path*', '/admin/:path*', '/checkout', '/profile'],
};