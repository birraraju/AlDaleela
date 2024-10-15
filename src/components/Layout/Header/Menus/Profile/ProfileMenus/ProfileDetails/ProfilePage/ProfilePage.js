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
  setIsProfileData
}) {
  const {profiledetails} = useAuth()
  useEffect(() => {

  },[profiledetails]);
  return (
    <div>
      <ProfileHeader
        setIsProfileData={setIsProfileData}
        setIsPopoverOpen={setIsPopoverOpen}
      />
      <ProfileContent
        setIsProfile={setIsProfile}
        setIsEditProfile={setIsEditProfile}
        isEditProfile={isEditProfile}
        isChangePassword={isChangePassword}
        setIsChangePassword={setIsChangePassword}
      />
      <BasicInformation
        setIsProfile={setIsProfile}
        setIsEditProfile={setIsEditProfile}
        isEditProfile={isEditProfile}
      />
    </div>
  );
}
