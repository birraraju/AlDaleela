import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import Logo from "../../../../assets/GreenLogo.svg";
import Darklogo from "../../../../assets/Whitelogo.svg";

import Input from "../Input/Input";
import CountryDropdown from "../../../../../src/assets/CountryDropdown.svg";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { useTheme } from "../../../Layout/ThemeContext/ThemeContext"; // Import the theme context
import createEmailBody from "../../../../components/email/emailTemplate";

export default function Signup({ onClose, onSigninClick,setIsSuccess,
  setIsMsgStatus,
  setModalMessage }) {
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
    { country: "Afghanistan" }, { country: "Albania" }, { country: "Algeria" },
    { country: "Andorra" }, { country: "Angola" }, { country: "Antigua and Barbuda" },
    { country: "Argentina" }, { country: "Armenia" }, { country: "Australia" },
    { country: "Austria" }, { country: "Azerbaijan" }, { country: "Bahamas" },
    { country: "Bahrain" }, { country: "Bangladesh" }, { country: "Barbados" },
    { country: "Belarus" }, { country: "Belgium" }, { country: "Belize" },
    { country: "Benin" }, { country: "Bhutan" }, { country: "Bolivia" },
    { country: "Bosnia and Herzegovina" }, { country: "Botswana" }, { country: "Brazil" },
    { country: "Brunei" }, { country: "Bulgaria" }, { country: "Burkina Faso" },
    { country: "Burundi" }, { country: "Cabo Verde" }, { country: "Cambodia" },
    { country: "Cameroon" }, { country: "Canada" }, { country: "Central African Republic" },
    { country: "Chad" }, { country: "Chile" }, { country: "China" }, { country: "Colombia" },
    { country: "Comoros" }, { country: "Costa Rica" }, { country: "Croatia" },
    { country: "Cuba" }, { country: "Cyprus" }, { country: "Czech Republic" },
    { country: "Democratic Republic of the Congo" }, { country: "Denmark" }, 
    { country: "Djibouti" }, { country: "Dominica" }, { country: "Dominican Republic" },
    { country: "Ecuador" }, { country: "Egypt" }, { country: "El Salvador" },
    { country: "Equatorial Guinea" }, { country: "Eritrea" }, { country: "Estonia" },
    { country: "Eswatini" }, { country: "Ethiopia" }, { country: "Fiji" },
    { country: "Finland" }, { country: "France" }, { country: "Gabon" },
    { country: "Gambia" }, { country: "Georgia" }, { country: "Germany" },
    { country: "Ghana" }, { country: "Greece" }, { country: "Grenada" },
    { country: "Guatemala" }, { country: "Guinea" }, { country: "Guinea-Bissau" },
    { country: "Guyana" }, { country: "Haiti" }, { country: "Honduras" },
    { country: "Hungary" }, { country: "Iceland" }, { country: "India" },
    { country: "Indonesia" }, { country: "Iran" }, { country: "Iraq" },
    { country: "Ireland" }, { country: "Israel" }, { country: "Italy" },
    { country: "Ivory Coast" }, { country: "Jamaica" }, { country: "Japan" },
    { country: "Jordan" }, { country: "Kazakhstan" }, { country: "Kenya" },
    { country: "Kiribati" }, { country: "Korea, North" }, { country: "Korea, South" },
    { country: "Kuwait" }, { country: "Kyrgyzstan" }, { country: "Laos" },
    { country: "Latvia" }, { country: "Lebanon" }, { country: "Lesotho" },
    { country: "Liberia" }, { country: "Libya" }, { country: "Liechtenstein" },
    { country: "Lithuania" }, { country: "Luxembourg" }, { country: "Madagascar" },
    { country: "Malawi" }, { country: "Malaysia" }, { country: "Maldives" },
    { country: "Mali" }, { country: "Malta" }, { country: "Marshall Islands" },
    { country: "Mauritania" }, { country: "Mauritius" }, { country: "Mexico" },
    { country: "Micronesia" }, { country: "Moldova" }, { country: "Monaco" },
    { country: "Mongolia" }, { country: "Montenegro" }, { country: "Morocco" },
    { country: "Mozambique" }, { country: "Myanmar (Burma)" }, { country: "Namibia" },
    { country: "Nauru" }, { country: "Nepal" }, { country: "Netherlands" },
    { country: "New Zealand" }, { country: "Nicaragua" }, { country: "Niger" },
    { country: "Nigeria" }, { country: "North Macedonia (Macedonia)" }, 
    { country: "Norway" }, { country: "Oman" }, { country: "Pakistan" },
    { country: "Palau" }, { country: "Panama" }, { country: "Papua New Guinea" },
    { country: "Paraguay" }, { country: "Peru" }, { country: "Philippines" },
    { country: "Poland" }, { country: "Portugal" }, { country: "Qatar" },
    { country: "Romania" }, { country: "Russia" }, { country: "Rwanda" },
    { country: "Saint Kitts and Nevis" }, { country: "Saint Lucia" },
    { country: "Saint Vincent and the Grenadines" }, { country: "Samoa" },
    { country: "San Marino" }, { country: "Sao Tome and Principe" },
    { country: "Saudi Arabia" }, { country: "Senegal" }, { country: "Serbia" },
    { country: "Seychelles" }, { country: "Sierra Leone" }, { country: "Singapore" },
    { country: "Slovakia" }, { country: "Slovenia" }, { country: "Solomon Islands" },
    { country: "Somalia" }, { country: "South Africa" }, { country: "South Sudan" },
    { country: "Spain" }, { country: "Sri Lanka" }, { country: "Sudan" },
    { country: "Suriname" }, { country: "Sweden" }, { country: "Switzerland" },
    { country: "Syria" }, { country: "Taiwan" }, { country: "Tajikistan" },
    { country: "Tanzania" }, { country: "Thailand" }, { country: "Timor-Leste" },
    { country: "Togo" }, { country: "Tonga" }, { country: "Trinidad and Tobago" },
    { country: "Tunisia" }, { country: "Turkey" }, { country: "Turkmenistan" },
    { country: "Tuvalu" }, { country: "Uganda" }, { country: "Ukraine" },
    { country: "United Arab Emirates" }, { country: "United Kingdom" },
    { country: "United States" }, { country: "Uruguay" }, { country: "Uzbekistan" },
    { country: "Vanuatu" }, { country: "Vatican City" }, { country: "Venezuela" },
    { country: "Vietnam" }, { country: "Yemen" }, { country: "Zambia" },
    { country: "Zimbabwe" }
  ];

  const countriesCode = [
    { code: "+1", limit: 10 },
    { code: "+20", limit: 10 },
    { code: "+211", limit: 9 },
    { code: "+212", limit: 9 },
    { code: "+213", limit: 9 },
    { code: "+216", limit: 8 },
    { code: "+218", limit: 9 },
    { code: "+220", limit: 7 },
    { code: "+221", limit: 9 },
    { code: "+222", limit: 8 },
    { code: "+223", limit: 8 },
    { code: "+224", limit: 9 },
    { code: "+225", limit: 8 },
    { code: "+226", limit: 8 },
    { code: "+227", limit: 8 },
    { code: "+228", limit: 8 },
    { code: "+229", limit: 8 },
    { code: "+230", limit: 8 },
    { code: "+231", limit: "7-8" },
    { code: "+232", limit: "8-10" },
    { code: "+233", limit: 9 },
    { code: "+234", limit: "8-10" },
    { code: "+235", limit: 8 },
    { code: "+236", limit: 8 },
    { code: "+237", limit: 9 },
    { code: "+238", limit: 7 },
    { code: "+239", limit: 7 },
    { code: "+240", limit: 9 },
    { code: "+241", limit: 7 },
    { code: "+243", limit: 9 },
    { code: "+244", limit: 9 },
    { code: "+245", limit: 7 },
    { code: "+248", limit: 7 },
    { code: "+249", limit: 9 },
    { code: "+250", limit: 9 },
    { code: "+251", limit: 9 },
    { code: "+252", limit: "7-10" },
    { code: "+253", limit: 6 },
    { code: "+254", limit: 9 },
    { code: "+255", limit: 9 },
    { code: "+256", limit: 9 },
    { code: "+257", limit: 8 },
    { code: "+258", limit: 9 },
    { code: "+260", limit: 9 },
    { code: "+261", limit: 9 },
    { code: "+263", limit: 9 },
    { code: "+264", limit: 9 },
    { code: "+265", limit: 9 },
    { code: "+266", limit: 8 },
    { code: "+267", limit: 7 },
    { code: "+268", limit: 8 },
    { code: "+269", limit: 7 },
    { code: "+27", limit: 9 },
    { code: "+291", limit: 7 },
    { code: "+30", limit: 10 },
    { code: "+31", limit: 9 },
    { code: "+32", limit: 9 },
    { code: "+33", limit: 9 },
    { code: "+34", limit: 9 },
    { code: "+351", limit: 9 },
    { code: "+352", limit: 9 },
    { code: "+353", limit: 9 },
    { code: "+354", limit: 7 },
    { code: "+355", limit: 9 },
    { code: "+356", limit: 8 },
    { code: "+357", limit: 8 },
    { code: "+358", limit: 10 },
    { code: "+359", limit: 9 },
    { code: "+36", limit: 9 },
    { code: "+370", limit: 8 },
    { code: "+371", limit: 8 },
    { code: "+372", limit: 8 },
    { code: "+373", limit: 8 },
    { code: "+374", limit: 8 },
    { code: "+375", limit: 9 },
    { code: "+376", limit: 6 },
    { code: "+377", limit: 8 },
    { code: "+378", limit: 6 },
    { code: "+380", limit: 9 },
    { code: "+381", limit: 8 },
    { code: "+382", limit: 8 },
    { code: "+385", limit: 9 },
    { code: "+386", limit: 9 },
    { code: "+387", limit: 8 },
    { code: "+389", limit: 8 },
    { code: "+39", limit: "9-10" },
    { code: "+39", limit: 6 },
    { code: "+40", limit: 10 },
    { code: "+41", limit: 9 },
    { code: "+420", limit: 9 },
    { code: "+421", limit: 9 },
    { code: "+423", limit: 7 },
    { code: "+43", limit: 10 },
    { code: "+44", limit: 10 },
    { code: "+45", limit: 8 },
    { code: "+46", limit: 9 },
    { code: "+47", limit: 8 },
    { code: "+48", limit: 9 },
    { code: "+49", limit: "10-11" },
    { code: "+501", limit: 7 },
    { code: "+502", limit: 8 },
    { code: "+503", limit: 8 },
    { code: "+504", limit: 8 },
    { code: "+505", limit: 8 },
    { code: "+506", limit: 8 },
    { code: "+507", limit: 8 },
    { code: "+509", limit: 8 },
    { code: "+51", limit: 9 },
    { code: "+52", limit: 10 },
    { code: "+53", limit: 8 },
    { code: "+54", limit: 10 },
    { code: "+55", limit: "10-11" },
    { code: "+56", limit: 9 },
    { code: "+57", limit: 10 },
    { code: "+58", limit: 10 },
    { code: "+591", limit: 8 },
    { code: "+592", limit: 7 },
    { code: "+593", limit: 9 },
    { code: "+595", limit: 9 },
    { code: "+597", limit: "6-7" },
    { code: "+598", limit: 9 },
    { code: "+60", limit: "9-10" },
    { code: "+61", limit: 9 },
    { code: "+62", limit: "10-12" },
    { code: "+63", limit: 10 },
    { code: "+64", limit: "8-10" },
    { code: "+65", limit: 8 },
    { code: "+66", limit: 9 },
    { code: "+670", limit: 8 },
    { code: "+673", limit: 7 },
    { code: "+674", limit: 7 },
    { code: "+675", limit: 8 },
    { code: "+676", limit: 5 },
    { code: "+677", limit: 7 },
    { code: "+678", limit: 7 },
    { code: "+679", limit: 7 },
    { code: "+680", limit: 7 },
    { code: "+685", limit: "5-7" },
    { code: "+686", limit: 8 },
    { code: "+688", limit: 5 },
    { code: "+691", limit: 7 },
    { code: "+692", limit: 7 },
    { code: "+7", limit: 10 },
    { code: "+81", limit: 10 },
    { code: "+82", limit: "9-10" },
    { code: "+84", limit: "9-10" },
    { code: "+850", limit: "6-10" },
    { code: "+855", limit: 9 },
    { code: "+856", limit: 9 },
    { code: "+86", limit: 11 },
    { code: "+880", limit: 10 },
    { code: "+886", limit: 9 },
    { code: "+90", limit: 10 },
    { code: "+91", limit: 10 },
    { code: "+92", limit: 10 },
    { code: "+93", limit: 9 },
    { code: "+94", limit: 10 },
    { code: "+95", limit: 9 },
    { code: "+960", limit: 7 },
    { code: "+961", limit: 8 },
    { code: "+962", limit: 9 },
    { code: "+963", limit: 9 },
    { code: "+964", limit: 9 },
    { code: "+965", limit: 8 },
    { code: "+966", limit: 9 },
    { code: "+967", limit: 9 },
    { code: "+968", limit: 8 },
    { code: "+970", limit: 9 },
    { code: "+971", limit: 9 },
    { code: "+972", limit: 9 },
    { code: "+973", limit: 8 },
    { code: "+974", limit: 8 },
    { code: "+975", limit: 8 },
    { code: "+976", limit: 8 },
    { code: "+977", limit: 10 },
    { code: "+98", limit: 10 },
    { code: "+992", limit: 9 },
    { code: "+993", limit: 9 },
    { code: "+994", limit: 9 },
    { code: "+995", limit: 9 },
    { code: "+996", limit: 9 },
    { code: "+998", limit: 9 }
  ];
  
  

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  // const [formIsValid, setFormIsValid] = useState(false);
  const [isFormFilled, setFormFilled] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [filterCode, setFilterCode] = useState("");
  const modalRef = useRef(null);
  const CodeRef = useRef(null);
  const CountryRef = useRef(null);

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
    const handleClickOutside = (event) => {
      if (CodeRef.current && !CodeRef.current.contains(event.target) && !isCodeOpen) {
        setCodeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (CountryRef.current && !CountryRef.current.contains(event.target) && !isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleFilterCodeChange=(e)=>{
    setFilterCode(e.target.value)
  }

  // Filter the countries based on the input text
  const filteredCountries = countries.filter((country) =>
    country.country.toLowerCase().includes(filterText.toLowerCase())
  );

  const filterCountryCodes = countriesCode.filter((code)=> code.code.toLowerCase().includes(filterCode.toLowerCase()))

  const handleSelect = ({ name, value }) => {
    setSelectedValue(value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFilterText(""); 
    setIsOpen(false);
  };


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

    const validPhoneCount = selectedCountry?.limit; // Get the limit (number of limit)

// Function to handle range or fixed number limit
const validatePhoneNumber = (phoneNumber, limit) => {
  if (typeof limit === 'string' && limit.includes('-')) {
    // It's a range (e.g., "6-10")
    const [min, max] = limit.split('-').map(Number);
    const phoneLength = phoneNumber.length;
    return phoneLength >= min && phoneLength <= max;
  } else if (typeof limit === 'number') {
    // It's a fixed number (e.g., 9)
    return phoneNumber.length === limit;
  } else {
    // Invalid limit format
    return false;
  }
}

// Phone Number Validation
// if (
//   !validPhoneCount ||
//   !validatePhoneNumber(phoneNumber, validPhoneCount)
// ){
//   valid = false;
//   errors.phoneNumber = `Please enter a phone number with ${validPhoneCount} digits`;
// }

if (!validPhoneCount) {
  valid = false;
  errors.phoneNumber = "Please enter a valid country code.";
} else if (!validatePhoneNumber(phoneNumber, validPhoneCount)) {
  valid = false;
  errors.phoneNumber = `Please enter a phone number with ${validPhoneCount} digits.`;
}



    // Phone Number Validation
    // if (
    //   !validPhoneCount ||
    //   !new RegExp(`^\\d{${validPhoneCount}}$`).test(phoneNumber)
    // ) {
    //   valid = false;
    //   errors.phoneNumber = `Please enter a ${validPhoneCount}-digit number`;
    // }

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
        //sendEmail(data.data);
        setIsMsgStatus("Success");
        localStorage.getItem("token",data.data.token);
        setModalMessage(isLangArab
          ? "تم إرسال بريد إلكتروني بنجاح إلى بريدك الإلكتروني المسجل. يرجى التحقق من صندوق الوارد للتحقق."
          : "An email has been successfully sent to your registered email. Please check your inbox to verify.");
        setIsSuccess(true);
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
        setIsMsgStatus("Success");
        setModalMessage(isLangArab
          ? "تم إرسال بريد إلكتروني بنجاح إلى بريدك الإلكتروني المسجل. يرجى التحقق من صندوق الوارد للتحقق."
          : "An email has been successfully sent to your registered email. Please check your inbox to verify.");
        setIsSuccess(true);
        // alert(
        //   isLangArab
        //     ? "تم إرسال البريد الإلكتروني بنجاح:"
        //     : "Email sent successfully!"
        // );
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
          className={`absolute top-4 ${ isLangArab?" left-4":"right-4"} ${
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
                <span  className=" cursor-pointer">                  
                 {!isCodeOpen? <p
                      onClick={toggleCodeDropdown}
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
                    </p> : 
                    <input type="text" value={filterCode}
          onChange={handleFilterCodeChange} className={`h-[48px] min-w-14 max-w-16 flex items-center  px-3 py-1.5 rounded-[10px] text-sm appearance-none border transition-colors ${
                        isDarkMode
                          ? "bg-[#FFFFFF]  text-black border-transparent "
                          : "bg-white text-black border-transparent"
                      }`} /> 
                      }
                  {isCodeOpen && (
                      <ul
                      ref={CodeRef}
                        className={`absolute mt-0.5 grid justify-start   max-w-24 px-2 py-1 max-h-[80px] overflow-y-auto rounded-md shadow-lg z-10 ${
                          isDarkMode
                            ? "bg-[#FFFFFF]  text-black"
                            : "bg-white text-black"
                        }`}
                      >
                        {filterCountryCodes.map((country, index) => (
                          <li
                            key={index}
                            name="country"
                            onClick={() => {
                              setSelectedCountry(country); setCodeOpen(!isCodeOpen)

                            }}
                            className={` px-2 py-0.5 w-full text-[12px] font-500 cursor-pointer  ${
                              isDarkMode ? "bg-[#FFFFFF]  text-black" : "hover:bg-gray-200"
                            }`}
                          >
                            {country.code}
                          </li>
                        ))}
                      </ul>
                    )}
                  </span>
                  <Input
                    type="text"
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
                      ref={CountryRef}
                        className={`absolute mt-0.5 w-full max-h-[80px] min-h-[40px] overflow-y-auto rounded-md shadow-lg z-10 ${
                          isDarkMode
                            ? "bg-[#FFFFFF]  text-black"
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
                              isDarkMode ? "bg-[#FFFFFF]  text-black" : "hover:bg-gray-200"
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
