import { X } from "lucide-react";
import { useState } from "react";

export default function FooterLogin() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup forms
  const [showPopup, setShowPopup] = useState(true); // State to control popup visibility

  if (!showPopup) return null; // If popup is not shown, render nothing

  return (
    <div className="fixed top-12 left-[38%] overflow-y-auto max-h-[670px] w-[350px] bg-gray-200 rounded-xl shadow-lg m-4 mt-40">
      <div className='p-5 text-black bg-white rounded-lg shadow-md relative'>
        
        {/* Cancel Button */}
        <X
          className='absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer' // Added cursor pointer for better UX
          onClick={() => setShowPopup(false)} // Close the popup
          aria-label="Cancel"
        />

        <div className='flex justify-center py-2'>
          <img src="/logo.svg" alt="Logo" /> {/* Directly reference the logo in the public directory */}
        </div>

        {isLogin ? ( // Render login UI
          <>
            <h1 className='text-center py-4'>Login required for<br />bookmarks</h1>

            <button
              className='w-full bg-[#38a4d2] py-2 rounded-lg text-white'
              onClick={() => console.log("Login functionality here")} // Placeholder for login functionality
              aria-label="Login"
            >
              Login
            </button>

            <h1 className='text-center py-2'>or</h1>

            <button
              className='w-full custom-gradient py-2 rounded-lg text-white'
              onClick={() => setIsLogin(false)} // Switch to signup UI
              aria-label="Create new account"
            >
              Create new account
            </button>
          </>
        ) : ( // Render signup UI
          <>
            <h1 className='text-center py-4'>Create your account</h1>

            <input type="text" placeholder="Username" className="mb-2 p-2 border" />
            <input type="email" placeholder="Email" className="mb-2 p-2 border" />
            <input type="password" placeholder="Password" className="mb-2 p-2 border" />

            <button
              className='w-full bg-[#74ABC2] py-2 rounded-lg text-white'
              onClick={() => console.log("Signup functionality here")} // Placeholder for signup functionality
              aria-label="Sign Up"
            >
              Sign Up
            </button>

            <h1 className='text-center py-2'>or</h1>

            <button
              className='w-full bg-[#036068] py-2 rounded-lg text-white'
              onClick={() => setIsLogin(true)} // Switch back to login UI
              aria-label="Login"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
