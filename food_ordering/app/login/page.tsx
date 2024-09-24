"use client";
import { signIn } from "next-auth/react";
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
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      // Redirect to a different page after successful sign-in
      window.location.href = "/dashboard"; // Change to your desired path
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center my-10">
        <div className="text-3xl font-bold mb-24">Log In</div>
        <div className="flex flex-row gap-10 justify-between items-center w-[40%] mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-2 rounded"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 rounded"
            />
            {error && <div className="text-red-500">{error}</div>}
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded font-semibold"
            >
              Sign In
            </button>
          </form>
          <div className="w-[40%]">
            <p className="text-lg font-bold">New Customer</p>
            <p className="my-4">
              Sign up for early Sale access plus tailored new arrivals, trends
              and promotions. To opt out, click unsubscribe in our emails.
            </p>
            <Link
              href="/signin"
              className="bg-blue-500 text-white p-2 rounded font-semibold my-6"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
