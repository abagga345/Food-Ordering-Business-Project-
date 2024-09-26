"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logoMain.jpg";

export default function Navbar() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  return (
    !isDashboard && (
      <div className="flex flex-row items-center py-4 px-8 w-[100%] mx-auto">
        <div className="flex flex-row gap-8 text-md w-[33.3%] ">
          <Link href="/" className="">
            <p className="hover-underline-animation font-semibold">
              All Products
            </p>
          </Link>
        </div>
        <div className="w-[33.3%] flex flex-row justify-center items-center">
          <Image src={logo} alt="logo" className="h-16 w-16 center"></Image>
        </div>
        {/* logo */}
        <div className=" w-[33.3%]">
          <div className="flex flex-row gap-1 justify-end items-center">
            <Link href="/dashboard" className="px-2 py-3.5">
              <span className="sf__tooltip-item block sf__tooltip-bottom sf__tooltip-style-2">
                <svg
                  className="w-[20px] h-[20px]"
                  fill="currentColor"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"></path>
                </svg>
              </span>
            </Link>
            <Link
              href="/checkout"
              className="relative py-2 sf-cart-icon px-2 whitespace-nowrap cursor-pointer cart-icon"
              aria-label="Shopping Cart"
            >
              <span className="sf__tooltip-item block sf__tooltip-bottom sf__tooltip-style-2">
                <svg
                  className="w-[20px] h-[20px]"
                  fill="currentColor"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M352 128C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 48c44.112 0 80 35.888 80 80H144c0-44.112 35.888-80 80-80zm176 384c0 17.645-14.355 32-32 32H80c-17.645 0-32-14.355-32-32V176h48v40c0 13.255 10.745 24 24 24s24-10.745 24-24v-40h160v40c0 13.255 10.745 24 24 24s24-10.745 24-24v-40h48v256z"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>{" "}
      </div>
    )
  );
}
