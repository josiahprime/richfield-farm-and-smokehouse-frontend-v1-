'use client'
import React, {useState} from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { AiOutlineMail, AiOutlinePhone, AiOutlineEdit } from "react-icons/ai";
import { useAuthStore } from "store/auth/useAuthStore";

const Profile = () => {
  const  authUser  = useAuthStore((state)=>(state.authUser));
  console.log('authUser from profile page', authUser)
  

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    document.documentElement.classList.toggle("dark");
  };


  return (
    <div className="w-full px-4 py-10 md:px-10 lg:px-20 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="px-6 py-10 max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6 bg-white/50 dark:bg-gray-800/50 p-4 rounded-2xl shadow">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Profile</h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                View and manage your personal information and account details.
              </p>
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition shadow"
            >
              {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
          <img
            src={authUser?.profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow object-cover ring-2 ring-green-400"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{authUser?.username}</h2>
            <p className="text-gray-500 mt-1">Role: {authUser?.role}</p>
            <p className="text-gray-500">Joined: {authUser?.createdAt}</p>
            <div className="mt-4">
              <button className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                <AiOutlineEdit />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h3>
          <div className="space-y-3">
            <p className="flex items-center text-gray-600 gap-2">
              <AiOutlineMail className="text-green-500" />
              {authUser?.email}
            </p>
            <p className="flex items-center text-gray-600 gap-2">
              <AiOutlinePhone className="text-green-500" />
              {authUser?.phone || "No phone number"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* You can fetch these from API or context later */}
          {[
            { label: "Total Logins", value: 120 },
            { label: "Projects Managed", value: 35 },
            { label: "Tasks Completed", value: 145 },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 text-center"
            >
              <h4 className="text-2xl font-bold text-gray-800">{stat.value}</h4>
              <p className="text-gray-500 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
