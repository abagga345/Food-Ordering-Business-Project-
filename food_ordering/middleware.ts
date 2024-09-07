export {default} from "next-auth/middleware"

export const config={ matcher:['/api/admin/:path*','/api/user/:path*','/admin/:path*','/checkout','/profile']}