import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import Logo from '../../../../assets/GreenLogo.svg';
import Input from '../Input/Input';
import { useTheme } from '../../../Layout/ThemeContext/ThemeContext'; // Import the theme context
import createForgotPasswordEmailBody from "../../../../components/email/ForgotPasswordTemplate";

export default function ForgetPassword({ onClose, onBackToLogin, onSignup, onNext ,code, setCode, expiryTime, setExpiryTime}) {
  const [formData, setFormData] = useState({
    email: '',
  });

  const modalRef = useRef(null);
  const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state

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


  console.log('formData.email :>> ', formData.email);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset password for:', formData.email);
    onNext(formData.email);
  };
  const generateCode = async () => {
    // Generate the 8-character code first
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newCode = "";
    for (let i = 0; i < 8; i++) {
      newCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    setCode(newCode); // Store the code
    setExpiryTime(Date.now() + 15 * 60 * 1000); // Set expiry time to 15 minute from now
    //alert(newCode); // Show the generated code in an alert (for testing purposes)
  
    // Define the data to populate the email template
    const emailData = {
      toEmail: formData.email,
      subject: "Reset Your Password",
      body: createForgotPasswordEmailBody({
        username: formData.email,
        code: newCode, // Use the generated code
        message:
          "We received a request to reset your password. Use the code below to reset it.",
      }),
    };
  
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/Email/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );
  
      const result = await response.json();
      if (result.success) {
        alert("Email sent successfully!"); // Notify the user the email was sent
      } else {
        console.log(result.message || "Email sending failed. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  
  // useEffect(() => {
  //   if (expiryTime) {
  //     const timer = setInterval(() => {
  //       if (Date.now() >= expiryTime) {
  //         setCode(""); // Clear the code after expiry
  //         setExpiryTime(null);
  //         alert("Your code has expired.");
  //         clearInterval(timer);
  //       }
  //     }, 1000);

  //     // Cleanup the timer on component unmount
  //     return () => clearInterval(timer);
  //   }
  // }, [expiryTime]);

  return (
    <div className="fixed sm:inset-10 flex items-center justify-center z-50 sm:p-4 px-1">
      <div
        ref={modalRef}
        className={`p-9 sm:p-12 md:p-12 mb-12 rounded-2xl border shadow-lg w-full max-w-sm relative transition-colors duration-300 ${
          isDarkMode ? 'bg-[rgba(96,96,96,0.8)] text-white' : 'bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg text-black'
        }`}      >
        <button
          className={`absolute top-4 right-4 hover:text-gray-800 ${
            isDarkMode ? "text-[#FFFFFFFF] text-opacity-80" : "text-gray-800"
          }`}
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
              className={`flex items-center text-[14px] ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:underline mb-4 mt-8 sm:mt-12`}
              onClick={onBackToLogin}
            >
              <ChevronLeft className={`w-6 h-6 mr-1 ${isDarkMode ? 'text-white' : 'text-black'}`} />
              {isLangArab?"العودة لتسجيل الدخول":"Back to sign in"}
            </button>
            <h2 className={`text-[24px] sm:text-[28px] font-medium ${isDarkMode ? 'text-white' : 'text-black'} mb-2`}>{isLangArab?"هل نسيت كلمة السر":"Forgot Password"}</h2>
            <p className={`text-[14px] font-omnes font-regular text-${isDarkMode ? '[#FFFFFFCC]' : 'gray-600'} mb-4`}>
              {isLangArab?"أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور الخاصة بك":"Enter your email and we'll send you a link to reset your password"}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
              <Input
                type="email"
                name="email"
                placeholder={isLangArab?"أدخل بريدك الإلكتروني":"Enter your Email id"}
                onChange={handleChange}
              />
              <button
                type="submit"
                onClick={generateCode}
                className={`w-full py-3 rounded-xl transition duration-300 text-sm ${
                  formData.email
                    ? 'bg-gradient-to-r from-[#036068] via-[#596451] to-[#1199A8] text-white'
                    : `${isDarkMode ? 'bg-[white] bg-opacity-20 text-white' : 'bg-[#82828280] text-white'}`
                }`}
                disabled={!formData.email}
              >
                {isLangArab?"التالي":"Next"}
              </button>
            </form>
            <div className="mt-auto pt-2 text-center">
              <p className={`text-sm text-${isDarkMode ? '[#FFFFFFCC]' : 'gray-600'} text-center mt-10`}>
              {isLangArab ? "ليس لديك حساب":"Don't have an account?"}{' '}
                <button onClick={onSignup} className={`text-${isDarkMode ? '[#004987]' : '[#004987]'} font-medium underline`}>
                {isLangArab?"تسجيل":"Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
