import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";
import { FaHome, FaBook, FaEnvelope } from "react-icons/fa";

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
}) => {
  const [isHoveringToggle, setIsHoveringToggle] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startXRef = useRef<number>(0);
  const location = useLocation();

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e: MouseEvent): void => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;

    if (!isCollapsed && deltaX < -50) {
      setIsCollapsed(true);
      setIsDragging(false);
    } else if (isCollapsed && deltaX > 50) {
      setIsCollapsed(false);
      setIsDragging(false);
    }
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const menuItems: MenuItem[] = [
    { label: "Home", icon: <FaHome />, path: "/admin-dashboard" },
    { label: "Blogs", icon: <FaBook />, path: "/admin-dashboard/blogs" },
    { label: "Messages", icon: <FaEnvelope />, path: "/admin-dashboard/admincontacts" },
    { label: "Tour Bookings", icon: <FaEnvelope />, path: "/admin-dashboard/adminbookings" },
    { label: "Tour Package", icon: <FaEnvelope />, path: "/admin-dashboard/admintourpackages" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 ${
        isCollapsed ? "w-[60px]" : "w-[250px]"
      } h-screen bg-orange-100 text-orange-900 flex flex-col border-r border-gray-300 z-50 transition-all duration-300 overflow-hidden`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-3 relative">
        {!isCollapsed && (
          <div className="text-2xl mt-3 font-['Winky_Rough',sans-serif] font-semibold">
            Admin Dashboard
          </div>
        )}
        <div
          className="relative ml-auto z-50"
          onMouseEnter={() => setIsHoveringToggle(true)}
          onMouseLeave={() => setIsHoveringToggle(false)}
        >
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-orange-700 mt-3 hover:text-orange-900 text-3xl p-1"
          >
            {isCollapsed ? (
              <HiOutlineChevronDoubleRight />
            ) : (
              <HiOutlineChevronDoubleLeft />
            )}
          </button>
          {isHoveringToggle && (
            <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[9px] text-orange-600 whitespace-nowrap z-50">
              {isCollapsed ? "Open sidebar" : "Close sidebar"}
            </span>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 space-y-2">
        {menuItems.map((item, idx) => {
          const isActive: boolean = location.pathname === item.path;

          return (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center gap-3 text-sm py-2 px-2 rounded transition-colors
                ${
                  isActive ? "bg-orange-200 font-semibold" : "hover:bg-orange-300"
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Drag resize area */}
      <div
        onMouseDown={handleMouseDown}
        className="absolute top-0 right-0 h-full w-2 cursor-ew-resize z-50"
      />
    </aside>
  );
};

export default AdminSidebar;