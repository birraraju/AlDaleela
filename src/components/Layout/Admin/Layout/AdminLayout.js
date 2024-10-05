import React, { useEffect, useState } from "react";
import Header from "../Header/AdminHeader";
import SidebarComponent from "../Header/Sidebar/SidebarComponent/SidebarComponent";
import UserManagement from "../Header/Sidebar/SidebarComponent/UserManagement/UserManagement";
import { Heading } from "./Table/Heading/Heading";

const AdminLayout = () => {
  const [popup, setPopup] = useState(null);
  const [isFooterOpen, setIsFooterOpen] = useState(false); // Footer state
  const [activeItem, setActiveItem] = useState("User Management");

  const renderContent = () => {
    switch (activeItem) {
      case "User Management":
        return <UserManagement />;
      case "Content Management":
        return <div>Content Management Component</div>;
      case "Feedback":
        return <div>Feedback Component</div>;
      case "User Activity Log":
        return <div>User Activity Log Component</div>;
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
    <div className="flex flex-col h-screen bg-[#f5f7f6] ">
      {/* Header */}
      <Header isFooteropen={isFooterOpen} isHeaderOpen={handleStackOpen} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarComponent activeItem={activeItem} onItemClick={handleItemClick} />

        {/* Main Content Area */}
        <main className="flex-1 pr-8 pl-52 py-3 overflow-y-auto">
          <div className="bg-white pt-7 rounded-lg shadow-lg min-h-full">
            {/* Heading */}
            <Heading activeItem={activeItem} />
            {/* Dynamic content */}
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
