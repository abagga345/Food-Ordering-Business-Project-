"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { MdBorderColor } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { MdAnalytics } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";
import { MdRateReview } from "react-icons/md";

import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { IoHome } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "./Components";
import { IoIosSettings } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { FaCartArrowDown } from "react-icons/fa";

const navItems = [
  { href: "/", label: "Home", icon: IoHome },
  { href: "/dashboard/allorders", label: "All Orders", icon: MdBorderColor },
  {
    href: "/dashboard/pendingorders",
    label: "Pending Orders",
    icon: MdPendingActions,
  },
  { href: "/dashboard/analytics", label: "Analytics", icon: MdAnalytics },
  { href: "/dashboard/additem", label: "Add Item", icon: MdAdd },
  { href: "/dashboard/profile", label: "My Profile", icon: ImProfile },
  { href: "/dashboard/settings", label: "Settings", icon: IoIosSettings },

  { href: "/dashboard/menu", label: "Menu", icon: MdOutlineMenuBook },
  { href: "/dashboard/addReviews", label: "Add Reviews", icon: MdRateReview },
  { href: "/dashboard/myOrders", label: "My Orders", icon: FaCartArrowDown },
];

const SidePanel = () => {
  const [confirmationModal, setConfirmationModal] = useState(null);
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
    <div className="w-64 bg-green-200 text-black h-full px-6 py-8 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          <MdDashboard className="inline" /> Dashboard
        </h2>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-row gap-2 items-center px-4 py-2 mb-2 rounded hover:bg-green-300 ${
                  pathname === item.href ? "bg-green-300" : ""
                }`}
              >
                <Icon className="mr-2" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-row gap-2 items-center px-4 py-2 mb-2 hover:bg-green-300 rounded">
        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: handleLogout,
              btn2Handler: () => setConfirmationModal(null),
            })
          }
        >
          <div className="flex items-center gap-x-2">
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </div>
        </button>
        {/* <button onClick={handleLogout}>Log Out </button> */}
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default SidePanel;
