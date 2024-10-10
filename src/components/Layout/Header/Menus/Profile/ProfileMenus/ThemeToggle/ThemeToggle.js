import { useTheme } from "../../../../../ThemeContext/ThemeContext"; // Adjust the import path as necessary

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme(); // Access the theme context

  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex justify-start items-center gap-2">
        <div>
          <img src="/Header/Profile/Brush.svg" alt="" className="w-8" />
        </div>
        <p className="font-medium font-omnes text-[#505050] text-[18px]">Dark mode</p>
      </div>

      {/* Toggle Switch */}
      <div
        className={`w-14 h-7 flex items-center rounded-full p-1 shadow-md cursor-pointer ${
          isDarkMode ? "bg-black" : "bg-white"
        }`}
        onClick={toggleTheme} // Call the toggle function from context
      >
        <div
          className={`bg-[#FFAC4B] w-5 h-5 rounded-full shadow-lg transform duration-300 ease-in-out flex justify-center items-center ${
            isDarkMode ? "translate-x-7" : ""
          }`}
        >
          <img
            src="/Header/Profile/ThemeToggle/switch-dark.svg"
            alt=""
            className="w-4"
          />
        </div>
      </div>
    </div>
  );
}
