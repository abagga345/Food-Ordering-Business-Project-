"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import {
  MdBorderColor,
  MdPendingActions,
  MdAnalytics,
  MdAdd,
  MdOutlineMenuBook,
  MdRateReview,
} from "react-icons/md";
import toast from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";
import { IoHome } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { ImProfile } from "react-icons/im";
import { FaCartArrowDown } from "react-icons/fa";
import ConfirmationModal from "./Components";
import Loader from "./Loader";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

const navItems = [
  { href: "/", label: "Home", icon: IoHome, role: "All" },
  {
    href: "/dashboard/allorders",
    label: "All Orders",
    icon: MdBorderColor,
    role: "Admin",
  },
  {
    href: "/dashboard/pendingorders",
    label: "Pending Orders",
    icon: MdPendingActions,
    role: "Admin",
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: MdAnalytics,
    role: "Admin",
  },
  { href: "/dashboard/additem", label: "Add Item", icon: MdAdd, role: "Admin" },
  {
    href: "/dashboard/profile",
    label: "My Profile",
    icon: ImProfile,
    role: "All",
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: IoIosSettings,
    role: "All",
  },
  {
    href: "/dashboard/menu",
    label: "Menu",
    icon: MdOutlineMenuBook,
    role: "Admin",
  },
  {
    href: "/dashboard/addReviews",
    label: "Add Reviews",
    icon: MdRateReview,
    role: "All",
  },
  {
    href: "/dashboard/myOrders",
    label: "My Orders",
    icon: FaCartArrowDown,
    role: "All",
  },
];

const SidePanel = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(true);
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
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setRole(session.user?.role);
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [window.innerWidth]);

  return (
    <>
      {/* Toggle Button for Small Screens */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 text-white bg-green-500 rounded"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <GiHamburgerMenu /> : <IoCloseOutline />}
      </button>

      <div
        className={` h-full bg-green-200 text-black px-6 py-8 flex flex-col justify-between transition-all duration-300 
        ${isCollapsed ? "hidden lg:flex w-64" : "w-full fixed z-40"}`}
      >
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            <MdDashboard className="inline" /> Dashboard
          </h2>
          <nav>
            {loading ? (
              <Loader />
            ) : (
              navItems.map((item) => {
                const Icon = item.icon;
                return (
                  (item.role === role || item.role === "All") && (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex flex-row gap-2 items-center px-4 py-2 mb-2 rounded hover:bg-green-300 ${
                        pathname === item.href ? "bg-green-300" : ""
                      }`}
                      onClick={() => {
                        setIsCollapsed(true);
                      }}
                    >
                      <Icon className="mr-2" />
                      {item.label}
                    </Link>
                  )
                );
              })
            )}
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
        </div>
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>

      {/* Overlay for when the menu is open on smaller screens */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        ></div>
      )}
    </>
  );
};

export default SidePanel;
