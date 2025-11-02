"use client";

import React, { useState, useRef } from "react";
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
  ArrowLeft,
  LogIn,
  Camera,
  Loader2,
} from "lucide-react";
import { AccountOverview } from "./AccountOverview";
import OrdersContent from "./OrdersContent";
import WishlistPage from "./Wishlist";
import AccountManagement from "../AccountManagement/AccountManagementDetail";
import NotificationDetail from "../NotificationDetail/NotificationDetail";
import { NotificationsContent } from "./NotificationContent";
import { useAuthStore } from "store/auth/useAuthStore";
import { useSearchParams } from "next/navigation";
import PendingReviews from "./PendingReviews";
import VoucherPage from "./VoucherPage";
import PaymentSettingsPage from "./PaymentSettingsPage";
import NewsletterPreferencesPage from "./NewsletterPreferencesPage";
import Sellers from "./Sellers";
import Address from "./Address";
import RecentlyViewed from "./RecentlyViewed";

type ProfileSection =
  | "account"
  | "orders"
  | "notifications"
  | "reviews"
  | "voucher"
  | "wishlist"
  | "sellers"
  | "recent"
  | "management"
  | "payment"
  | "address"
  | "newsletter";

const menuItems: { id: ProfileSection; label: string; icon: any }[] = [
  { id: "account", label: "My Account", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "notifications", label: "Notifications", icon: MessageSquare },
  { id: "management", label: "Account Management", icon: Settings },
   { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "reviews", label: "Pending Reviews", icon: Star },
  { id: "voucher", label: "Voucher", icon: Ticket },
  { id: "sellers", label: "Followed Sellers", icon: Users },
  { id: "recent", label: "Recently Viewed", icon: Clock },
  { id: "payment", label: "Payment Settings", icon: CreditCard },
  { id: "address", label: "Address Book", icon: MapPin },
  { id: "newsletter", label: "Newsletter Preferences", icon: Mail },
];

export default function ProfileMobile() {
  const authUser = useAuthStore((state) => state.authUser);
  const searchParams = useSearchParams()
  const notificationId = searchParams.get("id")
  const updateProfilePic = useAuthStore((state) => state.updateProfile);
  const isLoading = useAuthStore((state) => state.isUpdatingProfile);
  const [activeSection, setActiveSection] = useState<ProfileSection | null>(
    null
  );
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePicChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await updateProfilePic({ profilePic: file });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const renderContent = () => {
    switch (activeSection) {
      case "account":
        return <AccountOverview />;
      case "orders":
        return <OrdersContent />;
      case "wishlist":
        return <WishlistPage />;
      case "management":
        return <AccountManagement />;

      case "reviews":
        return <PendingReviews />;

      case "voucher":
        return <VoucherPage/>;

      case "payment":
        return <PaymentSettingsPage/>;

      case "sellers":
        return <Sellers/>;

      case 'address':
        return <Address/>

      case 'recent':
        return <RecentlyViewed/>

      case "newsletter":
        return <NewsletterPreferencesPage/>;

      case "notifications":
        return notificationId ? (
          <NotificationDetail notificationId = {notificationId}/>
        ) : (
          <NotificationsContent />
        )

      default:
        return (
          <div className="rounded-lg border bg-white text-gray-800 shadow-sm p-6 mt-4">
            <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
            <p className="text-gray-600 text-sm">
              This section is under development.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-md mx-auto">
        {!activeSection ? (
          <>
            {/* Header */}
            <div className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-2xl p-5 shadow-md flex flex-col items-center text-center sm:flex-row sm:text-left sm:gap-5 sm:items-center">
              {/* Back Button */}
              <button
                onClick={() => router.back()}
                className="absolute left-4 top-4 flex items-center gap-2 px-3 py-2 
                          bg-white/10 backdrop-blur-md border border-white/20 
                          text-white rounded-full shadow-md hover:bg-white/20 
                          active:scale-95 transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline">Back</span>
              </button>


              {/* Profile Picture */}
              <div className="relative">
                {authUser?.profilePic ? (
                  <img
                    src={authUser.profilePic}
                    alt="Profile"
                    className="w-20 h-20 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center shadow-inner border border-white/30">
                    <User className="w-8 h-8 sm:w-7 sm:h-7 text-white/90" />
                  </div>
                )}

                {/* Camera Icon for Updating Profile */}
                <button
                  onClick={triggerFileInput}
                  disabled={isLoading}
                  className={`absolute bottom-0 right-0 p-2 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <Camera className="w-4 h-4 text-white" />
                  )}
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
              </div>

              {/* User Info */}
              <div className="mt-3 sm:mt-0">
                {authUser?.username ? (
                  <>
                    <h1 className="text-lg sm:text-2xl font-semibold">
                        Welcome back, {authUser.username.split(" ")[0]}
                    </h1>
                    <p className="text-sm text-white/85 mt-1">
                      Manage your Farm Fresh account easily
                    </p>
                  </>
                ) : (
                  <button className="mt-2 px-4 py-2 bg-white text-green-700 rounded-full text-sm font-medium shadow hover:bg-green-50 transition">
                    <LogIn className="inline w-4 h-4 mr-1" />
                    Log In
                  </button>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-5 grid grid-cols-4 gap-3">
              {[
                { key: "recent", label: "Recently Viewed", Icon: Clock },
                { key: "wishlist", label: "Wishlist", Icon: Heart },
                { key: "voucher", label: "Voucher", Icon: Ticket },
                { key: "sellers", label: "Sellers", Icon: Users },
              ].map((it) => (
                <button
                  key={it.key}
                  onClick={() => setActiveSection(it.key as ProfileSection)}
                  className="bg-white rounded-lg p-3 flex flex-col items-center justify-center text-gray-700 shadow-sm hover:bg-emerald-50 transition"
                >
                  <div className="p-1 rounded-full bg-gray-50 mb-1">
                    <it.Icon className="w-5 h-5 text-emerald-700" />
                  </div>
                  <span className="text-[10px] text-center leading-tight font-medium">
                    {it.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Menu */}
            <div className="mt-6 text-gray-600 text-sm font-medium">
              My Account
            </div>
            <div className="mt-2 bg-white rounded-xl divide-y divide-emerald-100 border border-emerald-100 shadow-sm overflow-hidden">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-emerald-50 transition"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-md bg-emerald-50">
                    <item.icon className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">
                      {item.label}
                    </div>
                  </div>
                  <div className="text-emerald-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Back Button */}
            <button
              onClick={() => setActiveSection(null)}
              className="inline-flex items-center gap-2 px-3 py-2 mb-4 rounded-full 
                        text-sm font-medium text-emerald-700 bg-emerald-50 
                        hover:bg-emerald-100 active:scale-95 transition-all duration-300
                        shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Menu</span>
            </button>


            {/* Dynamic Section Content */}
            {renderContent()}
          </>
        )}
      </div>
    </div>
  );
}
