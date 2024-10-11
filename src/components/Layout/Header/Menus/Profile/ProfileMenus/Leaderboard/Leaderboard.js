import React from "react";
import leaderboard from "../../../../../../../assets/Leaderboard.svg";
import DarkLeaderboard from "../../../../../../../assets/DarkLeaderboard.svg"; // Import the Leaderboard icon
import { useTheme } from '../../../../../ThemeContext/ThemeContext'; // Import the theme hook

export default function Leaderboard({ setIsLeaderboard, setIsPopoverOpen }) {
  const { isDarkMode } = useTheme(); // Use the theme hook to get dark mode state

  return (
    <div className="py-2 cursor-pointer">
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
         alt="Leaderboard" className="w-7" />
                 </div>
        <p
          className={`font-medium font-omnes text-[18px] ${
            isDarkMode ? "text-gray-300" : "text-[#505050]"
          }`}
        >          Leaderboard</p>
      </div>
    </div>
  );
}
