import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import Logo from "../../../../assets/GreenLogo.svg";
import Darklogo from "../../../../assets/Whitelogo.svg";

import Input from "../Input/Input";
import CountryDropdown from "../../../../../src/assets/CountryDropdown.svg";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { useTheme } from "../../../Layout/ThemeContext/ThemeContext"; // Import the theme context
import createEmailBody from "../../../../components/email/emailTemplate";

export default function Signup({ onClose, onSigninClick }) {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    password: "",
    email: "",
    phoneNumber: 0,
    organization: "",
    country: "",
  });

  // State variables for error messages
  const [errorMessages, setErrorMessages] = useState({
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    username: "",
    organization:"",
    firstName:"",
    email: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false); // Track form validity

  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    validateForm({ ...formData, [name]: value }); // Validate form on input change
  };

  const validateForm = (data) => {
    const { password, confirmPassword,username,firstName,organization, phoneNumber,email} = data;
    setErrorMessages({
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      username: "",
      firstName:"",
   email:"",
   organization:""
    });

    let valid = true;

    // Check if all fields are filled
    const allFieldsFilled = Object.values(data).every((value) => value !== "");
    if (!allFieldsFilled) {
      valid = false;
      // Optionally set error messages for specific fields
    }

    const CharacterRegex = /^[A-Za-z]+$/;
    // Check password length

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    const isPasswordValid = passwordRegex.test(password)
    if (!isPasswordValid) {
      valid = false;
      setErrorMessages((prev) => ({
        ...prev,
        password: "Password Capital letter ,Number,Special character must be 8 character",
      }));
    }

    // Check if passwords match
    const doPasswordsMatch = password === confirmPassword;
    if (!doPasswordsMatch) {
      valid = false;
      setErrorMessages((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
    }

    if(!organization){
      valid = false;
      setErrorMessages((prev) => ({
        ...prev,
        organization: "Organization required.",
      }));
    }else if(!CharacterRegex.test(organization)){
      valid = false;
      setErrorMessages((prev) => ({
        ...prev,
        organization: "organization should contain only alphabets.",
      }));
    }
    // Check if the username already exists
    const isUsernameAvailable = !usernameExists; // Ensure username does not exist
    const usernameRegex = /^[A-Za-z]+$/;
    if (!isUsernameAvailable) {
      valid = false;
      setErrorMessages((prev) => ({
        ...prev,
        username: "Username already exists.",
      }));
    }else if(!username){
      setErrorMessages((prev)=>({
        ...prev,
        username:"Username is required"
      }))
    }else if (!usernameRegex.test(username)) {
      valid = false;
      setErrorMessages((prev) => ({
        ...prev,
        username: "Username should contain only alphabets.",
      }));
    }

    if(!firstName){
      valid = false;
      setErrorMessages((prev) => ({
        ...prev,
        firstName: "firstName required",
      }));
    }else if(!usernameRegex.test(firstName)){
      valid = false;
      setErrorMessages((prev) => ({
        ...prev,
        firstName: "firstName should contain only alphabets.",
      }));
    } 

    // Check if phone number is exactly 10 digits and contains only numbers
    const isPhoneNumberValid =
      phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
    if (!isPhoneNumberValid) {
      valid = false;
      setErrorMessages((prev) => ({
        ...prev,
        phoneNumber: "Phone number must be exactly 10 digits.",
      }));
    }

    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const isEmailValid = regexEmail.test(email);

    console.log("isEmailValid :>> ", isEmailValid);

    if(!isEmailValid){
      valid=false;
      setErrorMessages((prev)=>({...prev,email:"Provide a valid email address."}))
    }
    setFormIsValid(valid); // Update form validity state
  };

  


  const handleSubmit = (e) => {
    e.preventDefault();
    if (formIsValid) {
      onSignupClick();
    }
  };

  const onSignupClick = async () => {
    try {
      const signupObj = {
        username: formData.username + formData.firstName,
        firstName: formData.username,
        lastname: formData.firstName,
        password: formData.password,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        organization: formData.organization,
        country: formData.country,
        role: "user",
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/Registration/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signupObj),
        }
      );
      const data = await response.json();
      if (data.success) {
        //console.log(data)
        sendEmail(data.data);
        setUsernameExists(false);
        setEmailExists(false);
        onClose();
      } else {
        if (data.message === "Username already exists.") {
          setUsernameExists(true);
        }
        if (data.message === "Email already exists.") {
          setEmailExists(true);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const sendEmail = async (userresult) => {
    // Define the data to populate the email template
    const emailData = {
      toEmail: userresult.email,
      subject: isLangArab? "قم بتأكيد بريدك الإلكتروني لتفعيل حسابك ": "Confirm Your Email to Activate Your Account",
      body: createEmailBody({
        username: userresult.username,
        link: `${window.location.protocol}//${window.location.host}/${process.env.REACT_APP_BASE_URL}/activate/${userresult.username}`,
        message:
        isLangArab? " يرجى تأكيد عنوان بريدك الإلكتروني بالنقر فوق الارتباط أدناه. " :
          "Please confirm your email address by clicking the link below.",
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
        console.log("Email sent successfully:", result);
        alert(  isLangArab?"تم إرسال البريد الإلكتروني بنجاح:": "Email sent successfully!");
      } else {
        console.log(result.message || "Email sent failed, Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div dir={isLangArab && "rtl"} className="fixed sm:inset-10 inset-1 flex items-center justify-center z-50 mb-6">
      <div
        ref={modalRef}
        className={`p-4 rounded-2xl border shadow-lg w-full max-w-xl relative transition-colors duration-300 ${
          isDarkMode
            ? "bg-[rgba(96,96,96,0.8)] text-white"
            : "bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg text-black"
        } `}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 hover:text-gray-800 ${
            isDarkMode ? "text-[#FFFFFFFF] text-opacity-80" : "text-gray-800"
          }`}
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center justify-between max-h-[80vh] overflow-y-auto">
          <div className="w-full">
            <div className="flex justify-center mb-4">
              <img src={ isDarkMode? Darklogo: Logo} alt="Logo" className="h-14" />
            </div>
            <h2
              className={`font-omnes text-[28px] font-medium leading-tight text-left mb-1 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {isLangArab ? "تسجيل" : "Sign Up"}
            </h2>
            <p
              className={`font-omnes text-[15px] font-light leading-tight text-left mb-3 text-${
                isDarkMode ? "[#FFFFFFCC]" : "gray-600"
              } `}
            >
              Please create your account
            </p>
            <form onSubmit={handleSubmit} className="space-y-1 laptop_lg:space-y-2 ">
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                <span>
                  <Input
                    type="text"
                    name="username"
                    placeholder={isLangArab ? "الاسم الأول" : "First Name"}
                    required
                    className={` ${isLangArab ? "text-right" : "text-left"}`}
                    style={{
                      direction: isLangArab ? "rtl" : "ltr",
                      textAlign: isLangArab ? "right" : "left",
                    }}
                    // onChange={(e)=>{handleChange(e); settxtUsername(e.target.value)}}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  {errorMessages.username && (
                    <p className=" text-xs" style={{ color: "red" }}>
                      {errorMessages.username}
                    </p>
                  )}{" "}
                  {/* Username error message */}
                </span>
                <span>
                <Input
                  type="text"
                  name="firstName"
                  placeholder={isLangArab ? "اسم العائلة" : "Last Name"}
                  required
                  className={`${
                    isLangArab ? "text-right rtl" : "text-left ltr"
                  }`}
                  onChange={handleChange}
                />
                {errorMessages.firstName && (
                    <p className=" text-xs" style={{ color: "red" }}>
                      {errorMessages.firstName}
                    </p>
                  )}{" "}
                  {/* First Name error message */}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                <div className="relative">
                  <span>
                    <Input
                      type={`${showPassword ? "text" : "password"}`}
                      name="password"
                      placeholder={isLangArab ? "نسيت كلمة المرور" : "Password"}
                      required
                      minLength={8}
                      onChange={handleChange}
                      className={`${isLangArab ? "text-right" : "text-left"}`}
                      style={{
                        direction: isLangArab ? "rtl" : "ltr",
                        textAlign: isLangArab ? "right" : "left",
                      }}
                    />
                    <button
                      type="button"
                      className={`absolute ${isLangArab?"left-3":"right-3"} ${
                        errorMessages.password ? "top-6" : "top-1/2"
                      }  transform -translate-y-1/2`}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <IoEye
                          className={`text-2xl ${
                            isDarkMode ? "text-black" : "text-black"
                          } opacity-50`}
                        />
                      ) : (
                        <IoEyeOff
                          className={`text-2xl ${
                            isDarkMode ? "text-black" : "text-black"
                          } opacity-50`}
                        />
                      )}
                    </button>
                  </span>
                  {errorMessages.password && (
                    <p className=" text-xs" style={{ color: "red" }}>
                      {errorMessages.password}
                    </p>
                  )}{" "}
                  {/* Confirm password error message */}
                </div>
                <div className="relative">
                  <Input
                    type={`${showConfirmPassword ? "text" : "password"}`}
                    name="confirmPassword"
                    placeholder={isLangArab ? "رقم الهاتف" : "Confirm Password"}
                    required
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className={`absolute ${isLangArab?"left-3":"right-3"} ${
                      errorMessages.password ? "top-6" : "top-1/2"
                    }  transform -translate-y-1/2`}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    // aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? (
                      <IoEye
                        className={`text-2xl ${
                          isDarkMode ? "text-black" : "text-black"
                        } opacity-50`}
                      />
                    ) : (
                      <IoEyeOff
                        className={`text-2xl ${
                          isDarkMode ? "text-black" : "text-black"
                        } opacity-50`}
                      />
                    )}
                  </button>
                  {errorMessages.confirmPassword && (
                    <p className=" text-xs" style={{ color: "red" }}>
                      {errorMessages.confirmPassword}
                    </p>
                  )}{" "}
                  {/* Confirm password error message */}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                <span>
                  <Input
                    type="email"
                    name="email"
                    placeholder={
                      isLangArab ? "أدخل بريدك الإلكتروني" : "Email Address"
                    }
                    required
                    onChange={handleChange}
                  />
                  {emailExists && (
                    <p className=" text-sm" style={{ color: "red" }}>
                      {"Email already exists."}
                    </p>
                  )}{" "}
                  {/* Email error message */}
                  {errorMessages.email && (
                    <p className=" text-xs" style={{ color: "red" }}>
                      {errorMessages.email}
                    </p>
                  )}
                </span>
                <span>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    placeholder={isLangArab ? "رقم الهاتف" : "Phone Number"}
                    required
                    onChange={handleChange}
                  />
                  {errorMessages.phoneNumber && (
                    <p className=" text-xs" style={{ color: "red" }}>
                      {errorMessages.phoneNumber}
                    </p>
                  )}{" "}
                  {/* Phone number error message */}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
                <span className=" flex flex-col">
                <Input
                  type="text"
                  name="organization"
                  placeholder={isLangArab ? "المنظمة" : "Organization"}
                  required
                  onChange={handleChange}
                />
                {errorMessages.organization && (
                    <p className=" text-xs" style={{ color: "red" }}>
                      {errorMessages.organization}
                    </p>
                  )}{" "}
                  </span>
                <div className="relative">
                  <select
                    name="country"
                    className={`w-full h-[48px] px-3 py-1.5 rounded-xl text-sm appearance-none border transition-colors ${
                      isDarkMode
                        ? "bg-[#FFFFFF] bg-opacity-30 text-white border-transparent "
                        : "bg-white text-black border-transparent"
                    }`}
                    onChange={handleChange}
                  >
                    <option
                      className={`${isDarkMode ? "text-black" : "text-black"}`}
                      value=""
                    >
                      {isLangArab ? "الدولة" : "Country"}
                    </option>
                    <option
                      className={`${isDarkMode ? "text-black" : "text-black"}`}
                      value="United Arab Emirates"
                    >
                      United Arab Emirates
                    </option>
                    <option
                      className={`${isDarkMode ? "text-black" : "text-black"}`}
                      value="United States"
                    >
                      United States
                    </option>
                    <option
                      className={`${isDarkMode ? "text-black" : "text-black"}`}
                      value="United Kingdom"
                    >
                      United Kingdom
                    </option>
                  </select>
                  <img
                    src={CountryDropdown}
                    alt="Dropdown"
                    className={`absolute top-1/2 ${
                      isLangArab ? "left-3" : "right-3"
                    } -translate-y-1/2`}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="w-full mt-1">
            <button
              type="submit"
              className={`sm:w-[308px] w-[270px] h-[48px] mx-auto block py-1 rounded-xl transition duration-300 text-sm mt-5
                ${
                  formIsValid
                    ? isDarkMode
                      ? "bg-gradient-to-r from-[#036068] via-[#596451] to-[#1199A8] text-white"
                      : "bg-gradient-to-r from-[#036068] via-[#596451] to-[#1199A8] text-white"
                    : isDarkMode
                    ? "bg-[white] bg-opacity-20 text-white"
                    : "bg-[#828282] opacity-50 text-white"
                }
              `}
              disabled={!formIsValid}
              onClick={onSignupClick}
            >
              {isLangArab ? "تسجيل" : "Sign Up"}
            </button>
            <p
              className={`text-center mt-2 text-[14px] text-${
                isDarkMode ? "[#FFFFFFCC]" : "gray-600"
              } `}
            >
              {isLangArab ? " لديك حساب بالفعل" : "Already have an account"}?{" "}
              <button
                onClick={onSigninClick}
                className={`bg-clip-text mx-1 text-transparent ${isDarkMode?" text-white hover:text-gray-300 underline":"bg-gradient-to-r from-[#036068] via-[#1199A8] to-[#036068]"} text-[14px] font-medium hover:underline`}
              >
                {isLangArab ? "تسجيل الدخول" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
