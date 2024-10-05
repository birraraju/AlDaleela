import React from "react";
import leaderboard from "../../../../../../../assets/Leaderboard.svg";

export default function Leaderboard({ setIsLeaderboard, setIsPopoverOpen }) {
  return (
    <div className="py-6 cursor-pointer">
      <div
        onClick={() => {
          setIsLeaderboard(true);
          setIsPopoverOpen(false);
        }}
        className="flex justify-start gap-2 items-center"
      >
        <div>
          <img src={leaderboard} alt="Leaderboard Icon" className="w-7" />
        </div>
        <p className="font-medium font-omnes text-[#505050] text-[18px]">Leaderboard</p>
      </div>
    </div>
  );
}
