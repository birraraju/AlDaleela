import AboutUs from "./AboutUs/AboutUs";
import Administration from "./Administration/Administration";
import ContactUs from "./ContactUs/ContactUs";
import Contribution from "./Contribution/Contribution"; // Import Contribution component
import Leaderboard from "./Leaderboard/Leaderboard";
import SendFeedback from "./SendFeedback/SendFeedback";
import ThemeToggle from "./ThemeToggle/ThemeToggle";

export default function ProfileMenus({
  role,
  setIsAboutUs,
  setIsLeaderboard,
  setIsPopoverOpen,
  setIsContactUs,
  setIsContribution,
  setIsFeedBack,
}) {
  return (
    <>
      {/* Divider between the theme toggle and the rest of the menu */}
      {role !== null && <div className="h-[1px] w-full bg-white my-2"></div>}

      {/* Theme toggle */}
      <ThemeToggle />

      {/* Send feedback button */}
      <SendFeedback setIsFeedBack={setIsFeedBack} setIsPopoverOpen={setIsPopoverOpen} />
      <AboutUs setIsAboutUs={setIsAboutUs} setIsPopoverOpen={setIsPopoverOpen} />
      <ContactUs setIsPopoverOpen={setIsPopoverOpen} setIsContactUs={setIsContactUs} />

      {role !== null && (
        <>
          <Leaderboard setIsLeaderboard={setIsLeaderboard} setIsPopoverOpen={setIsPopoverOpen} />
          <Contribution 
            setIsPopoverOpen={setIsPopoverOpen}
            setIsContribution={setIsContribution} // Handle Contribution
          />
          <Administration />
        </>
      )}

      <div className="h-[1px] w-full bg-gray-300 my-4"></div>
    </>
  );
}
