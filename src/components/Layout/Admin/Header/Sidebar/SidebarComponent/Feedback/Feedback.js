import React, { useState, useRef, useEffect } from 'react';
import { Trash2, Check, Eye } from 'lucide-react';
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "../../../../../../../lib/utils";
import FeedbackData from './Feedbackdata';
import Xicon from '../../../../../../../assets/Admin/logo/xicon.svg';
import EditIcon from '../../../../../../../assets/Admin/logo/edit.svg';

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
  const [selectedUser, setSelectedUser] = useState(null);
  const tableRef = useRef(null);
  const [data, setData] = useState([]);

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
  const handleFeedbackDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/FeedBack/deletemultiplefeedbacks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify([id]),
      });
      if (response.ok) {
          console.log('Records deleted successfully');
          const data = await response.text();
          if(data ==="Records deleted successfully."){
            console.log(data);
          }
          else{
            console.log(data);
          }
      } else {
          console.log('Error logging activity:', response);
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
      if (response.ok) {
          console.log('Records deleted successfully');
          const data = await response.text();
          if(data ==="Records deleted successfully."){
            console.log(data);
          }
          else{
            console.log(data);
          }
      } else {
          console.log('Error logging activity:', response);
      }      
      
      } catch (error) {
          console.error('Error submitting form:', error);
      }
    //Update state to remove the deleted record
    //setData(data.filter(record => record.id !== id));
    setData(data.filter(record => !selectedUsers.includes(record.id)));
  };
  return (
    <div className="flex h-[calc(100vh-6rem)]">
      <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col flex-grow overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[22px] font-medium text-gray-800">Feedback</h2>
          <button
            onClick={toggleEdit}
            className={isEditing ? "text-gray-500 hover:text-gray-700" : "text-teal-600 hover:text-teal-700"}
            aria-label={isEditing ? "Close edit mode" : "Edit"}
          >
            <img src={isEditing ? Xicon : EditIcon} alt="Edit" className="w-6 h-6" />
          </button>
        </div>

        <hr className="border-t border-gray-300 my-4" />

        <div className="overflow-hidden flex-grow relative">
          <div ref={tableRef} className="overflow-x-auto overflow-y-auto absolute inset-0 pr-4">
            <table className="w-full">
              <thead className={`sticky top-0 bg-white z-10`}>
                <tr className="text-left text-sm font-medium text-gray-500 border-b">
                  {isEditing && <th className="pb-3 w-8"></th>}
                  <th className="pb-3"></th>
                  <th className="pb-3 font-medium text-[#667085] pr-2">Username</th>
                  <th className="pb-3 font-medium text-[#667085] pr-2">Email</th>
                  <th className="pb-3 font-medium text-[#667085] pr-2">Submission Date</th>
                  <th className="pb-3"></th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((user, index) => (
                  <tr key={user.id} className={user.id % 2 === 0 ? "bg-[#D5E5DE] bg-opacity-40" : "bg-white"}>
                    <td className="py-4 pl-2">
                      {/* <span className="inline-block w-3 h-3 bg-green-500 rounded-full" title={user.status}></span> */}
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full" title={"Read"}></span>
                    </td>
                    {isEditing && (
                      <td className="py-4 pl-2">
                        <CustomCheckbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => toggleUserSelection(user.id)}
                        />
                      </td>
                    )}
                    <td className="py-4 font-medium text-gray-800 pr-2">{user.username}</td>
                    <td className="py-4 font-medium text-gray-800 pr-2">{user.email}</td>
                    <td className="py-4 font-medium text-gray-800 pr-2">{new Date(user.createdDate).toLocaleDateString()}</td>
                    <td className="py-4">
                      <button onClick={() => handleUserDetail(user)}>
                        <Eye className="h-5 w-5 text-gray-800 hover:text-gray-600" />
                      </button>
                    </td>
                    <td className="py-4">
                      <button onClick={() => handleFeedbackDelete(user.id)}>
                        <Trash2 className="h-5 w-5 text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedUser && <FeedbackData user={selectedUser} onClose={closeFeedbackData} />}
          </div>
        </div>
        {isEditing && (
          <div className="mt-4">
            <button onClick={() => handleselectedDeleted()}
              className="bg-[#EDB3B3] text-[#870202] px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
          style={{ height: `${scrollPercentage}%`, top: '0' }}
        ></div>
      </div>
    </div>
  );
};

export default Feedback;
