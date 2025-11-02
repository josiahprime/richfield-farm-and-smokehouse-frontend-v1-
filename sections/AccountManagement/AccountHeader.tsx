"use client";


export const AccountHeader = () => {
  return (
    <header className="mb-10">

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
