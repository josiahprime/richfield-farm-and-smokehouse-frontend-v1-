"use client";

import { X } from "lucide-react";
import { useUiStore } from "store/ui/useUiStore";
import { NavLinks } from "./NavLinks";

const MobileSidebar = () => {
  const isSidebarOpen = useUiStore((s) => s.isSidebarOpen);
  const closeSidebar = useUiStore((s) => s.closeSidebar);

  return (
    <aside
      className={`fixed top-[80px] left-0 h-[calc(100vh-80px)] w-2/3 min-w-[260px] bg-white shadow-xl z-[100] p-6 rounded-tr-2xl rounded-br-2xl transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:hidden`}
    >
      {/* Close Button */}
      <button
        onClick={closeSidebar}
        className="absolute top-4 right-4 text-gray-800 hover:text-red-500"
      >
        <X className="w-6 h-6" />
      </button>

      <nav className="mt-10 space-y-3">
        <NavLinks onClick={closeSidebar} />
      </nav>
    </aside>
  );
};

export default MobileSidebar;
