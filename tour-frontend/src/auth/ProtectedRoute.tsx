import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: string;
}

interface UserData {
  role_id: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("userRole");

    // No token: redirect to login
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    // Check role from sessionStorage
    if (userRole) {
      const roleId = parseInt(userRole, 10);
      if (role === "admin" && roleId === 1) {
        setIsAuthenticated(true);
      } else if (role !== "admin") {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
      return;
    }

    // Fallback: fetch user role from backend
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data: UserData = await res.json();
        sessionStorage.setItem("userRole", data.role_id);

        if (role === "admin" && parseInt(data.role_id, 10) !== 1) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [role]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-xl">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;