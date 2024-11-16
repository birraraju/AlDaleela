import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../Layout/ThemeContext/ThemeContext';
export default function Toast({ message, showToast }) {
    const {isLangArab} = useTheme()
  useEffect(() => {
    if (showToast) {
      toast(message); // Show toast when showToast is true
    }
  }, [showToast, message]); // Run the effect when showToast or message changes

  return (
    <div>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={isLangArab?true:false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
