import { Link } from "react-router-dom"; // Import Link from react-router-dom
import React from "react";
import { useTheme } from '../../../../../ThemeContext/ThemeContext'; // Import the theme hook
import DarkAdministration from "../../../../../../../assets/DarkAdminstration.svg"; // Import the DarkAdministration
import administration from "../../../../../../../assets/Header/Profile/Administration.svg"; // Import the administration
export default function Administration() {
  const { isDarkMode,isLangArab } = useTheme(); // Use the theme hook to get dark mode state

  return (
    <div className="pt-2  pb-2 cursor-pointer">
      <div className="flex justify-start gap-2 items-center">
        <div>
        <img
           src={isDarkMode ? DarkAdministration : administration }

            alt="" className="w-7" />
                    </div>
        <Link to="/admin"> {/* Use Link instead of <a> */}
        <p
            className={`font-medium font-omnes text-[18px] ${
              isDarkMode ? "text-gray-300" : "text-[#505050]"
            }`}
          >            {isLangArab?"الإدارة":"Administration"}</p>
        </Link>
      </div>
    </div>
  );
}
