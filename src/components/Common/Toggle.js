// import { useState } from "react";
import { useTheme } from "../Layout/ThemeContext/ThemeContext"; // Adjust the import path as necessary


const LanguageSelector = () => {
  // const [isArabic, setIsArabic] = useState(false);
  const { isLangArab, toggleLanguage } = useTheme(); // Access the theme context


  // const toggleLanguage = () => {
  //   setIsArabic(!isArabic);
  //   isHeaderOpen();
  // };
  console.log("Lang Toggle status:", isLangArab)
  return (
    <div
      className={`relative flex items-center
        p-0.5
        mobile_s:w-16 laptop_m:w-16 laptop_s:w-12 laptop_s:h-6 mobile_s:h-7  laptop_m:h-8  rounded-full
        bg-white bg-opacity-15 hover:bg-opacity-25
        text-white text-base cursor-pointer
        transition-all duration-350 ease-in-out mobile_s:mr-1 laptop_s:mr-0.5 laptop_m:mr-2`}
      onClick={toggleLanguage}
    >
      <div
        className={`absolute sm:top-1 left-1 mobile_s:w-5 laptop_s:w-4 laptop_s:h-4 laptop_m:w-6 mobile_s:h-5 laptop_m:h-6
          bg-white rounded-full opacity-30
          transition-transform duration-350 ease-in-out
          ${isLangArab ? "mobile_s:translate-x-9 tab:translate-x-8  tab_l:translate-x-8 mobile_l:translate-x-9 laptop_s:translate-x-6 laptop_m:translate-x-8" : "translate-x-0"}`}
      ></div>
      <span
        className={`z-10 mobile_s:text-xs laptop_s:text-[10px] laptop_m:text-[14px]
          ${isLangArab ? "ml-1  sm:pr-8 pr-7 tab:pr-7  laptop_s:pr-[22px] laptop_m:pr-7" : "sm:pl-8 tab:pl-6 mr-0  tab:mr-1   laptop_s:pl-5  laptop_m:pl-7 pl-8"}
          ${isLangArab ? "text-[16px] font-400" : "text-[16px] font-400"}`}
      >
        {isLangArab ? "عربي" : "ENG"}
      </span>
    </div>
  );
};

export default LanguageSelector;
