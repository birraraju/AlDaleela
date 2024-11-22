import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import FeedBackBody from './SendFeedBack'; // Assuming this component contains the body of the feedback
import { useTheme } from '../../Layout/ThemeContext/ThemeContext'; // Import your theme context

export default function SendFeedBack({
  setIsPopoverOpen,
  setIsFeedBack,
  width = "454.84px",
  height = "calc(95vh - 2rem)",
  setIsSuccess, setIsMsgStatus, setModalMessage
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isFullyClosed, setIsFullyClosed] = useState(false);
  const feedbackRef = useRef(null); // Ref for the feedback panel
  const { isDarkMode ,isLangArab} = useTheme(); // Access dark mode from theme context

  const toggleSideLayout = () => {
    setIsOpen(!isOpen);
  };

  const closePanel = () => {
    setIsFullyClosed(true);
    setIsFeedBack(false);
  };

  // Handle click outside to close the panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (feedbackRef.current && !feedbackRef.current.contains(event.target)) {
        closePanel();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle animation for fully closed state
  useEffect(() => {
    if (isFullyClosed) {
      const timer = setTimeout(() => {
        setIsFeedBack(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isFullyClosed, setIsFeedBack]);

  if (isFullyClosed) return null;

  return (
    <div
      ref={feedbackRef}
      className={`fixed sm:top-20 w-[98%] sm:w-[355px] top-14 ${ isLangArab?" left-3 sm:left-16 laptop_s:left-6":"right-2 sm:right-16 laptop_s:right-6"} transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : ( isLangArab?"-translate-x-[104%] sm:-translate-x-[116%] laptop_s:-translate-x-[107%]":" translate-x-[103%] sm:translate-x-[116%] laptop_s:translate-x-[107%]")
      }`}
      style={{  height }}
    >
      <div

        className={`relative h-[620px] sm:h-auto laptop_s:h-[530px] sm:w-full sm:float-none w-[99%] float-end rounded-2xl shadow-lg overflow-scroll border ${isLangArab?"laptop_s:sm:h-[625px] ":"laptop_s:sm:h-[620px] "} ${

          isDarkMode
            ? "bg-[#000000] bg-opacity-80 border-none" // Dark mode styles
            : "bg-white bg-opacity-70 backdrop-blur-lg border-white" // Light mode styles
        }`}
      >
        {/* Header with Feedback Text and Close Button */}
        <div dir={isLangArab ? "rtl" : "ltr"}>

        <div className={`flex items-center justify-between  mt-3 py-2 px-4 ${isLangArab ?  "laptop_s:mt-0" : " laptop_s:mt-2 "}`}>
          <span className={`text-[16px] font-poppins font-600  ${isDarkMode ? 'text-[#FFFFFFCC] text-opacity-80' : 'text-[#505050]'}`}>
            {isLangArab?"ملاحظات":"Feedback"}
          </span>
          <button
           
            onClick={() => {
              setIsPopoverOpen(true);
              setIsFeedBack(false)            }}
 
            className={`p-2 ${
              isDarkMode ? "text-white hover:text-gray-300" : "text-gray-600 hover:text-gray-900"
            } transition-colors`}
            aria-label="Close side panel"
          >
            <X className="h-5 w-6" />
          </button>
        </div>
        </div>

        <div className="p-2 sm:py-2 sm:px-4  overflow-y-auto h-full">
          <FeedBackBody
           setIsPopoverOpen={setIsPopoverOpen}
           setIsFeedBack={setIsFeedBack}
           setIsSuccess={setIsSuccess} setIsMsgStatus={setIsMsgStatus} setModalMessage={setModalMessage}
          />
        </div>
      </div>

      {/* Toggle button */}
      <div className={`absolute hidden sm:block top-4 ${isLangArab?"-right-7":"-left-6"}`}>
        <button
          onClick={toggleSideLayout}
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
            style={{
              position: 'relative',
              top: '1px',
              right: '3px',
            }}
          >
            <g clipPath="url(#clip0_4011_11301)">
              <path
                d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
                fill={isDarkMode ? "#000000" : "#EBEFF2"} // Updated for dark mode
                stroke={isDarkMode ? "#000000" : "#EEF3F7"}
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
              className={`transition-transform duration-300 ${
                isOpen ? (isLangArab?"rotate-180":"rotate-0") : (isLangArab?"rotate-0":"rotate-180")
              } 
              
              ${isDarkMode ? "text-white" : "text-black"}`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
