import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Location from '../../assets/Droppedpin/Location.svg';
import { X } from "lucide-react";
import DarkLocation from '../../assets/Droppedpin/Dropped Pin.svg';
import { useTheme } from '../Layout/ThemeContext/ThemeContext'; // Import the theme context
// import Editor from '../../components/Widgets/Editor/Editor'
import AddPOI from '../DropBin/DropbinPOIAdd'
import  POIEditFileUploaderStatusMOdel from '../Layout/POIEdit/POIEditSucessFailure'
import EditAddPOI from "./EditAddPOI";

export default function SideLayout4({ children,onClose,setIsMsgStatus,setModalMessage,setIsSuccess, mapview }) { //height = "calc(95vh - 2rem)",
  const [isOpen, setIsOpen] = useState(true);   // Controls slide in/out
  const [isFullyClosed, setIsFullyClosed] = useState(false); // Controls visibility
  const [toggleCount, setToggleCount] = useState(0);
  const containerRef = useRef(null);
  const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state
  const [isFormShow,setFormShow]=useState(false)
  const [message,setmessage]= useState("")
  const [POIFormsuccessShow,setPOIFormsuccessShow]=useState("")
  const [POIFormisOpenModalShow,setPOIFormisOpenModalShow]=useState(false)
  const [isShowEdit, setIsShowEdit]=useState(true)
  const [addPointGeometry,setaddPointGeometry]= useState("")
  const [selectedLayer,setselectedLayer]= useState("")


  // Toggles the side panel sliding in and out
  const toggleSideLayout = () => {
    setIsOpen(prev => !prev); // Toggle visibility
    setToggleCount(prev => prev + 1); // Increment toggle count
  };

  // Completely closes the side panel
  const closePanel = () => {
    setIsFullyClosed(true);
    onClose();
  };

  // Handle outside click detection (removed the close functionality)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        // Removed closePanel() call here.
        // You can still handle other logic if needed for outside clicks.
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  useEffect(() => {
    // If the panel is fully closed, call onClose after a short delay
    if (isFullyClosed) {
      const timer = setTimeout(() => {
        onClose();
      }, 300); // Adjust this timing to match your transition duration
 
      return () => clearTimeout(timer);
    }
  }, [isFullyClosed, onClose]);

  // If the panel is fully closed, don't render anything
  if (isFullyClosed) return null;

  return (
    <div
      className={`fixed top-20 w-[95%] ${(POIFormisOpenModalShow || isShowEdit )?"h-[63%] tab_l:h-[40%] laptop_s:h-[60%] laptop_lg:h-[40%] laptop_s:w-[400px] ":"h-[90%] laptop_s:w-[400px] "} sm:w-[400px]   ${ isLangArab?" right-3 sm:left-16 laptop_s:left-6":"right-3 sm:right-16 laptop_s:right-6"} transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : ( isLangArab?"-translate-x-[104%] sm:-translate-x-[116%] laptop_s:-translate-x-[106%] ":"translate-x-[103%] sm:translate-x-[116%] laptop_s:translate-x-[106%]")
      }`}
      // style={{ width, height, zIndex: 50 }}  // Ensure it's above other elements
      ref={containerRef}  // Reference to the panel
    >
      <div dir={isLangArab && "rtl"} className={`relative sm:h-[90%] ${POIFormsuccessShow?" laptop_s:h-[100%] ":" h-[98%]"}    w-[99%] float-end sm:w-full rounded-2xl shadow-lg overflow-hidden border transition-colors duration-300 ${
          isDarkMode
            ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none" // Dark mode styles
            : "bg-white bg-opacity-70 border-white"
        }`}>
        {/* Sticky Dropped Pin */}
        <div className="sticky top-1 z-10 p-4 bg-opacity-70">
          <div className="flex items-center gap-x-1">
            {isFormShow ? <><img src={isDarkMode ? DarkLocation : Location} alt="Location" className=" h-[15px] w-[15px]" />
            <p
              className={`font-500    text-[14px] ${
                isDarkMode ? "text-white" : "text-[#353535]"
              }`}
            >
              {isLangArab ? "دبوس مُنقَطِع" : "Dropped pin"}
            </p>
            </>: (!POIFormsuccessShow &&
            <p className={` text-[16px]    font-600 ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#505050]"}`}>
                {isLangArab ? "محرر" : "Editor"}
              </p>)}
          </div>
          <button
            onClick={closePanel}
            
            className={`absolute top-2  ${isLangArab ?"left-2":"right-4"} p-2 transition-colors cursor-pointer z-50 ${
              isDarkMode ? "text-white hover:text-gray-300" : "text-gray-600 hover:text-gray-900"
            }`}
            aria-label="Close side panel"
            style={{ zIndex: 100 }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className={` px-3 overflow-y-auto h-full relative`}>
          {children || (
            <>    
              <div className="overflow-y-auto h-full">
                <AddPOI
                isLangArab={isLangArab}
                  mapview={mapview}
                  selectedLayer={selectedLayer}
                  addPointGeometry={addPointGeometry}
                  isFormShow={isFormShow}
                  setPOIFormsuccessShow={setPOIFormsuccessShow}
                  setPOIFormisOpenModalShow={setPOIFormisOpenModalShow}
                  setmessage={setmessage}
                  setIsSuccess={setIsSuccess}
            setIsMsgStatus={setIsMsgStatus}
            setModalMessage={setModalMessage}
                  setFormShow={setFormShow}
                  onClose={()=>{setIsShowEdit(true);setFormShow(false);}}
                />
                <POIEditFileUploaderStatusMOdel
                 label={"POIAdd"}
                  message={message}
                  success={POIFormsuccessShow}
                  isOpenModal={POIFormisOpenModalShow}
                  onClose={() => {
                    setFormShow(true);
                    setPOIFormisOpenModalShow(false);
                    onClose();
                  }}
                />
                <EditAddPOI setselectedLayer={setselectedLayer} setaddPointGeometry={setaddPointGeometry} mapview={mapview} isShowEdit={isShowEdit} onClose={()=>{setFormShow(true);setIsShowEdit(false)}}/>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Toggle button */}
      <div className={`absolute hidden sm:block top-4 ${isLangArab?"-right-7":"-left-6"}`}>
        <button
          onClick={toggleSideLayout}
          className="relative w-8 h-32 focus:outline-none cursor-pointer" // Ensure cursor pointer
          aria-label={isOpen ? "Close side panel" : "Open side panel"}
        >
          {isLangArab ?<svg
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
