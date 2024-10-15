import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from "../../../../../ThemeContext/ThemeContext"; // Importing the theme context

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
  const { isDarkMode } = useTheme(); // Access dark mode from theme context
useEffect(() => {
  const fetchData = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/UserActivityLog/Getuseractivitylogs`); // Example API
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
    } catch (error) {
        //setError(error.message);
        console.log(error)
    } finally {
        //setLoading(false);
    }
};

fetchData();    
},[data]);
  
  return (
<div  className={`p-8 rounded-lg shadow-sm h-[calc(100vh-6rem)] flex flex-col ${
        isDarkMode ? "bg-[#303031] bg-opacity-90" : "bg-white "
      } text-black backdrop-blur border-none`}>
              <div className="flex justify-between items-center mb-6">
              <h2 className={`text-[22px] font-medium  ${isDarkMode ? "text-[#FFFFFFCC]" : "text-gray-800"}`}>
              User Activity Log</h2>
        <button 
          className="bg-[#3B8686] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center"
        >
          Export log
          <ArrowDown className="ml-2 h-4 w-4" />
        </button>
      </div>
      <hr className={`border-t  my-4 ${isDarkMode ? "border-[#FFFFFF] border-opacity-10" : "border-gray-300"}`} />

      <div className="overflow-hidden flex-grow relative">
        <div className="overflow-x-auto overflow-y-auto absolute inset-0">
          <table className="w-full border-collapse">
          <thead className={`sticky top-0   z-10 ${isDarkMode ? "bg-[#303031] " : "bg-white"}`}>
              <tr className="text-left border-b border-[#E5E7EB]">
              <th className={`pb-3 p-2 font-medium font-omnes text-[14px]  pr-2 ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>
              User Name</th>
              <th className={`pb-3 p-2 font-medium font-omnes text-[14px]  pr-2 ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>
              Email ID</th>
              <th className={`pb-3 p-2 font-medium font-omnes text-[14px]  pr-2 ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>
              Date & Time</th>
              <th className={`pb-3 p-2 font-medium font-omnes text-[14px]  pr-2 ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>
              IP Address</th>
              <th className={`pb-3 p-2 font-medium font-omnes text-[14px]  pr-2 ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>
              Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((log, index) => (
                <tr key={index} className={`${
                  isDarkMode
                    ? index % 2 === 0
                      ? "bg-transparent"
                      : "bg-white bg-opacity-10"
                    : index % 2 === 0
                    ? "bg-[#D5E5DE] bg-opacity-30"
                    : "bg-white"
                }`} >
                  <td className={`py-4 font-medium font-omnes text-[14px]  pl-2 ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-black"}`}>{log.username}</td>
                  <td className={`py-4 font-medium font-omnes text-[14px]  pl-2 ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-black"}`}>{log.email}</td>
                  <td className={`py-4 font-medium font-omnes text-[14px]  pl-2 ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-black"}`}>{new Date(log.createdDate).toLocaleString()}</td>
                  <td className={`py-4 font-medium font-omnes text-[14px]  pl-2 ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-black"}`}>{log.ipaddress}</td>

             
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
