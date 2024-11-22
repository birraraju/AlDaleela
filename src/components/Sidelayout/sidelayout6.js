import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { X } from "lucide-react"; // X icon import
import Print from "../../components/Widgets/Print/Print";
import { useTheme } from '../Layout/ThemeContext/ThemeContext'; // Import the theme context
import { useAuth } from "../../Providers/AuthProvider/AuthProvider";

export default function SideLayout6({
  children,
  width = "430px",
  // height = "calc(95vh - 2rem)",
  onClose,
  mapview,
}) {
  const [isOpen, setIsOpen] = useState(true);  // Controls panel visibility
  const [isFullyClosed, setIsFullyClosed] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state
  const panelRef = useRef(null); // Create a ref for the side panel
  const {printWidget} = useAuth();
  const [panelHeight, setPanelHeight] = useState("95%");
  const [ToggleDragHeight,setToggleDragHeight] = useState(false)

  // Toggle function to slide panel in or out
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
    if(printWidget){
      printWidget.destroy();
      //setprintWidget(null)
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


  useEffect(()=>{
    if (window.innerWidth <= 600) {
      setToggleDragHeight(true)
    }else{
      setToggleDragHeight(false)
    }
  },[])

  const startYRef = useRef(null);
  const startHeightRef = useRef(null);

  const handleDragStart = (e) => {
    startYRef.current = e.touches ? e.touches[0].clientY : e.clientY;
    startHeightRef.current = panelRef.current.getBoundingClientRect().height;
    window.addEventListener("mousemove", handleDragging);
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchmove", handleDragging);
    window.addEventListener("touchend", handleDragEnd);
};


  const handleDragging = (e) => {
    const currentY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaY = currentY - startYRef.current; // Adjust for dragging down
    const newHeight = startHeightRef.current - deltaY; // Reduce height from the top

    if (newHeight < window.innerHeight * 0.2) {
      setPanelHeight("20%"); // Set a minimum height
    } else if (newHeight > window.innerHeight * 0.9) {
      setPanelHeight("90%"); // Set a maximum height
    } else {
      setPanelHeight(newHeight + "px"); // Adjust height dynamically
    }
  };




  const handleDragEnd = () => {
    window.removeEventListener("mousemove", handleDragging);
    window.removeEventListener("mouseup", handleDragEnd);
    window.removeEventListener("touchmove", handleDragging);
    window.removeEventListener("touchend", handleDragEnd);
};


  // You can remove the 'handleClickOutside' logic completely 
  // to prevent closing when clicking outside of the panel

  if (isFullyClosed) return null;

  return (
    <div
      dir={isLangArab && "rtl"}
      style={{ height: ToggleDragHeight && panelHeight }} // Update height dynamically here
      ref={panelRef} // Attach ref to the panel div
      className={`fixed -bottom-9  sm:top-16 ${
        isLangArab
          ? " right-3 sm:left-16 laptop_s:left-3"
          : "right-3 sm:right-16 laptop_s:right-3"
      } w-[500px] sm:w-[400px] laptop_s:w-[${width}] 2xl:h-[73%] h-[75%] sm:h-[68%] laptop_s:h-[90%]  transition-transform duration-300 ease-in-out ${
        isOpen
          ? "translate-x-0"
          : isLangArab
          ? "-translate-x-[103%] sm:-translate-x-[116%] laptop_s:-translate-x-[103%] "
          : "translate-x-[103%] sm:translate-x-[116%] laptop_s:translate-x-[103%]"
      }`}
      // style={{ width, height }}
    >
      <div
        className={`relative sm:h-[65%] tab:h-[90%]  h-[98%] sm:w-[80%] tab:w-full  w-[67%] bg-opacity-70 float-end sm:float-none backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden border ${
          isDarkMode
            ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none" // Dark mode styles
            : "bg-white  backdrop-blur-lg border-white"
        }`}
      >
        <div
          className="absolute top-2 left-1/2 flex sm:hidden -translate-x-1/2 w-12 h-1 rounded-full bg-gray-400 cursor-pointer"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        ></div>
        {/* X Close Button to slide the panel out */}
        <button
          onClick={closePanel}
          className={`absolute top-4 ${
            isLangArab ? " left-4" : "right-4"
          } p-1 ${
            isDarkMode ? "text-[#FFFFFFCC] text-opacity-80" : "text-gray-600 "
          } transition-colors`}
          aria-label="Close side panel"
        >
          <X className="h-6 w-6" />
        </button>

        <div style={{ height: ToggleDragHeight && panelHeight }}  className="p-6 overflow-y-auto  2xl:mb-[50px]  h-full">
          {children || (
            <p
              className={`${
                isDarkMode
                  ? "text-[#FFFFFFCC] text-opacity-80"
                  : " text-gray-700"
              } font-poppins font-medium`}
            >
              {isLangArab ? "طباعة" : "Print"}
            </p>
          )}
        </div>
        <div className={`${panelHeight < "50%" && "hidden"} h-full 2xl:mb-0`}>
          <Print mapview={mapview} />
        </div>
      </div>

      {/* Toggle button to slide panel in and out */}
      <div className={`absolute top-4 ${isLangArab ? "-right-7" : "-left-6"} `}>
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
            <IoIosArrowForward
              className={`text-black text-xl transition-transform duration-300 ${
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
