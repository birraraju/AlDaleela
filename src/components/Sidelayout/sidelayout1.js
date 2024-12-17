import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import BasemapGallery from "../../components/Widgets/BasemapGallery/BasemapGallery";
import { useTheme } from '../Layout/ThemeContext/ThemeContext'; // Import the theme context


export default function SideLayout1({
  children,
  // width = "420.84px",
  // height = "calc(95vh - 2rem)",
  onClose,
  mapview
}) {
  const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state
  const [isOpen, setIsOpen] = useState(true);
  const [isFullyClosed, setIsFullyClosed] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const panelRef = useRef(null); // Ref for the side panel

  const toggleSideLayout = () => {
    if (!isFullyClosed) {
      setIsOpen((prev) => !prev); // Toggle visibility
      setToggleCount((prev) => prev + 1); // Increment toggle count
    }
    if (isOpen) {
      // This will hide the panel (slide out)
      setIsOpen(false);
    } else {
      // Re-open the side panel
      setIsOpen(true);
      setIsFullyClosed(false); // In case it was fully closed
    }
  };

  const closePanel = () => {
    // This will fully close the side panel (remove it from view)
    setIsFullyClosed(true);
    onClose();
  };

  // Handle click outside the panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Removed the condition to close the panel on outside clicks
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        // Do nothing when clicking outside
        // closePanel(); // Commented out to prevent closing
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // If fully closed, do not render the component at all
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
      ref={panelRef} // Attach the ref to the panel
      className={`fixed w-[90%] sm:w-[430px] laptop_s:w-[400px]  h-[90%]  tab:h-[80%] laptop_s:h-[90%] top-20 ${ isLangArab?" right-3 sm:left-16 laptop_s:left-6":"right-3 sm:right-16 laptop_s:right-6"} transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : ( isLangArab?"-translate-x-[104%] sm:-translate-x-[115%] laptop_s:-translate-x-[106%] ":"translate-x-[103%] sm:translate-x-[115%] laptop_s:translate-x-[106%] ")
      }`}
      // style={{ width, height }} // Set height to 80% of viewport height
    >
     <div
  className={`relative sm:h-[90%] tab_s:h-[65%]  laptop_s:h-[80%] laptop_lg:h-[55%]  h-[98%]  sm:w-full sm:float-none w-[100%] float-end rounded-2xl shadow-lg overflow-hidden border ${
    isDarkMode
      ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none" // Dark mode styles
      : "bg-white bg-opacity-70 backdrop-blur-lg border-white" // Light mode styles
  } ${isLangArab ? "text-right" : "text-left"}`} // Change text alignment based on language
>
  {/* Close Button */}
  <button
    onClick={closePanel} // Only hide the content
    className={`absolute top-4 ${isLangArab ? "left-4" : "right-4"} p-2 ${isDarkMode ? "text-white hover:text-gray-300" : "text-gray-600 hover:text-gray-900"} transition-colors`}
    aria-label="Close side panel"
  >
    <X className="h-5 w-6" />
  </button>


        <div className="p-6 overflow-y-auto h-[109%] 2xl:h-[100%] ">
          {children || (
            <p className={`${isDarkMode ? 'text-[#FFFFFFCC] text-opacity-80' : 'text-[#505050]'} laptop_lg:text-[16px] text-[14px]     font-600`}>
              { isLangArab?"معرض الخريطة الأساسية":"Basemap Gallery"}
            </p>
          )}
        </div>
        <div className=" w-full"><BasemapGallery mapview={mapview}/></div>
      </div>

      {/* Toggle button */}
      <div className={`absolute hidden sm:block top-4 ${isLangArab ? "-right-7" : "-left-6"}`}>
        <button
          onClick={toggleSideLayout}
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
                fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "rgba(255, 255, 255, 0.7)"}
                stroke="none"
                strokeWidth="0"
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
                fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "rgba(255, 255, 255, 0.7)"}
                stroke="none"
                strokeWidth="0"
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
