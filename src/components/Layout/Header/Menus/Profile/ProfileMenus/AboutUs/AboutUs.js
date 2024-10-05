import React from 'react';
import About from "../../../../../../../assets/about.svg";

export default function SendFeedback({ setIsAboutUs, setIsPopoverOpen }) {
  return (
    <div className="py-4 cursor-pointer">
      <div
        onClick={() => {
          setIsAboutUs(true);
          setIsPopoverOpen(false);
        }}
        className="flex justify-start gap-2 items-center"
      >
        <div>
          <img src={About} alt="Logo" className="w-8" />
        </div>
        <p className="font-medium font-omnes text-[#505050] text-[18px]">About us</p>
      </div>
    </div>
  );
}
