'use client';
import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useUserStore } from "store/users/useUsersStore";
import { FaArrowUp, FaArrowDown, FaBan } from "react-icons/fa";
import { div } from "framer-motion/client";

const EditUserPage = () => {
   const { id } = useParams();
  const router = useRouter();
  const users = useUserStore((state) => state.users);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return <div>user not found mofoka</div>
  }

  // Fake data — replace with actual user data (from props, API, or context)
  // const user = {
  //   id: 1,
  //   name: "John Doe",
  //   email: "john.doe@example.com",
  //   role: "manager",
  //   phone: "+1 234 567 890",
  //   status: "active",
  //   profilePic: "/default-avatar.png", // update to actual image path
  //   createdAt: "2023-01-01T12:00:00Z",
  // };

  return (
    
    <div className="flex">  
      <div className="flex-1">   
        <div className="p-8 bg-gray-50 min-h-screen">
          <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
            <div className="flex items-center gap-6 p-6 border-b">
              <img
                src={''}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{user.username}</h1>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-sm text-gray-500">Phone: {}</p>
                <p className="text-sm text-gray-500">
                  Joined: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-semibold text-blue-600 capitalize">{user.role}</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Status</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : user.status === "inactive"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
              </div>

              {/* Management Buttons */}
              <div className="flex gap-4 flex-wrap mt-6">
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                  <FaArrowUp />
                  Promote
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                  <FaArrowDown />
                  Demote
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  <FaBan />
                  Ban User
                </button>
              </div>
            </div>

            <div className="p-6 border-t text-right">
              <button
                onClick={() => router.push("/dashboard/users")}
                className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Back to Users
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
