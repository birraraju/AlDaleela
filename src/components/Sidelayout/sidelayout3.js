import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { X } from 'lucide-react'; // X icon import
import Measurements from "../../components/Widgets/Measurement/Measurements";
import { useTheme } from '../Layout/ThemeContext/ThemeContext'; // Import the theme context
import { useAuth } from "../../Providers/AuthProvider/AuthProvider";

export default function SideLayout3({ children, width = "454.84px", onClose, mapview }) {  //height = "calc(95vh - 2rem)",
  const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state
  const [isOpen, setIsOpen] = useState(true);  // Controls panel visibility
  const [isFullyClosed, setIsFullyClosed] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const panelRef = useRef(null); // Create a reference for the panel
  const {MeasurementOpenWidget} = useAuth();

  // Toggle function to slide panel in or out
  const toggleSideLayout = () => {
    if (!isFullyClosed) {
      setIsOpen(prev => !prev); // Toggle visibility
      setToggleCount(prev => prev + 1); // Increment toggle count
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
    if(MeasurementOpenWidget){
      MeasurementOpenWidget.destroy();
    } 
    // This will fully close the side panel (remove it from view)
    setIsFullyClosed(true);
    onClose();
  };

  useEffect(() => {
    // If the panel is fully closed, call onClose after a short delay
    // This allows for any closing animations to complete
    if (isFullyClosed) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); // Adjust this timing to match your transition duration

      return () => clearTimeout(timer);
    }
  }, [isFullyClosed, onClose]);

  // Removed the handleClickOutside function and event listener

  if (isFullyClosed) return null;

  return (
    <div
      ref={panelRef} // Attach ref to the panel
      className={`fixed w-[96%] sm:w-[400px] laptop_s:w-[${width}] h-[98%] top-16  ${ isLangArab?"right-3 sm:left-16 laptop_s:left-3":"right-3 sm:right-16 laptop_s:right-3"} transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : ( isLangArab?"-translate-x-[104%] sm:-translate-x-[116%] laptop_s:-translate-x-[104%] ":" sm:translate-x-[116%] laptop_s:translate-x-[103%] translate-x-[103%] ")
      }`}
      // style={{ width, height }}
    >
      <div className={`relative sm:h-[40%] laptop_s:h-[65%] h-[90%] sm:w-full w-[99%] float-end sm:float-none rounded-2xl shadow-lg overflow-hidden border transition-colors duration-300 ${
          isDarkMode
          ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none" // Dark mode styles
          : "bg-white bg-opacity-70 border-white text-gray-700"
        }`}>
        {/* X Close Button to slide the panel out */}
        <button
          onClick={closePanel}
          className={`absolute top-4 right-4 p-1 transition-colors ${
            isDarkMode ? "text-white hover:text-gray-300" : "text-gray-600 hover:text-gray-900"
          }`}
          aria-label="Close side panel"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6 overflow-y-auto h-full">
          {children || (<>
            <p className={`text-${isDarkMode ? '[#FFFFFFCC] text-opacity-80' : 'black'}  font-poppins font-medium`}>
              { isLangArab?"القياس": "Measurement"}
            </p>
            
            </>
          )}
          <div><Measurements mapview={mapview}/></div>
        </div>
      </div>

      {/* Toggle button to slide panel in and out */}
      <div className={`absolute hidden sm:block top-4 ${isLangArab?"-right-7":"-left-6"}`}>
        <button
          onClick={toggleSideLayout}
          className="relative w-8 h-32 focus:outline-none"
          aria-label={isOpen ? "Close side panel" : "Open side panel"}
        >
          { isLangArab?<svg
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
            style={{
              position: 'relative',
              top: '1px',
              right: '3px',
            }}
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
          </svg>}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <IoIosArrowForward
              className={`text-xl transition-transform duration-300 ${
                isOpen ? "rotate-360" : ""
              } ${!isOpen && (toggleCount > 0 ? "rotate-180" : "")}`}
              style={{ color: isDarkMode ? "#fff" : "#000" }}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
