import React from "react";
import { useTheme } from '../../../../../ThemeContext/ThemeContext'; // Import the theme hook
import ContributionIcon from "../../../../../../../assets/Contribution.svg"; // Update with the correct path for the contribution icon
import DarkContribution from "../../../../../../../assets/DarkContribution.svg"; // Update with the correct path for the contribution icon

export default function Contribution({ setIsContribution, setIsPopoverOpen }) {
  const { isDarkMode,isLangArab } = useTheme(); // Use the theme hook to get dark mode state

  return (
    <div className="py-2 cursor-pointer">
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

            alt="Contribution" className="w-5" />
                    </div>
        <p
          className={`${
            isLangArab
              ? "font-medium font-omnes text-[14px] tab:text-[12px] laptop_s:text-[14px]"
              : "font-medium font-omnes text-[16px] tab:text-[14px] laptop_s:text-[16px]"
          }  ${
            isDarkMode ? "text-gray-300" : "text-[#505050]"
          }`}
        >          {isLangArab?"المساهمة":"Contribution"}</p>
      </div>
    </div>
  );
}
