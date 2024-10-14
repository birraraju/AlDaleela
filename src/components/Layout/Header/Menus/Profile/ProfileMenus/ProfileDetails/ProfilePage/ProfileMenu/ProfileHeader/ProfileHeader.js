import React from "react";
import { X } from "lucide-react";
import { useTheme } from '../../../../../../../../../Layout/ThemeContext/ThemeContext'; // Import the theme context


export default function ProfileHeader({ setIsPopoverOpen, setIsProfileData }) {
  const { isDarkMode } = useTheme(); // Access the dark mode state

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className={`font-medium sm:text-2xl text-lg text-${isDarkMode ? '[#FFFFFFCC]' : 'gray-600'} `}>My Info</h1>
        <div
          onClick={() => {
            setIsProfileData(false);
            setIsPopoverOpen(true);
          }}
          className="cursor-pointer"
        >
          <X className={`h-5 w-5 cursor-pointer ${
            isDarkMode ? "text-[#FFFFFFFF] text-opacity-80" : "text-gray-800"
          }`} />
        </div>
      </div>

      {/* Divider Line */}
      <div className="h-[1px] w-full bg-[#0000001A] my-4"></div>
    </>
  );
}
