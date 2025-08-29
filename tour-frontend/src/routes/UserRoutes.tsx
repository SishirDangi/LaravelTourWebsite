import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Always render these eagerly
import ScrollToTop from "../components/ScrollToTop";
import Header from "../components/Header";

// Not Found Page Route
import NotFound from "../components/NotFound";
import BlogPage from "../components/BlogPage";
import About from "../components/About";


// Lazy-loaded page component
const Login = lazy(() => import("../components/Login"));
const Contact = lazy(() => import("../components/Contact"));

const UserRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Suspense
        fallback={
          <div >
            <p ></p>
          </div>
        }
      >
        <Routes>
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<About />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default UserRoutes;