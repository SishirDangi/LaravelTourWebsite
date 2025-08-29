import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavBar";

interface AdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AdminNavbarProps {
  isCollapsed: boolean;
}

const AdminDashboard: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <AdminNavbar isCollapsed={isCollapsed} />
        <main
          className="flex-1 bg-slate-50 p-8 overflow-y-auto pt-14 transition-all duration-300"
          style={{ marginLeft: isCollapsed ? 60 : 250 }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
