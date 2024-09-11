import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { NextRequestWithAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';


interface TokenInterface {
  role: string;
}

export default withAuth(
  function middleware(req: NextRequest) {
    const token = req.nextauth.token as TokenInterface | undefined;

    console.log(token);

    try {
      jwt.verify(token as unknown as string, process.env.JWT_SECRET as string);
    } catch (err) {
      console.error('JWT verification failed', err);
      return NextResponse.redirect(new URL('/signin', req.url));
    }

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
