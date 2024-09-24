"use client"
import { signIn, signOut } from "next-auth/react";
export default function Home() {
  return (
    <div>
      <div>
        <button className="font-bold mx-2 hover-underline-animation" onClick={()=>{signIn()}}>Sign In</button>
        <button className="font-bold mx-2 hover-underline-animation" onClick={()=>{signOut()}}>Sign Out</button>
      </div>
    </div>
  );
}
