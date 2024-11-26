import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import Mottos from "./Mottos/Mottos";
import AboutDescription from "./AboutDescription/AboutDescription";
import { useTheme } from "../../Layout/ThemeContext/ThemeContext"; // Import your theme context

export default function AboutusSidelayout({ setIsPopoverOpen, setIsAboutUs }) {
  const [isOpen, setIsOpen] = useState(true); // Changed from isShrink to isOpen
  const containerRef = useRef(null);
  const { isDarkMode, isLangArab } = useTheme(); // Access dark mode from theme context

  // Handle clicks outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsAboutUs(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsAboutUs]);

  return (
    <div dir={isLangArab ? "rtl" : "ltr"}>
      <div
        ref={containerRef}
        
        className={`px-8 sm:py-2  sm:px-5 py-4 fixed ${
          isLangArab ? "sm:left-6  left-1" : "sm:right-6  right-1"
        }   transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : ( isLangArab?"-translate-x-[104%] sm:-translate-x-[112%] laptop_s:-translate-x-[108%]":" translate-x-[103%] sm:translate-x-[112%] laptop_s:translate-x-[108%]")
      } top-20 backdrop-blur rounded-3xl text-black ${
          isDarkMode
            ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none" // Dark mode styles
            : "bg-white bg-opacity-70 backdrop-blur-lg border-white" // Light mode styles
        }`} // Adjust background color based on dark mode
      >
        <div className="flex relative justify-between items-center mb-2 mobile_l:mb-0 ">
          <h1
            className={`text-[16px]    font-600 ${
              isDarkMode ? "text-[#FFFFFFCC] text-opacity-80" : "text-[#505050]"
            }`}
          >
            {isLangArab ? "حولنا" : "About us"}
          </h1>
          <div
            className={`px-1 cursor-pointer ${
              isDarkMode
                ? "text-white hover:text-gray-300"
                : "text-gray-600 hover:text-gray-900"
            } transition-colors`}
            onClick={() => {
              setIsPopoverOpen(true);
              setIsAboutUs(false);
            }}
          >
            <X />
          </div>
        </div>

        <div className="relative sm:h-[55vh] laptop_s:h-[80vh] h-[70vh] sm:w-[23rem]  laptop_s:w-[19rem] w-[18rem] overflow-y-scroll">
          <AboutDescription />
          <Mottos />
        </div>

        {/* Toggle button */}
        <div
          className={`absolute hidden sm:block top-12 ${
            isLangArab ? "-right-7" : "-left-6"
          }`}
        >
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-8 h-32 focus:outline-none"
            aria-label={isOpen ? "Close side panel" : "Open side panel"}
          >
            {isLangArab ? (
              <svg
                width="32"
                height="128"
                viewBox="0 0 64 371"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "relative",
                  top: "1px",
                  right: "3px",
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
              </svg>
            ) : (
              <svg
                width="32"
                height="128"
                viewBox="0 0 64 371"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  position: "relative",
                  top: "1px",
                  right: "3px",
                }}
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
              </svg>
            )}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <FiChevronRight
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-0" : "rotate-180"
                } ${isDarkMode ? "text-white" : "text-black"}`} // Adjust icon color based on dark mode
              />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
