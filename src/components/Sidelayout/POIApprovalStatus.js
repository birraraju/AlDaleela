import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Location from '../../assets/POIEdit/POIBIN.svg';
// import { X } from "lucide-react";
import DarkLocation from '../../assets/Droppedpin/Dropped Pin.svg';
import { useTheme } from '../Layout/ThemeContext/ThemeContext';
import StatuesUpdatePOI from '../DropBin/DropBinStatusUpdate';
import POIEditFileUploaderStatusModel from '../Layout/POIEdit/POIEditSucessFailure';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function POIApprovalStatus({ children, onClose, mapview }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isFullyClosed, setIsFullyClosed] = useState(false);
  const [toggleCount, setToggleCount] = useState(0);
  const containerRef = useRef(null);
  const { isDarkMode, isLangArab } = useTheme();
  const [isFormShow, setFormShow] = useState(true);
  const [message, setMessage] = useState("");
  const [POIFormSuccessShow, setPOIFormSuccessShow] = useState("");
  const [POIFormIsOpenModalShow, setPOIFormIsOpenModalShow] = useState(false);
  const navigate = useNavigate();

  // Toggles the side panel sliding in and out
  const toggleSideLayout = () => {
    setIsOpen(prev => !prev);
    setToggleCount(prev => prev + 1);
  };

  // Completely closes the side panel
  const closePanel = () => {
    setIsFullyClosed(true);
    onClose();
  };

  useEffect(() => {
    // Outside click detection
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        // Handle other logic if needed for outside clicks
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [containerRef]);

  // Avoid rendering if panel is fully closed
  if (isFullyClosed) return null;

  return (
    <div
    dir={isLangArab && "rtl"}
      className={`fixed top-16 w-[510px] ${POIFormIsOpenModalShow ? "h-[63%]" : "h-[90%]"} sm:w-[400px] laptop_s:w-[320px] ${
        isLangArab ? "left-3 sm:left-16 laptop_s:left-3" : "right-3 sm:right-16 laptop_s:right-3"
      } transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : isLangArab ? "-translate-x-[104%]" : "translate-x-[103%]"
      }`}
      ref={containerRef}
    >
      <div className={`relative sm:h-[80%] laptop_s:h-[90%] h-[98%] w-[65%] float-end sm:w-full rounded-2xl shadow-lg overflow-hidden border transition-colors duration-300 ${
        isDarkMode ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none" : "bg-white bg-opacity-70 border-white"
      }`}>
        {/* Sticky Dropped Pin */}
        <div className="sticky top-4 z-10 p-4 bg-opacity-70">
          <div className="flex w-[40%] justify-start items-center gap-x-1">
            <img src={isDarkMode ? DarkLocation : Location} alt="Location" className="h-4" />
            <p className={`font-semibold font-poppins ${isDarkMode ? "text-white" : "text-gray-600"}`}>
              <h2 className="text-[12px]">Barqa Rashid</h2>
            </p>
          </div>
          {isFormShow && <div>
            <button
          onClick={onClose}
          className="px-1 py-3 hover:text-blue-500 flex items-center text-black focus:outline-none"

       
        >{isLangArab ?<>
         <span className={isDarkMode?"text-white hover:text-gray-200":" text-black hover:text-blue-500"}>{isLangArab?"خلف":"Back"}</span>
          <ChevronLeft className={isDarkMode?"w-5 h-5 text-white":"w-5 h-5 text-black"} />
                   </> :<>
          <ChevronLeft className={isDarkMode?"w-5 h-5 text-white":"w-5 h-5 text-black"} />
          <span className={isDarkMode?"text-white hover:text-gray-200":" text-black hover:text-blue-500"}>{isLangArab?"خلف":"Back"}</span>
          </>}
        </button></div>}
        </div>

        {/* Scrollable Content */}
        <div className="px-4 py-1 overflow-y-auto h-full relative">
          {children || (
            <>
              <div className="overflow-y-auto  h-[79%]">
                <StatuesUpdatePOI isLangArab={isLangArab} isDarkMode={isDarkMode} setMessage={setMessage} setFormShow={setFormShow} setPOIFormIsOpenModalShow={setPOIFormIsOpenModalShow} setPOIFormSuccessShow={setPOIFormSuccessShow} isFormShow={isFormShow} />
                <POIEditFileUploaderStatusModel
                  message={message}
                  label={"Approval"}
                  success={POIFormSuccessShow}
                  isOpenModal={POIFormIsOpenModalShow}
                  onClose={() => {
                    setFormShow(true);
                    setPOIFormIsOpenModalShow(false);
                    closePanel()
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Toggle button */}
      <div className={`absolute top-4 ${isLangArab ? "-right-7" : "-left-7"}`}>
        <button
          onClick={toggleSideLayout}
          className="relative w-8 h-32 focus:outline-none cursor-pointer"
          aria-label={isOpen ? "Close side panel" : "Open side panel"}
        >
          {isLangArab ? (
            <svg width="32" height="128" viewBox="0 0 64 371" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="scale(-1, 1) translate(-64, 0)">
                <path
                  d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
                  fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EBEFF2"}
                  stroke={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EEF3F7"}
                  strokeWidth="6"
                />
              </g>
            </svg>
          ) : (
            <svg width="32" height="128" viewBox="0 0 64 371" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
                fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EBEFF2"}
                stroke={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EEF3F7"}
                strokeWidth="6"
              />
            </svg>
          )}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <IoIosArrowForward
              className={`text-black text-xl transition-transform duration-300 ${isOpen ? "rotate-360" : ""} ${!isOpen && (toggleCount > 0 ? "rotate-180" : "")}`}
              style={{ color: isDarkMode ? "#fff" : "#000" }}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
