import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar - Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content - Should Scroll */}
      <div className="flex-1 w-full min-h-screen overflow-y-auto">
        <Navbar />
        <div className="p-6 bg-gray-50 min-h-screen ml-40">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
