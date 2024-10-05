import React from 'react';
import Success from '@/assets/checked.png';

const SuccessMessage = ({ onCloseModel }) => {
  const title = "New Password Changed Successfully";
  const buttonText = "Done";

  const handleButtonClick = () => {
    // Define what happens when the button is clicked
    onCloseModel();
    console.log("Button clicked!");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-transparent">
      <div className="flex flex-col items-center gap-4 justify-center p-2 space-y-6">
        <div className="rounded-full bg-transparent p-3">
          <img src={Success} className='w-16' alt="" />
        </div>
        <h2 className="text-xl font-semibold text-center">{title}</h2>
        <button 
          onClick={handleButtonClick}
          className="w-full text-base font-light bg-gradient-to-r from-green-800 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2 px-6 rounded-xl transition duration-300"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default SuccessMessage;
