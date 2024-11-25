import React from "react";
import ContactIcon from "../../../../../../../assets/Contactus.svg"; // Import the Contact Us icon
import DarkContactIcon from "../../../../../../../assets/ProfileDarkIcons/Frame-1.svg"; // Import the Contact Us icon
import { useTheme } from '../../../../../ThemeContext/ThemeContext'; // Import the theme hook

export default function ContactUs({ setIsContactUs, setIsPopoverOpen }) {
  const { isDarkMode,isLangArab } = useTheme(); // Use the theme hook to get dark mode state

  return (
    <div className="py-1 mt-1 cursor-pointer">
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
          className={`${
            isLangArab
              ? "  font-500 text-[14px] tab:text-[12px] laptop_s:text-[14px] tracking-widget"
              : "  font-500 text-[14px] tab:text-[12px] laptop_s:text-[14px] tracking-widget"
          }  ${
            isDarkMode ? "text-gray-300" : "text-[#505050]"
          }`}
        >          {isLangArab?"اتصل بنا":"Contact us"}</p>
      </div>
    </div>
  );
}
