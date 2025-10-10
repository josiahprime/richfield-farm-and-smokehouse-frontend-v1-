import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useUiStore } from 'store/ui/useUiStore';
import CategoriesDropdown from "./CategoriesDropdown";

const SidebarToggleButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toggleSidebar, isSidebarOpen, openSidebar, closeSidebar } = useUiStore();

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          isOpen ? closeSidebar() : openSidebar();
        }}
        className="z-[100] text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-md w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
      </button>

      {isHovered && (
        <div className="absolute top-full left-0 mt-2">
          <CategoriesDropdown />
        </div>
      )}
    </div>
  );
};

export default SidebarToggleButton;
