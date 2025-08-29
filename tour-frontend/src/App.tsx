import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import GlobalToast from "./components/GlobalToast";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes wrapped with GlobalToast */}
        <Route
          path="/*"
          element={
            <>
              <GlobalToast />
              <UserRoutes />
            </>
          }
        />

        {/* Admin dashboard routes without toast */}
        <Route path="/admin-dashboard/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
