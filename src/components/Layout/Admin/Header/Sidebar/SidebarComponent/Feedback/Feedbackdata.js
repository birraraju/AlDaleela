// FeedbackData.js
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../../components/ui/card";
import Badge from "../../../../../../../components/Layout/Admin/Header/Sidebar/SidebarComponent/Feedback/Badge";
import { X } from "lucide-react";
import { useTheme } from '../../../../../ThemeContext/ThemeContext';
const FeedbackData = ({ user, onClose, isLangArab }) => {
  const {isDarkMode} = useTheme()
  useEffect(()=>{
    const updateReadStatus = async (id, readStatus) => {
      try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/FeedBack/UpdateReadStatus`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  id: id,
                  readStatus: readStatus,
              }),
          });
  
          const result = await response.json();
          if (response.success) {
              //alert(result.message);
          } else {
              //alert(result.message || 'Failed to update read status');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  };
  
  if(user.readStatus === "Unread"){
    updateReadStatus(user.id, "Read");
  }  
  
  },[])
  return (
    <div className="fixed inset-4  laptop_s:inset-0 flex items-center justify-center ">
      <Card className={` ${isDarkMode && " bg-[#303031]"} w-full  max-w-4xl`}>
      <CardHeader className="flex flex-row text-[16px] items-center justify-between space-y-0 pb-1">
      <CardTitle className={`  ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#464646]"} text-2xl font-normal`}>{isLangArab?"ملاحظات":"Feedback"}</CardTitle>
          <button 
            className="px-3 py-1 text-sm text-black  transition-colors" 
            onClick={onClose}
          >
            <X className={` ${isDarkMode && " text-white"} h-5 w-6`} />
          </button>
        </CardHeader>
        <CardContent>
          <hr className="border-t border-gray-300 my-4" />
          <div className="flex flex-wrap py-5 la gap-6 sm:gap-20 laptop_s:gap-28">
            <div>
              <p className={` ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"} text-[14px] font-normal `}>{isLangArab?"اسم المرسل":"Sender Name"}</p>
              <p className={` ${isDarkMode?" text-[#FFFFFFCC]":" "} text-[14px] font-medium`}>{user.username}</p>
            </div>
            <div>
              <p className={` ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"} text-[14px] font-normal `}>{isLangArab?"بريد المرسل الإلكتروني":"Sender Email ID"}</p>
              <p className={` ${isDarkMode?" text-[#FFFFFFCC]":" "} text-[14px] font-medium`}>{user.email}</p>
            </div>
            <div>
              <p className={` ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"} text-[14px] font-normal `}>{isLangArab?"تاريخ التقديم":"Submission Date"}</p>
              <p className={` ${isDarkMode?" text-[#FFFFFFCC]":" "} text-[14px] font-medium`}>
                {new Date(user.createdDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className={` ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"} text-[14px] font-normal `}>{isLangArab?'الحالة"':"Status"}</p>
              <Badge
                variant={user.readStatus === "Read" ? "success" : "error"}
                className={`mt-1 font-medium ${
                  user.readStatus === "Read" ? "text-[#5CAF47]" : "text-red-400"
                }`}
              >
                {user.readStatus}
              </Badge>
              {/* <Badge
                variant={"Read" === "Read" ? "success" : "error"}
                className={`mt-1 font-semibold ${
                  "Read" === "Read" ? "text-green-400" : "text-red-400"
                }`}{` ${isDarkMode?" text-[#FFFFFFCC]":" {` ${isDarkMode?" text-[#FFFFFFCC]":" "} text-[14px] font-medium`}"} text-[14px] font-medium`}
              >
                {"Read"}
              </Badge> */}
            </div>
          </div>
          <div className="mt-9">
            <p className={` ${isDarkMode ? "text-[#FFFFFF]" : "text-[#667085]"} text-sm font-normal `}>{isLangArab?"ملاحظات":"Feedback"}</p>
            <p className={` ${isDarkMode?" text-[#FFFFFFCC]":" "} text-[14px] font-medium mt-1`}>{user.feedbackinfo}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackData;
