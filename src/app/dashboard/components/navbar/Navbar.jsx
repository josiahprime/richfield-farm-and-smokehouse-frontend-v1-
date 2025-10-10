"use client"
import { FiSearch, FiMinimize } from "react-icons/fi";
import { IoLanguageOutline, IoNotificationsOutline, IoChatbubblesOutline } from "react-icons/io5";
import { MdDarkMode, MdFormatListBulleted } from "react-icons/md";
import Link from "next/link";

const Navbar = () => {

  return (
    <div className="navbar ml-40 h-[50px] border-b border-gray-300 text-sm text-gray-600 flex items-center z-50">
      <div className="wrapper w-full px-5 flex items-center justify-between">
        {/* Search */}
        <div className="search flex items-center border border-gray-300 px-2 py-1 rounded">
          <input
            type="text"
            placeholder="Search..."
            className="border-none outline-none bg-transparent text-xs placeholder:text-xs"
          />
          <FiSearch className="text-gray-600" />
        </div>

        {/* Navbar Items */}
        <div className="items flex items-center">
          {/* Language Selector */}
          <div className="item flex items-center mr-5 relative">
            <IoLanguageOutline className="icon text-lg mr-1" />
            English
          </div>

          {/* Dark Mode Toggle */}
          <div className="item flex items-center mr-5 cursor-pointer">
            <MdDarkMode className="icon text-lg" onClick={() => dispatch({ type: "TOGGLE" })} />
          </div>

          {/* Fullscreen */}
          <div className="item flex items-center mr-5 cursor-pointer">
            <FiMinimize className="icon text-lg" />
          </div>

          {/* Notifications */}
          <Link href='/dashboard/notifications'>
            <div className="item flex items-center mr-5 relative cursor-pointer">
              <IoNotificationsOutline className="icon text-lg" />
              <div className="counter w-[15px] h-[15px] bg-red-500 rounded-full text-white flex items-center justify-center text-[10px] font-bold absolute -top-1 -right-1">
                1
              </div>
            </div>
          </Link>

          {/* Messages */}
          <Link href='/dashboard/messages'>
            <div className="item flex items-center mr-5 relative cursor-pointer">
              <IoChatbubblesOutline className="icon text-lg" />
              <div className="counter w-[15px] h-[15px] bg-red-500 rounded-full text-white flex items-center justify-center text-[10px] font-bold absolute -top-1 -right-1">
                2
              </div>
            </div>
          </Link>

          {/* List Icon */}
          <div className="item flex items-center mr-5 cursor-pointer">
            <MdFormatListBulleted className="icon text-lg" />
          </div>

          {/* Avatar */}
          <Link href='/dashboard/profile'>
            <div className="item flex items-center">
              <img
                src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt="avatar"
                className="avatar w-[30px] h-[30px] rounded-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
