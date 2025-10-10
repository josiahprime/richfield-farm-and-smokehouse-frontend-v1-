"use client"
import React, { useState } from 'react';
import { FaSun, FaMoon } from "react-icons/fa"; // Make sure to install react-icons

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [language, setLanguage] = useState('English');

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggle2FA = () => setIs2FAEnabled(!is2FAEnabled);

  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">
      <div className="px-6 py-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6 bg-white/50 dark:bg-gray-800/50 p-4 rounded-2xl shadow">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h2>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Manage your account preferences, appearance, and security.
            </p>
          </div>

          {/* Toggle Dark Mode Icon */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition shadow"
          >
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
      </div>



      {/* Account Section */}
      <section className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">My Account</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Username</label>
            <input
              type="text"
              value="Moqups"
              disabled
              className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 text-gray-700"
            />
          </div>
          <div className="flex items-end justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl">
              Edit
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">Email Address</label>
          <input
            type="email"
            value="contact@moqups.com"
            disabled
            className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">Role</label>
          <input
            type="text"
            value="Product Manager"
            disabled
            className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 text-gray-700"
          />
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl">
            Change Password
          </button>
        </div>
      </section>

      {/* 2FA Section */}
      <section className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Two-Factor Authentication</h3>
        <p className="text-gray-500 mb-4">
          Add an extra layer of security to your account by enabling 2FA.
        </p>
        <button
          onClick={toggle2FA}
          className={`px-5 py-2 rounded-xl font-medium transition ${
            is2FAEnabled ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {is2FAEnabled ? '2FA Enabled' : 'Enable 2FA'}
        </button>
      </section>

      {/* Language Section */}
      <section className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Language</h3>
        <label className="block text-sm text-gray-600 mb-2">Select Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 text-gray-700"
        >
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
        </select>
      </section>

      {/* Notifications Section */}
      <section className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Notifications</h3>
        <p className="text-gray-500">
          Configure how you want to receive notifications from the platform.
        </p>
      </section>

      {/* Billing Section */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Billing</h3>
        <p className="text-gray-500">
          Manage your subscription and payment methods here.
        </p>
      </section>
    </div>
  );
};

export default SettingsPage;
