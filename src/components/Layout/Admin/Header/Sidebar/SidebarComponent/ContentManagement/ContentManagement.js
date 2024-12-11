import React, { useState, useRef, useEffect } from 'react';
import { Check } from 'lucide-react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import PinPoint from '../../../../../../../assets/Admin/logo/imageContentMangePin.png';
import MediaPinPoint from '../../../../../../../assets/Admin/logo/imagePinMedia.png';
import { useTheme } from "../../../../../ThemeContext/ThemeContext"; // Importing the theme context
import { useNavigate } from 'react-router-dom';
import RoleServices from '../../../../../../servicces/RoleServices';
import { useAuth } from "../../../../../../../Providers/AuthProvider/AuthProvider";
import Pagination from "../../../../Layout/Pagination/PaginationBar"
import StatsOverview from './stats-overview';


const users = [
  { username: "User name", email: "user@gmail.com", Datetime: "2024-10-11 09:22:25", poiName: "Al Makhtabshah", Organization: "DMT", classification: "Marine", municipality: "Abu Dhabi", media: "3" },
  { username: "User name", email: "user@gmail.com", Datetime: "2024-10-11 09:22:25", poiName: "Al Qahhah", Organization: "DMT", classification: "Terrestrial", municipality: "Al Dhafra", media: "2" },
  { username: "User name", email: "ctive@gmail.com", Datetime: "2024-10-11 09:22:25", poiName: "Al Abhuth", Organization: "DMT", classification: "Marine", municipality: "Al Dhafra", media: "5" },
  { username: "User name", email: "user@gmail.com", Datetime: "2024-10-11 09:22:25", poiName: "Al Buwem", Organization: "DMT", classification: "Island", municipality: "Al Dhafra", media: "12" },
  { username: "User name", email: "user@gmail.com", Datetime: "2024-10-11 09:22:25", poiName: "Al Khabaq", Organization: "DMT", classification: "Island", municipality: "Abu Dhabi", media: "1" },
  // ... other users
];

const CustomCheckbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={`peer h-4 w-4 shrink-0 rounded-sm border border-[#909090] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#036068] data-[state=checked]:text-primary-foreground ${className}`}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
CustomCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export default function UserManagement({role}) {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const tableRef = useRef(null);
  const { isDarkMode, isLangArab } = useTheme(); // Access dark mode from theme context
  const [data, setData] = useState([]);
  const {setDropPinObjectId} = useAuth();
  const [totalItems,setTotalItems] = useState(0); // Example total items count
  // const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items per page

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
    console.log(`Selected page: ${selectedPage}`);
    // Here, you can load data for the selected page if using an API
  };
    console.log("Passed Content Management data :", data)

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
        const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setScrollPercentage(scrollPercentage);
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableElement) {
        tableElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/FeatureServiceData/GetFeatureServiceData`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();        
        if (result.success) {
          const sortedItems = result.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setTotalItems(sortedItems.length)
          setData(sortedItems);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [data]); 

  const handleDropPin = (objectID, featureServiceURL,id, POIOperation, featureObjectId) => {
      navigate({
        pathname: `/${process.env.REACT_APP_BASE_URL}`,
        search: `?sides=POIApproval`,
      });
      setDropPinObjectId({objectID:objectID, featureServiceURL:featureServiceURL, id:id, POIOperation:POIOperation, featureObjectId:featureObjectId});
    console.log("Admin DroppedPin clicked");
  };
  
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <div className="flex h-[calc(100vh-6rem)]">
      
 <div  className={`px-8 py-2 rounded-lg shadow-sm flex flex-col flex-grow overflow-hidden ${
        isDarkMode ? "bg-[#303031] bg-opacity-90" : "bg-white "
      } text-[#101828] backdrop-blur border-none`}>

        <StatsOverview totalRecords={100} 
        approved={50} 
        pending={40} 
        rejected={10} />
                <div className="flex justify-between items-center mb-2">
                <h2 className={`text-[20px] font-500   ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#464646]"}`}>
                {isLangArab ?"إدارة المحتوى":"Content Management"}</h2>
        </div>

        <hr className={`border-t  my-4 ${isDarkMode ? "border-[#FFFFFF] border-opacity-10" : "border-gray-300"}`} />

       <div className="overflow-x-auto laptop_s:overflow-hidden flex-grow relative">
  <div
    ref={tableRef}
    className={`overflow-x-auto overflow-y-auto absolute inset-0 ${isLangArab ? "pl-4" : "pr-4"}`}
  >
    <table className="w-full table-auto">
      <thead
        className={`sticky top-0 z-10 ${isDarkMode ? "bg-[#303031]" : "bg-white"}`}
      >
        <tr className="text-left text-sm    font-500 text-[#667085] border-b">
          {[
            { label: isLangArab ? "اسم المستخدم" : "Username" },
            { label: isLangArab ? "معرف البريد الإلكتروني" : "Email id" },
            { label: isLangArab ? "التاريخ والوقت" : "Date & time" },
            { label: isLangArab ? "اسم النقطة المهمة" : "POI Name" },
            { label: isLangArab ? "منظمة" : "Organization" },
            { label: isLangArab ? "تصنيف" : "Classification" },
            { label: isLangArab ? "بلدية" : "Municipality" },
            { label: isLangArab ? "وسائط" : "Media", icon: true },
          ].map((header, idx) => (
            <th
              key={idx}
              className={`pb-3 laptop_s:p-2 sm:p-1 p-2 font-500   text-[9px] sm:text-[10px] laptop_s:text-[14px] ${
                isLangArab ? "text-right " : "text-left "
              } ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}
            >
              <span className='flex  items-center gap-1 '>
              {header.label}
              {header.icon && (
                <img
                  src={MediaPinPoint}
                  className={`${isDarkMode ? "filter invert brightness-0" : ""} h-[12px] w-[12px] inline-block`}
                  alt=""
                />
              )}
              </span>
            </th>
          ))}
          <th className="pb-3 laptop_s:p-4 laptop_m:p-2 sm:p-4"></th>
        </tr>
      </thead>
      <tbody>
        {paginatedData.map((user, index) => (
          <tr
            key={index}
            className={`${
              isDarkMode
                ? index % 2 === 0
                  ? "bg-transparent"
                  : "bg-white bg-opacity-10"
                : index % 2 === 0
                ? "bg-[#D5E5DE] bg-opacity-30"
                : "bg-white"
            }`}
          >
            <td
              className={`py-4 font-500   text-[10px] sm:text-[12px] laptop_s:text-[14px] ${
                isLangArab ? "pr-2" : "pl-2"
              } ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-[#101828]"} whitespace-nowrap`}
            >
              {user.email}
            </td>
            <td
              className={`py-4 font-500   text-[10px] sm:text-[12px] laptop_s:text-[14px] ${
                isLangArab ? "pr-2" : "pl-2"
              } ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-[#101828]"} whitespace-nowrap`}
            >
              {user.username}
            </td>
            <td
              dir={isLangArab && "ltr"}
              className={`py-4 font-500   text-[10px] sm:text-[12px] laptop_s:text-[14px] ${
                isLangArab ? "pr-2 text-right" : "text-left pl-2"
              } ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-[#101828]"} whitespace-nowrap`}
            >
              {new Date(`${user.createdAt}Z`).toLocaleString()}
            </td>
            <td
              className={`py-4 font-500   text-[10px] sm:text-[12px] laptop_s:text-[14px] ${
                isLangArab ? "pr-2" : "pl-2"
              } ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-[#101828]"} whitespace-nowrap`}
            >
              {user.nameEn}
            </td>
            <td
              className={`py-4 font-500   text-[10px] sm:text-[12px] laptop_s:text-[14px] ${
                isLangArab ? "pr-2" : "pl-2"
              } ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-[#101828]"} whitespace-nowrap`}
            >
              {user.organizationEn}
            </td>
            <td
              className={`py-4 font-500   text-[10px] sm:text-[12px] laptop_s:text-[14px] ${
                isLangArab ? "pr-2" : "pl-2"
              } ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-[#101828]"} whitespace-nowrap`}
            >
              {user.classification}
            </td>
            <td
              className={`py-4 font-500   text-[10px] sm:text-[12px] laptop_s:text-[14px] ${
                isLangArab ? "pr-2" : "pl-2"
              } ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-[#101828]"} whitespace-nowrap`}
            >
              {user.municipality}
            </td>
            <td
              className={`py-4 font-500   text-[10px] sm:text-[12px] laptop_s:text-[14px] ${
                isLangArab ? "pr-2" : "pl-2"
              } ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-[#101828]"} whitespace-nowrap`}
            >
              {user.attachementsObjectIds
                ? user.attachementsObjectIds.split(",").length
                : 0}
            </td>
            <td className="py-4 w-auto sm:w-8 whitespace-nowrap">
              <button
                onClick={() => {
                  handleDropPin(
                    user.featureObjectId,
                    user.featureServiceURL,
                    user.id,
                    user.poiOperation,
                    user.featureObjectId
                  );
                }}
                className="text-red-500 hover:text-red-600"
              >
                <img
                  src={PinPoint}
                  alt=""
                  className={` h-[24px] w-[24px] `}
                />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

        <div className=' flex justify-end'>
        <Pagination 
          currentPage={currentPage} totalPages={totalItems} onPageChange={handlePageChange}
        />
        </div>
      </div>
      {data.length > 0 && <div className={`w-2 rounded-full mr-3 mt-12 mb-10 ml-2 relative ${
        isDarkMode ? "bg-[rgba(96,96,96,0.8)]" : "bg-[rgba(96,96,96,0.8)]"
      } text-[#101828] backdrop-blur border-none`}>
                <div 
          className="w-full bg-[#B2CACC] absolute rounded-full transition-all duration-300 ease-out"
          style={{
            height: `${scrollPercentage}%`,
            top: '0',
          }}
        ></div>
      </div>}
    </div>
  );
}
