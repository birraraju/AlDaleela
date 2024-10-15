import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { X } from 'lucide-react';
import BookMarkGreen from '../../assets/bookmarks/imageBookMarkGreen.png';
import { FaArrowLeft } from "react-icons/fa6";
import { useTheme } from '../Layout/ThemeContext/ThemeContext'; // Import the theme context
import DarkBookMarkGreen from '../../assets/bookmarks/Manage Bookmark.svg';



export default function SideLayout2({ children, width = "454.84px", onClose }) { //w-[${width}]
  const { isDarkMode } = useTheme(); // Access the dark mode state
  const [isOpen, setIsOpen] = useState(true);
  const [isManageVisible, setIsManageVisible] = useState(false);
  const [isContentVisible] = useState(true);
  const [isFullyClosed, setIsFullyClosed] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);

  const layoutRef = useRef(null);

  const toggleSideLayout = () => {
    if (!isFullyClosed) {
      setIsOpen(prev => !prev);
      setToggleCount(prev => prev + 1);
    }
  };

  const closePanel = () => {
    setIsFullyClosed(true);
    onClose();
  };

  // Remove the outside click handler to prevent closing on outside clicks
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (layoutRef.current && !layoutRef.current.contains(event.target)) {
  //       onClose();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [onClose]);

  // Handle closing animation
  useEffect(() => {
    if (isFullyClosed) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); // Adjust this timing to match your transition duration

      return () => clearTimeout(timer);
    }
  }, [isFullyClosed, onClose]);

  if (isFullyClosed) return null;

  return (
    <div
      ref={layoutRef}
      className={`fixed w-[510px] sm:w-[400px] laptop_s:w-[${width}] h-[90%] sm:h-[59%] laptop_s:h-[90%]  top-16 right-3 sm:right-16 laptop_s:right-3 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      // style={{ width, height }}
    >
      {isContentVisible && (
        <div className={`relative sm:h-[65%] h-[98%] sm:w-full float-end sm:float-none w-[67%] rounded-2xl shadow-lg overflow-hidden border ${
          isDarkMode
            ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none" // Dark mode styles
            : "bg-white bg-opacity-70 backdrop-blur-lg border-white" // Light mode styles
        }`}>
          {/* Close Button */}
          <button
            onClick={closePanel}
            className={`absolute top-4 right-4 p-2 ${
              isDarkMode ? "text-white hover:text-gray-300" : "text-gray-600 hover:text-gray-900"
            } transition-colors`}
            aria-label="Close side panel"
          >
            <X className="h-5 w-6" />
          </button>

          <div className="p-6 overflow-y-auto h-full">
            {children || (
              <>
                <p className={`flex gap-x-2 justify-start items-center font-medium font-poppins ${
                  isDarkMode ? "text-white/80" : "text-gray-700"
                }`}>
                  {isManageVisible && (
                    <FaArrowLeft
                      onClick={() => setIsManageVisible(false)}
                      className={`${isDarkMode ? "text-white/70 cursor-pointer" : "text-black/70 cursor-pointer"} h-7`}
                    />
                  )}
                  {isManageVisible ? "Manage Bookmarks" : "Bookmarks"}
                </p>

                {/* Manage Bookmarks Section */}
                <div className="absolute bottom-4 left-0 w-full px-6">
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <img src={isDarkMode ? DarkBookMarkGreen : BookMarkGreen } alt="Bookmark" className="h-5 mb-1" />
                    <p
                      className="text-[#1365B1] underline text-sm cursor-pointer font-medium"
                      onClick={() => setIsManageVisible(true)}
                    >
                      Manage bookmarks
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Toggle button, this should always remain visible */}
      <div className="absolute top-4 -left-6">
        <button
          onClick={toggleSideLayout}
          className="relative w-8 h-32 focus:outline-none"
          aria-label={isOpen ? "Close side panel" : "Open side panel"}
        >
          <svg
            width="32"
            height="128"
            viewBox="0 0 64 371"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'relative', top: '1px', right: '3px' }}
          >
            <g clipPath="url(#clip0_4011_11301)">
              <path
                d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
                fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EBEFF2"} // Updated for dark mode
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

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <IoIosArrowForward
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-360" : ""
              } ${!isOpen && toggleCount > 0 ? "rotate-180" : ""} ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
