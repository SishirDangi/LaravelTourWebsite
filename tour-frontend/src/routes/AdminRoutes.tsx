import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import AdminBlogs from "../pages/admin/AdminBlogs";
import AdminMessages from "../pages/admin/AdminMessages";
import AdminTourPackage from "../pages/admin/AdminTourPackage";

// Lazy load admin pages
const AdminDashboard = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminDashboardHome = lazy(() => import("../pages/admin/AdminDashboardHome"));
const AdminSettings = lazy(() => import("../pages/admin/AdminSettings"));
const AdminProfile = lazy(() => import("../pages/admin/AdminProfile"));
const AdminRoutes: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div >
 
        </div>
      }
    >
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardHome />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="logout" element={<Logout />} />
          <Route path="adminprofile" element={<AdminProfile />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="admincontact" element={<AdminMessages />} />
          <Route path="admintourpackage" element={<AdminTourPackage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

const Logout: React.FC = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userRole");
  window.location.href = "/login";
  return null;
};

export default AdminRoutes;