"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdBorderColor } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard/allorders", label: "All Orders", icon: MdBorderColor },
  {
    href: "/dashboard/pendingorders",
    label: "Pending Orders",
    icon: MdPendingActions,
  },
  { href: "/dashboard/analytics", label: "Analytics", icon: MdAnalytics },
  { href: "/dashboard/additem", label: "Add Item", icon: MdAdd },
  { href: "/dashboard/menu", label: "Menu", icon: MdOutlineMenuBook },
  { href: "/dashboard/addReviews", label: "Add Reviews", icon: MdRateReview },
];

const SidePanel = () => {
  const pathname = usePathname();
  const handleLogout = async () => {
    const toastId = toast.loading("Loading...");
    try {
      await signOut();
      window.location.href = "/login";
      toast.dismiss(toastId);
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.dismiss(toastId);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-row gap-2 items-center px-4 py-2 mb-2 rounded hover:bg-gray-700 ${
                  pathname === item.href ? "bg-gray-700" : ""
                }`}
              >
                <Icon className="mr-2" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-row gap-2 items-center text-white px-4 py-2 mb-2 hover:bg-gray-700 rounded">
        <CiLogout />
        <button onClick={handleLogout}>Log Out </button>
      </div>
    </div>
  );
};

export default SidePanel;
