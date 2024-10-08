import { Link } from "react-router-dom"; // Import Link from react-router-dom
import React from "react";

export default function Administration() {
  return (
    <div className="pt-6 cursor-pointer">
      <div className="flex justify-start gap-2 items-center">
        <div>
          <img src="/Header/Profile/Administration.svg" alt="Administration Icon" className="w-7" />
        </div>
        <Link to="/admin"> {/* Use Link instead of <a> */}
          <p className="font-medium font-omnes text-[#505050] text-[18px]">Administration</p>
        </Link>
      </div>
    </div>
  );
}
