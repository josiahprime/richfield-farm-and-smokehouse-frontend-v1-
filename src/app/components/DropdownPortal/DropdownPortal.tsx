import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const DropdownPortal = ({ buttonRef, children, open, onClose }: any) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.right - 208 + window.scrollX // 192px = w-48 (48 * 4)
      });

    }
  }, [open, buttonRef]);


  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      onClose?.(); // Call the parent function to close the dropdown
    }
  };

  if (open) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [open, buttonRef, onClose]);


  if (!open || coords.top === 0) return null;

  return ReactDOM.createPortal(
    <div
      ref={dropdownRef}
      className="absolute z-50 bg-white shadow-lg rounded-lg py-1 w-52"
      style={{ position: "absolute", top: coords.top, left: coords.left }}
    >
      {children}
    </div>,
    document.body
  );
};

export default DropdownPortal;