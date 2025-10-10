"use client";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";
import { FaUserPlus, FaEllipsisV, FaUserShield, FaUserTie, FaBan, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { useUserStore } from "store/users/useUsersStore";
import { formatDistanceToNow } from "date-fns";

interface ConfirmDialogProps {
  title: string;
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ title, visible, onConfirm, onCancel }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="flex justify-end gap-4">
          <button onClick={onCancel} className="px-4 py-2 border rounded-lg">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Yes</button>
        </div>
      </div>
    </div>
  );
};

const UsersPage = () => {
  const router = useRouter();
  const fetchUsers = useUserStore((s) => s.fetchUsers);
  const users = useUserStore((s) => s.users);
  const isLoading = useUserStore((s) => s.isLoading);
  const promoteToAdmin = useUserStore((s) => s.promoteToAdmin);
  const demoteToUser = useUserStore((s) => s.demoteToUser);
  const banUser = useUserStore((s) => s.banUser);
  const deleteUser = useUserStore((s) => s.banUser); // or use dedicated delete action

  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;

  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [confirmProps, setConfirmProps] = useState<{
    visible: boolean;
    title: string;
    onConfirm: () => void;
  }>({ visible: false, title: "", onConfirm: () => {} });

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const toggleRole = (role: string) =>
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );

  const filtered = users.filter((u) =>
    selectedRoles.length ? selectedRoles.includes(u.role) : true
  );
  const pageCount = Math.ceil(filtered.length / usersPerPage);
  const displayed = filtered.slice(currentPage * usersPerPage, (currentPage + 1) * usersPerPage);

  const openMenu = (id: string) =>
    setMenuOpenId((prev) => (prev === id ? null : id));
  const closeMenu = () => setMenuOpenId(null);

  const handleAction = (
    userId: string,
    action: "admin" | "moderator" | "ban" | "delete"
  ) => {
    const titles: Record<string, string> = {
      admin: "Promote to Admin?",
      moderator: "Promote to Moderator?",
      ban: "Ban this user?",
      delete: "Delete this user permanently?",
    };
    const handler = () => {
      switch (action) {
        case "admin":
          promoteToAdmin(userId);
          break;
        case "moderator":
          demoteToUser(userId); // replace with specific
          break;
        case "ban":
          banUser(userId);
          break;
        case "delete":
          deleteUser(userId);
          break;
      }
      setConfirmProps({ visible: false, title: "", onConfirm: () => {} });
    };
    setConfirmProps({
      visible: true,
      title: titles[action],
      onConfirm: handler,
    });
    closeMenu();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 bg-white/50 p-4 rounded-2xl shadow">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
          <p className="text-sm text-gray-500">Manage users</p>
        </div>
        <button
          onClick={() => router.push("/dashboard/users/addUser")}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-600 transition"
        >
          <FaUserPlus />
          Add User
        </button>
      </div>

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

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Email", "Role", "Status", "Joined", "Actions"].map((head) => (
                <th key={head} className="px-6 py-4 text-left font-semibold text-gray-600">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {displayed.map((user) => (
              <tr key={user.id} className="group hover:bg-gray-50 transition">
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4 capitalize">{user.role}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs ${
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
                <td className="px-6 py-4">
                  {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                </td>
                <td className="px-6 py-4 text-right relative">
                  <button
                    onClick={() => openMenu(user.id)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FaEllipsisV />
                  </button>
                  {menuOpenId === user.id && (
                    <div className="absolute right-4 top-full mt-2 bg-white shadow-lg rounded-lg py-1 z-10 w-48">
                      <MenuItem
                        icon={<FaUserShield className="text-green-600" />}
                        label="Promote to Admin"
                        onClick={() => handleAction(user.id, "admin")}
                      />
                      <MenuItem
                        icon={<FaUserTie className="text-blue-600" />}
                        label="Promote to Moderator"
                        onClick={() => handleAction(user.id, "moderator")}
                      />
                      <MenuItem
                        icon={<FaBan className="text-red-600" />}
                        label="Ban User"
                        onClick={() => handleAction(user.id, "ban")}
                      />
                      <div className="border-t my-1"></div>
                      <MenuItem
                        icon={<FaTrash className="text-gray-600" />}
                        label="Delete User"
                        onClick={() => handleAction(user.id, "delete")}
                        className="text-red-500"
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="mt-6">
          <ReactPaginate
            previousLabel="← Prev"
            nextLabel="Next →"
            breakLabel="..."
            pageCount={pageCount}
            onPageChange={({ selected }) => setCurrentPage(selected)}
            containerClassName="flex justify-center gap-2 text-sm"
            pageClassName="w-8 h-8 flex items-center justify-center rounded-full border bg-white text-gray-700 hover:bg-gray-100"
            activeClassName="bg-blue-500 text-white border-blue-500"
            previousClassName="px-3 py-1 border rounded-full bg-white text-gray-700 hover:bg-gray-100"
            nextClassName="px-3 py-1 border rounded-full bg-white text-gray-700 hover:bg-gray-100"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      )}

      <ConfirmDialog
        title={confirmProps.title}
        visible={confirmProps.visible}
        onConfirm={confirmProps.onConfirm}
        onCancel={() => setConfirmProps({ ...confirmProps, visible: false })}
      />
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}
const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100 transition ${className}`}
  >
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);





export default UsersPage;
