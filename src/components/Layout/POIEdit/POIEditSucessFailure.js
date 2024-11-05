import { Button } from "../../ui/button";
import React from "react";
import SuccessSvg from "../../../assets/SuccessPassword/success.svg";
import FailureSvg from "../../../assets/Header/Profile/ProfileDetails/ChangePassword/Failure.svg";
import Warning from "../../../assets/POIEdit/WarningPOI.svg"

export default function POIEditSucessFailure({ message, success, isOpenModal, onClose }) {
  if (!isOpenModal) return null; // Modal won't render if not open

  return (
      <div className=" bg-transparent border border-none p-5 rounded-lg  flex flex-col items-center gap-6 w-[90%] sm:w-[97%] min-h-[200px]">
        {/* Display the appropriate image based on success value */}
        <img
          src={success === "Success" ? SuccessSvg : FailureSvg} // Show Success or Failure SVG
          alt={success === "Success" ? "Success" : "Failure"}
          className="w-40 h-30" // Adjust size of the SVG
        />

        {/* Display the message */}
        <p className="font-medium text-xl text-center text-black">
          {message}
        </p>

        <div className=" w-full  flex border border-none rounded-3xl bg-[#FF9A032E]">
          <span className=" flex justify-between px-2 py-2 items-center">
            <img src={Warning} className=" w-5" alt="" />
            <p className=" text-[11px] text-[#000000]">Your file will go live once approved by the admin.</p>
            </span>
        </div>

        {/* Close Button */}
        <Button
          onClick={onClose}  // Close the modal when button is clicked
          className="mt-4 btn-gradient w-[80%]  py-2"
        >
          Done
        </Button>
      </div>
  );
}
