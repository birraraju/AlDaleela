import React from "react";
import ContactIcon from "../../../../../../../assets/Contactus.svg"; // Import the Contact Us icon

export default function ContactUs({ setIsContactUs, setIsPopoverOpen }) {
  return (
    <div className="py-4 cursor-pointer">
      <div
        onClick={() => {
          setIsContactUs(true);
          setIsPopoverOpen(false);
        }}
        className="flex justify-start gap-2 items-center"
      >
        <div>
          <img src={ContactIcon} alt="Contact Us Icon" className="w-8" />
        </div>
        <p className="font-medium font-omnes text-[#505050] text-[18px]">Contact Us</p>
      </div>
    </div>
  );
}
