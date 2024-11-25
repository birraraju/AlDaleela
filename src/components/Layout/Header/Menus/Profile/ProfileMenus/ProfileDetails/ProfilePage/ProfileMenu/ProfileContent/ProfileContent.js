import React, { useState } from "react";
import { Button } from "../../../../../../../../../../components/ui/button";
import { useAuth } from "../../../../../../../../../../Providers/AuthProvider/AuthProvider";
import { useTheme } from '../../../../../../../../../Layout/ThemeContext/ThemeContext'; // Import the theme context
// import SampleImageProfile from "../../../../../../../../../../assets/Header/Profile/ProfileDetails/Profile.svg"

export default function ProfileContent({ 
  isEditProfile, 
  setIsEditProfile, 
  setIsChangePassword, 
  setIsProfile,
  setChangeCloseProfile,
  setProfileImage,
  profileImage,
  setFile
}) {
  const { profiledetails } = useAuth();
  const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state
  const [UploadprofileImage, setUploadProfileImage] = useState(null); // State to manage the profile image
  // const [file, setFile] = useState(null);

  // Handle file change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
  
    // Check if a file is selected
    if (selectedFile) {
      // Check if the file size is less than or equal to 2MB (2MB = 2 * 1024 * 1024 bytes)
      if (selectedFile.size <= 2 * 1024 * 1024) {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadProfileImage(e.target.result)
          setProfileImage(e.target.result); // Update profile image preview
        };
        reader.readAsDataURL(selectedFile);
      } else {
        // If the file exceeds 2MB, alert the user
        alert("File size should not exceed 2MB.");
        // Optionally, clear the input or reset it
        event.target.value = null; // This will reset the file input
      }
    }
  };
  

  return (
    <>
      {!isEditProfile ? (
        <div className="flex justify-between items-center gap-4">
          <div className="w-[20%]">
            <img 
              // src={`${process.env.PUBLIC_URL}/Header/Profile/ProfileDetails/Profile.svg`}
              src={profiledetails && profiledetails.imageUrl ? profiledetails.imageUrl : `${process.env.PUBLIC_URL}/Header/Profile/ProfileDetails/Profile.svg`}
              alt="Profile"
              className="sm:w-[70px] w-18 h-18 sm:h-[70px] rounded-full sm:rounded-full object-cover"
            />
          </div>

          <div className="w-[80%]">
            <div className="tracking-wide">
              <h1 className={`sm:text-[18px] text-[14px]   font-500 text-${isDarkMode ? 'white' : '[#000000]'} `}>
                {profiledetails.username ? profiledetails.username : profiledetails.firstName}
              </h1>
              <p className={`sm:text-[16px] text-[14px] font-400 text-${isDarkMode ? '[#FFFFFFCC]' : '[#00000099]'} `}>

                {profiledetails.email}
              </p>
            </div>

            <div className="flex justify-between items-center gap-4">
              <Button onClick={() => { setIsEditProfile(true); }} asChild>
                <div className="w-2/3 h-10 py-5 cursor-pointer   font-500 btn-gradient text-white text-[14px] rounded-xl mt-4 tracking-wide">
                  {isLangArab ? "تعديل المعلومات" : "Edit Info"}
                </div>
              </Button>

              <Button
                onClick={() => {
                  setIsChangePassword(true);
                  setIsProfile(false);
                  setChangeCloseProfile(true);
                }}
                variant="outline"
                className={`w-1/2 sm:h-10 h-9 bg-none   font-500  shadow-none sm:rounded-xl rounded-md mt-4 tracking-wide  sm:text-[14px] text-xs border border-[#909090] text-${isDarkMode ? '[#FFFFFFCC]' : '[#1C1C1C]'} `}
              >
                {isLangArab ? "تغيير كلمة المرور" : "Change Password"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <div className="relative h-28 w-28 rounded-full overflow-hidden">
            <img
              src={UploadprofileImage ? UploadprofileImage :( profiledetails && profiledetails.imageUrl ? profiledetails.imageUrl : profileImage)}
              alt="Admin"
              className="w-full h-full rounded-full"
            />
            <div className="absolute bottom-0 right-0">
              <svg
                width="118"
                height="39"
                viewBox="0 0 118 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.00585938 0.556641C9.87425 23.143 32.4117 38.9273 58.6357 38.9273C84.8598 38.9273 107.397 23.143 117.266 0.556641H0.00585938Z"
                  fill="black"
                  fillOpacity="0.7"
                />
              </svg>
            </div>
            <p
              className="text-white absolute bottom-2 left-10 cursor-pointer"
              onClick={() => document.getElementById("fileInput").click()} // Open file input on click
            >
              {isLangArab ? "تعديل" : "Edit"}
            </p>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
