import React from "react";
import { X } from "lucide-react";
import ChangePasswordForm from "./ChangePasswordForm/ChangePasswordForm";
import { useTheme } from "../../../../../../../Layout/ThemeContext/ThemeContext"; // Import your theme context


export default function ChangePassword({ setIsProfileData,setModalMessage,setIsChangePassword,setIsFailure,setIsMsgStatus,setIsPopoverOpen,setChangeCloseProfile, setIsSuccess, setIsProfile }) {
  const { isDarkMode,isLangArab } = useTheme(); // Access dark mode from theme context

  return (
    <>
      <div className="flex justify-between items-center px-2 py-2">
        <h1 className={`font-medium sm:text-[16px] text-lg ${
              isDarkMode ? "text-white" : "text-gray"
            }`}>{isLangArab ?"تغيير كلمة المرور":"Change Password"}</h1>
        <div
          onClick={() => {setChangeCloseProfile(false);
            setIsProfile(true);}
          }
          className="cursor-pointer"
        >
          <X className={`${
            isDarkMode ? "text-white" : "text-[#505050]"
          }`} />
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-[#0000001A] my-2"></div>

      <ChangePasswordForm
      setIsFailure={setIsFailure}
      setIsProfileData={setIsProfileData}
      setIsMsgStatus={setIsMsgStatus}
        setIsChangePassword={setIsChangePassword}
        setChangeCloseProfile={setChangeCloseProfile}
        setIsSuccess={setIsSuccess}
        setIsProfile={setIsProfile}
        setModalMessage={setModalMessage}
      />
    </>
  );
}
