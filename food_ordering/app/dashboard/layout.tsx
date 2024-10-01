"use client";
import React from "react";
import SidePanel from "@/components/SidePanel";
import { SessionProvider } from "next-auth/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <div className="flex h-screen">
        <SidePanel />
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">{children}</div>
      </div>
    </SessionProvider>
  );
};

export default DashboardLayout;
