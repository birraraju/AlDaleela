import feedback from "../../../../../../../assets/feedback.svg";
import DarkFeedback from "../../../../../../../assets/DarkFeedback.svg";
import { useTheme } from '../../../../../ThemeContext/ThemeContext'; // Import the theme hook

export default function SendFeedback({ setIsFeedBack, setIsPopoverOpen }) {
  const { isDarkMode,isLangArab } = useTheme(); // Use the theme hook to get dark mode state

  return (
    <div
      className="py-1 cursor-pointer"
      onClick={() => {
        setIsFeedBack(true);
        setIsPopoverOpen(false);
      }}
    >
      <div className="flex justify-start gap-2 items-center">
        <div>
        <img 
          src={isDarkMode ? DarkFeedback : feedback }

           alt="Logo" className=" w-4 " />        </div>
        <p
          className={`${
            isLangArab
              ? "font-medium font-omnes text-[14px] tab:text-[12px] laptop_s:text-[14px] tracking-widget"
              : "font-medium font-omnes text-[16px] tab:text-[14px] laptop_s:text-[16px] tracking-widget"
          }  ${
            isDarkMode ? "text-gray-300" : "text-[#505050]"
          }`}
        >          {isLangArab?"إرسال الملاحظات":"Send FeedBack"}</p>
      </div>
    </div>
  );
}
