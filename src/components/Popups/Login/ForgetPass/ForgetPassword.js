import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import Logo from '../../../../assets/GreenLogo.svg';
import Input from '../Input/Input';

export default function ForgetPassword({ onClose, onBackToLogin, onSignup, onNext }) {
  const [formData, setFormData] = useState({
    email: '',
  });

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
    console.log('Reset password for:', formData.email);
    onNext(formData.email);
  };

  return (
    <div className="fixed inset-10 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg p-12 mb-12 rounded-2xl border border-white shadow-lg w-full max-w-sm relative"
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-5 h-5 text-black" />
        </button>
        <div className="flex justify-center mb-2">
          <img src={Logo} alt="Logo" className="h-12" />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="w-full">
            <button
              className="flex items-center text-[14px] text-gray-600 hover:underline mb-4 mt-8 sm:mt-12"
              onClick={onBackToLogin}
            >
              <ChevronLeft className="w-6 h-6 mr-1 text-black" />
              Back to sign in
            </button>
            <h2 className="text-[24px] sm:text-[28px] font-medium text-black mb-2">Forgot Password</h2>
            <p className="text-[14px] font-omnes font-regular text-gray-600 mb-4">
              Enter your email and we'll send you a link to reset your password
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
              <Input
                type="email"
                name="email"
                placeholder="Enter your Email id"
                onChange={handleChange}
              />
              <button
                type="submit"
                className={`w-full py-3 rounded-xl transition duration-300 text-sm ${
                  formData.email
                    ? "bg-gradient-to-r from-[#036068] via-[#596451] to-[#1199A8] text-white"
                    : "bg-[#82828280] bg-opacity-[99%] text-white"
                }`}
                disabled={!formData.email}
              >
                Next
              </button>
            </form>
            <div className="mt-auto pt-4 text-center">
              <p className="text-sm text-black text-center mt-10">
                Don't have an account?{' '}
                <button onClick={onSignup} className="text-[#004987] font-medium underline">
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
