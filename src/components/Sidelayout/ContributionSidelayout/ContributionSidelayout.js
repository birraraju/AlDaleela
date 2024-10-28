import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import loc from "../../../assets/Contribution/image.png";
import { FiChevronRight } from "react-icons/fi";
import { useTheme } from "../../Layout/ThemeContext/ThemeContext"; // Importing the theme context
import { useAuth } from "../../../Providers/AuthProvider/AuthProvider";

export default function ContributionPopup({ setIsPopoverOpen, setIsContribution }) {
  const containerRef = useRef(null);
  const { isDarkMode, isLangArab } = useTheme(); // Access dark mode and language context
  const [isOpen, setIsOpen] = useState(true);
  const {profiledetails, contextMapView} = useAuth();
  const [featureServiceData, setfeatureServiceData] = useState([]);

  const contributions = [
    { date: "2024-10-11", poiName: "Al Makhtabshah", status: "Pending" },
    { date: "2024-10-11", poiName: "Al Qahhah", status: "Approved" },
    { date: "2024-10-11", poiName: "Al Abhuth", status: "Pending" },
    { date: "2024-10-11", poiName: "Al Buwem", status: "Approved" },
    { date: "2024-10-11", poiName: "Al Khabaq", status: "Pending" },
  ];

  // Detect outside click to close the popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsPopoverOpen(false);
        setIsContribution(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsPopoverOpen, setIsContribution]);

  const fetchFeatureServiceData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/FeatureServiceData/${profiledetails.email}`);

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if(data.success){              
        setfeatureServiceData(data.data);
      }
      else{
        //console.log(data)          
      }
      
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {   

    fetchFeatureServiceData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <motion.div
      ref={containerRef}
      initial={{ x: "100%", opacity: 0 }}
      whileInView={{
        x: isOpen ? 0 : isLangArab ? "-109%" : "109%", // Move to left if Arabic
        opacity: 1,
      }}
      exit={{
        x: isLangArab ? "-90%" : "100%", // Exit to left for Arabic, right for others
        opacity: 0,
      }}
      transition={{ ease: "easeInOut" }}
      className={`sm:px-8 px-2 py-4 fixed sm:top-16 laptop_s:top-16 top-14 ${
        isLangArab ? "sm:left-10 left-3" : "sm:right-10 right-3"
      } bg-opacity-75 backdrop-blur sm:rounded-3xl rounded-xl ${
        isDarkMode ? "bg-[rgba(96,96,96,0.8)]" : "bg-white bg-opacity-70"
      } text-black backdrop-blur border-none`}
    >
      <div className={`flex relative justify-between items-center ${isLangArab ? "flex-row-reverse" : ""}`}>
        <h1
          className={`text-[15px] sm:text-[17px] laptop_s:text-[19px] font-semibold ${
            isDarkMode ? "text-[#FFFFFFCC]" : "text-black"
          }`}
        >
          {isLangArab ? "المساهمة" : "Contribution"}
        </h1>
        <div
          className={`p-2 cursor-pointer ${
            isDarkMode ? "text-white hover:text-gray-300" : "text-gray-600 hover:text-gray-900"
          } transition-colors`}
          onClick={() => {
            setIsPopoverOpen(true);
            setIsContribution(false);
          }}
        >
          <X />
        </div>
      </div>

      <div className="p-1 sm:w-[350px] laptop_s:w-[350px] w-[320px] max-h-[calc(100vh-200px)] overflow-y-auto mt-2">
        <div
          className={`grid font-omnes grid-cols-3 gap-4 font-medium text-[14px] mb-2 px-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          } ${isLangArab ? "text-right" : "text-left"} ${
            isLangArab ? "direction-rtl" : ""
          }`} // RTL for Arabic
        >
          <div>{isLangArab ? "التاريخ" : "Date"}</div>
          <div>{isLangArab ? "اسم نقطة الاهتمام" : "POI Name"}</div>
          <div className="mr-12">{isLangArab ? "الحالة" : "Status"}</div>
        </div>
        {featureServiceData.map((contribution, index) => (
          <div
            key={index}
            className={`grid grid-cols-3 gap-4 py-5 text-sm px-4 ${
              index % 2 === 0 ? "bg-[#D5E5DE] bg-opacity-30" : "bg-transparent"
            } ${isLangArab ? "text-right" : "text-left"}`}
          >
        <div
  className={`font-medium font-omnes sm:text-[13px] text-[10px] ${
    isDarkMode ? "text-[#FFFFFFCC]" : "text-[#101828]"
  }`}
>
  {isLangArab 
    ? new Date(contribution.createdAt).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: '2-digit', // Use 2-digit month to get '10' instead of 'October'
        day: '2-digit' // Use 2-digit day to get '23'
      }).replace(/\//g, '-') // Replace slashes with hyphens
    : new Date(contribution.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit', // Use 2-digit month for consistency
        day: '2-digit' // Use 2-digit day
      }).replace(/\//g, '-') // Replace slashes with hyphens
  }
</div>


            <div
              className={`font-medium font-omnes sm:text-[12px] laptop_s:text-[13px] text-[9px] ${
                isDarkMode ? "text-[#FFFFFFCC]" : "text-[#3E3E3E]"
              }`}
            >
              {contribution.nameEn}
            </div>
            <div className="flex justify-between gap-x-2 sm:gap-x-3 laptop_s:gap-x-0 items-center">
  <span
    className={`${
      contribution.approvalStatus === "Approved"
        ? `${
            isDarkMode
              ? "text-white/70"
              : "bg-custom-gradient"
          } font-omnes ${
            isLangArab ? "sm:text-[22px] text-[24px]" : "sm:text-[13px] text-[14px]"
          } font-medium bg-clip-text text-transparent`
        : `${
            isDarkMode ? "text-black/80" : "text-[#EFB45D]"
          } font-omnes sm:text-[13px] text-[14px] font-medium`
    }`}
  >
    {contribution.approvalStatus === "Approved" &&
      (isLangArab ? "معتمد" : "Approved")}
    {contribution.approvalStatus === "Pending" &&
      (isLangArab ? "قيد الانتظار" : "Pending")}
  </span>
  <img src={loc} alt="Location icon" className="sm:w-7 w-5 sm:h-7 h-4 cursor-pointer" />
  </div>

          </div>
        ))}
      </div>
      {/* Toggle button */}
      <div className={`absolute top-12 ${isLangArab ? "-right-7" : "-left-6"} sm:block hidden`}>
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
                transform="scale(-1, 1) translate(-64, 0)" // Flipping horizontally for Arabic
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
              <path
                d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
                fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EBEFF2"}
                stroke={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EEF3F7"}
                strokeWidth="6"
              />
            </svg>
          )}

          <FiChevronRight
            className={`absolute left-2 top-14 w-4 h-4 ${
              isOpen ? "" : "rotate-180"
            }`}
          />
        </button>
      </div>
    </motion.div>
  );
}
