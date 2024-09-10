import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


interface TokenInterface {
  role: string;
}

export default withAuth(
  function middleware(req: NextRequest) {
    const token = req.nextauth.token as TokenInterface | undefined;

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
