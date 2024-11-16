import React from "react";
import ContactIcon from "../../../../../../../assets/Contactus.svg"; // Import the Contact Us icon
import DarkContactIcon from "../../../../../../../assets/DarkContactIcon.svg"; // Import the Contact Us icon
import { useTheme } from '../../../../../ThemeContext/ThemeContext'; // Import the theme hook

export default function ContactUs({ setIsContactUs, setIsPopoverOpen }) {
  const { isDarkMode,isLangArab } = useTheme(); // Use the theme hook to get dark mode state

  return (
    <div className="py-2 cursor-pointer">
      <div
        onClick={() => {
          setIsContactUs(true);
          setIsPopoverOpen(false);
        }}
        className="flex justify-start gap-2 items-center"
      >
        <div>
        <img 
          src={isDarkMode ? DarkContactIcon : ContactIcon }

           alt="Contact Us" className=" w-5" />        </div>
        <p
          className={`font-medium font-omnes  text-[16px] ${
            isDarkMode ? "text-gray-300" : "text-[#505050]"
          }`}
        >          {isLangArab?"اتصل بنا":"Contact Us"}</p>
      </div>
    </div>
  );
}
