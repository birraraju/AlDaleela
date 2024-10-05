import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'; 

export default function Popup2({ onClose }) { // Props now accept onClose directly
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="relative p-3 text-black">
      <button onClick={onClose} className="absolute top-2 right-2 text-lg">
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <div className="flex justify-center mb-4">
        <img src="public/Logo.svg" alt="Logo" className="w-16 h-16" />
      </div>

      {isLogin ? (
        <>
          <h1 className="text-center mb-4">Login required for <br /> bookmarks</h1>
          <button
            className="w-full bg-[#74ABC2] py-2 rounded-lg text-white"
            onClick={() => console.log("Login functionality here")}
          >
            Login
          </button>
          <h1 className="text-center py-0">or</h1>
          <button
            className="w-full bg-gradient-to-r from-blue-900 to-green-900 py-2 rounded-lg text-white"
            onClick={() => setIsLogin(false)}
          >
            Create new account
          </button>
        </>
      ) : (
        <>
          <h1 className="text-center mb-4">Create your account</h1>
          <input
            type="text"
            placeholder="Username"
            className="mb-2 p-2 w-full border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            className="mb-2 p-2 w-full border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-2 p-2 w-full border rounded-lg"
          />
          <button
            className="w-full bg-[#74ABC2] py-2 rounded-lg text-white"
            onClick={() => console.log("Signup functionality here")}
          >
            Sign Up
          </button>
          <h1 className="text-center py-0">or</h1>
          <button
            className="w-full bg-[#036068] py-2 rounded-lg text-white"
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}
