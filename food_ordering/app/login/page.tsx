"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6; // Example: password must be at least 6 characters long
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    // Email validation
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    // Password validation
    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    }

    if (!isValid) return;

    const toastId = toast.loading("Loading...");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    toast.dismiss(toastId);
    if (result?.error) {
      toast.error("Login Failed");
      setError(result.error);
    } else {
      toast.success("Login Successful");
      // Redirect to a different page after successful sign-in
      window.location.href = "/dashboard"; // Change to your desired path
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center mt-10 mb-32">
        <div className="text-3xl font-bold mb-24">Log In</div>
        <div className="flex flex-row gap-10 justify-between items-center w-[60%] mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[40%]">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-3 rounded mb-2"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-3 rounded mb-4"
            />
            {error && <div className="text-red-500">{error}</div>}
            <button
              type="submit"
              className="bg-green-600 text-white p-3 rounded font-semibold hover:bg-green-700"
            >
              Sign In
            </button>
          </form>
          <div className="border-solid border-l-2 w-1 h-24"></div>
          <div className="w-[40%]">
            <p className="text-xl font-bold">New Customer</p>
            <p className="mt-4 mb-8 text-lg">
              Sign up for early Sale access plus tailored new arrivals, trends
              and promotions. To opt out, click unsubscribe in our emails.
            </p>
            <Link
              href="/signup"
              className="bg-green-600 text-white px-6 py-3 rounded font-semibold my-6 hover:bg-green-700"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
