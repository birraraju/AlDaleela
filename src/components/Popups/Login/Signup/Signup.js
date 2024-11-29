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
    organization: "",
    firstName: "",
    email: "",
    country: "",
  });

  const countries = [
    { country: "Afghanistan", code: "+93", limit: 9 },
    { country: "Albania", code: "+355", limit: 9 },
    { country: "Algeria", code: "+213", limit: 9 },
    { country: "Andorra", code: "+376", limit: 6 },
    { country: "Angola", code: "+244", limit: 9 },
    { country: "Antigua and Barbuda", code: "+1", limit: 10 },
    { country: "Argentina", code: "+54", limit: 10 },
    { country: "Armenia", code: "+374", limit: 8 },
    { country: "Australia", code: "+61", limit: 9 },
    { country: "Austria", code: "+43", limit: 10 },
    { country: "Azerbaijan", code: "+994", limit: 9 },
    { country: "Bahamas", code: "+1", limit: 10 },
    { country: "Bahrain", code: "+973", limit: 8 },
    { country: "Bangladesh", code: "+880", limit: 10 },
    { country: "Barbados", code: "+1", limit: 10 },
    { country: "Belarus", code: "+375", limit: 9 },
    { country: "Belgium", code: "+32", limit: 9 },
    { country: "Belize", code: "+501", limit: 7 },
    { country: "Benin", code: "+229", limit: 8 },
    { country: "Bhutan", code: "+975", limit: 8 },
    { country: "Bolivia", code: "+591", limit: 8 },
    { country: "Bosnia and Herzegovina", code: "+387", limit: 8 },
    { country: "Botswana", code: "+267", limit: 7 },
    { country: "Brazil", code: "+55", limit: 10 },
    { country: "Brunei", code: "+673", limit: 7 },
    { country: "Bulgaria", code: "+359", limit: 9 },
    { country: "Burkina Faso", code: "+226", limit: 8 },
    { country: "Burundi", code: "+257", limit: 8 },
    { country: "Cabo Verde", code: "+238", limit: 7 },
    { country: "Cambodia", code: "+855", limit: 9 },
    { country: "Cameroon", code: "+237", limit: 9 },
    { country: "Canada", code: "+1", limit: 10 },
    { country: "Central African Republic", code: "+236", limit: 8 },
    { country: "Chad", code: "+235", limit: 8 },
    { country: "Chile", code: "+56", limit: 9 },
    { country: "China", code: "+86", limit: 11 },
    { country: "Colombia", code: "+57", limit: 10 },
    { country: "Comoros", code: "+269", limit: 7 },
    { country: "Costa Rica", code: "+506", limit: 8 },
    { country: "Croatia", code: "+385", limit: 9 },
    { country: "Cuba", code: "+53", limit: 8 },
    { country: "Cyprus", code: "+357", limit: 8 },
    { country: "Czech Republic", code: "+420", limit: 9 },
    { country: "Democratic Republic of the Congo", code: "+243", limit: 9 },
    { country: "Denmark", code: "+45", limit: 8 },
    { country: "Djibouti", code: "+253", limit: 6 },
    { country: "Dominica", code: "+1", limit: 10 },
    { country: "Dominican Republic", code: "+1", limit: 10 },
    { country: "Ecuador", code: "+593", limit: 9 },
    { country: "Egypt", code: "+20", limit: 10 },
    { country: "El Salvador", code: "+503", limit: 8 },
    { country: "Equatorial Guinea", code: "+240", limit: 9 },
    { country: "Eritrea", code: "+291", limit: 7 },
    { country: "Estonia", code: "+372", limit: 8 },
    { country: "Eswatini", code: "+268", limit: 8 },
    { country: "Ethiopia", code: "+251", limit: 9 },
    { country: "Fiji", code: "+679", limit: 7 },
    { country: "Finland", code: "+358", limit: 10 },
    { country: "France", code: "+33", limit: 9 },
    { country: "Gabon", code: "+241", limit: 7 },
    { country: "Gambia", code: "+220", limit: 7 },
    { country: "Georgia", code: "+995", limit: 9 },
    { country: "Germany", code: "+49", limit: 10 },
    { country: "Ghana", code: "+233", limit: 9 },
    { country: "Greece", code: "+30", limit: 10 },
    { country: "Grenada", code: "+1", limit: 10 },
    { country: "Guatemala", code: "+502", limit: 8 },
    { country: "Guinea", code: "+224", limit: 9 },
    { country: "Guinea-Bissau", code: "+245", limit: 7 },
    { country: "Guyana", code: "+592", limit: 7 },
    { country: "Haiti", code: "+509", limit: 8 },
    { country: "Honduras", code: "+504", limit: 8 },
    { country: "Hungary", code: "+36", limit: 9 },
    { country: "Iceland", code: "+354", limit: 7 },
    { country: "India", code: "+91", limit: 10 },
    { country: "Indonesia", code: "+62", limit: 12 },
    { country: "Iran", code: "+98", limit: 10 },
    { country: "Iraq", code: "+964", limit: 10 },
    { country: "Ireland", code: "+353", limit: 9 },
    { country: "Israel", code: "+972", limit: 9 },
    { country: "Italy", code: "+39", limit: 10 },
    { country: "Ivory Coast", code: "+225", limit: 8 },
    { country: "Jamaica", code: "+1", limit: 10 },
    { country: "Japan", code: "+81", limit: 10 },
    { country: "Jordan", code: "+962", limit: 9 },
    { country: "Kazakhstan", code: "+7", limit: 10 },
    { country: "Kenya", code: "+254", limit: 9 },
    { country: "Kiribati", code: "+686", limit: 8 },
    { country: "Korea, South", code: "+82", limit: 10 },
    { country: "Kuwait", code: "+965", limit: 8 },
    { country: "Kyrgyzstan", code: "+996", limit: 9 },
    { country: "Laos", code: "+856", limit: 9 },
    { country: "Latvia", code: "+371", limit: 8 },
    { country: "Lebanon", code: "+961", limit: 8 },
    { country: "Lesotho", code: "+266", limit: 8 },
    { country: "Liberia", code: "+231", limit: 8 },
    { country: "Libya", code: "+218", limit: 9 },
    { country: "Liechtenstein", code: "+423", limit: 7 },
    { country: "Lithuania", code: "+370", limit: 8 },
    { country: "Luxembourg", code: "+352", limit: 9 },
    { country: "Madagascar", code: "+261", limit: 9 },
    { country: "Malawi", code: "+265", limit: 9 },
    { country: "Malaysia", code: "+60", limit: 10 },
    { country: "Maldives", code: "+960", limit: 7 },
    { country: "Mali", code: "+223", limit: 8 },
    { country: "Malta", code: "+356", limit: 8 },
    { country: "Marshall Islands", code: "+692", limit: 7 },
    { country: "Mauritania", code: "+222", limit: 8 },
    { country: "Mauritius", code: "+230", limit: 8 },
    { country: "Mexico", code: "+52", limit: 10 },
    { country: "Micronesia", code: "+691", limit: 7 },
    { country: "Moldova", code: "+373", limit: 8 },
    { country: "Monaco", code: "+377", limit: 8 },
    { country: "Mongolia", code: "+976", limit: 8 },
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  // const [formIsValid, setFormIsValid] = useState(false);
  const [isFormFilled, setFormFilled] = useState(false);
  const [filterText, setFilterText] = useState("");
  const modalRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isCodeOpen,setCodeOpen] = useState(false)

  const toggleDropdown = () => {
    setCodeOpen(false)
    setIsOpen(!isOpen);
  }
  const  toggleCodeDropdown = ()=> {
    setIsOpen(false)
    setCodeOpen(!isCodeOpen)
  }

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

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (value) => value !== ""
    );
    if (allFieldsFilled) {
      setFormFilled(true);
      // Optionally set error messages for specific fields
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // validateForm({ ...formData, [name]: value });
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
  };

  // Filter the countries based on the input text
  const filteredCountries = countries.filter((country) =>
    country.country.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleSelect = ({ name, value }) => {
    setSelectedValue(value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFilterText(""); 
    setIsOpen(false);
  };

  // const validateForm = (data) => {
  //   const { password, confirmPassword,username,firstName,organization, phoneNumber,email} = data;
  //   setErrorMessages({
  //     password: "",
  //     confirmPassword: "",
  //     phoneNumber: "",
  //     username: "",
  //     firstName:"",
  //  email:"",
  //  organization:""
  //   });

  //   let valid = true;

  //   // Check if all fields are filled
  //   // const allFieldsFilled = Object.values(data).every((value) => value !== "");
  //   // if (allFieldsFilled) {
  //   //   setFormFilled(true)
  //   // }

  //   const CharacterRegex = /^[A-Za-z]+$/;
  //   // Check password length

  //   const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  //   const isPasswordValid = passwordRegex.test(password)
  //   if (!isPasswordValid) {
  //     valid = false;
  //     setErrorMessages((prev) => ({
  //       ...prev,
  //       password: "Password Capital letter ,Number,Special character must be 8 character",
  //     }));
  //   }

  //   // Check if passwords match
  //   const doPasswordsMatch = password === confirmPassword;
  //   if (!doPasswordsMatch) {
  //     valid = false;
  //     setErrorMessages((prev) => ({
  //       ...prev,
  //       confirmPassword: "Passwords do not match.",
  //     }));
  //   }

  //   if(!organization){
  //     valid = false;
  //     setErrorMessages((prev) => ({
  //       ...prev,
  //       organization: "Organization required.",
  //     }));
  //   }else if(!CharacterRegex.test(organization)){
  //     valid = false;
  //     setErrorMessages((prev) => ({
  //       ...prev,
  //       organization: "organization should contain only alphabets.",
  //     }));
  //   }
  //   // Check if the username already exists
  //   const isUsernameAvailable = !usernameExists; // Ensure username does not exist
  //   const usernameRegex = /^[A-Za-z]+$/;
  //   if (!isUsernameAvailable) {
  //     valid = false;
  //     setErrorMessages((prev) => ({
  //       ...prev,
  //       username: "Username already exists.",
  //     }));
  //   }else if(!username){
  //     setErrorMessages((prev)=>({
  //       ...prev,
  //       username:"Username is required"
  //     }))
  //   }else if (!usernameRegex.test(username)) {
  //     valid = false;
  //     setErrorMessages((prev) => ({
  //       ...prev,
  //       username: "Username should contain only alphabets.",
  //     }));
  //   }

  //   if(!firstName){
  //     valid = false;
  //     setErrorMessages((prev) => ({
  //       ...prev,
  //       firstName: "firstName required",
  //     }));
  //   }else if(!usernameRegex.test(firstName)){
  //     valid = false;
  //     setErrorMessages((prev) => ({
  //       ...prev,
  //       firstName: "firstName should contain only alphabets.",
  //     }));
  //   }

  //   // Check if phone number is exactly 10 digits and contains only numbers
  //   const isPhoneNumberValid =
  //     phoneNumber.length === 10 && /^\d+$/.test(phoneNumber);
  //   if (!isPhoneNumberValid) {
  //     valid = false;
  //     setErrorMessages((prev) => ({
  //       ...prev,
  //       phoneNumber: "Phone number must be exactly 10 digits.",
  //     }));
  //   }

  //   const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  //   const isEmailValid = regexEmail.test(email);

  //   console.log("isEmailValid :>> ", isEmailValid);

  //   if(!isEmailValid){
  //     valid=false;
  //     setErrorMessages((prev)=>({...prev,email:"Provide a valid email address."}))
  //   }
  //   // setFormIsValid(valid);
  //   return valid;
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (formIsValid) {
  //     onSignupClick();
  //   }
  // };

  const validateForm = (data) => {
    const {
      password,
      confirmPassword,
      username,
      firstName,
      organization,
      phoneNumber,
      email,
      country,
    } = data;

    const CharacterRegex = /^[A-Za-z]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let errors = {
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      username: "",
      firstName: "",
      email: "",
      organization: "",
    };

    let valid = true;

    // Password Validation
    if (!passwordRegex.test(password)) {
      valid = false;
      errors.password =
        "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    if (password !== confirmPassword) {
      valid = false;
      errors.confirmPassword = "Password doesn't match.";
    }

    // Organization Validation
    if (!organization) {
      valid = false;
      errors.organization = "Please enter your organization name.";
    } else if (!CharacterRegex.test(organization)) {
      valid = false;
      errors.organization = "Please enter your organization name.";
    }

    // Username Validation
    if (!username) {
      valid = false;
      errors.username = "Please enter your first name.";
    } else if (!CharacterRegex.test(username)) {
      valid = false;
      errors.username = "Username should contain only alphabets.";
    }
    // else if (!usernameExists) {
    //   valid = false;
    //   errors.username = "Username already exists.";
    // }

    // First Name Validation
    if (!firstName) {
      valid = false;
      errors.firstName = "Please enter your last name.";
    } else if (!CharacterRegex.test(firstName)) {
      valid = false;
      errors.firstName = "First name should contain only alphabets.";
    }

    const validPhoneCount = selectedCountry?.limit; // Get the limit (number of digits)

    // Phone Number Validation
    if (
      !validPhoneCount ||
      !new RegExp(`^\\d{${validPhoneCount}}$`).test(phoneNumber)
    ) {
      valid = false;
      errors.phoneNumber = `Please enter a ${validPhoneCount}-digit number`;
    }

    // Email Validation
    if (!emailRegex.test(email)) {
      valid = false;
      errors.email =
        "Please enter a valid email address (e.g., example@domain.com).";
    }

    if (country === "") {
      valid = false;
      errors.country = "Please enter your country.";
    }

    setErrorMessages(errors);
    return valid;
  };

  const onSignupClick = async () => {
    const formValid = validateForm(formData);
    if (!formValid) return;

    try {
      const signupObj = {
        username: formData.username + formData.firstName,
        firstName: formData.username,
        lastname: formData.firstName,
        password: formData.password,
        email: formData.email,
        phoneNumber: selectedCountry?.code + formData.phoneNumber  ,
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
      subject: isLangArab
        ? "قم بتأكيد بريدك الإلكتروني لتفعيل حسابك "
        : "Confirm Your Email to Activate Your Account",
      body: createEmailBody({
        username: userresult.username,
        link: `${window.location.protocol}//${window.location.host}/${process.env.REACT_APP_BASE_URL}/activate/${userresult.username}`,
        message: isLangArab
          ? " يرجى تأكيد عنوان بريدك الإلكتروني بالنقر فوق الارتباط أدناه. "
          : "Please confirm your email address by clicking the link below.",
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
        alert(
          isLangArab
            ? "تم إرسال البريد الإلكتروني بنجاح:"
            : "Email sent successfully!"
        );
      } else {
        console.log(result.message || "Email sent failed, Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  console.log("Form Signin :", formData)
  return (
    <div
      dir={isLangArab && "rtl"}
      className="fixed sm:inset-10 inset-1 flex items-center justify-center z-50 mb-6"
    >
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
              <img
                src={isDarkMode ? Darklogo : Logo}
                alt="Logo"
                className="h-14"
              />
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
            <form className="space-y-1 laptop_lg:space-y-2 ">
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
                      className={`absolute ${
                        isLangArab ? "left-3" : "right-3"
                      } ${
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
                    className={`absolute ${isLangArab ? "left-3" : "right-3"} ${
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
                <span className=" ">
                <span className="flex gap-1 ">
                <span onClick={toggleCodeDropdown} className=" cursor-pointer">
                  
                  <p
                    name="code"
                    className={` h-[48px] min-w-14 max-w-16 flex items-center justify-between  px-3 py-1.5 border-gray-300 rounded-[10px]  text-sm appearance-none border transition-colors ${
                      isDarkMode
                        ? "bg-[#FFFFFF]  text-black border-transparent "
                        : "bg-white text-black border-transparent"
                    }`}
                
                  >
                    <p className="">
                     { selectedCountry ?selectedCountry?.code: "+00"}
                     </p>
                     <img
                      src={CountryDropdown}
                      alt="Dropdown"
                      className=" mx-1"
                    />
                    </p>
                  {isCodeOpen && (
                      <ul
                        className={`absolute mt-1 grid justify-start   max-w-24 px-2 py-1 max-h-[80px] overflow-y-auto rounded-lg shadow-lg z-10 ${
                          isDarkMode
                            ? "bg-[#FFFFFF] bg-opacity-30 text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        {countries.map((country, index) => (
                          <li
                            key={index}
                            name="country"
                            onClick={() => {
                              setSelectedCountry(country);
                            }}
                            className={` px-2 py-0.5 w-full text-[12px] font-500 cursor-pointer  ${
                              isDarkMode ? "hover:bg-opacity-40 bg-black/90" : "hover:bg-gray-200"
                            }`}
                          >
                            {country.code}
                          </li>
                        ))}
                      </ul>
                    )}
                  </span>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    className=" w-full"
                    placeholder={isLangArab ? "رقم الهاتف" : "Phone Number"}
                    required
                    onChange={handleChange}
                  />
                  </span>
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
                  <span  className=" cursor-pointer">
                    {/* <select
                      name="country"
                      className={`w-full h-[48px] px-3 py-1.5 rounded-xl text-sm appearance-none border transition-colors ${
                        isDarkMode
                          ? "bg-[#FFFFFF] bg-opacity-30 text-white border-transparent "
                          : "bg-white text-black border-transparent"
                      }`}
                      onChange={handleChange}
                    >
                      <option
                        className={`${
                          isDarkMode ? "text-black" : "text-black"
                        }`}
                        value=""
                      >
                        {isLangArab ? "الدولة" : "Country"}
                      </option>
                      {countries.map((country, index) => (
                        <option
                          key={index}
                          className={`${
                            isDarkMode ? "text-black" : "text-black"
                          }`}
                          value={country.country}
                        >
                          {country.country}
                        </option>
                      ))}
                    </select> */}
                    {/* Dropdown Header */}
                    {!isOpen ? <p onClick={toggleDropdown}
                      className={`w-full h-[48px] flex items-center  px-3 py-1.5 rounded-xl text-sm appearance-none border transition-colors ${
                        isDarkMode
                          ? "bg-[#FFFFFF]  text-black border-transparent "
                          : "bg-white text-black border-transparent"
                      }`}
                    >
                      {selectedValue || (isLangArab ? "الدولة" : "Country")}
                    </p>:  <input type="text" value={filterText}
          onChange={handleFilterChange} className={`w-full h-[48px] flex items-center  px-3 py-1.5 rounded-xl text-sm appearance-none border transition-colors ${
                        isDarkMode
                          ? "bg-[#FFFFFF]  text-black border-transparent "
                          : "bg-white text-black border-transparent"
                      }`} /> }

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <ul
                        className={`absolute mt-1 w-full max-h-[80px] min-h-[40px] overflow-y-auto rounded-lg shadow-lg z-10 ${
                          isDarkMode
                            ? "bg-[#FFFFFF] bg-opacity-30 text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        { filteredCountries.length > 0 ? filteredCountries?.map((country, index) => (
                          <li
                            key={index}
                            name="country"
                            onClick={() => {
                              handleSelect({
                                name: "country",
                                value: country.country,
                              });
                              
                            }}
                            className={` px-2 py-1 w-full text-[12px] font-500 cursor-pointer  ${
                              isDarkMode ? "hover:bg-opacity-40 bg-black/90" : "hover:bg-gray-200"
                            }`}
                          >
                            {country.country}
                          </li>
                        )): <li
                        className={`px-2 py-0.5 w-full text-[12px] font-500 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {isLangArab ? "لا توجد نتائج" : "No results found"}
                      </li>}
                      </ul>
                    )}
                    {/* <img
                      src={CountryDropdown}
                      alt="Dropdown"
                      className={`absolute top-1/2 ${
                        isLangArab ? "left-3" : "right-3"
                      } -translate-y-1/2`}
                    /> */}
                  </span>
                  {errorMessages.country && (
                    <p className=" text-xs" style={{ color: "red" }}>
                      {errorMessages.country}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className="w-full mt-1">
            <button
              type="submit"
              className={`sm:w-[308px] w-[270px] h-[48px] mx-auto block py-1 rounded-xl transition duration-300 text-sm mt-5
                ${
                  isFormFilled
                    ? isDarkMode
                      ? "bg-gradient-to-r from-[#036068] via-[#596451] to-[#1199A8] text-white"
                      : "bg-gradient-to-r from-[#036068] via-[#596451] to-[#1199A8] text-white"
                    : isDarkMode
                    ? "bg-[white] bg-opacity-20 text-white"
                    : "bg-[#828282] opacity-50 text-white"
                }
              `}
              disabled={!isFormFilled}
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
                className={`bg-clip-text mx-1 text-transparent ${
                  isDarkMode
                    ? " text-white hover:text-gray-300 underline"
                    : "bg-gradient-to-r from-[#036068] via-[#1199A8] to-[#036068]"
                } text-[14px] font-medium hover:underline`}
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
