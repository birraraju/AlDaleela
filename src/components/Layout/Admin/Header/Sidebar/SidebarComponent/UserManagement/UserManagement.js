import { useState, useRef, useEffect } from 'react';
import { Trash2, Check } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../../components/ui/select";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../../../../../../../lib/utils";
import React from 'react';
import Xicon from '../../../../../../../assets/Admin/logo/xicon.svg';
import EditIcon from '../../../../../../../assets/Admin/logo/edit.svg';

const users = [
  { username: "User name", email: "user@gmail.com", phone: "+971 500001010", address: "Rabdan - Abu Dhabi", role: "Public User", activity: "Today" },
  { username: "User name", email: "user@gmail.com", phone: "+971 500001010", address: "Rabdan - Abu Dhabi", role: "Admin User", activity: "Yesterday" },
  { username: "User name", email: "ctive@gmail.com", phone: "+971 500001010", address: "Rabdan - Abu Dhabi", role: "Admin User", activity: "2 days ago" },
  // ... add more users as needed
];

const CustomCheckbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-[#909090] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#036068] data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
CustomCheckbox.displayName = 'CustomCheckbox';

export default function UserManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const tableRef = useRef(null);
  const [data, setData] = useState([]);

  const toggleUserSelection = (index) => {
    setSelectedUsers(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setSelectedUsers([]);
  };

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
          const response = await fetch(`${process.env.REACT_APP_API_URL}/Registration/GetUsers`); // Example API
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
    <div className="flex h-[calc(100vh-6rem)]">
      <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col flex-grow overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[22px] font-medium text-gray-800">User Management</h2>
          <button 
            onClick={toggleEdit} 
            className={isEditing ? "text-gray-500 hover:text-gray-700" : "text-teal-600 hover:text-teal-700"} 
            aria-label={isEditing ? "Close edit mode" : "Edit"}
          >
            {isEditing ? (
              <img src={Xicon} alt="Edit" className="w-6 h-6" />
            ) : (
              <img src={EditIcon} alt="Edit" className="w-6 h-6" />
            )}
          </button>
        </div>

        <hr className="border-t border-gray-300 my-4" />
        <div className="overflow-hidden flex-grow relative">
          <div ref={tableRef} className="overflow-x-auto overflow-y-auto absolute inset-0 pr-4">
            <table className="w-full">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="text-left text-sm font-medium text-gray-500 border-b">
                  {isEditing && <th className="pb-3 w-8"></th>}
                  <th className="pb-3 font-medium font-omnes text-[14px] text-[#667085] pr-2">Username</th>
                  <th className="pb-3 font-medium font-omnes text-[14px] text-[#667085] pr-2">Email Id</th>
                  <th className="pb-3 font-medium font-omnes text-[14px] text-[#667085] pr-2">Phone Number</th>
                  <th className="pb-3 font-medium font-omnes text-[14px] text-[#667085] pr-2">Country</th>
                  <th className="pb-3 font-medium font-omnes text-[14px] text-[#667085] pr-2">User Roles</th>
                  <th className="pb-3 font-medium font-omnes text-[14px] text-[#667085] pr-2">User Activity</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-[#D5E5DE] bg-opacity-30" : "bg-white"}>
                    {isEditing && (
                      <td className="py-4 pl-2">
                        <CustomCheckbox
                          checked={selectedUsers.includes(index)}
                          onCheckedChange={() => toggleUserSelection(index)}
                        />
                      </td>
                    )}
                    <td className="py-4 font-medium font-omnes text-[14px] text-black pl-2">{user.username}</td>
                    <td className="py-4 font-medium font-omnes text-[14px] text-black pr-2">{user.email}</td>
                    <td className="py-4 font-medium font-omnes text-[14px] text-black pr-2">{user.phoneNumber}</td>
                    <td className="py-4 font-medium font-omnes text-[14px] text-black pr-2">{user.country}</td>
                    <td className="py-4 font-medium font-omnes text-[14px] text-[#626262] pr-2">
                      {isEditing ? (
                        <Select defaultValue={user.role}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {/* <SelectItem value="Public User">Public User</SelectItem>
                            <SelectItem value="Admin User">Admin User</SelectItem>
                            <SelectItem value="Creator User">Creator User</SelectItem> */}
                            <SelectItem value="user">user</SelectItem>
                            <SelectItem value="admin">admin</SelectItem>
                            {/* <SelectItem value="Creator User">Creator User</SelectItem> */}
                          </SelectContent>
                        </Select>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td className="py-4 font-medium font-omnes text-[16px] text-black pr-2">{user.activity}</td>
                    <td className="py-4">
                      <button className="text-red-500 hover:text-red-600" aria-label="Delete user">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isEditing && (
          <div className="mt-4">
            <button
              className="bg-[#EDB3B3] text-[#870202] px-4 py-2 rounded-lg font-medium font-omnes text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedUsers.length === 0}
            >
              Delete Selected
            </button>
          </div>
        )}
      </div>
      <div className="w-2 bg-gray-200 rounded-full mt-20 ml-4 relative">
        <div 
          className="w-full bg-[#B2CACC] absolute rounded-full transition-all duration-300 ease-out"
          style={{
            height: `${scrollPercentage}%`,
            top: '0',
          }}
        ></div>
      </div>
    </div>
  );
}
