import { useTheme } from "../../../../../ThemeContext/ThemeContext"; // Adjust the import path as necessary
import DarkBrush from "../../../../../../../assets/DarkBrush.svg"
import Brush from "../../../../../../../assets/Header/Profile/Brush.svg"
import ToggleCircle from "../../../../../../../assets/Header/Profile/ThemeToggle/switch-dark.svg"

export default function ThemeToggle() {
  const { isDarkMode, isLangArab,toggleTheme } = useTheme(); // Access the theme context

  return (
    <div className="flex justify-between items-center py-1">
      <div className="flex justify-start items-center gap-2">
        <div>
        <img
         src={isDarkMode ? DarkBrush : Brush}
           alt="" className=" w-5" />        </div>
        <p
          className={`${
            isLangArab
              ? "font-medium font-omnes text-[14px] tab:text-[12px] laptop_s:text-[14px] tracking-widget"
              : "font-medium font-omnes text-[14px] tab:text-[12px] laptop_s:text-[14px] tracking-widget"
          }   ${
            isDarkMode ? "text-gray-300" : "text-black/50"
          }`}
        >           {isLangArab?"الوضع الداكن":"Dark mode"}</p>
      </div>

      {/* Toggle Switch */}
      <div
        className={`w-12  h-6  flex items-center rounded-full p-1 shadow-md cursor-pointer ${
          isDarkMode ? 'bg-gray-500' : 'bg-white'
        }`}
        onClick={toggleTheme} // Toggle the theme on click
      >
        <div
          className={`bg-[#FFAC4B] w-5 h-5 rounded-full shadow-lg transform duration-300 ease-in-out flex justify-center items-center ${
            isDarkMode ? " " : "translate-x-5"
          }${
            isLangArab ? "translate-x-[-1.75rem]" : "translate-x-5"
          }`}
        >
          <img
            src={ToggleCircle}
            alt=""
            className="w-7"
          />
        </div>
      </div>
    </div>
  );
}
