import { NEXTAUTH_CONFIG  } from "@/app/lib/auth";
import NextAuth from "next-auth"
const handler=NextAuth(NEXTAUTH_CONFIG)
export const GET=handler; 
export const POST=handler; 
