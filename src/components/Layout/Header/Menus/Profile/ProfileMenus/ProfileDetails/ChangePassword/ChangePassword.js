import React from "react";
import { X } from "lucide-react";
import ChangePasswordForm from "./ChangePasswordForm/ChangePasswordForm";

export default function ChangePassword({ setIsChangePassword, setIsSuccess, setIsProfile }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-2xl">Change Password</h1>
        <div
          onClick={() => setIsChangePassword(false)}
          className="cursor-pointer"
        >
          <X className="h-5 w-5" />
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-[#0000001A] my-4"></div>

      <ChangePasswordForm
        setIsChangePassword={setIsChangePassword}
        setIsSuccess={setIsSuccess}
        setIsProfile={setIsProfile}
      />
    </>
  );
}
