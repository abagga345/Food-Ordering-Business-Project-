import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


interface TokenInterface {
  role: string;
}

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;

    console.log(token);

    if (token?.role === "admin") {
      return NextResponse.next();
    }

    if (token?.role === "user" && req.nextUrl.pathname.startsWith('/api/admin')) {
      return NextResponse.rewrite(new URL('/api/user', req.url));
    }

    return NextResponse.next(); 
  },
);

export const config = {
  matcher: ['/api/admin/:path*', '/api/user/:path*', '/admin/:path*', '/checkout', '/profile'],
};

