import React from "react";
import { useTheme } from '../../../../../ThemeContext/ThemeContext'; // Import the theme hook
import ContributionIcon from "../../../../../../../assets/Contribution.svg"; // Update with the correct path for the contribution icon
import DarkContribution from "../../../../../../../assets/DarkContribution.svg"; // Update with the correct path for the contribution icon

export default function Contribution({ setIsContribution, setIsPopoverOpen }) {
  const { isDarkMode,isLangArab } = useTheme(); // Use the theme hook to get dark mode state

  return (
    <div className="py-5 cursor-pointer">
      <div
        onClick={() => {
          setIsContribution(true);
          setIsPopoverOpen(false);
        }}
        className="flex justify-start gap-2 items-center"
      >
        <div>
        <img
           src={isDarkMode ? DarkContribution : ContributionIcon }

            alt="Contribution" className="w-7" />
                    </div>
        <p
          className={`font-medium font-omnes text-[18px] ${
            isDarkMode ? "text-gray-300" : "text-[#505050]"
          }`}
        >          {isLangArab?"المساهمة":"Contribution"}</p>
      </div>
    </div>
  );
}
