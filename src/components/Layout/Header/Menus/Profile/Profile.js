import AboutusSidelayout from "../../../../../components/Sidelayout/AboutusSidelayout/AboutusSidelayout";
import LeaderboardSlideout from "../../../../../components/Sidelayout/LeaderboardSlideout/LeaderboardSlideout";
import ContactUsSidelayout from "../../../../../components/Sidelayout/ContactusSidelayout/ContactusSidelayout";
import ContributionSidelayout from "../../../../../components/Sidelayout/ContributionSidelayout/ContributionSidelayout";
import { Popover, PopoverContent } from "../../../../../components/ui/popover";
import { useAuth } from "../../../../../Providers/AuthProvider/AuthProvider";
import { PopoverPortal, PopoverTrigger } from "@radix-ui/react-popover";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
import Login from "../../../../Popups/Login/Login";
import ProfileDetails from "./ProfileMenus/ProfileDetails/ProfileDetails";
import {UserActivityLog} from "../../../../Common/UserActivityLog";
import ProfileMenu from "./ProfileMenus/ProfileDetails/ProfilePage/ProfileMenu/ProfileMenu";
import ProfileMenus from "./ProfileMenus/ProfileMenus";
import SendFeedBack from "../../../../../components/Sidelayout/FeedLayout/FeedBackMain";
import { useTheme } from '../../../ThemeContext/ThemeContext'; // Import the theme hook
import SmallLogo from '../../../../../assets/Header/Profile/profileSmalllogo.svg';
import AdminLogo from '../../../../../assets/Header/Profile/admin.png';
import ProfileLogo from '../../../../../assets/Header/Profile/profile.png';
import PopModal from "../../../../Common/SuccessFailureMessageModel";
import { useNavigate } from 'react-router-dom';
import Toast from '../../../../Common/taost';


