import React from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GlobalToast: React.FC = () => (
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnFocusLoss={false}
    pauseOnHover={false}
    draggable
    theme="colored"
    transition={Slide}
    closeButton
    toastClassName="text-sm font-medium"
    toastStyle={{ borderRadius: "0.5rem" }}
  />
);

export default GlobalToast;