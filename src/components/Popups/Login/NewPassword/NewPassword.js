import { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import Logo from '../../../../assets/GreenLogo.svg';
import Input from '../Input/Input';
import PasswordChangeSuccess from './PasswordPopup/PasswordPopup';
import { IoEyeOff } from "react-icons/io5";

export default function ResetPassword({ onClose, onBackToLogin, onSignup, onPasswordSet }) {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showResetForm, setShowResetForm] = useState(true);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      setShowResetForm(false);
      setShowSuccessPopup(true);
    } else {
      console.error('Passwords do not match');
    }
  };

  const handleSuccessDone = () => {
    setShowSuccessPopup(false);
    onPasswordSet(formData.password);
  };

  const isResetDisabled =
    !formData.password ||
    !formData.confirmPassword ||
    formData.password !== formData.confirmPassword;

  if (showSuccessPopup) {
    return <PasswordChangeSuccess onDone={handleSuccessDone} />;
  }

  if (!showResetForm) {
    return null;
  }

  return (
    <div className="absolute inset-10 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white bg-opacity-65 backdrop-filter backdrop-blur-lg p-14 mb-10 rounded-lg shadow-xl w-full max-w-sm border border-white"
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-5 text-black" />
        </button>
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-12" />
        </div>
        <div className="flex flex-col justify-between">
          <div className="w-full">
            <button
              className="flex items-center text-[14px] font-medium text-gray-600 hover:underline mb-4"
              onClick={onBackToLogin}
            >
              <ChevronLeft className="w-5 h-5 mr-1 text-black" />
              Back to sign in
            </button>
            <h2 className="text-2xl font-semibold text-black mb-6">
              Please Enter a New Password
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter New Password"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <IoEyeOff className="text-2xl opacity-50 text-black" />
                </button>
              </div>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                  }
                >
                  <IoEyeOff className="text-2xl opacity-50 text-black" />
                </button>
              </div>
            </form>
            <button
              onClick={handleSubmit}
              className={`w-full py-3 mt-5 mb-4 rounded-xl transition duration-300 text-sm ${
                !isResetDisabled
                  ? "bg-gradient-to-r from-[#036068] text-[14px] via-[#596451] to-[#1199A8] text-white"
                  : "bg-[#828282] bg-opacity-[80%] text-white text-[14px]"
              }`}
              disabled={isResetDisabled}
            >
              Reset Password
            </button>
            <div className="mt-6 text-center">
              <p className="text-sm text-black">
                Don't have an account?{' '}
                <button onClick={onSignup} className="text-[#004987] font-medium underline">
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
