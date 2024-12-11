import feedback from "../../../../../../../assets/feedback.svg";
import DarkFeedback from "../../../../../../../assets/FeedBack/review.svg";
import WhiteFeedback from '../../../../../../../assets/WhiteFeedback.svg'
import { useTheme } from '../../../../../ThemeContext/ThemeContext'; // Import the theme hook

export default function SendFeedback({ setIsFeedBack, setIsPopoverOpen }) {
  const { isDarkMode,isLangArab } = useTheme(); // Use the theme hook to get dark mode state

  return (
    <div
      className="py-1 mt-1 cursor-pointer"
      onClick={() => {
        setIsFeedBack(true);
        setIsPopoverOpen(false);
      }}
    >
      <div className="flex justify-start gap-2 items-center">
        <div>
        <img 
          src={isDarkMode ? DarkFeedback : feedback }

           alt="Logo" className={` ${isLangArab?" w-5 ":"w-4 "}`} />        </div>
        <p
          className={`  ${
            isLangArab
              ? "  font-500 text-[14px] mr-1 tab:text-[12px] laptop_s:text-[14px] tracking-widget"
              : "  font-500 text-[14px] ml-1 tab:text-[12px] laptop_s:text-[14px] tracking-widget"
          }  ${
            isDarkMode ? "text-gray-300" : "text-[#505050]"
          }`}
        >          {isLangArab?"إرسال الملاحظات":"Send Feedback"}</p>
      </div>
    </div>
  );
}
