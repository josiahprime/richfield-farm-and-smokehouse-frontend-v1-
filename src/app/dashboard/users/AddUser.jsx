'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserPlus } from "react-icons/fa";
import ReactPaginate from "react-paginate";

interface User {
  _id: string;
  username: string;
  email: string;
  password?: string;
  role: "admin" | "manager" | "customer";
  status: "active" | "inactive" | "banned";
  authProvider: "local" | "google";
  profilePic: string;
  verified: boolean;
  verificationTokenCreatedAt?: Date;
  verificationTokenExpires?: Date;
  createdAt: string;
  verificationToken?: string;
}

// ✅ Mock users data
const users: User[] = [
  {
    _id: "1",
    username: "adminUser",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    authProvider: "local",
    profilePic: "",
    verified: true,
    createdAt: "2024-01-01",
  },
  {
    _id: "2",
    username: "googleCustomer",
    email: "customer@gmail.com",
    role: "customer",
    status: "inactive",
    authProvider: "google",
    profilePic: "",
    verified: false,
    createdAt: "2024-02-12",
  },
  {
    _id: "3",
    username: "managerDude",
    email: "manager@biz.com",
    role: "manager",
    status: "banned",
    authProvider: "local",
    profilePic: "",
    verified: true,
    createdAt: "2024-03-22",
  },
  // ➕ Add more if needed
];

const UsersPage = () => {
  const router = useRouter();

  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const filteredUsers = users.filter((user) =>
    selectedRoles.length ? selectedRoles.includes(user.role) : true
  );

  const pageCount = Math.ceil(filteredUsers.length / usersPerPage);
  const offset = currentPage * usersPerPage;
  const currentUsers = filteredUsers.slice(offset, offset + usersPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-white/50 p-4 rounded-2xl shadow">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
          <p className="text-sm text-gray-500">View, add or manage users in the system.</p>
        </div>
        <button
          onClick={() => router.push("/dashboard/users/addUser")}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-600 transition"
        >
          <FaUserPlus size={18} />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["admin", "manager", "customer"].map((role) => (
          <button
            key={role}
            onClick={() => toggleRole(role)}
            className={`px-3 py-1 rounded-full border ${
              selectedRoles.includes(role)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300"
            } hover:shadow`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 rounded-t-xl">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-600">Name</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-600">Email</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-600">Role</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-600">Joined</th>
              <th className="px-6 py-4 text-right font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentUsers.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition duration-200">
                <td className="px-6 py-4 font-medium text-gray-800">{user.username}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td
                  className={`px-6 py-4 ${
                    user.role === "admin"
                      ? "text-red-600"
                      : user.role === "manager"
                      ? "text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {user.role}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : user.status === "inactive"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.createdAt}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-500 hover:underline mr-4">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="mt-6">
          <ReactPaginate
            previousLabel="← Prev"
            nextLabel="Next →"
            breakLabel="..."
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center gap-2 text-sm"
            pageClassName="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            activeClassName="bg-blue-500 text-white border-blue-500"
            previousClassName="px-3 py-1 border rounded-full bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            nextClassName="px-3 py-1 border rounded-full bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}
    </div>
  );
};

export default UsersPage;
