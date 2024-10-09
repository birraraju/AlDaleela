import React, { useEffect, useState } from "react";
import Header from "../Header/AdminHeader";
import SidebarComponent from "../Header/Sidebar/SidebarComponent/SidebarComponent";
import UserManagement from "../Header/Sidebar/SidebarComponent/UserManagement/UserManagement";
import Feedback from "../Header/Sidebar/SidebarComponent/Feedback/Feedback";
import ContentManagement from "../Header/Sidebar/SidebarComponent/ContentManagement/ContentManagement";
import Activitylog from "../Header/Sidebar/SidebarComponent/ActivityLog/Activitylog";

const AdminLayout = () => {
  const [popup, setPopup] = useState(null);
  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("User Management");

  const renderContent = () => {
    switch (activeItem) {
      case "User Management":
        return <UserManagement />;
      case "Content Management":
        return <ContentManagement />;
      case "Feedback":
        return <Feedback />;
      case "User Activity Log":
        return <Activitylog />;
      default:
        return <UserManagement />;
    }
  };

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
    <div className="flex flex-col h-screen bg-[#f5f7f6]">
      {/* Header */}
      <Header isFooterOpen={isFooterOpen} isHeaderOpen={handleStackOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <SidebarComponent activeItem={activeItem} onItemClick={handleItemClick} />

        {/* Main Content Area */}
        <main className="flex-1 pr-3 pl-52 py-1 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg max-h-full">
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
