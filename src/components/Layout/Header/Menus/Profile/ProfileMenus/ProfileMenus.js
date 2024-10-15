import AboutUs from "./AboutUs/AboutUs";
import Administration from "./Administration/Administration";
import ContactUs from "./ContactUs/ContactUs";
import Contribution from "./Contribution/Contribution"; // Import Contribution component
import Leaderboard from "./Leaderboard/Leaderboard";
import SendFeedback from "./SendFeedback/SendFeedback";
import ThemeToggle from "./ThemeToggle/ThemeToggle";

import { useTheme } from "../../../../ThemeContext/ThemeContext";

export default function ProfileMenus({
  role,
  setIsAboutUs,
  setIsLeaderboard,
  setIsPopoverOpen,
  setIsContactUs,
  setIsContribution,
  setIsFeedBack // Add setIsContribution
}) {
  const { isDarkMode } = useTheme(); // Access isDarkMode from context

  return (
    <>
      {/* Divider between the theme toggle and the rest of the menu */}
      {role !== null &&  <div
        className={`h-[1px] w-full  my-2
          ${isDarkMode ? "bg-[#A2A0A0] " : "bg-[#C4B8B8] "}`}
      ></div>}

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Send feedback button */}
      <SendFeedback setIsFeedBack={setIsFeedBack}
        setIsPopoverOpen={setIsPopoverOpen}/>
      <AboutUs
        setIsAboutUs={setIsAboutUs}
        setIsPopoverOpen={setIsPopoverOpen}
      />
      <ContactUs
        setIsPopoverOpen={setIsPopoverOpen}
        setIsContactUs={setIsContactUs}
      />

      {role !== null && (
        <>
          <Leaderboard
            setIsLeaderboard={setIsLeaderboard}
            setIsPopoverOpen={setIsPopoverOpen}
          />
          <Contribution 
            setIsPopoverOpen={setIsPopoverOpen}
            setIsContribution={setIsContribution} // Handle Contribution
          />
          {role !== "user" && <Administration />}
          
        </>
      )}
      <div
        className={`h-[1px] w-full  my-2
          ${isDarkMode ? "bg-[#A2A0A0] " : "bg-[#C4B8B8] "}`}
      ></div>
    </>
  );
}
