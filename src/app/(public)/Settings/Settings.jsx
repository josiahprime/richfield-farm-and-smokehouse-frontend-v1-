import { useState } from 'react';
import { FaMoon, FaLock, FaUser, FaBell, FaLanguage } from 'react-icons/fa';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  return (
    <div className="min-h-screen bg-[#f0f0f3] dark:bg-[#1f1f1f] text-gray-800 dark:text-white p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: Preferences */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold mb-2">Preferences</h2>

          {/* Toggle Dark Mode */}
          <div className="flex items-center justify-between p-5 bg-[#e0e0e0] dark:bg-gray-800 rounded-xl shadow-inner">
            <div className="flex items-center gap-3">
              <FaMoon className="text-xl" />
              <span className="font-medium">Dark Mode</span>
            </div>
            <div className="relative w-12 h-6 bg-[#d1d9e6] dark:bg-gray-700 rounded-full shadow-inner">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white dark:bg-gray-600 rounded-full shadow-md transition-all duration-300 peer-checked:translate-x-6" />
            </div>
          </div>

          {/* Language Selector */}
          <div className="p-5 bg-[#e0e0e0] dark:bg-gray-800 rounded-xl shadow-inner space-y-3">
            <div className="flex items-center gap-3 mb-1">
              <FaLanguage className="text-xl" />
              <h3 className="font-semibold text-lg">Language</h3>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-[#f0f0f3] dark:bg-gray-700 text-gray-800 dark:text-white shadow-inner focus:outline-none"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
        </div>

        {/* RIGHT: Account Settings */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold mb-2">Account Settings</h2>

          {/* Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <FaUser />
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-xl bg-[#e0e0e0] dark:bg-gray-800 shadow-inner text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <FaUser />
              Email Address
            </label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-2 rounded-xl bg-[#e0e0e0] dark:bg-gray-800 shadow-inner text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <FaLock />
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-xl bg-[#e0e0e0] dark:bg-gray-800 shadow-inner text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-5 bg-[#e0e0e0] dark:bg-gray-800 rounded-xl shadow-inner">
            <div className="flex items-center gap-3">
              <FaBell className="text-xl" />
              <span className="font-medium">Receive Email Notifications</span>
            </div>
            <div className="relative w-12 h-6 bg-[#d1d9e6] dark:bg-gray-700 rounded-full shadow-inner">
              <input
                type="checkbox"
                className="sr-only peer"
                defaultChecked
              />
              <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white dark:bg-gray-600 rounded-full shadow-md transition-all duration-300 peer-checked:translate-x-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
