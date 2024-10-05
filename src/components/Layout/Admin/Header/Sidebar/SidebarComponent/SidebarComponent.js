import React from "react";
import Sidebar from "../AdminSidebar";
// import UserManagement from "./UserManagement/UserManagement";
// import { Heading } from "../../../Layout/Table/Heading/Heading";

export default function SidebarComponent({ activeItem, onItemClick }) {
  return (
    <div className="flex">
      <Sidebar activeItem={activeItem} onItemClick={onItemClick} />
      {/* Uncomment and modify the following lines if needed */}
      {/* 
      <div className="ml-[190px] p-8 flex-1">
        <div className="ml-[190px] p-8 flex-1 font-omnes font-medium bg-white rounded-lg w-[calc(100%-230px)] h-[calc(100vh-5rem)] py-2 fixed top-20 mt-2 left-5 z-10">
          <Heading activeItem={activeItem} />
          {renderContent()}
        </div>
      </div>
      */}
    </div>
  );
}