const Profile = ({  isFooterOpen, isHeaderOpen, StackOpen,isProfileInOpen }) => {
  const [showAuthenticator, setShowAuthenticator] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isLeaderboard, setIsLeaderboard] = useState(false);
  const [isAboutUs, setIsAboutUs] = useState(false);
  const [isProfileData, setIsProfileData] = useState(false);
  const [isContactUs, setIsContactUs] = useState(false);
  const [isContribution, setIsContribution] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isFeedBack, setIsFeedBack] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [isProfile, setIsProfile] = useState(true);
  const { role, setRole ,setIsEditPOI} = useAuth();
  const {profiledetails , setprofiledetails} = useAuth()
  const { isDarkMode,isLangArab,setIsLogin,isLogin,isSignup,setsSignup,showToast,toastMessage } = useTheme(); // Use the theme hook
  const [isMsgStatus, setIsMsgStatus] = useState("");
  const [modalMessage, setModalMessage] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    if (isPopoverOpen || isLeaderboard || isAboutUs || isProfileData || isContactUs || isContribution || isProfile || isEditProfile || isFeedBack || isChangePassword || isSuccess) {
      isHeaderOpen();
    }
  }, [profiledetails,isAboutUs, isChangePassword, isContactUs, isContribution, isEditProfile, isFeedBack, isLeaderboard, isPopoverOpen, isProfile, isProfileData, isSuccess]);

  useEffect(() => {
    if ( isFooterOpen || StackOpen) {
      setIsPopoverOpen(false);
      setIsLeaderboard(false);
      setIsAboutUs(false);
      setIsProfileData(false);
      setIsContactUs(false);
      setIsContribution(false);
      setIsEditProfile(false);
      setIsFeedBack(false);
      setIsSuccess(false);
      setIsProfile(false);
    }
  }, [ isFooterOpen, StackOpen]);

  

  useEffect(() => {
    if ((isProfileInOpen||isProfileInOpen) && typeof isProfileInOpen === "function") {
      isProfileInOpen(isPopoverOpen);
    }
  }, [isPopoverOpen]);

  // useEffect(()=>{
  //   if(!isChangePassword || isSuccess){
  //     setIsProfileData(false)
  //   }
  // },[isChangePassword,isSuccess])

  useEffect(()=>{
    if(isProfileData){
      setIsProfile(true);
    }

    if(isLogin || isSignup){
      setShowAuthenticator(true);
    setIsPopoverOpen(false);
    }
    
  },[isProfileData,isLogin,isSignup])

  const HandleLocalDetails = () => {
    // Retrieve the user details from localStorage
    const Userdetails = localStorage.getItem("AldaleelaUserDetails:");
  
    // Check if Userdetails exist and parse it to an object
    if (Userdetails) {
      const parsedDetails = JSON.parse(Userdetails);
  
      // If the role is not set and exists in the local storage data, set it
      if (role == null && parsedDetails.role && parsedDetails.useractive) {
        setRole(parsedDetails.role);
      }

      if(profiledetails == null){
        setprofiledetails(parsedDetails)
      }
  
      // Log the user's role
      //console.log("User Local Details:", parsedDetails.role);
    }
  };
  
  useEffect(() => {
    // Call HandleLocalDetails if the role is not already set
    if (role == null) {
      HandleLocalDetails();
    }
  }, [role]);

  const handleLoginClose = ()=>{
    setIsLogin(false)
    setIsEditPOI()
    setsSignup(false)
    setShowAuthenticator(false);
    navigate({
      pathname: `/${process.env.REACT_APP_BASE_URL}`,
    });
  }
  
  

  const toggleAuthenticator = () => {
    setShowAuthenticator(!showAuthenticator);
    setIsPopoverOpen(false);
  };

  const handleCloseProfile = () => {
    setIsPopoverOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("AldaleelaRole");
    localStorage.removeItem("AldaleelaUserDetails:");

    setRole(null);
    setprofiledetails(null);
    UserActivityLog(profiledetails, "Logged out")
  };

  // console.log("Profile Data:1",isProfileData," 2",isChangePassword,"3",isSuccess)
  console.log("Role Profile:",role)

  return (
    <>
    <div dir={isLangArab ? "rtl" : "ltr"}>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
        <div
            onClick={() => setIsPopoverOpen(true)}
            className={`relative  ${isDarkMode ? "sm:bg-black" : "sm:bg-white"} 
                        sm:bg-opacity-5 backdrop-blur rounded-full flex justify-between items-center 
                        mobile_s:py-0.5 laptop_m:py-1 cursor-pointer ${isLangArab && " sm:mr-2 laptop_s:mr-0 laptop_m:mr-2 "}`}
          >
            <div className={`${isLangArab?"mr-1 ml-1":"ml-1"}  sm:hidden grid`}>
            <img
              src={SmallLogo}
              alt="Profile"
              className="mobile_s:w-8 block sm:hidden laptop_m:w-9 text-black"
            />
            </div>
            <div className={`${isLangArab?"mr-1 ml-1":"ml-1"} hidden sm:block`}>
              <img
                //src={`${((role === "admin")||(role === "user")) ? AdminLogo : ProfileLogo}`} // الملف الشخصي
                src={profiledetails && profiledetails.imageUrl ? profiledetails.imageUrl : AdminLogo}
                alt="Profile"
                className="mobile_s:w-14 mobile_s:h-7 tab_l:w-10 tab_l_1:w-7  tab:w-20 tab:h-7 tab:h- laptop_s:w-6 laptop_s:h-6 laptop_m:w-6 laptop_m:h-6 w-8 h-8 rounded-full object-cover"
              />
            </div>
            {/* <div className="mobile_s:ml-2 hidden sm:block laptop_m:ml-2">
              <p className= {` ${isLangArab?"text-[9px] sm:text-[11px] laptop_s:text-[14px]":"text-[9px] sm:text-[14px] laptop_s:text-[11px] laptop_m:text-[14px] "} `}>{role !== null ? (profiledetails.username ? profiledetails.username: profiledetails.username === "" && profiledetails.firstName) : (isLangArab ? "الملف الشخصي":"Profile")}</p>
            </div> */}
            <div className="mobile_s:ml-2 hidden sm:block laptop_m:ml-2">
  <p
    className={`truncate max-w-[45px] laptop_s:max-w-max overflow-hidden text-ellipsis ${
      isLangArab
        ? "text-[9px] sm:text-[11px] laptop_s:text-[14px]"
        : "text-[9px] sm:text-[14px] laptop_s:text-[11px] laptop_m:text-[14px]"
    }`}
    title={role !== null && profiledetails.username ? profiledetails.username : ""}
  >
    {role !== null
      ? profiledetails.username
        ? profiledetails.username
        : profiledetails.username === "" && profiledetails.firstName
      : isLangArab
      ? "الملف الشخصي"
      : "Profile"}
  </p>
</div>

            <div className="mobile_s:mx-2 sm:block hidden laptop_m:mx-2">
              <IoMdArrowDropdown
                className={`text-xl ${isPopoverOpen && "rotate-360"} transition-all ease-in-out duration-500`}
              />
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent
          className={` mt-3 w-[240px]  ${isLangArab?" mobile_s:w-[240px] sm:ml-8 ml-2 ":"sm:mr-8 mr-2 mobile_s:w-[250px]"} tab:w-[250px] laptop_s:w-[260px] laptop_m:w-[258px] border bg-opacity-90
                      ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-white"}
                      backdrop-blur-xl p-4 rounded-2xl shadow-lg z-10 `}
        >
        <ProfileDetails
            role={role}
            setIsPopoverOpen={setIsPopoverOpen}
            isProfileData={isProfileData}
            setIsProfileData={setIsProfileData}
          />
          <ProfileMenus
            role={role}
            closeProfile={handleCloseProfile}
            setIsAboutUs={setIsAboutUs}
            setIsLeaderboard={setIsLeaderboard}
            setIsContactUs={setIsContactUs}
            setIsContribution={setIsContribution}
            setIsPopoverOpen={setIsPopoverOpen}
            setIsFeedBack={setIsFeedBack}
            
          />
    <div dir={isLangArab ? "rtl" : "ltr"}>

          {/* Login Button */}
          {role === null ? (
            <div
              onClick={toggleAuthenticator}
              className="py-2 w-full flex items-center justify-center custom-gradient text-[#FFFFFF] font-500 text-[16px] rounded-lg cursor-pointer"
            >
              {isLangArab?"تسجيل الدخول" :"Login"}
            </div>
          ) : (
            <div onClick={handleLogout} className="flex cursor-pointer justify-start items-center gap-2">
      <HiOutlineLogout
        className={`mx-1 ${isLangArab && " rotate-180"}  text-[20px] ${isDarkMode ? "border-white  border-opacity-80 text-white" : ""}`}
        style={{ color: isDarkMode ? '#FFFFFFCC' : '#505050' }}
      />
              <p className={`font-500   text-[14px] tab:text-[12px] laptop_s:text-[16px] ${isDarkMode ? "text-gray-300" : "text-[#505050]"}`}>
              {isLangArab?"تسجيل الخروج":"Logout"}</p>
            </div>
          )}
          </div>
        </PopoverContent>
      </Popover>

      <AnimatePresence>
        {showAuthenticator && (
          <Login setIsMsgStatus={setIsMsgStatus}
          setModalMessage={setModalMessage}  setIsSuccess={setIsSuccess} onClose={() => {handleLoginClose()}} />
        )}
        {isLeaderboard && (
          <LeaderboardSlideout
            setIsPopoverOpen={setIsPopoverOpen}
            setIsLeaderboard={setIsLeaderboard}
          />
        )}
        {isAboutUs && (
          <AboutusSidelayout
            setIsPopoverOpen={setIsPopoverOpen}
            setIsAboutUs={setIsAboutUs}
          />
        )}
        {isContactUs && (
          <ContactUsSidelayout
            setIsPopoverOpen={setIsPopoverOpen}
            setIsContactUs={setIsContactUs}
          />
        )}
        {isContribution && (
          <ContributionSidelayout
            setIsPopoverOpen={setIsPopoverOpen}
            setIsContribution={setIsContribution}
          />
        )}
        { isProfileData  && (
          <ProfileMenu
            isProfile={isProfile}
            setIsPopoverOpen={setIsPopoverOpen}
            setIsEditProfile={setIsEditProfile}
            isEditProfile={isEditProfile}
            isChangePassword={isChangePassword}
            setIsChangePassword={setIsChangePassword}
            setIsProfile={setIsProfile}
            setIsSuccess={setIsSuccess}
            isSuccess={isSuccess}
            setIsProfileData={setIsProfileData}
            setIsFailure={setIsFailure}
            isFailure={isFailure}
            setIsMsgStatus={setIsMsgStatus}
            setModalMessage={setModalMessage}
          />
        )}
        {isFeedBack && (
          <SendFeedBack setIsPopoverOpen={setIsPopoverOpen} setIsFeedBack={setIsFeedBack} setIsSuccess={setIsSuccess} setIsMsgStatus={setIsMsgStatus} setModalMessage={setModalMessage} />
        )}

          <PopModal
            message={modalMessage} // Pass the message from state
            success={isMsgStatus} // Pass "Success" or "Failed" status
            isOpenModal={isSuccess || isFailure} // Modal is open if either isSuccess or isFailure is true
            onClose={() => {
              setIsSuccess(false); // Close success modal
              setIsFailure(false);
              setIsPopoverOpen(true)
            }}
          />
          <Toast 
    message={toastMessage} 
    showToast={showToast} 
     // Reset `showToast` after display
  />
      </AnimatePresence>
      </div>
    </>
  );
};

export default Profile;
