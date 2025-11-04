"use client";

import { Toaster } from "react-hot-toast";
import { AuthWrapper } from "app/components/AuthProvider/AuthProvider";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import DashboardGuard from "./components/DashboardGuard/DashboardGuard";


interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" reverseOrder={false} />
        <AuthWrapper>
          <DashboardGuard>
            <Sidebar />
            <div className="flex-1 w-full min-h-screen overflow-y-auto">
              <Navbar />
              <div className="p-6 bg-gray-50 min-h-screen ml-40">
                {children}
              </div>
            </div>
          </DashboardGuard>
        </AuthWrapper>
      </body>
    </html>
  );
}
