import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import loc from "../../../assets/Contribution/image.png";
import { FiChevronRight } from "react-icons/fi";
import { useTheme } from "../../Layout/ThemeContext/ThemeContext"; // Importing the theme context


export default function ContributionPopup({ setIsPopoverOpen, setIsContribution }) {
  const containerRef = useRef(null);
  const { isDarkMode,isLangArab } = useTheme(); // Access dark mode from theme context
  const [isOpen, setIsOpen] = useState(true);

  const contributions = [
    { date: "2024-10-11", poiName: "Al Makhtabshah", status: "Pending" },
    { date: "2024-10-11", poiName: "Al Qahhah", status: "Approved" },
    { date: "2024-10-11", poiName: "Al Abhuth", status: "Pending" },
    { date: "2024-10-11", poiName: "Al Buwem", status: "Approved" },
    { date: "2024-10-11", poiName: "Al Khabaq", status: "Approved" },
  ];

  // Detect outside click to close the popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsPopoverOpen(false);
        setIsContribution(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsPopoverOpen, setIsContribution]);

  return (
    <motion.div
    ref={containerRef}
    initial={{ x: "100%", opacity: 0 }}
    whileInView={{ 
      x: isOpen ? 0 : isLangArab ? "-100%" : "100%", // Move to left if Arabic
      opacity: 1 
    }}
    exit={{ 
      x: isLangArab ? "-90%" : "100%", // Exit to left for Arabic, right for others
      opacity: 0 
    }}
    transition={{ ease: "easeInOut" }}
      className={`sm:px-8 px-2 py-4 fixed sm:top-16 laptop_s:top-16 top-14 ${isLangArab?"sm:left-10 left-3":"sm:right-10 right-3"} bg-opacity-75 backdrop-blur  sm:rounded-3xl rounded-xl ${
        isDarkMode ? "bg-[rgba(96,96,96,0.8)]" : "bg-white bg-opacity-70"
      } text-black backdrop-blur border-none`}    >
      <div className="flex relative justify-between sm:px-0 px-2 items-center">
      <h1 className={`text-[15px] sm:text-[17px] laptop_s:text-[19px] font-semibold ${isDarkMode ? "text-[#FFFFFFCC]" : "text-black"}`}>
      {isLangArab?"المساهمة":"Contribution"}</h1>
        <div
          className={`p-2 cursor-pointer ${isDarkMode ? "text-white hover:text-gray-300" : "text-gray-600 hover:text-gray-900"} transition-colors`}
          onClick={() => {
            setIsPopoverOpen(true);
            setIsContribution(false);
          }}
        >
          <X />
        </div>

        {/* Shrinking Toggle */}
        {/* <div onClick={() => setIsShrink(!isShrink)} className="absolute top-6 -left-14 cursor-pointer">
          <svg width="32" height="128" viewBox="0 0 64 371" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_4011_11301)">
              <path
                d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
                fill="#EBEFF2"
                stroke="#EEF3F7"
                strokeWidth="6"
              />
            </g>
            <defs>
              <clipPath id="clip0_4011_11301">
                <rect width="64" height="371" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        
        <div className="absolute top-[4.7rem] -left-12 text-xl cursor-pointer" onClick={() => setIsShrink(!isShrink)}>
          <FiChevronRight className={isShrink ? "rotate-180" : ""} />
        </div> */}
      </div>

      <div className="p-1 sm:w-[350px] laptop_s:w-[350px] w-[320px] max-h-[calc(100vh-200px)] overflow-y-auto mt-2">
        <div 
        className={`grid font-omnes grid-cols-3 gap-4 font-medium text-[14px]  mb-2 px-4 ${isDarkMode ? "text-gray-300" : "text-gray-600 "}`}

        >
          
          <div>{ isLangArab ?"التاريخ":"Date"}</div>
          <div>{ isLangArab ?"اسم نقطة الاهتمام":"POI Name"}</div>
          <div>{ isLangArab ?"الحالة":"Status"}</div>
        </div>
        {contributions.map((contribution, index) => (
          <div
            key={index}
            className={`grid grid-cols-3 gap-4 py-5 text-sm px-4 ${
              index % 2 === 0 ? "bg-[#D5E5DE] bg-opacity-30" : "bg-transparent"
            }`}
          >
            <div className={`font-medium font-omnes sm:text-[13px] text-[10px] ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#101828]"}`}>
            {contribution.date}</div>
            <div className={`font-medium font-omnes sm:text-[12px] laptop_s:text-[13px] text-[9px] ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#3E3E3E]"}`}>
              {contribution.poiName}</div>
              <div className="flex justify-between gap-x-2 sm:gap-x-3 laptop_s:gap-x-0 items-center">
              <span className={`${contribution.status === "Approved" ? "bg-custom-gradient font-omnes sm:text-[13px] text-[10px] font-medium bg-clip-text text-transparent" : "text-[#EFB45D] font-omnes sm:text-[13px] text-[10px] font-medium"}`}>
                {(contribution.status === "Approved") && (isLangArab ?"معتمد":"Approved") }
                {(contribution.status === "Pending") && (isLangArab ?"قيد الانتظار":"Pending") }
              </span>
              <img src={loc} alt="Location icon" className="sm:w-7 w-5 sm:h-7 h-4" />
            </div>
          </div>
        ))}
      </div>
       {/* Toggle button */}
       <div className={`absolute top-12 ${isLangArab?"-right-7":"-left-6"} sm:block hidden`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-8 h-32 focus:outline-none"
          aria-label={isOpen ? "Close side panel" : "Open side panel"}
        >
          {isLangArab?<svg
      width="32"
      height="128"
      viewBox="0 0 64 371"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'relative',
        top: '1px',
        right: '3px',
      }}
    >
      <g
        clipPath="url(#clip0_4011_11301)"
        transform="scale(-1, 1) translate(-64, 0)" // Flipping horizontally
      >
        <path
          d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
          fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EBEFF2"}
          stroke={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EEF3F7"}
          strokeWidth="6"
        />
      </g>
      <defs>
        <clipPath id="clip0_4011_11301">
          <rect width="64" height="371" fill="white" />
        </clipPath>
      </defs>
    </svg>:<svg
            width="32"
            height="128"
            viewBox="0 0 64 371"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: "relative", top: "1px", right: "3px" }}
          >
            <g clipPath="url(#clip0_4011_11301)">
              <path
                d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
                fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EBEFF2"}
                stroke={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EEF3F7"}
                strokeWidth="6"
              />
            </g>
            <defs>
              <clipPath id="clip0_4011_11301">
                <rect width="64" height="371" fill="white" />
              </clipPath>
            </defs>
          </svg>}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <FiChevronRight
              className={`transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"} ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            />
          </div>
        </button>
      </div>
    </motion.div>
  );
}
