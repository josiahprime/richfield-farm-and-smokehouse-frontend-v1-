import {
  User,
  MapPin,
  CreditCard,
  Mail,
  Edit,
  Shield,
  Star,
  Gift,
} from "lucide-react";
import { useAuthStore } from "store/auth/useAuthStore";
import Button from "app/components/Button/Button";
import Image from "next/image";

export function AccountOverview() {
  const authUser = useAuthStore((state) => state.authUser);
  const firstName = authUser?.username?.split(" ")[0] || "Guest";

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      

      <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-700 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:gap-5 text-white shadow-sm">
        {/* Avatar */}
        <div className="flex justify-center sm:justify-start mb-4 sm:mb-0">
          {authUser?.profilePic ? (
            <div className="relative w-20 h-20 sm:w-16 sm:h-16">
              <Image
                src={authUser.profilePic}
                alt="Profile"
                fill
                sizes="80px"
                className="rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>
          ) : (
            <div className="w-20 h-20 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center shadow-inner border border-white/30">
              <User className="w-8 h-8 sm:w-7 sm:h-7 text-white/90" />
            </div>
          )}
        </div>

        {/* Text */}
        <div className="text-center sm:text-left">
          <h1 className="text-lg sm:text-2xl font-semibold">
            Hi, {firstName}
          </h1>
          <p className="text-[13px] sm:text-base text-white/80 mt-1 sm:mt-0">
            Stay connected and track your activities effortlessly.
          </p>
        </div>
      </div>



      {/* 🔹 Redesigned Quick Stats */}
      <div className="mt-5 grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-3">
        {[
          { key: "status", label: "Status", Icon: Shield, color: "green", value: "Verified" },
          { key: "member", label: "Member", Icon: Star, color: "yellow", value: "2023" },
          { key: "orders", label: "Orders", Icon: Gift, color: "blue", value: "12" },
          { key: "points", label: "Points", Icon: User, color: "purple", value: "540" },
        ].map((it) => (
          <div
            key={it.key}
            className="bg-white rounded-xl p-3 flex flex-col items-center justify-center text-gray-700 shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
          >
            <div className={`p-2 rounded-full bg-${it.color}-50 mb-1`}>
              <it.Icon className={`w-5 h-5 text-${it.color}-600`} />
            </div>
            <span className="text-[11px] text-center leading-tight font-medium text-gray-500">
              {it.label}
            </span>
            <span className="text-[12px] font-semibold text-gray-800">{it.value}</span>
          </div>
        ))}
      </div>



      {/* Account Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Details */}
        <div className="rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-gray-100">
          <div className="flex items-center gap-3 bg-blue-50 px-6 py-4 rounded-t-2xl">
            <User className="text-blue-600" />
            <h3 className="font-semibold text-blue-700 text-lg">Account Details</h3>
          </div>
          <div className="p-6 space-y-3">
            <div>
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="font-semibold text-gray-900">{authUser?.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email Address</p>
              <p className="text-gray-700 text-sm">{authUser?.email}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Details
            </Button>
          </div>
        </div>

        {/* Default Address */}
        <div className="rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-gray-100">
          <div className="flex items-center gap-3 bg-green-50 px-6 py-4 rounded-t-2xl">
            <MapPin className="text-green-600" />
            <h3 className="font-semibold text-green-700 text-lg">Default Address</h3>
          </div>
          <div className="p-6">
            <p className="font-semibold text-gray-900 mb-1">{authUser?.username}</p>
            <p className="text-gray-700 text-sm">
              Chukuku opposite lea primary school
            </p>
            <p className="text-gray-700 text-sm">
              GWAGWALADA, Federal Capital Territory
            </p>
            <p className="text-green-600 font-medium text-sm mt-1">
              +234 8128102408
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 border-green-200 text-green-600 hover:bg-green-50"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Address
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Credit */}
        <div className="rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-gray-100">
          <div className="flex items-center gap-3 bg-yellow-50 px-6 py-4 rounded-t-2xl">
            <CreditCard className="text-yellow-600" />
            <h3 className="font-semibold text-yellow-700 text-lg">Store Credit</h3>
          </div>
          <div className="p-6 text-center">
            <p className="text-sm text-gray-500 mb-1">Your current balance</p>
            <p className="text-3xl font-bold text-yellow-600">₦ 0</p>
            <p className="text-xs text-gray-500 mt-2">
              Earn credits with every purchase!
            </p>
          </div>
        </div>

        {/* Communications */}
        <div className="rounded-2xl bg-white shadow-sm hover:shadow-md transition-all border border-gray-100">
          <div className="flex items-center gap-3 bg-purple-50 px-6 py-4 rounded-t-2xl">
            <Mail className="text-purple-600" />
            <h3 className="font-semibold text-purple-700 text-lg">
              Communications
            </h3>
          </div>
          <div className="p-6">
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Stay updated with the latest fresh produce offers, seasonal specials,
              and farming tips.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Edit className="w-4 h-4 mr-2" />
              Manage Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
