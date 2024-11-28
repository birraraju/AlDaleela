import React from "react";
import { X } from "lucide-react";
import { useTheme } from '../../../../../../../../../Layout/ThemeContext/ThemeContext'; // Import the theme context


export default function ProfileHeader({ setIsPopoverOpen,setIsEditProfile,setIsProfile,isEditProfile, setIsProfileData }) {
  const { isDarkMode,isLangArab } = useTheme(); // Access the dark mode state

  const handleProfileClose=()=>{
    if(isEditProfile){
      setIsEditProfile(false);
            setIsProfile(true);
    }else{
      setIsProfileData(false);
      setIsPopoverOpen(true);
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className={`font-500    sm:text-[16px] text-lg ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#000000CC]'} `}>{isLangArab?"معلوماتي":"My Info"}</h1>
        <div
          onClick={() => {handleProfileClose()          
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
