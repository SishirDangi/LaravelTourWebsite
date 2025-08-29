import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

interface AdminNavbarProps {
  isCollapsed: boolean;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ isCollapsed }) => {
  const [username] = useState<string>("Admin");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTime = (date: Date): string =>
    date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  const handleLogoutClick = () => setIsModalOpen(true);
  const handleLogoutConfirm = () => {
    sessionStorage.clear();
    navigate("/login");
    setIsModalOpen(false);
    setDropdownOpen(false);
  };
  const handleLogoutCancel = () => setIsModalOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 ${
          isCollapsed ? "left-[60px]" : "left-[250px]"
        } right-0 bg-[#F1F1F1] text-[#333] flex justify-between items-center px-6 h-14 z-40 shadow border-b border-gray-300 transition-all duration-300`}
      >
        <div className="text-3xl font-['Winky_Rough',sans-serif] font-semibold mt-3 mb-5 text-center">
          Tour Website
        </div>

        <div className="flex items-center gap-6 relative">
          <div className="text-sm">{formatTime(currentTime)}</div>

          {/* Profile Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-1 py-1 rounded-md focus:outline-none"
              title="Profile"
            >
              <FaUserCircle size={24} />
              <span className="text-sm select-none">{username}</span>
            </button>

            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-32 bg-white text-black border border-gray-300 rounded-md shadow-lg text-sm z-50">
                <li>
                  <button
                    onClick={() => {
                      navigate("/admin-dashboard/adminprofile");
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-red-500 hover:text-white rounded-md"
                  >
                    <FaUserCircle />
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogoutClick}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-red-500 hover:text-white rounded-md"
                  >
                    <FaSignOutAlt />
                    Log Out
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      {/* Logout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[350px]">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
              Confirm Logout
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
              >
                Yes, Logout
              </button>
              <button
                onClick={handleLogoutCancel}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;