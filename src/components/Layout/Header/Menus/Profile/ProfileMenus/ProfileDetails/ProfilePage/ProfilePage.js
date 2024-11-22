import { useEffect, useState } from "react";
import BasicInformation from "./ProfileMenu/BasicInformation/BasicInformation";
import ProfileContent from "./ProfileMenu/ProfileContent/ProfileContent";
import ProfileHeader from "./ProfileMenu/ProfileHeader/ProfileHeader";
import { useAuth } from "../../../../../../../../Providers/AuthProvider/AuthProvider";
import SampleImageProfile from "../../../../../../../../assets/Header/Profile/ProfileDetails/Profile.svg"

export default function ProfilePage({
  setIsPopoverOpen,
  setIsEditProfile,
  isEditProfile,
  isChangePassword,
  setIsChangePassword,
  setIsProfile,
  setIsProfileData,
        setModalMessage,
        setChangeCloseProfile,setIsSuccess,setIsFailure,setIsMsgStatus,
}) {

  const [profileImage, setProfileImage] = useState(SampleImageProfile); // State to manage the profile image
  const [file, setFile] = useState(null);
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
      setProfileImage={setProfileImage}
      profileImage={profileImage}
      setFile={setFile}
      file={file}
      
        setIsProfile={setIsProfile}
        setIsEditProfile={setIsEditProfile}
        isEditProfile={isEditProfile}
        isChangePassword={isChangePassword}
        setIsChangePassword={setIsChangePassword}
        setChangeCloseProfile={setChangeCloseProfile}
      />
      <BasicInformation
      profileImage={profileImage}
        setIsProfile={setIsProfile}
        setIsEditProfile={setIsEditProfile}
        isEditProfile={isEditProfile}
        setIsSuccess={setIsSuccess}
        setIsFailure={setIsFailure}
        setIsMsgStatus={setIsMsgStatus}
        setModalMessage={setModalMessage}
        setIsProfileData={setIsProfileData}
        file={file}
      />
    </div>
  );
}
