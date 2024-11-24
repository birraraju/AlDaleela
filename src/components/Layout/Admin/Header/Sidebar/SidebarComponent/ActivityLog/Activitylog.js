import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from "../../../../../ThemeContext/ThemeContext"; // Importing the theme context
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import Pagination from "../../../../Layout/Pagination/PaginationBar"
import ExportArrow from '../../../../../../../assets/Admin/ActivityLog/exportArrow.svg'

const activityLogs = [
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 09:22:25", ipAddress: "192.168.125.10", action: "Profile update" },
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 09:22:25", ipAddress: "192.168.125.10", action: "Logged out" },
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 08:22:25", ipAddress: "192.168.125.10", action: "User register" },
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 09:22:25", ipAddress: "192.168.125.10", action: "Add attachment" },
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 09:22:25", ipAddress: "192.168.125.10", action: "Logged in" },
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 09:22:25", ipAddress: "192.168.125.10", action: "POI updated" },
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 09:22:25", ipAddress: "192.168.125.10", action: "Profile update" },
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 09:22:25", ipAddress: "192.168.125.10", action: "POI updated" },
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 09:22:25", ipAddress: "192.168.125.10", action: "POI updated" },
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 09:22:25", ipAddress: "192.168.125.10", action: "Add attachment" },
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 09:22:25", ipAddress: "192.168.125.10", action: "Logged in" },
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 09:22:25", ipAddress: "192.168.125.10", action: "POI updated" },
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 09:22:25", ipAddress: "192.168.125.10", action: "Profile update" },
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 09:22:25", ipAddress: "192.168.125.10", action: "Add attachment" },
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 09:22:25", ipAddress: "192.168.125.10", action: "Logged in" },
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 09:22:25", ipAddress: "192.168.125.10", action: "POI updated" },
  { userName: "User Name", emailId: "user@gmail.com", dateTime: "2024-10-11 09:22:25", ipAddress: "192.168.125.10", action: "Profile update" },
];

export default function UserActivityLog() {
  const [data, setData] = useState([]);
  const { isDarkMode, isLangArab } = useTheme(); // Access dark mode from theme context
  const [totalItems,setTotalItems] = useState(0); // Example total items count
  // const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items per page

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
    console.log(`Selected page: ${selectedPage}`);
    // Here, you can load data for the selected page if using an API
  };
      // console.log("Passed Activity log data :", data)

useEffect(() => {
  const fetchData = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/UserActivityLog/Getuseractivitylogs`); // Example API
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
          if(result.success){
            const sortedItems = result.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
            setTotalItems(sortedItems.length)
            setData(sortedItems);
          }
          else{
            console.log(result.message)
          }
    } catch (error) {
        //setError(error.message);
        console.log(error)
    } finally {
        //setLoading(false);
    }
};

fetchData();    
},[data]);

const handleExport = () => {
  const filename = "User-Activity-Logs";

  // Assuming 'data' is your array of objects
  const formattedData = data.map(item => {
    const formattedItem = { ...item };
    // Format CreatedAt and UpdatedAt dates if they exist
    if (formattedItem.createdDate) {
      formattedItem.createdDate = format(new Date(`${formattedItem.createdDate}Z`), 'MM/dd/yyyy, h:mm:ss a');
    }
    if (formattedItem.UpdatedAt) {
      formattedItem.UpdatedAt = format(new Date(`${formattedItem.UpdatedAt}Z`), 'MM/dd/yyyy, h:mm:ss a');
    }
    return formattedItem;
  });

  // Create a new workbook and a worksheet
  const ws = XLSX.utils.json_to_sheet(formattedData);
  const wb = XLSX.utils.book_new();

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Generate a binary string
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Create a Blob and save it as an Excel file
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, `${filename}.xlsx`);
};

const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  
  return (
<div  className={`p-8 rounded-lg shadow-sm h-[calc(100vh-6rem)] flex flex-col ${
        isDarkMode ? "bg-[#303031] bg-opacity-90" : "bg-white "
      } text-[#101828] backdrop-blur border-none`}>
              <div className="flex justify-between items-center mb-6">
              <h2 className={`text-[22px] font-500 font-omnes  ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#464646]"}`}>
              {isLangArab?"سجل نشاط المستخدم":"User Activity Log"}</h2>
        <button  onClick={handleExport}
          className="bg-[#3B8686] text-[#FFFFFF] px-4 py-2 rounded-lg font-500 font-omnes text-sm flex items-center"
        >
          {isLangArab?"تصدير السجل":"Export log"}
          {/* <ArrowDown className="ml-2 h-4 w-4" /> */}
          <img src={ExportArrow} className="ml-2 h-4 w-3"  alt="" />
        </button>
      </div>
      <hr className={`border-t  my-4 ${isDarkMode ? "border-[#FFFFFF] border-opacity-10" : "border-gray-300"}`} />

      <div className="overflow-hidden flex-grow relative">
        <div className="overflow-x-auto overflow-y-auto absolute inset-0">
          <table className="w-full border-collapse">
          <thead className={`sticky top-0   z-10 ${isDarkMode ? "bg-[#303031] " : "bg-white"}`}>
              <tr className={`${isLangArab?"text-right":"text-left"} border-b border-[#E5E7EB]`}>
              <th className={`pb-3 p-2 font-500 font-omnes text-[14px]  ${isLangArab?"pr-2":"pr-2"} ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>
              {isLangArab?"اسم المستخدم":"User Name"}</th>
              <th className={`pb-3 p-2 font-500 font-omnes text-[14px]  ${isLangArab?"pl-2":"pr-2"} ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>
              {isLangArab?"معرف البريد الإلكتروني":"Email iD"}</th>
              <th className={`pb-3 p-2 font-500 font-omnes text-[14px]  ${isLangArab?"pl-2":"pr-32"} ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>
              {isLangArab?"التاريخ والوقت":"Date & Time"}</th>
              <th className={`pb-3 p-2 font-500 font-omnes text-[14px]  ${isLangArab?"pl-2":"pr-4"} ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>
              {isLangArab?"عنوان IP":"IP Address"}</th>
              <th className={`pb-3 p-2 font-500 font-omnes text-[14px]  ${isLangArab?"pl-2":"pr-10"} ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>
              {isLangArab?"فعل":"Action"}</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((log, index) => (
                <tr key={index} className={`${
                  isDarkMode
                    ? index % 2 === 0
                      ? "bg-transparent"
                      : "bg-white bg-opacity-10"
                    : index % 2 === 0
                    ? "bg-[#D5E5DE] bg-opacity-30"
                    : "bg-white"
                }`} >
                  <td className={`py-4 font-500 font-omnes text-[14px]  ${isLangArab?"pr-2":"pr-2"} ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-[#101828]"}`}>{log.username}</td>
                  <td className={`py-4 font-500 font-omnes text-[14px]  ${isLangArab?"pl-2":"pr-2"} ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-[#101828]"}`}>{log.email}</td>
                  <td dir={isLangArab && "ltr"} className={`py-4 font-500 font-omnes text-[14px]  ${isLangArab?" text-right pl-2":" text-left pr-2"} ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-[#101828]"}`}>{new Date(`${log.createdDate}Z`).toLocaleString()}</td>
                  <td className={`py-4 font-500 font-omnes text-[14px]  ${isLangArab?"pl-2":"pr-2"} ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-[#101828]"}`}>{log.ipaddress}</td>
                  <td className={`py-4 font-500 font-omnes text-[14px]  ${isLangArab?"pl-2":"pr-2"} ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-[#101828]"}`}>{log.action}</td>

             
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
  );
}
