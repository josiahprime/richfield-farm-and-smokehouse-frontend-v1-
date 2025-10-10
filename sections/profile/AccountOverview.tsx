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

export function AccountOverview() {
  const authUser = useAuthStore((state) => state.authUser);
  const firstName = authUser?.username?.split(" ")[0] || "Guest";

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="rounded-2xl bg-gradient-to-r from-green-50 to-emerald-100 p-6 flex items-center gap-5 shadow-sm border border-emerald-100">
        <div className="relative">
          {authUser?.profilePic ? (
            <img
              src={authUser.profilePic}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-inner border border-gray-100">
              <User className="w-7 h-7 text-gray-500" />
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {firstName}
          </h1>
          <p className="text-gray-600 text-sm">
            Manage your Farm Fresh account easily.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            icon: <Shield className="text-green-600 w-6 h-6" />,
            label: "Status",
            value: "Verified",
            color: "green",
          },
          {
            icon: <Star className="text-yellow-600 w-6 h-6" />,
            label: "Member Since",
            value: "2023",
            color: "yellow",
          },
          {
            icon: <Gift className="text-blue-600 w-6 h-6" />,
            label: "Total Orders",
            value: "12",
            color: "blue",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`p-5 rounded-2xl bg-white border-l-4 border-${item.color}-500 shadow-sm hover:shadow-md transition-all duration-300`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-xl bg-${item.color}-50`}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="font-semibold text-gray-800">{item.value}</p>
              </div>
            </div>
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
              <p className="font-semibold text-gray-900">{authUser?.name}</p>
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
            <p className="font-semibold text-gray-900 mb-1">{authUser?.name}</p>
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
