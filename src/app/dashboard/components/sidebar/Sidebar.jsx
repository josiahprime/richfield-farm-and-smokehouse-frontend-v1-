"use client";

import Link from "next/link";
import {
  Home, User, ShoppingCart, CreditCard, Truck, Store, BarChart2, 
  Settings, LogOut, Bell, UserCircle, Tag, Percent
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="flex flex-col bg-white shadow-lg w-40 p-2 h-screen fixed left-0 top-12">
      {/* Logo */}
      <div className="flex items-center justify-center mb-2">
        <Link href="/" className="uppercase text-xl font-bold">
          Rich<span className="text-green-500">Field</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="pl-2 flex-grow">
        <ul className="list-none m-0 p-0 space-y-1">
          <SidebarSection title="MAIN" />
          <SidebarItem to="/dashboard" icon={<Home size={18} />} label="Dashboard" />

          <SidebarSection title="LISTS" />
          <SidebarItem to="/dashboard/users" icon={<User size={18} />} label="Users" />
          <SidebarItem to="/dashboard/products" icon={<Store size={18} />} label="Products" />
          <SidebarItem to="/dashboard/orders" icon={<CreditCard size={18} />} label="Orders" />
          <SidebarItem to="/dashboard/delivery" icon={<Truck size={18} />} label="Delivery" />
          <SidebarItem to="/dashboard/discounts" icon={<Tag size={18} />} label="Discounts" /> {/* ✅ new */}

          <SidebarSection title="USEFUL" />
          <SidebarItem to="/dashboard/stats" icon={<BarChart2 size={18} />} label="Stats" />
          <SidebarItem to="/dashboard/notifications" icon={<Bell size={18} />} label="Notifications" />

          <SidebarSection title="SERVICE" />
          <SidebarItem to="/dashboard/system-health" icon={<Settings size={18} />} label="System Health" />
          <SidebarItem to="/dashboard/logs" icon={<Percent size={18} />} label="Logs" /> {/* alternative icon */}
          <SidebarItem to="/dashboard/settings" icon={<Settings size={18} />} label="Settings" />

          <SidebarSection title="USER" />
          <SidebarItem to="/dashboard/profile" icon={<UserCircle size={18} />} label="Profile" />
          <SidebarItem to="/dashboard/logout" icon={<LogOut size={18} />} label="Logout" />
        </ul>

        {/* Dark Mode Toggle */}
        <div className="flex items-center p-2 mt-4">
          <div
            className="w-5 h-5 rounded-sm border border-indigo-600 cursor-pointer bg-gray-200"
            onClick={() => dispatch({ type: "LIGHT" })}
          ></div>
          <div
            className="w-5 h-5 rounded-sm border border-indigo-600 cursor-pointer mx-1 bg-gray-800"
            onClick={() => dispatch({ type: "DARK" })}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ to, icon, label }) => (
  <Link href={to} className="flex items-center p-1 cursor-pointer hover:bg-indigo-50 rounded-md">
    <span className="text-green-500 text-lg">{icon}</span>
    <span className="ml-2 text-sm font-semibold text-gray-700">{label}</span>
  </Link>
);

// Sidebar Section Title
const SidebarSection = ({ title }) => (
  <p className="text-xs font-bold text-gray-500 mt-1 mb-1">{title}</p>
);

export default Sidebar;
