import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { NextRequestWithAuth } from "next-auth/middleware";
export default withAuth(function middleware(req: NextRequestWithAuth) {
  const token = req.nextauth?.token;

  if (!token) {
    console.log("hello");
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    return NextResponse.next();
  }
});
export const config = {
  matcher: [
    "/api/admin/:path*",
    "/api/user/:path*",
    "/admin/:path*",
    "/checkout",
    "/dashboard/:path*",
  ],
};
