"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  Package,
  MessageSquare,
  Star,
  Ticket,
  Heart,
  Users,
  Clock,
  Settings,
  CreditCard,
  MapPin,
  Mail,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ProfileSection } from "app/(public)/account/page";
import { useAuthStore } from "store/auth/useAuthStore";

interface ProfileSidebarMobileProps {
  activeSection: ProfileSection;
  onSectionChange: (section: ProfileSection) => void;
}

export function ProfileSidebarMobile({ activeSection, onSectionChange }: ProfileSidebarMobileProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const authUser = useAuthStore((state) => state.authUser);
  const logout = useAuthStore((state) => state.logout);
  const firstName = authUser?.username?.split(" ")[0];
  const lastName = authUser?.username?.split(" ")[1]?.charAt(0)?.toUpperCase() || "";

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await logout();
    router.push("/");
  };

  const menuItems = [
    { id: "account" as ProfileSection, label: "My Account", icon: User },
    { id: "orders" as ProfileSection, label: "Orders", icon: Package },
    { id: "notifications" as ProfileSection, label: "Notifications", icon: MessageSquare },
    { id: "reviews" as ProfileSection, label: "Pending Reviews", icon: Star },
    { id: "voucher" as ProfileSection, label: "Voucher", icon: Ticket },
    { id: "wishlist" as ProfileSection, label: "Wishlist", icon: Heart },
    { id: "sellers" as ProfileSection, label: "Followed Sellers", icon: Users },
    { id: "recent" as ProfileSection, label: "Recently Viewed", icon: Clock },
    { id: "management" as ProfileSection, label: "Account Management", icon: Settings },
    { id: "payment" as ProfileSection, label: "Payment Settings", icon: CreditCard },
    { id: "address" as ProfileSection, label: "Address Book", icon: MapPin },
    { id: "newsletter" as ProfileSection, label: "Newsletter Preferences", icon: Mail },
  ];

  return (
    <div className="md:hidden">
      {/* Header with hamburger */}
      <div className="w-full bg-gradient-to-r from-green-600 to-emerald-700 py-3 px-4 flex items-center justify-between mb-4">
        <button onClick={() => setIsOpen(true)} className="text-white hover:bg-green-700 transition rounded-lg p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/80 z-40"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-gray-50 z-50 p-4 shadow-2xl overflow-y-auto rounded-tr-3xl rounded-br-3xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Welcome</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-red-500">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Green Card */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg p-4 shadow-md overflow-hidden">
                <h2 className="text-lg font-semibold">Welcome to Richfield Farm</h2>
                <p className="text-xs opacity-90 mt-1">Fresh produce delivered from local farms to your doorstep.</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-md flex items-center justify-center text-lg font-semibold">
                    {firstName?.[0]}
                    {lastName}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{authUser?.username}</div>
                    <div className="text-xs opacity-90">{authUser?.email}</div>
                  </div>
                </div>
              </div>

              {/* Quick Buttons */}
              <div className="mt-4 grid grid-cols-4 gap-3">
                {[
                  { key: "recent", label: "Recently Viewed", Icon: Clock },
                  { key: "wishlist", label: "Wishlist", Icon: Heart },
                  { key: "voucher", label: "Voucher", Icon: Ticket },
                  { key: "sellers", label: "Followed Sellers", Icon: Users },
                ].map((it) => (
                  <button
                    key={it.key}
                    onClick={() => {
                      onSectionChange(it.key as ProfileSection);
                      setIsOpen(false);
                    }}
                    className={`bg-white rounded-lg p-3 flex flex-col items-center justify-center text-gray-700 shadow-sm ${
                      activeSection === it.key ? 'ring-2 ring-green-600' : ''
                    }`}
                  >
                    <it.Icon className="w-5 h-5" />
                    <span className="text-[10px] mt-1 text-center leading-tight">{it.label}</span>
                  </button>
                ))}
              </div>

              {/* Section Title */}
              <div className="mt-5 text-gray-600 text-sm">My Jumia Account</div>

              {/* Menu List */}
              <div className="mt-2 bg-white rounded-lg divide-y border border-gray-100 shadow-sm overflow-hidden">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSectionChange(item.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-gray-50 ${
                        isActive ? 'bg-green-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-md bg-gray-50">
                        <IconComponent className={`w-5 h-5 ${isActive ? 'text-green-700' : 'text-gray-700'}`} />
                      </div>
                      <div className="flex-1 text-sm font-medium text-gray-800">{item.label}</div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  );
                })}
              </div>

              {/* Logout */}
              <div className="mt-8 pt-6 border-t border-green-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 py-3 px-4 rounded-xl transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}