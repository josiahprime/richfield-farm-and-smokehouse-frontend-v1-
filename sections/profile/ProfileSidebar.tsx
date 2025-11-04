'use client';

import { useRouter } from "next/navigation";
import {
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
import { ProfileSection } from "./MainProfilePage";
import { useAuthStore } from "store/auth/useAuthStore";

interface ProfileSidebarProps {
  activeSection: ProfileSection;
  onSectionChange: (section: ProfileSection) => void;
}

export function ProfileSidebar({ activeSection, onSectionChange }: ProfileSidebarProps) {
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
    { id: "wishlist" as ProfileSection, label: "Wishlist", icon: Heart },
    { id: "management" as ProfileSection, label: "Account Management", icon: Settings },
    
    { id: "reviews" as ProfileSection, label: "Pending Reviews", icon: Star },
    { id: "voucher" as ProfileSection, label: "Voucher", icon: Ticket },
    
    { id: "sellers" as ProfileSection, label: "Followed Sellers", icon: Users },
    { id: "recent" as ProfileSection, label: "Recently Viewed", icon: Clock },
    
    { id: "payment" as ProfileSection, label: "Payment Settings", icon: CreditCard },
    { id: "address" as ProfileSection, label: "Address Book", icon: MapPin },
    { id: "newsletter" as ProfileSection, label: "Newsletter Preferences", icon: Mail },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-2xl border border-green-100 w-full">
      {/* PROFILE HEADER */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center text-green-700 font-bold text-xl shadow-inner">
          {firstName?.[0]}
          {lastName}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{authUser?.username}</h2>
          <p className="text-sm text-gray-600">{authUser?.email}</p>
        </div>
      </div>

      {/* MENU ITEMS */}
      <div className="flex flex-col space-y-1">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSectionChange(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg scale-[1.02]"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? "text-white" : "text-green-600"}`} />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* LOGOUT */}
      <div className="mt-8 pt-6 border-t border-green-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 py-3 px-4 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
