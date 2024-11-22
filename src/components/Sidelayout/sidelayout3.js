// import React, { useEffect, useRef, useState } from "react";
// import { IoIosArrowForward } from "react-icons/io";
// import { X } from 'lucide-react'; // X icon import
// import Measurements from "../../components/Widgets/Measurement/Measurements";
// import { useTheme } from '../Layout/ThemeContext/ThemeContext'; // Import the theme context
// import { useAuth } from "../../Providers/AuthProvider/AuthProvider";

// export default function SideLayout3({ children, width = "454.84px", onClose, mapview }) {  //height = "calc(95vh - 2rem)",
//   const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state
//   const [isOpen, setIsOpen] = useState(true);  // Controls panel visibility
//   const [isFullyClosed, setIsFullyClosed] = useState(false);
//   const [toggleCount, setToggleCount] = useState(0);
//   const panelRef = useRef(null); // Create a reference for the panel
//   const {MeasurementOpenWidget} = useAuth();
//   const [panelHeight, setPanelHeight] = useState("65%"); // Control initial height

//   // Toggle function to slide panel in or out
//   const toggleSideLayout = () => {
//     if (!isFullyClosed) {
//       setIsOpen(prev => !prev); // Toggle visibility
//       setToggleCount(prev => prev + 1); // Increment toggle count
//     }
//     if (isOpen) {
//       // This will hide the panel (slide out)
//       setIsOpen(false);
//     } else {
//       // Re-open the side panel
//       setIsOpen(true);
//       setIsFullyClosed(false); // In case it was fully closed
//     }
//   };

//   const closePanel = () => {
//     if(MeasurementOpenWidget){
//       MeasurementOpenWidget.destroy();
//     } 
//     // This will fully close the side panel (remove it from view)
//     setIsFullyClosed(true);
//     onClose();
//   };

//   useEffect(() => {
//     // If the panel is fully closed, call onClose after a short delay
//     // This allows for any closing animations to complete
//     if (isFullyClosed) {
//       const timer = setTimeout(() => {
//         onClose();
//       }, 300); // Adjust this timing to match your transition duration

//       return () => clearTimeout(timer);
//     }
//   }, [isFullyClosed, onClose]);

//   const startYRef = useRef(null);
//   const startHeightRef = useRef(null);

//   const handleDragStart = (e) => {
//     startYRef.current = e.touches ? e.touches[0].clientY : e.clientY;
//     startHeightRef.current = panelRef.current.getBoundingClientRect().height;
//     document.addEventListener("mousemove", handleDragging);
//     document.addEventListener("mouseup", handleDragEnd);
//     document.addEventListener("touchmove", handleDragging);
//     document.addEventListener("touchend", handleDragEnd);
//   };

//   const handleDragging = (e) => {
//     const currentY = e.touches ? e.touches[0].clientY : e.clientY;
//     const deltaY = startYRef.current - currentY;
//     const newHeight = startHeightRef.current + deltaY;

//     // Adjust limits for the minimum and maximum height
//     if (newHeight < window.innerHeight * 0.2) {
//       setPanelHeight("20%");
//     } else if (newHeight > window.innerHeight * 0.9) {
//       setPanelHeight("90%");
//     } else {
//       setPanelHeight(newHeight + "px");
//     }
//   };

//   const handleDragEnd = () => {
//     document.removeEventListener("mousemove", handleDragging);
//     document.removeEventListener("mouseup", handleDragEnd);
//     document.removeEventListener("touchmove", handleDragging);
//     document.removeEventListener("touchend", handleDragEnd);
//   };

//   // Removed the handleClickOutside function and event listener

//   if (isFullyClosed) return null;

//   return (
//     <div
//       ref={panelRef} // Attach ref to the panel
//       className={`fixed w-[96%] sm:w-[400px] laptop_s:w-[${width}] h-[98%] top-16  ${ isLangArab?"right-3 sm:left-16 laptop_s:left-3":"right-3 sm:right-16 laptop_s:right-3"} transition-transform duration-300 ease-in-out ${
//         isOpen ? "translate-x-0" : ( isLangArab?"-translate-x-[104%] sm:-translate-x-[116%] laptop_s:-translate-x-[104%] ":" sm:translate-x-[116%] laptop_s:translate-x-[103%] translate-x-[103%] ")
//       }`}
//       // style={{ width, height }}
//     >
//       <div className={`relative sm:h-[40%] laptop_s:h-[65%] h-[90%] sm:w-full w-[99%] float-end sm:float-none rounded-2xl shadow-lg overflow-hidden border transition-colors duration-300 ${
//           isDarkMode
//           ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none" // Dark mode styles
//           : "bg-white bg-opacity-70 border-white text-gray-700"
//         }`}>
//            {/* Drag Handle */}
//         <div
//           className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-gray-400 cursor-pointer"
//           onMouseDown={handleDragStart}
//           onTouchStart={handleDragStart}
//         ></div>
//         {/* X Close Button to slide the panel out */}
//         <button
//           onClick={closePanel}
//           className={`absolute top-4 right-4 p-1 transition-colors ${
//             isDarkMode ? "text-white hover:text-gray-300" : "text-gray-600 hover:text-gray-900"
//           }`}
//           aria-label="Close side panel"
//         >
//           <X className="h-6 w-6" />
//         </button>

//         <div className="p-6 overflow-y-auto h-full">
//           {children || (<>
//             <p className={`text-${isDarkMode ? '[#FFFFFFCC] text-opacity-80' : 'black'}  font-poppins font-medium`}>
//               { isLangArab?"القياس": "Measurement"}
//             </p>
            
