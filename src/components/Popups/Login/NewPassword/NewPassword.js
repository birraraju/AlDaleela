import { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft } from 'lucide-react';
import Logo from '../../../../assets/GreenLogo.svg';
import Darklogo from "../../../../assets/Whitelogo.svg";

import Input from '../Input/Input';
import PasswordChangeSuccess from './PasswordPopup/PasswordPopup';
import { IoEyeOff,IoEye } from "react-icons/io5";
import { useTheme } from '../../../Layout/ThemeContext/ThemeContext'; // Import the theme context
import {UserActivityLog} from "../../../Common/UserActivityLog";
import { useAuth } from "../../../../Providers/AuthProvider/AuthProvider";

export default function ResetPassword({ email, onClose, onBackToLogin, onSignup, onPasswordSet, code, expiryTime }) {
  const [formData, setFormData] = useState({
    code:'',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showResetForm, setShowResetForm] = useState(true);

  const[errors,setErrors]=useState({
    code:"",
    password:"",
    confirmPassword:""
  })
  const { isDarkMode,isLangArab } = useTheme(); // Access the dark mode state
  const {profiledetails}= useAuth();

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

    setErrors((prevErrors) => {
    const newErrors = { ...prevErrors };

    if (name === 'code' && value) {
      delete newErrors.code;
    }

    if (name === 'password') {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (passwordRegex.test(value)) {
        delete newErrors.password;
      }
    }

    if (name === 'confirmPassword' && value === formData.password) {
      delete newErrors.confirmPassword;
    }

    return newErrors;
  });
  };


  const validate=()=>{
let valid=true
const newError={}
    if(!formData.code){
      newError.code="code must required"
      valid=false
    }else if (formData.code !== code) { // Check if entered code matches the generated code
      newError.code = "Invalid code";
      valid = false;
    } else if (Date.now() > expiryTime) { // Check if code has expired
      newError.code = "Code has expired";
      valid = false;
    }   
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!formData.password) {
      newError.password = "Password is required";
      valid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newError.password = "Password must be at least 8 characters, include a capital letter, a symbol, and a number";
      valid = false;
    }
    
    
    if (!formData.confirmPassword) {
      newError.confirmPassword = "Confirm Password is required";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
      valid = false;
    }

    console.log('newError :>> ', newError);
   setErrors(newError) 
   return valid
  }

  console.log('errors :>> ', errors);
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const forgetObj ={
          email:email,
          password:formData.password
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/Registration/forgetpassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(forgetObj),
        });
        const data = await response.json();
        if(data.success){
          //console.log(values);
          UserActivityLog({"username":"Unknown","email":data.data.email}, "Forgot Password")   
          setShowResetForm(false);
          setShowSuccessPopup(true);       
        }
        else{
          //console.log(data)          
        }
      }catch (error) {
        console.error('Error submitting form:', error);
      } 
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
    <div className="absolute sm:inset-10 inset-0 flex items-center  justify-center z-50">
      <div
        ref={modalRef}
        className={`sm:px-14 sm:py-10 px-4 py-8 mb-10 rounded-lg  shadow-xl w-full max-w-sm  border relative transition-colors duration-300 ${
          isDarkMode ? 'bg-[rgba(96,96,96,0.8)] text-white' : 'bg-white bg-opacity-65 backdrop-filter backdrop-blur-lg text-black'
        }`}      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          <X className="w-5 h-5 text-black" />
        </button>
        <div className="flex justify-center mb-6 sm:w-auto w-60 ">
          <img src={ isDarkMode? Darklogo : Logo} alt="Logo" className="h-12" />
        </div>
        <div className="flex flex-col justify-between">
          <div className="w-full">
            <button
              className={`flex items-center text-[14px] font-medium ${
                isDarkMode ? 'text-white text-opacity-80' : 'text-gray-600'
              } hover:underline mb-4`}
              onClick={onBackToLogin}
            >
              <ChevronLeft className={`w-5 h-5 mr-1 ${isDarkMode ? 'text-white' : 'text-black'}`} />
              {isLangArab?"العودة لتسجيل الدخول":"Back to sign in"}
            </button>
            <h2 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {isLangArab?"الرجاء إدخال كلمة مرور جديدة":"Please Enter a New Password"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-2 flex-grow">

            <div className="relative">
                <Input
                  type='text'
                  name="code"
                  placeholder={isLangArab?"أدخل الرمز":"Enter code"}
                  onChange={handleChange}
                />
               
               {errors.code && <span className="text-red-500 text-xs">{errors.code}</span>}
               <div>
               </div>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder={isLangArab?"أدخل كلمة المرور الجديدة":"Enter New Password"}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <IoEye className={`text-2xl ${isDarkMode ? 'text-white' : 'text-black'} opacity-50`} /> :<IoEyeOff className={`text-2xl ${isDarkMode ? 'text-white' : 'text-black'} opacity-50`} />}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
              <div>
               </div>

              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder={isLangArab?"تأكيد كلمة المرور الجديدة":"Confirm New Password"}
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
                  {showConfirmPassword ? <IoEye className={`text-2xl ${isDarkMode ? 'text-white' : 'text-black'} opacity-50`} /> :<IoEyeOff className={`text-2xl ${isDarkMode ? 'text-white' : 'text-black'} opacity-50`} />}
                </button>
              </div>
              <div>
              {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword}</span>}
               </div>
            </form>
            <button
              onClick={handleSubmit}
              className={`w-full h-[40px] mt-5 mb-4 rounded-xl   transition duration-300 ${
                isResetDisabled
                  ? isDarkMode
                    ? 'bg-[white] bg-opacity-20 text-white font-medium'
                    : 'bg-[#828282] bg-opacity-80 text-white text-[14px]'
                  : isDarkMode
                  ? 'bg-gradient-to-r from-[#036068] via-[#596451] to-[#1199A8]'
                  : 'bg-gradient-to-r from-[#036068] via-[#596451] to-[#1199A8]'
              }`}
              // disabled={isResetDisabled}
            >
              <p className=' text-[#FFFFFF] '>{isLangArab?"إعادة تعيين كلمة المرور":"Reset Password"}</p>
              
            </button>
            <div className="mt-6 text-center">
              <p className={`text-sm ${ isDarkMode?" text-white":"text-black "}`}>
              {isLangArab ? "ليس لديك حساب":"Don't have an account?"}{' '}
                <button onClick={onSignup} className={`${ isDarkMode?" text-white hover:text-white/75":"text-[#004987]"} ml-2 font-medium underline`}>
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
