import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { NextRequestWithAuth } from "next-auth/middleware";
export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth?.token;

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    else if (token.role === "Admin") {
      return NextResponse.next();
  
    }
    else if (token.role === "User" && (req.nextUrl.pathname.startsWith('/api/user') || req.nextUrl.pathname.startsWith('/checkout') || req.nextUrl.pathname.startsWith('/profile'))) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', req.url));
  },
);
export const config = {
  matcher: ['/api/admin/:path*', '/api/user/:path*', '/admin/:path*', '/checkout', '/profile'],
};