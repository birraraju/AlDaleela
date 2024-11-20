import React from "react";
import leaderboard from "../../../../../../../assets/Leaderboard.svg";
import DarkLeaderboard from "../../../../../../../assets/DarkLeaderboard.svg"; // Import the Leaderboard icon
import { useTheme } from '../../../../../ThemeContext/ThemeContext'; // Import the theme hook

export default function Leaderboard({ setIsLeaderboard, setIsPopoverOpen }) {
  const { isDarkMode,isLangArab } = useTheme(); // Use the theme hook to get dark mode state

  return (
    <div className="py-1 cursor-pointer">
      <div
        onClick={() => {
          setIsLeaderboard(true);
          setIsPopoverOpen(false);
        }}
        className="flex justify-start gap-2 items-center"
      >
        <div>
        <img
         src={isDarkMode ? DarkLeaderboard : leaderboard }
         alt="Leaderboard" className="w-5" />
                 </div>
        <p
          className={`${
            isLangArab
              ? "font-medium font-omnes text-[14px] tab:text-[12px] laptop_s:text-[14px] tracking-widget"
              : "font-medium font-omnes text-[16px] tab:text-[14px] laptop_s:text-[16px] tracking-widget"
          }  ${
            isDarkMode ? "text-gray-300" : "text-[#505050]"
          }`}
        >          {isLangArab?"لوحة المتصدرين":"Leaderboard"}</p>
      </div>
    </div>
  );
}
