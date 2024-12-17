import logo from "../../../../../src/assets/Whitelogo.svg";
import { useTheme } from '../../../Layout/ThemeContext/ThemeContext'; // Import the theme context


export default function Logo() {
  const { isLangArab } = useTheme(); // Access the dark mode state

  return (
    <div className=" laptop_s:w-40  sm:w-32 w-40 h-8  flex sm:h-8 laptop_s:h-10 laptop_m:h-[40px]">
      <img
        src={logo}
        alt="Company Logo" // Update this to a meaningful description
        // className={` ${isLangArab?"":"sm:translate-x-3 -translate-x-5"}  w-full h-full object-contain`}
        className="w-full h-full object-contain"
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = "path/to/fallback/logo.svg"; // Fallback logo path
        }}
      />
    </div>
  );
}
