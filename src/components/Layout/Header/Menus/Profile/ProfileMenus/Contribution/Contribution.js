import React from "react";
import ContributionIcon from "../../../../../../../assets/Contribution.svg"; // Update with the correct path for the contribution icon

export default function Contribution({ setIsContribution, setIsPopoverOpen }) {
  return (
    <div className="py-4 cursor-pointer">
      <div
        onClick={() => {
          setIsContribution(true);
          setIsPopoverOpen(false);
        }}
        className="flex justify-start gap-2 items-center"
      >
        <div>
          <img src={ContributionIcon} alt="Contribution Icon" className="w-7" />
        </div>
        <p className="font-medium font-omnes text-[#505050] text-[18px]">Contribution</p>
      </div>
    </div>
  );
}
