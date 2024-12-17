import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import loc from "../../../assets/Contribution/image.png";
import { FiChevronRight } from "react-icons/fi";
import { useTheme } from "../../Layout/ThemeContext/ThemeContext"; // Importing the theme context
import { useAuth } from "../../../Providers/AuthProvider/AuthProvider";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"; 
import Graphic from "@arcgis/core/Graphic";

export default function ContributionPopup({ setIsPopoverOpen, setIsContribution }) {
  const containerRef = useRef(null);
  const { isDarkMode, isLangArab } = useTheme(); // Access dark mode and language context
  const [isOpen, setIsOpen] = useState(true);
  const {profiledetails, setconrextMapView, setinitialExtent,setIsEditPOI, setPopupSelectedGeo, contextMapView} = useAuth();
  const [featureServiceData, setfeatureServiceData] = useState([]);
  const [clickedLocation, setClickedLocation] = useState(null); // State to track clicked location

  // console.log("Passed Contribution data :", featureServiceData)

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
        const sortedData = data.data.sort((a, b) => b.id - a.id);
        setfeatureServiceData(sortedData);
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

   const handleOpenPOIEdit =async(contribution)=>{
    try {
      // Create a FeatureLayer instance for the selected layer
      const featureLayer = new FeatureLayer({
        url: contribution.featureServiceURL,
        outFields: ["*"]
      });
  
      // Query the selected layer using the OBJECTID
      const feature = await featureLayer.queryFeatures({
        where: `OBJECTID = ${contribution.featureObjectId}`,
        outFields: ["*"],
        returnGeometry: true
      });
  
      // Check if any features are found and handle accordingly
      if (feature.features.length > 0) {
        //openPopup(feature.features[0], objectId); // Open popup with feature info
        const pointGraphic = new Graphic({
          geometry: feature.features[0].geometry,
          symbol: {
            type: "simple-marker",
            outline: {
              color: [0, 255, 255, 4],
              width: 1
            }
          }
        });
    
        contextMapView.graphics.add(pointGraphic);
        await contextMapView.goTo({
          target: feature.features[0].geometry,
          center: feature.features[0].geometry,  // Centers on the feature's geometry
          zoom: 15  // Sets the zoom level
        });
        
        // setPopupSelectedGeo(feature.features[0])
        // setIsEditPOI(true);
      } else {
        console.log(`No feature found with OBJECTID: ${contribution.featureObjectId}`);
      }
    } catch (error) {
      console.error(`Error querying layer ${contribution.featureServiceURL}:`, error);
    }
    // setClickedLocation(contribution)
    // setIsEditPOI();
    // setIsPopoverOpen(true);
    // setIsContribution(false);
   }

  return (
    <div
      ref={containerRef}
     
      transition={{ ease: "easeInOut" }}
      className={`sm:px-3 px-2 py-4 fixed sm:top-16 laptop_s:top-20 top-14 ${
        isLangArab ? "sm:left-6 left-3" : "sm:right-6  right-3"
      } bg-opacity-75 backdrop-blur sm:rounded-3xl rounded-xl ${
        isDarkMode ? "bg-[rgba(96,96,96,0.8)]" : "bg-white bg-opacity-70"
      } text-black backdrop-blur border-none transition-transform duration-300 ease-in-out  ${
        isOpen ? "translate-x-0" : ( isLangArab?"-translate-x-[104%] sm:-translate-x-[112%] laptop_s:-translate-x-[108%]":" translate-x-[103%] sm:translate-x-[112%] laptop_s:translate-x-[108%]")
      } `}
    >
      <div dir={isLangArab && "rtl"} className={`flex relative px-3 justify-between items-center `}>
        <h1
          className={`text-[15px] sm:text-[16px] laptop_s:text-[16px]    font-600 ${
            isDarkMode ? "text-[#FFFFFFCC]" : "text-[#505050]"
          }`}
        >
          {isLangArab ? "المساهمة" : "Contribution"}
        </h1>
        <div
          className={` w-[19px] h-[19px] flex justify-center items-center cursor-pointer ${
            isDarkMode ? "text-white hover:text-gray-300" : "text-gray-600 hover:text-gray-900"
          } transition-colors`}
          onClick={() => {
            setIsPopoverOpen(true);
            setIsContribution(false);
          }}
        >
          <X className=" w-full h-full" />
        </div>
      </div>

      <div className={`px-1 py-3 sm:w-[350px]  laptop_s:w-[325px] w-[320px] max-h-[calc(79vh-200px)]  overflow-y-auto mt-2 ${(!featureServiceData.length > 0) && 'min-h-[350px]'}`}>
        <div
          className={`grid   grid-cols-3 gap-4 font-medium text-[12px] mb-2 px-4 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          } ${isLangArab ? "text-right" : "text-left"} ${
            isLangArab ? "direction-rtl" : ""
          }`} // RTL for Arabic
        >
          <div className={` font-500 ${isDarkMode?"text-[#FFFFFFCC]":"text-[#667085]"} `}>{isLangArab ? "التاريخ" : "Date"}</div>
          <div className={` font-500 ${isDarkMode?"text-[#FFFFFFCC]":"text-[#667085]"}`} >{isLangArab ? "اسم نقطة الاهتمام" : "POI Name"}</div>
          <div className={` mr-12 font-500 ${isDarkMode?"text-[#FFFFFFCC]":"text-[#667085]"}`}>{isLangArab ? "الحالة" : "Status"}</div>
        </div>
        {featureServiceData.map((contribution, index) => (
          <div
            key={index}
            className={`grid grid-cols-3 gap-4 py-5 text-sm px-4 ${
              index % 2 === 0 ? "bg-[#D5E5DE] bg-opacity-30" : "bg-transparent"
            } ${isLangArab ? "text-right" : "text-left"}`}
          >
        <div
  className={`font-500   sm:text-[13px] text-[10px] ${
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
              className={`font-500   sm:text-[12px] laptop_s:text-[13px] text-[9px] ${
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
          }   ${
            isLangArab ? "sm:text-[12px] text-[14px]" : "sm:text-[12px] text-[14px]"
          } font-500 bg-clip-text text-transparent`
        : contribution.approvalStatus === "Rejected"
          ? "text-red-500   sm:text-[12px] text-[14px] font-500"
        : `${
            isDarkMode ? "text-white/70" : "text-[#EFB45D]"
          }   sm:text-[13px] text-[14px] font-500`
    }`}
  >
    {contribution.approvalStatus === "Approved" &&
      (isLangArab ? "معتمد" : "Approved")}
    {contribution.approvalStatus === "Pending" &&
      (isLangArab ? "قيد الانتظار" : "Pending")}
    {contribution.approvalStatus === "Rejected" &&
    (isLangArab ? "مرفوض" : "Rejected")}
  </span>
  <button onClick={() => handleOpenPOIEdit(contribution)} disabled={contribution.approvalStatus !== "Approved"}
    className={`${
      contribution.approvalStatus !== "Approved" ? "opacity-50 cursor-not-allowed" : ""
    }`}>
  <img
          src={loc}
                alt="Location icon"
                className="sm:w-5 w-5 sm:h-5 h-4 cursor-pointer"
                
              />
              </button>
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
              <path
                d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
                fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "rgba(255, 255, 255, 0.7)"}
                stroke="none"
                strokeWidth="0"
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
    </div>
  );
}
