import { useTheme } from "../../../../../ThemeContext/ThemeContext"; // Adjust the import path as necessary
import DarkBrush from "../../../../../../../assets/DarkBrush.svg"
export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme(); // Access the theme context

  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex justify-start items-center gap-2">
        <div>
        <img
         src={isDarkMode ? DarkBrush : "/Header/Profile/Brush.svg"}
           alt="" className=" w-7" />        </div>
        <p
          className={`font-medium font-omnes text-[18px]  ${
            isDarkMode ? "text-gray-300" : "text-[#505050]"
          }`}
        >           Dark mode</p>
      </div>

      {/* Toggle Switch */}
      <div
        className={`w-14  h-8  flex items-center rounded-full p-1 shadow-md cursor-pointer ${
          isDarkMode ? 'bg-gray-500' : 'bg-white'
        }`}
        onClick={toggleTheme} // Toggle the theme on click
      >
        <div
          className={`bg-[#FFAC4B] w-5 h-5 rounded-full shadow-lg transform duration-300 ease-in-out flex justify-center items-center ${
            isDarkMode ? "translate-x-7" : ""
          }`}
        >
          <img
            src="/Header/Profile/ThemeToggle/switch-dark.svg"
            alt=""
            className="w-7"
          />
        </div>
      </div>
    </div>
  );
}
