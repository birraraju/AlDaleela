import { useAuth } from "../../../../../../../Providers/AuthProvider/AuthProvider";
import { useTheme } from '../../../../../ThemeContext/ThemeContext'; // Import the theme hook
export default function ProfileDetails({
  role,
  setIsPopoverOpen,
  setIsProfileData,
}) {
  const {profiledetails} = useAuth()
  const { isDarkMode, isLangArab } = useTheme(); // Access dark mode state

  return (
    <>
    <div dir={isLangArab ? "rtl" : "ltr"}>
      {((role !== null)&&(profiledetails !== null)) && (
        <div
          onClick={() => {
            setIsPopoverOpen(false);
            setIsProfileData(true);
          }}
          className="flex justify-start items-center gap-2"
        >
          <div className=" w-12 h-12">
            <img src={`${process.env.PUBLIC_URL}/Header/Profile/ProfileDetails/Profile.svg`} alt="" className=" w-full h-full" />
          </div>

          <div className="flex flex-col cursor-pointer gap-1">

          <p
              className={` font-bold text-lg tracking-wider ${
                isDarkMode ? "text-gray-200" : "text-[#505050]"
              }`}
            >              {profiledetails.username ? profiledetails.username: profiledetails.username === "" && profiledetails.firstName}
            </p>
            <p
              className={`  text-sm tracking-wider ${
                isDarkMode ? "text-gray-200" : "text-[#505050]"
              }`}
            >               {profiledetails.email}</p>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

