import { ArrowDown } from 'lucide-react';

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
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[22px] font-medium text-gray-800">User Activity Log</h2>
        <button 
          className="bg-[#3B8686] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center"
        >
          Export log
          <ArrowDown className="ml-2 h-4 w-4" />
        </button>
      </div>
      <hr className="border-t border-gray-300 my-4" />

      <div className="overflow-hidden flex-grow relative">
        <div className="overflow-x-auto overflow-y-auto absolute inset-0">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-left border-b border-[#E5E7EB]">
                <th className="pb-3 font-medium text-[14px] text-[#667085] pl-4">User Name</th>
                <th className="pb-3 font-medium text-[14px] text-[#667085] pr-4">Email ID</th>
                <th className="pb-3 font-medium text-[14px] text-[#667085] pr-4">Date & Time</th>
                <th className="pb-3 font-medium text-[14px] text-[#667085] pr-4">IP Address</th>
                <th className="pb-3 font-medium text-[14px] text-[#667085]">Action</th>
              </tr>
            </thead>
            <tbody>
              {activityLogs.map((log, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-[#D5E5DE] bg-opacity-30" : "bg-white"}>
                  <td className="py-4 font-medium text-[14px] text-black pl-4">{log.userName}</td>
                  <td className="py-4 font-medium text-[14px] text-black pr-4">{log.emailId}</td>
                  <td className="py-4 font-medium text-[14px] text-black pr-4">{log.dateTime}</td>
                  <td className="py-4 font-medium text-[14px] text-black pr-4">{log.ipAddress}</td>
                  <td className="py-4 font-medium text-[14px] text-black pr-4">{log.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