//             </>
//           )}
//           <div><Measurements mapview={mapview}/></div>
//         </div>
//       </div>

//       {/* Toggle button to slide panel in and out */}
//       <div className={`absolute hidden sm:block top-4 ${isLangArab?"-right-7":"-left-6"}`}>
//         <button
//           onClick={toggleSideLayout}
//           className="relative w-8 h-32 focus:outline-none"
//           aria-label={isOpen ? "Close side panel" : "Open side panel"}
//         >
//           { isLangArab?<svg
//       width="32"
//       height="128"
//       viewBox="0 0 64 371"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       style={{
//         position: 'relative',
//         top: '1px',
//         right: '3px',
//       }}
//     >
//       <g
//         clipPath="url(#clip0_4011_11301)"
//         transform="scale(-1, 1) translate(-64, 0)" // Flipping horizontally
//       >
//         <path
//           d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
//           fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EBEFF2"}
//           stroke={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EEF3F7"}
//           strokeWidth="6"
//         />
//       </g>
//       <defs>
//         <clipPath id="clip0_4011_11301">
//           <rect width="64" height="371" fill="white" />
//         </clipPath>
//       </defs>
//     </svg>:<svg
//             width="32"
//             height="128"
//             viewBox="0 0 64 371"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             style={{
//               position: 'relative',
//               top: '1px',
//               right: '3px',
//             }}
//           >
//             <g clipPath="url(#clip0_4011_11301)">
//               <path
//                 d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
//                 fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EBEFF2"} // Updated for dark mode
//       stroke={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EEF3F7"}
//                 strokeWidth="6"
//               />
//             </g>
//             <defs>
//               <clipPath id="clip0_4011_11301">
//                 <rect width="64" height="371" fill="white" />
//               </clipPath>
//             </defs>
//           </svg>}

//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//             <IoIosArrowForward
//               className={`text-xl transition-transform duration-300 ${
//                 isOpen ? "rotate-360" : ""
//               } ${!isOpen && (toggleCount > 0 ? "rotate-180" : "")}`}
//               style={{ color: isDarkMode ? "#fff" : "#000" }}
//             />
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { X } from 'lucide-react';
import Measurements from "../../components/Widgets/Measurement/Measurements";
import { useTheme } from '../Layout/ThemeContext/ThemeContext';
import { useAuth } from "../../Providers/AuthProvider/AuthProvider";

export default function SideLayout3({ children, width = "454.84px", onClose, mapview }) {
  const { isDarkMode, isLangArab } = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const [isFullyClosed, setIsFullyClosed] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const panelRef = useRef(null);
  const { MeasurementOpenWidget } = useAuth();
  const [panelHeight, setPanelHeight] = useState("95%");
  const [ToggleDragHeight,setToggleDragHeight] = useState(false)

  const toggleSideLayout = () => {
    if (!isFullyClosed) {
      setIsOpen(prev => !prev);
      setToggleCount(prev => prev + 1);
    }
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setIsFullyClosed(false);
    }
  };

  const closePanel = () => {
    if (MeasurementOpenWidget) {
      MeasurementOpenWidget.destroy();
    }
    setIsFullyClosed(true);
    onClose();
  };

  useEffect(() => {
    if (isFullyClosed) {
      const timer = setTimeout(() => {
        onClose();
      }, 300);
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

  if (isFullyClosed) return null;

  return (
    <div
    dir={isLangArab && "rtl"}
      ref={panelRef}
      style={{ height: ToggleDragHeight && panelHeight }} // Update height dynamically here
      className={`fixed  w-full sm:w-[400px]  laptop_s:w-[${width}] h-[98%] -bottom-9  sm:top-20 ${
        isLangArab ? " sm:left-16 laptop_s:left-6" : "  sm:right-16 laptop_s:right-6"
      } transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : isLangArab ? "-translate-x-[104%] sm:-translate-x-[116%] laptop_s:-translate-x-[106%]" : "sm:translate-x-[116%] laptop_s:translate-x-[106%] translate-x-[103%]"
      }`}
    >
      <div
        className={`relative sm:h-[40%] laptop_s:h-[65%] h-[90%] sm:w-full w-full float-end sm:float-none   ${((startYRef !== null) || (startHeightRef !== null) ) ?" border-t sm:rounded-2xl sm:border rounded-t-xl":"rounded-2xl border"}  shadow-lg overflow-hidden  transition-colors duration-300 ${
          isDarkMode ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none" : "  bg-white bg-opacity-70 sm:border-white text-gray-700"
        }`}
        style={{ height: ToggleDragHeight && panelHeight }}
      >
        <div
          className="absolute top-2 left-1/2 flex sm:hidden -translate-x-1/2 w-12 h-1 rounded-full bg-gray-400 cursor-pointer"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        ></div>
        

        <div className="p-6 overflow-y-auto h-full">
          {children || (
            <div className=" flex justify-between items-center">
              <p className={`${isDarkMode ? 'text-[#FFFFFFCC] text-opacity-80' : ' text-black'} text-[16px] font-poppins font-medium`}>
                {isLangArab ? "القياس" : "Measurement"}
              </p>
              <button
          onClick={closePanel}
          className={` p-1 transition-colors ${
            isDarkMode ? "text-white hover:text-gray-300" : "text-gray-600 hover:text-gray-900"
          }`}
          aria-label="Close side panel"
        >
          <X className="h-6 w-6" />
        </button>
            </div>
          )}
          <div><Measurements mapview={mapview} /></div>
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

