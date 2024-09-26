"use Client";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

import logo from "../assets/logoMain.jpg";

import { Toaster } from "react-hot-toast";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: "300" });

export const metadata: Metadata = {
  title: "Gandhi Achaar 6 ranga",
  description: "Gandhi Achaar website customised to sell world class achaars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={logo.src}></link>
      </head>
      <body>
        <div className={poppins.className}>
          <Navbar />
          <Toaster />
          {children}

          <Footer />
        </div>
      </body>
    </html>
  );
}
