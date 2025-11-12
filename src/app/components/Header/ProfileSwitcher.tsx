'use client';

import { User } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from 'store/auth/useAuthStore';

interface UserIconProps {
  fullName?: string;
  badgeCount?: number;
}

const UserIcon = ({  badgeCount = 0 }: UserIconProps) => {
  
  const authUser = useAuthStore((state) => state.authUser);
  const isHydrated = useAuthStore((state) => state.isHydrated);


  if (!isHydrated) return null;
  if (!authUser?.username) return null;


  console.log(authUser)
  const firstName = authUser?.username
  ? authUser.username.split(" ")[0]
  : "";

  

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
      <span className="text-lg md:block hidden text-gradient-to-r from-green-600 to-emerald-700 font-medium transition-colors duration-300">
        Hi <span className=''>{firstName}!</span>
      </span>
    </Link>
  );
};

export default UserIcon;



