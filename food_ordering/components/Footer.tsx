"use client";
import { usePathname } from "next/navigation";
export default function Footer() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  return (
    !isDashboard && (
      <footer>
        <div className="flex gap-36 p-16 bg-green-200">
          <ul className="text-lg">
            <li className="text-3xl font-bold mb-5">Get in Touch</li>
            <li className="font-semibold mb-3">Manufacturing Address:</li>
            <p className="w-64 text-gray-700 mb-4">
              Shop No, 6675, Khari Baoli Rd, Fatehpuri, Chandni Chowk, New
              Delhi, Delhi, 110006
            </p>

            <li className="font-semibold mb-4">Store Hours</li>
            <li className="text-gray-700">Monday to Saturday</li>
            <li className="mb-4 text-gray-700">10 AM to 6 PM</li>
            <li className="mb-4 text-gray-700">+91-9810148950</li>
            <li className="mb-4 text-gray-700">+91-9910913737</li>
            <li className="text-gray-700">
              Email: achar6ranga.query@gmail.com
            </li>
          </ul>
          <ul className="text-lg">
            <li className="text-3xl font-bold mb-5">Policies</li>
            <li className="text-gray-700 mb-2">
              <a className="hover-underline-thin" href="#">
                Privacy Policy
              </a>
            </li>
            <li className="text-gray-700 mb-2">
              <a className="hover-underline-thin" href="#">
                Terms of service
              </a>
            </li>
            <li className="text-gray-700">
              <a className="hover-underline-thin" href="#">
                Return Policy
              </a>
            </li>
          </ul>
          <ul className="text-lg">
            <li className="text-3xl font-bold mb-5">Shop Pickles</li>
            <li className="text-gray-700 mb-2">
              <a className="hover-underline-thin" href="#">
                Try Sample Packs
              </a>
            </li>
            <li className="text-gray-700 mb-2">
              <a className="hover-underline-thin" href="#">
                15% OFF Combo
              </a>
            </li>
            <li className="text-gray-700 mb-2">
              <a className="hover-underline-thin" href="#">
                Mango Pickles
              </a>
            </li>
            <li className="text-gray-700 mb-2">
              <a className="hover-underline-thin" href="#">
                Mixed Pickles
              </a>
            </li>
            <li className="text-gray-700 mb-2">
              <a className="hover-underline-thin" href="#">
                Spicy Pickles
              </a>
            </li>
            <li className="text-gray-700 mb-2">
              <a className="hover-underline-thin" href="#">
                Sweet Pickles
              </a>
            </li>
            <li className="text-gray-700">
              <a className="hover-underline-thin" href="#">
                All Products
              </a>
            </li>
          </ul>
          <ul className="text-lg">
            <li className="text-3xl font-bold mb-5">Useful Links</li>
            <li className="text-gray-700 mb-2">
              <a className="hover-underline-thin" href="/account">
                Track Order
              </a>
            </li>
            <li className="text-gray-700">
              <a className="hover-underline-thin" href="/aboutus">
                About Achar6ranga
              </a>
            </li>
          </ul>
        </div>
      </footer>
    )
  );
}
