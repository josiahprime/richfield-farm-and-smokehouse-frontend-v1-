"use client";
import { useState } from "react";
import { Lock, Key, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import useAccountStore from "store/account/useAccountStore";

export const PasswordCard = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const updatePassword = useAccountStore((state) => state.updatePassword);

  const handleUpdatePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords don't match!");
      return;
    }

    if (passwords.new.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    try {
      await updatePassword(passwords.current, passwords.new);
      toast.success("Password updated successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to update password!");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-green-100">
      {/* HEADER */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-2xl">
          <ShieldCheck className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Password Management</h2>
          <p className="text-gray-600">Update your account password securely</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* INPUTS */}
        {[
          { id: "current", label: "Current Password", icon: Lock },
          { id: "new", label: "New Password", icon: Key },
          { id: "confirm", label: "Confirm New Password", icon: Key },
        ].map((field) => (
          <div key={field.id} className="group">
            <label
              htmlFor={field.id}
              className="block text-sm font-semibold text-green-600 mb-2"
            >
              {field.label}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <field.icon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                id={field.id}
                type={showPassword[field.id as keyof typeof showPassword] ? "text" : "password"}
                value={passwords[field.id as keyof typeof passwords]}
                onChange={(e) =>
                  setPasswords({ ...passwords, [field.id]: e.target.value })
                }
                className="w-full pl-12 pr-12 py-4 border border-green-300 rounded-xl bg-green-100 
                  focus:outline-none focus:ring-2 focus:border-green-600 focus:ring-green-100 
                  placeholder-gray-500 text-gray-900 transition-all"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    [field.id]: !prev[field.id as keyof typeof showPassword],
                  }))
                }
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-green-600 transition-colors"
              >
                {showPassword[field.id as keyof typeof showPassword] ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        ))}

        {/* BUTTON */}
        <button
          onClick={handleUpdatePassword}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold 
            hover:shadow-lg transform hover:scale-[1.02]
            transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Key className="w-5 h-5" />
          Update Password
        </button>
      </div>

      {/* TOASTER */}
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </div>
  );
};
