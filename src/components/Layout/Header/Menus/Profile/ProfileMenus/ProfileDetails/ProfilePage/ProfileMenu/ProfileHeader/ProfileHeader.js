import React from "react";
import { X } from "lucide-react";

export default function ProfileHeader({ setIsPopoverOpen, setIsProfileData }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-2xl">My Info</h1>
        <div
          onClick={() => {
            setIsProfileData(false);
            setIsPopoverOpen(true);
          }}
          className="cursor-pointer"
        >
          <X className="h-5 w-5" />
        </div>
      </div>

      {/* Divider Line */}
      <div className="h-[1px] w-full bg-[#0000001A] my-4"></div>
    </>
  );
}
