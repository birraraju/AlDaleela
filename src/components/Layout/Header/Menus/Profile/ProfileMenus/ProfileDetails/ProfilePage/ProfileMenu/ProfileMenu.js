'use client'

import { useEffect, useRef, useState } from "react";
import ChangePassword from "../../ChangePassword/ChangePassword";
import SuccessMessage from "../../SuccessMessage/SuccessMessage";
import FailureMessage from "../../SuccessMessage/FailureMessage/FailureMessage";

import ProfilePage from "../ProfilePage";
import { useTheme } from '../../../../../../../../Layout/ThemeContext/ThemeContext'; // Import the theme context

export default function ProfileMenu({
  isProfile,
  setIsPopoverOpen,
  setIsEditProfile,
  isEditProfile,
  isChangePassword,
  setIsChangePassword,
  setIsProfile,
  setIsSuccess,
  isSuccess,
  setIsProfileData,
  setIsFailure,
  isFailure
}) {
  const menuRef = useRef(null);
  const { isDarkMode } = useTheme(); // Access the dark mode state
  const [ChangeCloseProfile,setChangeCloseProfile] = useState(false);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsPopoverOpen(false);
        setIsProfileData(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsPopoverOpen, setIsProfileData]);

  return (
    <div
      ref={menuRef}
      className="fixed sm:inset-10 inset-1 flex items-center justify-center"
    >
      <div className={`-translate-y-5 sm:-translate-y-0 sm:h-auto  p-4 backdrop-blur w-[40rem] text-black rounded-xl max-w-md ${
        isDarkMode
          ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none"
          : "bg-white bg-opacity-70 backdrop-blur-lg border-white"
      }`}>
        {(isProfile&& !ChangeCloseProfile) && (
          <ProfilePage
            setIsPopoverOpen={setIsPopoverOpen}
            setIsEditProfile={setIsEditProfile}
            isEditProfile={isEditProfile}
            isChangePassword={isChangePassword}
            setIsChangePassword={setIsChangePassword}
            setIsProfile={setIsProfile}
            setIsProfileData={setIsProfileData}
            setChangeCloseProfile={setChangeCloseProfile}
          />
        )}

        {(isChangePassword && ChangeCloseProfile) && (
          <ChangePassword
            setIsPopoverOpen={setIsPopoverOpen}
            setChangeCloseProfile={setChangeCloseProfile}
            setIsEditProfile={setIsEditProfile}
            isEditProfile={isEditProfile}
            isChangePassword={isChangePassword}
            setIsChangePassword={setIsChangePassword}
            setIsSuccess={setIsSuccess}
            setIsProfile={setIsProfile}
            setIsFailure={setIsFailure}
          />
        )}

        {isSuccess && (
          <SuccessMessage
            setIsProfile={setIsProfile}
            setIsSuccess={setIsSuccess}
          />
        )}
        {isFailure &&
          (<FailureMessage setIsProfile={setIsProfile} setIsFailure={setIsFailure} />)
        }
      </div>
    </div>
  );
}
