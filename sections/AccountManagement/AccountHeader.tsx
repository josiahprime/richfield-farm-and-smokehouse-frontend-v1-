"use client";
import { ArrowLeft } from "lucide-react";

interface AccountHeaderProps {
  onBack: () => void;
}

export const AccountHeader = ({ onBack }: AccountHeaderProps) => {
  return (
    <header className="mb-10">
      {/* Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="bg-white border border-green-200 text-green-700 rounded-xl p-3 flex items-center justify-center 
            hover:bg-green-50 hover:border-green-300 hover:text-green-800 
            active:scale-95 transition-all shadow-md shadow-green-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
        Account Management
      </h1>
      <p className="text-gray-600 mt-2">
        Manage your profile, password, addresses, and account preferences.
      </p>

      {/* Underline accent */}
      <div className="mt-3 w-24 h-[4px] bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-sm shadow-green-300" />
    </header>
  );
};
