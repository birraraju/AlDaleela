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
import ProfileMenu from "./ProfileMenus/ProfileDetails/ProfilePage/ProfileMenu/ProfileMenu";
import ProfileMenus from "./ProfileMenus/ProfileMenus";
import SendFeedBack from "../../../../../components/Sidelayout/FeedLayout/FeedBackMain";

const Profile = ({  isFooterOpen, isHeaderOpen, StackOpen,isProfileOpen }) => {
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
  const [isProfile, setIsProfile] = useState(true);
  const { role, setRole } = useAuth();

  useEffect(() => {
    if (isPopoverOpen || isLeaderboard || isAboutUs || isProfileData || isContactUs || isContribution || isProfile || isEditProfile || isFeedBack || isChangePassword || isSuccess) {
      isHeaderOpen();
    }
  }, [isAboutUs, isChangePassword, isContactUs, isContribution, isEditProfile, isFeedBack, isLeaderboard, isPopoverOpen, isProfile, isProfileData, isSuccess]);

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

  useEffect(()=>{
    if(isPopoverOpen){
      isProfileOpen(isPopoverOpen)
    }else{
      isProfileOpen(isPopoverOpen)
    }
  },[isPopoverOpen])

  const toggleAuthenticator = () => {
    setShowAuthenticator(!showAuthenticator);
    setIsPopoverOpen(false);
  };

  const handleCloseProfile = () => {
    setIsPopoverOpen(false);
  };

  const handleLogout = () => {
    setRole(null);
  };

  return (
    <>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <div
            onClick={() => setIsPopoverOpen(true)}
            className="relative w-40 bg-white bg-opacity-5 backdrop-blur rounded-full flex justify-between items-center mobile_s:py-0.5 laptop_m:py-1 cursor-pointer"
          >
            <div className="ml-1">
              <img
                src={`/Header/Profile/${role === "admin" ? "admin.png" : "profile.png"}`}
                alt="Profile"
                className="mobile_s:w-8 laptop_m:w-9"
              />
            </div>
            <div className="mobile_s:ml-2 laptop_m:ml-4">
              {role === "admin" ? "Hamad" : "Profile"}
            </div>
            <div className="mobile_s:mx-2 laptop_m:mx-4">
              <IoMdArrowDropdown
                className={`text-xl ${isPopoverOpen && "rotate-360"} transition-all ease-in-out duration-500`}
              />
            </div>
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-80 bg-white mt-3 border border-white bg-opacity-65 backdrop-blur-md p-4 text-black text-opacity-60 rounded-3xl shadow-lg z-10 mr-8">
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

          {/* Login Button */}
          {role === null ? (
            <div
              onClick={toggleAuthenticator}
              className="py-3 w-full flex items-center justify-center custom-gradient text-white font-semibold text-lg rounded-2xl cursor-pointer"
            >
              Login
            </div>
          ) : (
            <div onClick={handleLogout} className="flex justify-start items-center gap-2">
              <HiOutlineLogout className="mx-1 text-2xl" />
              <p className="font-medium font-omnes text-[#505050] text-[18px] cursor-pointer">Logout</p>
            </div>
          )}
        </PopoverContent>
      </Popover>

      <AnimatePresence>
        {showAuthenticator && (
          <Login onClose={() => setShowAuthenticator(false)} />
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
        {isProfileData && (
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
          />
        )}
        {isFeedBack && (
          <SendFeedBack setIsPopoverOpen={setIsPopoverOpen} setIsFeedBack={setIsFeedBack} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Profile;
