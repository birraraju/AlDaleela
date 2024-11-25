import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../Layout/ThemeContext/ThemeContext";

export default function Toast({ message, showToast }) {
  const { isLangArab, setShowToast, setToastMessage } = useTheme();

  useEffect(() => {
    if (showToast) {
      toast(message, {
        onClose: () => {
          setShowToast(false); // Automatically reset showToast
          setToastMessage(""); // Reset toastMessage
        },
      });
    }
  }, [showToast, message, setShowToast, setToastMessage]);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={isLangArab}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
