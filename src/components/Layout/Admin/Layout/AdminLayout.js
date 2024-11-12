import React, { useEffect, useState } from "react";
import Header from "../Header/AdminHeader";
import SidebarComponent from "../Header/Sidebar/SidebarComponent/SidebarComponent";
import UserManagement from "../Header/Sidebar/SidebarComponent/UserManagement/UserManagement";
import Feedback from "../Header/Sidebar/SidebarComponent/Feedback/Feedback";
import ContentManagement from "../Header/Sidebar/SidebarComponent/ContentManagement/ContentManagement";
import Activitylog from "../Header/Sidebar/SidebarComponent/ActivityLog/Activitylog";
import { useTheme } from '../../ThemeContext/ThemeContext'; // Import the theme context
import { useNavigate } from 'react-router-dom';
import RoleServices from '../../../servicces/RoleServices';
import { useLocation } from 'react-router-dom';




const AdminLayout = ({role}) => {
  const [popup, setPopup] = useState(null);
  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("User Management");
  const { isDarkMode } = useTheme(); // Access the dark mode state
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const ContentManagementPopUp = queryParams.get('Compenent');



  const renderContent = () => {
    switch (activeItem) {
      case "User Management":
        return <UserManagement />;
      case "Content Management":
        return <ContentManagement role={role} />;
      case "Feedback":
        return <Feedback />;
      case "User Activity Log":
        return <Activitylog />;
      default:
        return <UserManagement />;
        
    }
  };

  useEffect(() => {
    if (ContentManagementPopUp === "ContentManagement") {
      setActiveItem("Content Management");
      console.log("Content Passed Admin:", ContentManagementPopUp)
    }
  }, [ContentManagementPopUp]);

  useEffect(()=>{
    if(activeItem !== "Content Management"){
      navigate({
        pathname: `/admin`,
      });
    }
  },[activeItem])

  const handleAdminAuth=()=>{
    if(!RoleServices.isAuth()){
      navigate({
              pathname: `/${process.env.REACT_APP_BASE_URL}`,
            });
    }
  }


  useEffect(()=>{
    handleAdminAuth()
  },[])
  // useEffect(()=>{
  //   if(role !== "user"){
  //     navigate({
  //       pathname: `/${process.env.REACT_APP_BASE_URL}`,
  //     });
  //   }
  // },[role])

  const handleStackOpen = () => {
    setPopup(null);
  };

  useEffect(() => {
    setIsFooterOpen(!!popup);
  }, [popup]);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div
    className={`flex flex-col h-screen bg-[#f5f7f6] ${
      isDarkMode
        ? 'bg-white bg-opacity-10' // Apply dark theme background
        : 'bg-[#f5f7f6]' // Apply default background
    }`}
  >      {/* Header */}
  
      <Header isFooterOpen={isFooterOpen} isHeaderOpen={handleStackOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SidebarComponent activeItem={activeItem} onItemClick={handleItemClick} />

        {/* Main Content Area */}
        <main className="flex-1 pr-3 pl-52 py-1 overflow-y-auto">
        <div className="  rounded-lg shadow-lg max-h-full">
        {/* Dynamic content */}
            <div className="flex-1 overflow-auto">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
