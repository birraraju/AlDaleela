import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { X } from "lucide-react";
import { useTheme } from '../Layout/ThemeContext/ThemeContext';
import EditPOIPoint from '../../assets/Droppedpin/EditPoints.svg';

export default function EditAddPOI({
  children,
  onClose,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [isFullyClosed, setIsFullyClosed] = useState(false);
  const panelRef = useRef(null);
  const { isDarkMode, isLangArab,setIsPOIAddShow } = useTheme();
  const poiOptions = [
    { label: "Terrestrial", isHighlighted: false },
    { label: "Marine", isHighlighted: false },
    { label: "Island", isHighlighted: true }
  ];

  const [selectedIndex, setSelectedIndex] = useState(null); // Track the selected item

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const toggleSideLayout = () => {
    setIsOpen((prev) => !prev);
    if (isFullyClosed) setIsFullyClosed(false);
  };

  const closePanel = () => {
    setIsFullyClosed(true);
    onClose();
  };

  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      // Prevents automatic panel close on outside clicks
    }
  };

  useEffect(() => {
    if (isFullyClosed) {
      const timer = setTimeout(onClose, 300);
      return () => clearTimeout(timer);
    }
  }, [isFullyClosed, onClose]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isFullyClosed) return null;

  return (
    <div
      ref={panelRef}
      className={`fixed top-16 w-[500px] sm:w-[400px] laptop_s:w-[350px] h-[90%] sm:h-[50%] laptop_s:h-[50%] ${
        isLangArab ? "left-3 sm:left-16 laptop_s:left-3" : "right-3 sm:right-16 laptop_s:right-3"
      } transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : isLangArab ? "-translate-x-[104%]" : "translate-x-[103%]"
      }`}
    >
      <div className={`relative h-full sm:w-[80%] tab:w-full w-[67%] rounded-2xl shadow-lg overflow-hidden border ${
          isDarkMode
            ? "bg-[rgba(96,96,96,0.8)] border-none"
            : "bg-white/95 border-white  text-gray-700"
        }`}>
        <button
          onClick={closePanel}
          className={`absolute top-4 right-4 p-1 ${isDarkMode ? "text-white hover:text-gray-300" : "text-gray-600 hover:text-gray-900"}`}
          aria-label="Close side panel"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6 overflow-y-auto h-full">
          {children || (
            <>
              <p className={`font-poppins font-medium ${isDarkMode ? "text-[#FFFFFFCC]" : "text-black"}`}>
                {isLangArab ? "محرر" : "Editor"}
              </p>
              <div className="px-1 py-3">
      <div className="flex-1 gap-2">
        {poiOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => {handleSelect(index);setIsPOIAddShow(true);}} // Set selected index on click
            className={`flex gap-2 px-2 py-1 cursor-pointer ${
              selectedIndex === index ? "bg-[#DFE2E3]" : ""
            }`}
          >
            <img src={EditPOIPoint} className="w-3" alt="Icon" />
            <p>{option.label}</p>
          </div>
        ))}
      </div>
    </div>
            </>
          )}
        </div>
      </div>

      <div className={`absolute top-4 ${isLangArab ? "-right-7" : "-left-6"}`}>
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
              style={{ position: 'relative', top: '1px', right: '3px' }}
            >
              <g clipPath="url(#clip0_4011_11301)" transform="scale(-1, 1) translate(-64, 0)">
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
            </svg>
          )}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <IoIosArrowForward
              className={`text-black text-xl transition-transform duration-300 ${
                isOpen ? "rotate-360" : ""
              } ${!isOpen && "rotate-180"}`}
              style={{ color: isDarkMode ? "#fff" : "#000" }}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
