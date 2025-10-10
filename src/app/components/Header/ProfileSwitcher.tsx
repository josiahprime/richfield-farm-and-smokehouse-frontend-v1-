'use client';

import { User } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from 'store/auth/useAuthStore';

interface UserIconProps {
  fullName?: string;
  badgeCount?: number;
}

const UserIcon = ({  badgeCount = 0 }: UserIconProps) => {
  
  const  authUser  = useAuthStore((state)=>(state.authUser));
  if (!authUser) {
    return null
  }
  console.log(authUser)
  const firstName = authUser?.username.split(' ')[0];
  

  return (
    <Link
      href="/account"
      className="group relative text-gray-700 flex items-center space-x-2 mr-5"
    >
      <div className="relative cursor-pointer transition-all duration-300">
        <div className="p-2 rounded-md transition-all duration-300 group-hover:bg-gray-200">
          <User
            size={28}
            className="text-gray-700 transition-colors duration-300"
          />
        </div>
        {badgeCount > 0 && (
          <div className="w-[15px] h-[15px] bg-red-500 rounded-full text-white flex items-center justify-center text-[10px] font-bold absolute -top-1 -right-1 shadow-md">
            {badgeCount}
          </div>
        )}
      </div>
      <span className="text-lg text-gradient-to-r from-green-600 to-emerald-700 font-medium transition-colors duration-300">
        Hi <span className=''>{firstName}!</span>
      </span>
    </Link>
  );
};

export default UserIcon;



// import { useState, useRef, useEffect } from 'react';
// import { FaUserCircle } from 'react-icons/fa';
// import {
//   MdEdit,
//   MdOutlineLogout,
//   MdSettings,
//   MdFavoriteBorder,
//   MdShoppingCart,
//   MdMessage
// } from 'react-icons/md';
// import Link from 'next/link';
// import { useAuthStore } from 'store/auth/useAuthStore';

// const ProfileSwitcher = () => {
//   const authUser = useAuthStore((state) => state.authUser);
//   const isLoading = useAuthStore((state) => state.isLoading);
//   const updateProfile = useAuthStore((state) => state.updateProfile);
//   const isUpdatingProfile = useAuthStore((state)=>(state.isUpdatingProfile))
//   const isCheckingAuth = useAuthStore((state)=>(state.isCheckingAuth))

//   const logout = useAuthStore((state) => state.logout);

//   const [selectedImg, setSelectedImg] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const fileInputRef = useRef(null);

//   const toggleDropdown = () => {
//     if (!isLoading) setIsOpen((prev) => !prev);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   if (isCheckingAuth) {
//   return (
//     <div className="w-28 h-12 flex items-center gap-2 animate-pulse">
//       <div className="w-12 h-12 rounded-full bg-gray-200" />
//       <div className="flex flex-col gap-1">
//         <div className="w-16 h-3 bg-gray-200 rounded" />
//         <div className="w-12 h-3 bg-gray-200 rounded" />
//       </div>
//     </div>
//     );
//   }


//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.readAsDataURL(file);
//     reader.onload = async () => {
//       const base64Image = reader.result;
//       setSelectedImg(base64Image);
//       await updateProfile({ profilePic: base64Image });
//     };
//   };

//   return (
//     <div className="relative flex items-center justify-center" ref={dropdownRef}>
//       {/* Profile Toggle Button */}
//       <button
//         onClick={toggleDropdown}
//         className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 ${
//           isLoading ? 'border-gray-200 cursor-not-allowed opacity-50' : 'border-gray-300 hover:border-gray-500'
//         } transition-all shadow-lg bg-white`}
//         disabled={isLoading}
//       >
//         <img className='w-10 h-10 rounded-full' src={authUser.profilePic} alt="" />
//       </button>

//       {/* Hidden File Input */}
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         className="hidden"
//         onChange={handleImageUpload}
//       />

//       {/* Dropdown */}
//       {isOpen && (
//         <div className="absolute right-0 mt-[450px] w-64 bg-white text-gray-800 shadow-2xl rounded-xl overflow-hidden transform transition-all duration-200 scale-100 animate-fadeIn backdrop-blur-lg bg-opacity-90">
//           {/* Profile Section */}
//           <div className="flex flex-col items-center justify-center p-5 border-b border-gray-200 relative">
//             <div className="relative w-16 h-16">
//               {authUser?.profilePic ? (
//                 <img
//                   src={authUser.profilePic}
//                   alt="User"
//                   className={`w-full h-full rounded-full border-2 border-gray-300 shadow-md ${
//                     isUpdatingProfile ? 'opacity-50' : ''
//                   }`}
//                 />
//               ) : (
//                 <FaUserCircle className="text-5xl text-gray-500 w-full h-full" />
//               )}

//               {/* Spinner while loading */}
//               {isUpdatingProfile && (
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-6 h-6 border-2 border-t-transparent border-gray-600 rounded-full animate-spin" />
//                 </div>
//               )}

//               {/* Edit Icon */}
//               <button
//                 className={`absolute bottom-0 right-0 bg-gray-200 hover:bg-gray-300 p-1 rounded-full shadow-md transition ${
//                   isUpdatingProfile ? 'cursor-not-allowed opacity-50' : ''
//                 }`}
//                 onClick={() => fileInputRef.current.click()}
//                 disabled={isUpdatingProfile}
//               >
//                 <MdEdit className="text-gray-600 text-sm" />
//               </button>
//             </div>

//             <p className="mt-2 text-lg font-semibold text-gray-800">
//               Hi, {authUser?.username || 'Guest User'}!
//             </p>
//           </div>

//           {/* Menu Items */}
//           <ul className="flex flex-col py-2">
//             <MenuItem to="/profile" icon={<FaUserCircle />} text="Profile" />
//             <MenuItem to="/orders" icon={<MdShoppingCart />} text="Orders" />
//             <MenuItem to="/wishlist" icon={<MdFavoriteBorder />} text="Wishlist" />
//             <MenuItem to="/settings" icon={<MdSettings />} text="Settings" />
//             <MenuItem to="/notifications" icon={<MdMessage />} text="Notifications" />
//             <button
//               onClick={logout}
//               className="flex items-center gap-3 w-full px-5 py-3 text-left hover:bg-red-500 hover:text-white transition-all"
//             >
//               <MdOutlineLogout className="text-xl" />
//               Logout
//             </button>
//           </ul>
//         </div>
//       )}

//       {/* Text greeting beside avatar */}
//       <div className="flex flex-col items-center justify-center ml-2">
//         <div>
//           Hi, {(authUser?.username && authUser.username.split(' ')[0]) || 'guest'}
//         </div>
//         <div className="font-bold">Account</div>
//       </div>
//     </div>
//   );
// };

// // Menu item component
// const MenuItem = ({ to, icon, text }) => (
//   <Link
//     href={to}
//     className="flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition-all"
//   >
//     <span className="text-xl">{icon}</span>
//     {text}
//   </Link>
// );

// export default ProfileSwitcher;
