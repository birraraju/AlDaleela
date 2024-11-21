import React from "react";
import About from "../../../../../../../assets/about.svg";
import DarkAbout from "../../../../../../../assets/DarkAbout.svg";
import { useTheme } from "../../../../../ThemeContext/ThemeContext"; // Import the theme hook
export default function SendFeedback({ setIsAboutUs, setIsPopoverOpen }) {
  const { isDarkMode, isLangArab } = useTheme(); // Use the theme hook to get dark mode state

  return (
    <div className=" py-1 mt-1 cursor-pointer">
      <div
        onClick={() => {
          setIsAboutUs(true);
          setIsPopoverOpen(false);
        }}
        className="flex justify-start gap-2 items-center"
      >
        <div>
          <img
            src={isDarkMode ? DarkAbout : About}
            alt="Logo"
            className=" w-5"
          />
        </div>
        <p
          className={`${
            isLangArab
              ? "font-omnes font-500 text-[14px] tab:text-[12px] laptop_s:text-[14px] tracking-widget"
              : "font-omnes font-500 text-[14px] tab:text-[12px] laptop_s:text-[14px] tracking-widget"
          } 
            ${isDarkMode ? "text-gray-300" : "text-[#505050]"}`}
        >
          {" "}
          {isLangArab ? "حولنا" : "About us"}
        </p>
      </div>
    </div>
  );
}
