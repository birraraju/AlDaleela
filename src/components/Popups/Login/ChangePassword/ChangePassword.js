import { useState, useRef, useEffect } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Logo from '@/assets/logo.svg'; // Ensure to use the correct logo file
import { IoEyeOff } from "react-icons/io5";

export default function ChangePassword({ onClose, onSignupClick }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log('Reset password:', newPassword);
    // Handle password reset logic here
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#E6F3F7]">
      <div
        ref={modalRef}
        className="bg-[#E6F3F7] bg-cover bg-center p-6 rounded-lg shadow-lg w-full max-w-[320px] relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800 text-xs font-semibold"
        >
          &lt; Back to sign in
        </button>
        <div className="flex justify-center mb-6 mt-10">
          <img src={Logo} alt="Environment Agency - Abu Dhabi" className="h-10" />
        </div>
        <h2 className="font-sans text-lg text-gray-800 font-semibold leading-tight text-center mb-6">
          Please Enter a New Password
        </h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="Enter New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white bg-opacity-80"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <IoEyeOff className="text-2xl opacity-50 text-black" /> : <IoEyeOff className="text-2xl opacity-50 text-black" />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm New Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white bg-opacity-80"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOffIcon className="w-4 h-4 text-gray-400" /> : <EyeIcon className="w-4 h-4 text-gray-400" />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-400 text-white py-2 rounded-md transition duration-300 hover:bg-gray-500 text-sm font-semibold mt-6"
          >
            Reset Password
          </button>
        </form>
        <p className="text-center mt-6 text-xs text-gray-600">
          Don't have an account?{' '}
          <button onClick={onSignupClick} className="text-blue-600 hover:underline font-semibold">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
