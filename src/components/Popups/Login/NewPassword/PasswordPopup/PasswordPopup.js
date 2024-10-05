import { useState } from 'react';
import { Button } from "../../../../../components/ui/button";
import success from "../../../../../assets/SuccessPassword/circle.svg";

export default function PasswordChangeSuccess({ onDone }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDone = () => {
    setIsVisible(false);
    onDone();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white bg-opacity-80 border border-white backdrop-blur rounded-2xl shadow-lg p-8 w-80 text-center">
        <div className="mb-6">
          <img 
            src={success}
            alt="Success" 
            className="mx-auto w-20 h-20"
          />
        </div>
        <h2 className="text-2xl font-medium font-omnes text-black mb-6">
          New Password Changed Successfully
        </h2>
        <Button 
          onClick={handleDone}
          className="w-full bg-gradient-to-r from-[#036068] via-[#596451] to-[#1199A8] text-white"
        >
          Done
        </Button>
      </div>
    </div>
  );
}
