import { useEffect } from "react";
import BasicInformation from "./ProfileMenu/BasicInformation/BasicInformation";
import ProfileContent from "./ProfileMenu/ProfileContent/ProfileContent";
import ProfileHeader from "./ProfileMenu/ProfileHeader/ProfileHeader";
import { useAuth } from "../../../../../../../../Providers/AuthProvider/AuthProvider";

export default function ProfilePage({
  setIsPopoverOpen,
  setIsEditProfile,
  isEditProfile,
  isChangePassword,
  setIsChangePassword,
  setIsProfile,
  setIsProfileData,
  setChangeCloseProfile
}) {
  const {profiledetails} = useAuth()
  useEffect(() => {

  },[profiledetails]);
  return (
    <div>
      <ProfileHeader
        setIsProfileData={setIsProfileData}
        setIsProfile={setIsProfile}
        isEditProfile={isEditProfile}
        setIsPopoverOpen={setIsPopoverOpen}
        setIsEditProfile={setIsEditProfile}
      />
      <ProfileContent
        setIsProfile={setIsProfile}
        setIsEditProfile={setIsEditProfile}
        isEditProfile={isEditProfile}
        isChangePassword={isChangePassword}
        setIsChangePassword={setIsChangePassword}
        setChangeCloseProfile={setChangeCloseProfile}
      />
      <BasicInformation
        setIsProfile={setIsProfile}
        setIsEditProfile={setIsEditProfile}
        isEditProfile={isEditProfile}
      />
    </div>
  );
}
