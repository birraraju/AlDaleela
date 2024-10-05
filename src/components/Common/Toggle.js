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
        mobile_s:w-20 laptop_m:w-24 mobile_s:h-9 laptop_m:h-10 rounded-full
        bg-white bg-opacity-15 hover:bg-opacity-25
        text-white text-base cursor-pointer
        transition-all duration-350 ease-in-out mobile_s:mr-2 laptop_m:mr-4`}
      onClick={toggleLanguage}
    >
      <div
        className={`absolute top-1 left-1 mobile_s:w-7 laptop_m:w-8 mobile_s:h-7 laptop_m:h-8
          bg-white rounded-full opacity-30
          transition-transform duration-350 ease-in-out
          ${isArabic ? "mobile_s:translate-x-11 laptop_m:translate-x-14" : "translate-x-0"}`}
      ></div>
      <span
        className={`z-10 mobile_s:text-sm laptop_m:text-base
          ${isArabic ? "ml-auto mobile_s:pr-10 laptop_m:pr-12" : "pl-10"}
          ${isArabic ? "text-lg font-semibold" : "text-base font-normal"}`}
      >
        {isArabic ? "عربي" : "ENG"}
      </span>
    </div>
  );
};

export default LanguageSelector;
