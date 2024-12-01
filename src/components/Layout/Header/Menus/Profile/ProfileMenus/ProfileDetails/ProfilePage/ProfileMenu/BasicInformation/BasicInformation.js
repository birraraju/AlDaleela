import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../../../../../../../../../components/ui/button";
import { Input } from "../../../../../../../../../../components/ui/input";
import { useAuth } from "../../../../../../../../../../Providers/AuthProvider/AuthProvider";
import { useTheme } from "../../../../../../../../../Layout/ThemeContext/ThemeContext"; // Import your theme context
import { UserActivityLog } from "../../../../../../../../../Common/UserActivityLog";

export default function BasicInformation({
  isEditProfile,
  profileImage,
  setIsSuccess,
  setIsFailure,
  setIsMsgStatus,
  setModalMessage,
  setIsProfileData,
  setIsEditProfile,
  file,
}) {
  const { profiledetails } = useAuth();
  const { isDarkMode, isLangArab } = useTheme(); // Access dark mode from theme context
  const [userInfo1, setUserInfo1] = useState([]);
  const [finaluserInfo, setfinaluserInfo] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    organization: "",
    country: "",
    currentemail: profiledetails.email,
  });
  const [userInfo, setUserInfo] = useState({
    Name: "",
    Email: "",
    PhoneNumber: "",
    Organization: "",
    Country: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To control country dropdown
  const [selectedCountry, setSelectedCountry] = useState(
    profiledetails.country || "Select a country"
  );
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const basicInformation = [
      {
        heading: isLangArab ? "الاسم" : "Name",
        headingRead: "Name",
        value: profiledetails.username,
      },
      {
        heading: isLangArab ? "البريد الإلكتروني" : "Email id",
        headingRead: "Email",
        value: profiledetails.email,
      },
      {
        heading: isLangArab ? "رقم الهاتف" : "Phone Number",
        headingRead: "Phone Number",
        value: profiledetails.phoneNumber,
      },
      {
        heading: isLangArab ? "المنظمة" : "Organization",
        headingRead: "Organization",
        value: profiledetails.organization,
      },
      {
        heading: isLangArab ? "الدولة" : "Country",
        headingRead: "Country",
        value: profiledetails.country,
      },
    ];
    setUserInfo1(basicInformation);
  }, [profiledetails, isLangArab]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isFormValid = () => {
    return (
      (userInfo.Name || profiledetails.username) &&
      (userInfo.PhoneNumber || profiledetails.phoneNumber) &&
      (userInfo.Email || profiledetails.email) &&
      (userInfo.Organization || profiledetails.organization) &&
      (selectedCountry || profiledetails.country) &&
      !emailError &&
      !phoneError
    );
  };

  const handleUpdate = async () => {
    finaluserInfo.username = userInfo.Name || profiledetails.username;
    finaluserInfo.phoneNumber =
      userInfo.PhoneNumber || profiledetails.phoneNumber;
    finaluserInfo.email = userInfo.Email || profiledetails.email;
    finaluserInfo.organization =
      userInfo.Organization || profiledetails.organization;
    finaluserInfo.country = selectedCountry || profiledetails.country;
    finaluserInfo.profilepicture = file || "";

    // Prepare form data
    const formdata = new FormData();
    formdata.append("username", userInfo.Name || profiledetails.username);
    formdata.append("email", userInfo.Email || profiledetails.email);
    formdata.append(
      "phoneNumber",
      userInfo.PhoneNumber || profiledetails.phoneNumber
    );
    formdata.append(
      "organization",
      userInfo.Organization || profiledetails.organization
    );
    formdata.append("country", selectedCountry || profiledetails.country);
    formdata.append("currentemail", profiledetails.email);
    formdata.append("profilepicture", file);
    // Add an empty file if the user hasn't selected one
    // if (!file) {
    //   const emptyFile = new Blob([], { type: "application/octet-stream" });
    //   formdata.append("profilepicture", emptyFile, "empty.jpg");
    // } else {
    //   formdata.append("profilepicture", file);
    // }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/Registration/updateprofile`,
        {
          method: "POST",
          //headers: { 'Content-Type': 'application/json' },
          body: formdata,
        }
      );
      const data = await response.json();
      if (data.success) {
        profiledetails.username = finaluserInfo.username;
        profiledetails.phoneNumber = finaluserInfo.phoneNumber;
        profiledetails.email = finaluserInfo.email;
        profiledetails.organization = finaluserInfo.organization;
        profiledetails.country = finaluserInfo.country;
        if (profiledetails.imageUrl) {
          profiledetails.imageUrl = data.data.imageUrl;
        }
        localStorage.setItem(
          "AldaleelaUserDetails:",
          JSON.stringify(profiledetails)
        );
        UserActivityLog(profiledetails, "Profile Updated");

        setIsEditProfile(false);
        setIsMsgStatus("Success");
        setModalMessage(
          isLangArab ? "تم تحديث الملف الشخصي" : "Profile updated Successfully!"
        );
        setIsSuccess(true);
        setIsProfileData(false);
      } else {
        setIsFailure(true);
        setIsMsgStatus("Failure");
        setModalMessage(
          isLangArab
            ? "فشل تحديث بيانات الملف الشخصي"
            : "Failed to update Profile Data!"
        );
        setIsEditProfile(false);
        setIsProfileData(false);
      }
    } catch (error) {
      setIsFailure(true);
      setIsMsgStatus("Failure");
      setModalMessage(
        isLangArab
          ? "فشل تحديث بيانات الملف الشخصي"
          : "Failed to update Profile Data!"
      );
      setIsEditProfile(false);
      setIsProfileData(false);
      console.error("Error submitting form:", error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/; // Adjust the regex for specific requirements
    return phoneRegex.test(phoneNumber);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name.replace(" ", "")]: value });

    // Validate email and phone number
    if (name === "Email") {
      setEmailError(validateEmail(value) ? "" : "Invalid email format");
    } else if (name === "Phone Number") {
      setPhoneError(
        validatePhoneNumber(value) ? "" : "Phone number must be 10 digits"
      );
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", 
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", 
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", 
    "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", 
    "Chad", "Chile", "China", "Colombia", "Comoros", "Costa Rica", "Croatia", "Cuba", 
    "Cyprus", "Czech Republic", "Democratic Republic of the Congo", "Denmark", "Djibouti", 
    "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", 
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", 
    "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", 
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", 
    "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", 
    "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", 
    "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", 
    "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", 
    "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", 
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", 
    "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", 
    "Nicaragua", "Niger", "Nigeria", "North Macedonia (Macedonia)", "Norway", "Oman", 
    "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", 
    "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", 
    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", 
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
    "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", 
    "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", 
    "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", 
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
    "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", 
    "Zambia", "Zimbabwe"
  ];

  console.log("Countries length:", countries)
  

  return (
    <div className="sm:py-2 py-1 sm:mt-4 mt-1 h-full">
      <div
        className={`sm:p-2 p-1 rounded-lg h-auto ${
          isDarkMode
            ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none"
            : "bg-[#F9F9F9] bg-opacity-70 backdrop-blur-lg border-white"
        }`}
      >
        <h1
          className={`font-500    tracking-wider sm:text-[16px] text-sm ${
            isDarkMode ? "text-white" : "text-[#000000]"
          }`}
        >
          {isLangArab ? "المعلومات الأساسية" : "Basic Information"}
        </h1>

        <div className="h-[1px] w-full bg-[#0000001A] my-4"></div>

        <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-3 mb-4  px-4">
          {userInfo1.map((info, index) => (
            <div key={index}>
              <h1
                className={`tracking-wider   font-500 sm:text-[12px] text-xs ${
                  isDarkMode ? "text-white" : "text-[#00000099]"
                }`}
              >
                {info.heading}
              </h1>
              {isEditProfile ? (
                info.headingRead === "Country" ? (
                  <div className="relative">
                    <div
                      ref={dropdownRef}
                      className={`flex justify-between items-center p-1 sm:h-auto h-3/4 border border-transparent rounded cursor-pointer ${
                        isDarkMode ? " bg-black/20" : "bg-[#E7EFF0]"
                      }`}
                      onClick={toggleDropdown}
                    >
                      <span
                        className={`whitespace-nowrap overflow-hidden text-ellipsis   font-500  text-[14px] ${
                          isDarkMode ? "text-[#FFFFFFCC]" : "text-[#00000099]"
                        }`}
                      >
                        {selectedCountry}
                      </span>
                      <span className="ml-2">
                        {/* Down arrow SVG */}
                        {isDarkMode ? (
                          <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="white"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        ) : (<svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>

                        )}
                      </span>
                    </div>
                    {isDropdownOpen && (
                      <div
                      ref={dropdownRef}
                        className={`absolute -top-40 h-40 border border-transparent rounded-md ${
                          isDarkMode
                            ? "bg-black/90 text-[#FFFFFFCC] "
                            : "bg-white text-[#00000099] "
                        }w-full z-10 overflow-y-auto max-h-40`}
                      >
                        {countries.map((country, i) => (
                          <div
                            key={i}
                            className={`p-2 ${
                              isDarkMode
                                ? " hover:bg-white/70 "
                                : "hover:bg-gray-100"
                            } text-[14px] w-full   font-500 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer`}
                            onClick={() => handleCountrySelect(country)}
                          >
                            {country}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Input
                      type="text"
                      onChange={handleInputChange}
                      defaultValue={info.value}
                      name={info.headingRead}
                      className={`w-full sm:h-auto my-0.5  bg-[#E7EFF0]   font-500  h-3/4 ${
                        isDarkMode
                          ? "text-[#FFFFFFCC] bg-black/20 "
                          : "bg-[#E7EFF0] text-[#000000]"
                      }`}
                    />
                    {info.headingRead === "Email" && emailError && (
                      <p className="text-red-500 text-xs">{emailError}</p>
                    )}
                    {info.headingRead === "Phone Number" && phoneError && (
                      <p className="text-red-500 text-xs">{phoneError}</p>
                    )}
                  </>
                )
              ) : (
                <p
                  className={`font-500   tracking-wide sm:text-[11px] text-[11px] ${
                    isDarkMode ? "text-[#FFFFFFCC]" : "text-[#000000]"
                  }`}
                >
                  {info.value}
                </p>
              )}
            </div>
          ))}

          {isEditProfile && (
            <Button asChild disabled={!isFormValid()}>
              <div
                onClick={isFormValid() ? handleUpdate : undefined}
                className={`h-[40px] w-[122px]   cursor-pointer btn-gradient   font-500 text-[#FFFFFF] text-[14px] sm:rounded-xl rounded-md mt-4 tracking-wide ${
                  isFormValid() ? "" : "opacity-50 cursor-not-allowed"
                }`}
              >
                {isLangArab ? "تحديث" : "Update"}
              </div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
