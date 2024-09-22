"use client"
import { signIn, signOut } from "next-auth/react";
export default function Home() {
  return (
    <div>
      <div>
        <button onClick={()=>{signIn()}}>Sign In</button>
        <button onClick={()=>{signOut()}}>Sign Out</button>
      </div>
    </div>
  );
}
