import { Button } from "../ui/button";
import React from "react";
import SuccessSvg from "../../assets/Header/Profile/ProfileDetails/ChangePassword/Success.svg";
// import FailureSvg from "../../assets/Header/Profile/ProfileDetails/ChangePassword/Failure.svg";
import FailureIcon from "../../assets/EmailVerfication/failureIcon.svg"

import { useTheme } from "../Layout/ThemeContext/ThemeContext";

export default function PopModal({ message, success, isOpenModal, onClose }) {
  const {isLangArab, isDarkMode} = useTheme()
  if (!isOpenModal) return null; // Modal won't render if not open

  return (
    <div className="fixed flex  inset-0  bg-black items-center justify-center bg-transparent z-50">
      <div className={`${isDarkMode?"bg-[rgba(96,96,96,0.8)]":"bg-white"} p-8 rounded-lg shadow-lg flex flex-col items-center gap-6 w-[90%] sm:w-[400px] min-h-[300px]`}>
        {/* Display the appropriate image based on success value */}
        <img
          src={success === "Success" ? SuccessSvg : FailureIcon} // Show Success or Failure SVG
          alt={success === "Success" ? "Success" : "Failure"}
          className="w-40 h-30" // Adjust size of the SVG
        />

        {/* Display the message */}
        <p className={`font-medium text-xl text-center ${isDarkMode?" text-white":"text-black"}`}>
          {message}
        </p>

        {/* Close Button */}
        <Button
          onClick={onClose}  // Close the modal when button is clicked
          className="mt-4 btn-gradient w-[80%]  py-2"
        >
          {isLangArab?"منتهي":"Done"}
        </Button>
      </div>
    </div>
  );
}
