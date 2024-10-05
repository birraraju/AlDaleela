'use client'

import { useEffect, useRef } from "react";
import ChangePassword from "../../ChangePassword/ChangePassword";
import SuccessMessage from "../../SuccessMessage/SuccessMessage";
import ProfilePage from "../ProfilePage";

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
}) {
  const menuRef = useRef(null);

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
      className="fixed inset-10 flex items-center justify-center"
    >
      <div className="bg-white bg-opacity-70 p-4 backdrop-blur w-[40rem] text-black rounded-xl max-w-md">
        {isProfile && (
          <ProfilePage
            setIsPopoverOpen={setIsPopoverOpen}
            setIsEditProfile={setIsEditProfile}
            isEditProfile={isEditProfile}
            isChangePassword={isChangePassword}
            setIsChangePassword={setIsChangePassword}
            setIsProfile={setIsProfile}
            setIsProfileData={setIsProfileData}
          />
        )}

        {isChangePassword && (
          <ChangePassword
            setIsPopoverOpen={setIsPopoverOpen}
            setIsEditProfile={setIsEditProfile}
            isEditProfile={isEditProfile}
            isChangePassword={isChangePassword}
            setIsChangePassword={setIsChangePassword}
            setIsSuccess={setIsSuccess}
            setIsProfile={setIsProfile}
          />
        )}

        {isSuccess && (
          <SuccessMessage
            setIsProfile={setIsProfile}
            setIsSuccess={setIsSuccess}
          />
        )}
      </div>
    </div>
  );
}
