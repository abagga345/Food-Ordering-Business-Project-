"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

{
  /* <button
  onClick={() => {
    signIn();
  }}
>
  Sign In
</button>; */
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try{
      const result = await axios.post("http://localhost:3000/api/signUp",{
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password,
        contactNo:contactNumber
      })
      window.location.href = "/dashboard";
  }
  catch(err){
    if (axios.isAxiosError(err)) {
      if (err.response){
        setError(err.response.data.message);
      }
      else{
        setError("Unknown Error");
      }
    }
    else{
      setError("Unknown error");
    }
  }

    
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center my-10 mb-32 w-[60%] mx-auto">
        <div className="text-3xl font-bold mb-16">Register</div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[40%]">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            className="border p-2 rounded"
          />
          {error && <div className="text-red-500">{error}</div>}
          <p className="font-semibold text-[#666666]">
            Sign up for early Sale access plus tailored new arrivals, trends and
            promotions. To opt out, click unsubscribe in our emails.
          </p>
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded font-semibold hover:scale-105 hover:bg-green-700"
          >
            Sign Up
          </button>
          <Link
            href="/login"
            className="text-black p-2 rounded font-semibold hover:scale-105 hover:bg-green-700 border-solid border-green-600 border-2 text-center hover:text-white"
          >
            Log In
          </Link>
        </form>
      </div>
    </div>
  );
}
