import React, { useState, useRef, useEffect } from 'react';
import { Trash2, Check, Eye } from 'lucide-react';
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../../../../../../../lib/utils";
import FeedbackData from './Feedbackdata';
import Xicon from '../../../../../../../assets/Admin/logo/xicon.svg';
import EditIcon from '../../../../../../../assets/Admin/logo/edit.svg';
import { useTheme } from "../../../../../ThemeContext/ThemeContext"; // Importing the theme context
import DarkEditIcon from '../../../../../../../assets/Admin/logo/darkedit.svg';
import DeleteConfirmation from '../../../../../../Common/deleteConfirmation';
import Pagination from "../../../../Layout/Pagination/PaginationBar"

const users = [
  { username: 'User One', email: 'user1@gmail.com', submissionDate: '2024-10-01', senderName: 'User One', senderEmail: 'user1@gmail.com', status: 'Read', feedback: 'Great service!' },
  { username: 'User Two', email: 'user2@gmail.com', submissionDate: '2024-10-02', senderName: 'User Two', senderEmail: 'user2@gmail.com', status: 'Unread', feedback: 'Needs improvement.' },
  // Add more user objects as needed
];

const CustomCheckbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn("peer h-4 w-4 rounded-sm border border-[#909090] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
CustomCheckbox.displayName = 'CustomCheckbox';

const Feedback = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [selectedUsersid, setSelectedUsersId] = useState(undefined);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isShowConfirmation, setIsShowConfirmation] = useState(false);
  const tableRef = useRef(null);
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
    // console.log("Passed FeedBack admin data :", data)

  const toggleUserSelection = (index) => {
    setSelectedUsers((prev) => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setSelectedUsers([]);
  };

  const handleUserDetail = (user) => {
    setSelectedUser(user);
  };

  const closeFeedbackData = () => {
    setSelectedUser(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/FeedBack/Getfeedbacks`); // Example API
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

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
        const totalScrollableHeight = scrollHeight - clientHeight;
        if (totalScrollableHeight > 0) {
          setScrollPercentage((scrollTop / totalScrollableHeight) * 100);
        }
      }
    };

    const tableElement = tableRef.current;
    tableElement?.addEventListener('scroll', handleScroll);

    return () => {
      tableElement?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleFeedbackDelete = (id) => {
    setSelectedUsersId(id)
    setIsShowConfirmation(true);
  };


  const handleConfirmFeedbackDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/FeedBack/deletemultiplefeedbacks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify([id]),
      });
      const data = await response.json();
        if(data.success){
          console.log(data.message);
        }
        else{
          console.log(data.message);
        }
      
      } catch (error) {
          console.error('Error submitting form:', error);
      }
    //Update state to remove the deleted record
    setData(data.filter(record => record.id !== id));
  };
  
  const handleselectedDeleted = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/FeedBack/deletemultiplefeedbacks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedUsers),
      });
      const data = await response.json();
        if(data.success){
          console.log(data.message);
        }
        else{
          console.log(data.message);
        }
      
      } catch (error) {
          console.error('Error submitting form:', error);
      }
    //Update state to remove the deleted record
    //setData(data.filter(record => record.id !== id));
    setData(data.filter(record => !selectedUsers.includes(record.id)));
  };

  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex h-[calc(100vh-6rem)]">
       <DeleteConfirmation
        isShowConfirmation={isShowConfirmation}
        isLangArab={isLangArab}
        handleDeleteConfirm={() =>{ isEditing ? handleselectedDeleted() : handleConfirmFeedbackDelete(selectedUsersid);setIsShowConfirmation(false);}}
        handleDeleteCancel={() => {setSelectedUsersId(undefined);setSelectedUsers([]);setIsShowConfirmation(false);}}
      />
    <div  className={`p-8 rounded-lg shadow-sm flex flex-col flex-grow overflow-hidden ${
        isDarkMode ? "bg-[#303031] bg-opacity-90" : "bg-white "
      } text-black backdrop-blur border-none`}>
      <div className="flex justify-between items-center mb-6">
      <h2 className={`text-[22px] font-medium ${isDarkMode ? "text-[#FFFFFFCC]" : "text-gray-800"}`}>
      {isLangArab?"إدارة المستخدمين":"Feedbacks"}</h2>
      <button  onClick={toggleEdit} 
            className={isEditing ? "text-gray-500 hover:text-gray-700" : "text-teal-600 hover:text-teal-700"} 
            aria-label={isEditing ? "Close edit mode" : "Edit"}
          >
            {isEditing ? (
              <img src={Xicon} alt="Edit" className="w-6 h-6" />
            ) : (
              <img 
              src={isDarkMode ? DarkEditIcon : EditIcon }
              alt="Edit" className="w-6 h-6" />
            )}
          </button>
        </div>

        <hr className={`border-t  my-4 ${isDarkMode ? "border-[#FFFFFF] border-opacity-10" : "border-gray-300"}`} />

        <div className="overflow-hidden flex-grow relative">
          <div ref={tableRef} className={`overflow-x-auto overflow-y-auto absolute inset-0 ${isLangArab?"pl-4":"pr-4"}`}>
          <table className="w-full">
  <thead className={`${!selectedUser && "sticky"} top-0 z-10 ${isDarkMode ? "bg-[#303031]" : "bg-white"}`}>
    <tr className={`${isLangArab ? "text-right" : "text-left"} text-sm font-medium text-gray-500 border-b`}>
      {isEditing && <th className="pb-3 w-8"></th>}
      <th className={`pb-3 p-2 font-medium font-omnes text-[14px] ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}></th>
      <th className={`pb-3 p-2 font-medium font-omnes text-[14px] ${isLangArab ? "pr-2" : "pl-2"} ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>
        {isLangArab ? "اسم المستخدم" : "Username"}
      </th>
      <th className={`pb-3 p-2 font-medium font-omnes text-[14px] ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>
        {isLangArab ? "معرف البريد الإلكتروني" : "Email"}
      </th>
      <th className={`pb-3 p-2 font-medium font-omnes text-[14px] ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>
        {isLangArab ? "تاريخ التقديم" : "Submission Date"}
      </th>
      <th className={`pb-3 p-2 flex justify-center items-center font-medium font-omnes text-[14px] ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"}`}>
        {isLangArab ? "فعل" : "Action"}
      </th> 
      <th className="pb-3"></th>
    </tr>
  </thead>
  <tbody>
    {paginatedData.map((user, index) => (
      <tr
        key={user.id}
        className={`${
          isDarkMode
            ? user.id % 2 === 0
              ? "bg-transparent"
              : "bg-white bg-opacity-10"
            : user.id % 2 === 0
            ? "bg-[#D5E5DE] bg-opacity-30"
            : "bg-white"
        }`}
      >
        <td className={`py-4 ${isLangArab ? "pr-4" : "pl-2"}`}>
          {user.readStatus !== "Read" && (
            <span
              className="inline-block w-3 h-3 bg-green-500 rounded-full"
              title={user.readStatus}
            ></span>
          )}
        </td>
        {isEditing && (
          <td className={`py-4 ${isLangArab ? "pr-4" : "pl-2"}`}>
            <CustomCheckbox
              checked={selectedUsers.includes(user.id)}
              onCheckedChange={() => toggleUserSelection(user.id)}
            />
          </td>
        )}

        <td className={`py-4 font-medium font-omnes text-[14px] pl-2 ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-black"}`}>
          {user.username}
        </td>
        <td className={`py-4 font-medium font-omnes text-[14px] pl-2 ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-black"}`}>
          {user.email}
        </td>
        <td className={`py-4 font-medium font-omnes text-[14px] pl-2 ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-black"}`}>
          {new Date(user.createdDate).toLocaleDateString()}
        </td>

        {/* Icons with spacing */}
        <td className="py-4 flex gap-4 pl-2 items-center justify-center">
          <button onClick={() => handleUserDetail(user)}>
            <Eye
              className={`h-5 w-5 ${isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-gray-800 hover:text-gray-600"}`}
            />
          </button>
          <button
            aria-label="Delete user"
            className={`${
              isDarkMode ? "text-[#FFFFFF] text-opacity-60" : "text-red-500 hover:text-red-600"
            }`}
            onClick={() => handleFeedbackDelete(user.id)}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

            {selectedUser && <FeedbackData isLangArab={isLangArab} user={selectedUser} onClose={closeFeedbackData} />}
          </div>
        </div>
        {isEditing && (
          <div className="mt-4">
            <button onClick={() => setIsShowConfirmation(true)}
              className="bg-[#EDB3B3] text-[#870202] px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedUsers.length === 0}
            >
             { isLangArab?"حذف المحدد":"Delete Selected"}
            </button>
          </div>
        )}

<div className=' flex justify-end'>
        <Pagination 
          currentPage={currentPage} totalPages={totalItems} onPageChange={handlePageChange}
        />
        </div>
      </div>
     {data.length > 0 && <div className={`w-2 rounded-full mr-3 mt-12 mb-10 ml-2 relative ${
        isDarkMode ? "bg-[rgba(96,96,96,0.8)]" : "bg-[rgba(96,96,96,0.8)]"
      } text-black backdrop-blur border-none`}> 
              <div 
          className="w-full bg-[#B2CACC] absolute rounded-full transition-all duration-300 ease-out"
          style={{ height: `${scrollPercentage}%`, top: '0' }}
        ></div>
      </div>}
    </div>
  );
};

export default Feedback;
