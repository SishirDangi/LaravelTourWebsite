import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Always render these eagerly
import ScrollToTop from "../components/ScrollToTop";
import Header from "../components/Header";

// Not Found Page Route
import NotFound from "../components/NotFound";
import BlogPage from "../components/BlogPage";
import About from "../components/About";
import Destination from "../components/Destination";
import PackageDetails from "../components/PackageDetails";
import BookingForm from "../components/BookingForm";
import PopularTour from "../components/PopularTour";
import Home from "../components/Home";
import ScrollToTopButton from "../components/ScrollToTopButton";
import EnquiryNow from "../components/EnquiryNow";


// Lazy-loaded page component
const Login = lazy(() => import("../components/Login"));
const Contact = lazy(() => import("../components/Contact"));

const UserRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <ScrollToTopButton />
      <Header />
      <Suspense
  fallback={
    <div className="flex items-center justify-center min-h-screen">
      <svg
        className="animate-spin h-16 w-16 text-orange-500"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
        ></path>
      </svg>
    </div>
  }
>
  
        <Routes>
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/destination" element={<Destination />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/booking/:id" element={<BookingForm />} />
          <Route path="/populartours" element={<PopularTour />} />
          <Route path="/enquirynow" element={<EnquiryNow />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default UserRoutes;