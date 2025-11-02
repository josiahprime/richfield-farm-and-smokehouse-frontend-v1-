"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaUserPlus, FaUserShield, FaUserTie, FaBan,} from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { HiUserRemove } from "react-icons/hi";
import { AnimatePresence } from "framer-motion";
import ReactPaginate from "react-paginate";
import DropdownPortal from "app/components/DropdownPortal/DropdownPortal";
import ConfirmPortal from "app/components/ConfirmPortal/ConfirmPortal";
import { useUserStore } from "store/users/useUsersStore";

const UsersPage = () => {
  const router = useRouter();
  const users = useUserStore((state) => state.users);
  const isLoading = useUserStore((state) => state.isLoading);
  const fetchCurrentUser = useUserStore((state)=>(state.fetchCurrentUser)); // e.g., from context or Zustand
  const currentUser = useUserStore((state)=>(state.currentUser));

  
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const banSelectedUser = useUserStore((state) => state.banUser);
  const updateUserRole = useUserStore((state)=>(state.updateUserRole))


  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});



  

  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const closeMenu = () => (console.log('menu closed'));
  const usersPerPage = 10;
  const [confirmProps, setConfirmProps] = useState<{
      visible: boolean;
      title: string;
      onConfirm: () => void;
    }>({ visible: false, title: "", onConfirm: () => {} });


  const promoteToAdmin = (userId: string)=>(
    updateUserRole(userId, "admin")
  )

  const promoteToModerator = (userId: string)=>{
    updateUserRole(userId, "moderator")
  }

  const demoteToCustomer = (userId: string)=>{
    updateUserRole(userId, "customer")
  }

  const banUser = (userId: string)=>(
    banSelectedUser(userId)
  )

  // useEffect(() => {
  //   fetchUsers();
  //   fetchCurrentUser()
  // }, []);

  useEffect(() => {
      fetchUsers();
      fetchCurrentUser();
    }, [fetchUsers, fetchCurrentUser]);


  console.log(currentUser)


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
  const currentUsers = filtered.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  );

  const handlePageClick = ({ selected }: { selected: number }) =>
    setCurrentPage(selected);



    const handleAction = (
    userId: string,
    action: "admin" | "moderator" | "ban" | "demote"
  ) => {
    const titles: Record<string, string> = {
      admin: "Promote to Admin?",
      moderator: "Promote to Moderator?",
      ban: "Ban this user?",
      demote: 'Demote to Customer?'
      // delete: "Delete this user permanently?",
    };
    const handler = () => {
      switch (action) {
        case "admin":
          promoteToAdmin(userId);
          break;
        case "moderator":
          promoteToModerator(userId); // replace with specific
          break;
        case "ban":
          banUser(userId);
          break;
        case "demote":
          demoteToCustomer(userId);
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
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl shadow">
        <div>
          <h2 className="text-2xl font-bold">Team Members</h2>
          <p className="text-sm text-gray-500">
            View, add or manage users in the system.
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard/users/addUser")}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <FaUserPlus /> Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {["admin", "manager", "customer"].map((role) => (
          <button
            key={role}
            onClick={() => toggleRole(role)}
            className={`px-3 py-1 rounded-full shadow hover:opacity-50 cursor-pointer ${
              selectedRoles.includes(role)
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Email</th>
              <th className="px-6 py-3 text-left font-semibold">Role</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-left font-semibold">Joined</th>
              <th className="px-6 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${
                      user.role === "admin"
                        ? "bg-red-100 text-shadow-red-900"
                        : user.role === "moderator"
                        ? "bg-yellow-100 text-shadow-blue-900"
                        : "bg-green-100 text-shadow-green-700"
                    }`}>
                      {user.role}
                  </span>
                  </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
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
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right relative">
                  {currentUser && user.id !== currentUser.id &&  (
                    <>
                      <button
                        // ref={(el) => (btnRefs.current[user.id] = el)}
                        ref={(el): void => {
                          btnRefs.current[user.id] = el;
                        }}

                        onClick={() =>
                          setMenuOpen(menuOpen === user.id ? null : user.id)
                        }
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <FiMoreVertical className="inline-block" />
                      </button>

                      <AnimatePresence>
                        {menuOpen === user.id && (
                          <DropdownPortal open={menuOpen === user.id}
                           buttonRef={{ current: btnRefs.current[user.id] }}
                           onClose={() => setMenuOpen(null)}
                           >
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
                            <div className="my-1"></div>
                            <MenuItem
                              icon={<HiUserRemove className=" text-red-600" />}
                              label="demote to customer"
                              onClick={() => handleAction(user.id, "demote")}
                            />
                            <div className="border-t"></div>
                            <MenuItem
                              icon={<FaBan className=" text-red-600" />}
                              label="Ban User"
                              onClick={() => handleAction(user.id, "ban")}
                            />
                          </DropdownPortal>
                        )}
                      </AnimatePresence>
                    </>
                  )}
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
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center gap-2"
            pageClassName="px-3 py-1 rounded border"
            activeClassName="bg-blue-500 text-white"
          />
        </div>
      )}
      <ConfirmPortal
      visible={confirmProps.visible}
      title={confirmProps.title}
      onConfirm={confirmProps.onConfirm}
      onClose={() =>
        setConfirmProps({ visible: false, title: "", onConfirm: () => {} })
      }
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



