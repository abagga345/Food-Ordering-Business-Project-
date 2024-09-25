import React from "react";
import SidePanel from "@/components/SidePanel";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <SidePanel />
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">{children}</div>
    </div>
  );
};

export default DashboardLayout;
