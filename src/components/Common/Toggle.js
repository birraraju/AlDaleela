import { useState } from "react";

const LanguageSelector = ({ isHeaderOpen }) => {
  const [isArabic, setIsArabic] = useState(false);

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
    isHeaderOpen();
  };

  return (
    <div
      className={`relative flex items-center
        mobile_s:w-16 laptop_m:w-20 mobile_s:h-7 laptop_m:h-8 rounded-full
        bg-white bg-opacity-15 hover:bg-opacity-25
        text-white text-base cursor-pointer
        transition-all duration-350 ease-in-out mobile_s:mr-1 laptop_m:mr-2`}
      onClick={toggleLanguage}
    >
      <div
        className={`absolute sm:top-1 left-1 mobile_s:w-5 laptop_m:w-6 mobile_s:h-5 laptop_m:h-6
          bg-white rounded-full opacity-30
          transition-transform duration-350 ease-in-out
          ${isArabic ? "mobile_s:translate-x-9 laptop_m:translate-x-12" : "translate-x-0"}`}
      ></div>
      <span
        className={`z-10 mobile_s:text-xs laptop_m:text-base
          ${isArabic ? "ml-auto mobile_s:pr-8 laptop_m:pr-11" : "sm:pl-8 pl-9"}
          ${isArabic ? "text-sm font-semibold" : "text-xs font-normal"}`}
      >
        {isArabic ? "عربي" : "ENG"}
      </span>
    </div>
  );
};

export default LanguageSelector;
