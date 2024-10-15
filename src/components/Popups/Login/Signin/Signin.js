import { useRef, useEffect } from "react";
import { XIcon } from "lucide-react";
import Logo from "../../../../assets/GreenLogo.svg";
import SignInForm from "./SignInForm/SignInForm";
import { useTheme } from '../../../Layout/ThemeContext/ThemeContext'; // Import the theme context


export default function Signin({ onClose, onSignupClick, onForgotPasswordClick }) {
  const modalRef = useRef(null);
  const { isDarkMode } = useTheme(); // Access the dark mode state


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close the modal on outside click
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed sm:inset-10 inset-1 z-50 flex items-center justify-center">
      <div className="absolute inset-10 pointer-events-none"></div> {/* Backdrop with no pointer events */}
      <div
        ref={modalRef}
        className={` ${isDarkMode ? "bg-[rgba(96,96,96,0.8)] text-white" : "bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg text-black"} p-10 rounded-lg shadow-xl w-full max-w-sm relative  ${isDarkMode ? 'border-none' : 'border-gray-300'} pointer-events-auto`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 hover:text-gray-800 ${
            isDarkMode ? "text-[#FFFFFFFF] text-opacity-80" : "text-gray-800"
          }`}
        >
          <XIcon className="w-5 h-5" />
        </button>
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="Logo" className="h-12" />
        </div>
        <h2 className={`font-omnes text-[28px] leading-tight text-${isDarkMode ? '[#FFFFFFCC] text-opacity-80' : 'black'} mb-1 font-medium`}>
          Welcome Back
        </h2>
        <p className={`font-omnes text-[14px] font-[400] text-${isDarkMode ? '[#FFFFFFCC]' : 'gray-500'} leading-5 mb-6`}>
          Please sign in to your account
        </p>

        <SignInForm
          onForgotPasswordClick={onForgotPasswordClick}
          onSignupClick={onSignupClick}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
