import { useRef, useEffect } from "react";
import { XIcon } from "lucide-react";
import Logo from "../../../../assets/GreenLogo.svg";
import SignInForm from "./SignInForm/SignInForm";

export default function Signin({ onClose, onSignupClick, onForgotPasswordClick }) {
  const modalRef = useRef(null);

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
    <div className="fixed inset-10 z-50 flex items-center justify-center">
      <div className="absolute inset-10 pointer-events-none"></div> {/* Backdrop with no pointer events */}
      <div
        ref={modalRef}
        className="bg-white mb-10 bg-opacity-40 backdrop-filter backdrop-blur-lg p-10 rounded-lg shadow-xl w-full max-w-sm relative border border-white pointer-events-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <XIcon className="w-5 h-5" />
        </button>
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="Logo" className="h-12" />
        </div>
        <h2 className="font-omnes text-[28px] text-black leading-[26px] text-left mb-1 font-medium">
          Welcome Back
        </h2>
        <p className="font-omnes text-[14px] font-light text-gray-500 leading-[18px] text-left mb-6">
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
