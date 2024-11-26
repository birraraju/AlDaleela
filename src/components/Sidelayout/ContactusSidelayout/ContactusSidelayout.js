import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { FiChevronRight } from "react-icons/fi";
import loc from "../../../assets/Contact/location1.svg";
import fb from "../../../assets/Contact/fb.svg";
import twitter from "../../../assets/Contact/twitter.svg";
import x from "../../../assets/Contact/x.svg";
import linkedin from "../../../assets/Contact/linkedin.svg";
import insta from "../../../assets/Contact/instagram.svg";
import { useTheme } from "../../Layout/ThemeContext/ThemeContext"; // Import your theme context

export default function ContactUs({ setIsPopoverOpen, setIsContactUs }) {
  const containerRef = useRef(null);
  const { isDarkMode,isLangArab } = useTheme(); // Access dark mode from theme context
  const [isOpen, setIsOpen] = useState(true);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsPopoverOpen(false);
        setIsContactUs(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsPopoverOpen, setIsContactUs]);


  return (
    <div dir={isLangArab ? "rtl" : "ltr"}>

    <motion.div
  ref={containerRef}
  // initial={{ x: "100%", opacity: 0 }}
  // whileInView={{ 
  //   x: isOpen ? 0 : (isLangArab ? " -102%" : "102%"), // Move to left if Arabic
  //   opacity: 1 
  // }}
  // exit={{
  //   x:
  //     window.innerWidth >= 1024 // Large screens (1024px and above)
  //       ? (isLangArab ? "-90%" : "100%")
  //       : window.innerWidth >= 640 // Medium screens (640px to 1024px)
  //       ? (isLangArab ? "-116%" : "116%")
  //       : (isLangArab ? "-90%" : "100%"), // Small screens (below 640px)
  //   opacity: 0,
  // }}
  // transition={{ ease: "easeInOut" }}
    className={`p-4  sm:py-4  sm:h-[50vh]  laptop_s:h-[75vh] 2xl:h-[70vh]  transition-transform duration-300 ease-in-out  fixed top-20 ${isLangArab?"left-1  h-[73vh] sm:left-16 laptop_s:left-6":"right-1 sm:right-16 h-[75vh] laptop_s:right-6"}  backdrop-blur rounded-3xl text-[#000000] ${
      isDarkMode
        ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none"
        : "bg-white bg-opacity-70 backdrop-blur-lg border-white"
    } ${
      isOpen ? "translate-x-0" : ( isLangArab?"-translate-x-[104%] sm:-translate-x-[117%] laptop_s:-translate-x-[107%]":" translate-x-[103%] sm:translate-x-[117%] laptop_s:translate-x-[107%]")
    } `} // Adjust background color based on dark mode
  >
    <div className="flex relative justify-between items-center">
    <h1 className={`text-[16px]      font-600  ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#505050]"}`}>
        {isLangArab?"اتصل بنا":"Contact Us"}
      </h1>
      <div
        className={`p-2 cursor-pointer ${isDarkMode ? "text-white hover:text-gray-300" : "text-[#667085] hover:text-gray-900"} transition-colors`}
        onClick={() =>{
          setIsPopoverOpen(true);
          setIsContactUs(false)
        }
        }
      >
        <X />
      </div>
    </div>

      {/* Contact Details */}
    <div className="relative   sm:w-[21rem] laptop_s:w-[19rem] w-[20rem] sm:mt-1  mt-3 sm:overflow-hidden  ">
      <div className="space-y-4">
        <div>
          <h3 className="flex items-center mb-2 font-bold">
            <img src={loc} alt="Location" className="h-5 w-5 mr-0.5" />
            <span className={`text-[20px]   font-700  ${isDarkMode ? "text-[#FFFFFFCC]" : "bg-gradient-to-r from-[#036068] via-[#596451] to-[#036068] bg-clip-text text-transparent"}`}>

            {isLangArab ? "أبو ظبي" : "Abu Dhabi"}
            </span>
          </h3>
          <h4 className={`  font-500  mb-1 text-[14px] ${isDarkMode ? "text-white" : "text-[#667085]"}`}>
          {isLangArab ? "الموقع" : "Location"}
          </h4>
          <p className={`text-[12px] laptop_lg:text-[16px]   font-500  ${isDarkMode ? "text-[#FFFFFFCC]/80" : "text-[#000000]"}`}>
          {isLangArab ?
          "المقر الرئيسي مبنى المعمورة (أ) مبنى رقم (62) ، شارع المعمورة ، آل نهيان ، أبوظبي ، الإمارات العربية المتحدة، الرمز البريدي: 22221، ص.ب : 45553"
           : 
              "Headquarters Al Mamoura building (A), Building (G2) Al Mamoura St, Al Nahyan, Abu Dhabi, UAE, Postal Code: 22221, P.O Box: 45553"}          </p>
        </div>

        <div>
          <h4 className={`  font-500 mb-1 text-[14px] ${isDarkMode ? "text-white" : "text-[#667085]"}`}>
          {isLangArab ? "ساعات العمل" : "Opening Hours"}
          </h4>
          <p className={`text-[12px] laptop_lg:text-[16px]   font-500 ${isDarkMode ? "text-[#FFFFFFCC]/80" : "text-[#000000]"}`}>
          {isLangArab ? 
          "من الساعة 7:30 صباحًا – 3:30 ظهرًا | الاثنين  ل جمعة"
          : "7:30 AM to 3:30 PM | Monday-Friday"}
          </p>
        </div>

        <div>
          <h4 className={`   font-500 mb-1 text-[14px] ${isDarkMode ? "text-white" : "text-[#667085]"}`}>
          {isLangArab ? "الهاتف" : "Phone"}

          </h4>
          <a   href="tel:+97126934444"  target="_blank" rel="noopener noreferrer"   >
          <p className={`text-[12px] laptop_lg:text-[16px] cursor-pointer   font-500 ${isDarkMode ? "text-[#FFFFFFCC]/80" : "text-[#000000]"}`}>
          {isLangArab ? "+971 2 693 4444" : "+971 2 693 4444"}
          </p>
          </a>
        </div>

        <div>
          <h4 className={`  font-500 mb-1 text-[14px] ${isDarkMode ? "text-white/100" : "text-[#667085]"}`}>
          {isLangArab ? "البريد الإلكتروني" : "Email"}

          </h4>
          
          <a
  href="mailto:customerhappiness@ead.gov.ae" target="_blank" rel="noopener noreferrer"
  className={`text-[12px] laptop_lg:text-[16px] cursor-pointer outline-none   font-500 ${isDarkMode ? "text-[#FFFFFFCC]/80" : "text-[#000000]"} `}
>
<p className={`text-[12px] laptop_lg:text-[16px]    font-500 ${isDarkMode ? "text-[#FFFFFFCC]/80" : "text-[#000000]"}`}>
  customerhappiness@ead.gov.ae
  </p>
</a>
        </div>
        <div>
          <h4 className={`  font-500 mb-1 text-[14px] ${isDarkMode ? "text-white" : "text-[#667085]"}`}>
          {isLangArab ? "الموقع الإلكتروني" : "Website"}

          </h4>
          <a href="https://www.ead.gov.ae/" target="_blank" rel="noopener noreferrer" className=" cursor-pointer">
          <p className={`text-[12px] laptop_lg:text-[16px]    font-500 ${isDarkMode ? "text-[#FFFFFFCC]/80" : "text-[#000000]"}`}>
            https://www.ead.gov.ae/
          </p>
          </a>
        </div>
 
        <div  dir={isLangArab && "ltr"} className="flex justify-center space-x-4 pt-4 border-t border-gray-400">
          <a href="https://www.facebook.com/EnvironmentAbuDhabi/ "  target="_blank" rel="noopener noreferrer"><img src={fb} alt="Facebook" className="h-5 w-5" /></a>
          {/* <a href="https://x.com/EADTweets"  target="_blank" rel="noopener noreferrer"><img src={twitter} alt="Twitter" className="h-6 w-6" /></a> */}
          <a href="https://x.com/EADTweets"  target="_blank" rel="noopener noreferrer" ><img src={x} alt="X" className="h-5 w-5" /></a>
          <a href="https://www.linkedin.com/company/environment-agency-abu-dhabi/"  target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="LinkedIn" className="h-5 w-5" /></a>
          <a href="https://www.instagram.com/Environmentabudhabi/"  target="_blank" rel="noopener noreferrer"><img src={insta} alt="Instagram" className="h-5 w-5" /></a>
        </div>
      </div>
    </div>

    {/* Toggle button */}
    <div className={`absolute hidden sm:block top-12 ${isLangArab?"-right-7":"-left-6"}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-8 h-32 focus:outline-none"
        aria-label={isOpen ? "Close side panel" : "Open side panel"}
      >
        {isLangArab?<svg
      width="32"
      height="128"
      viewBox="0 0 64 371"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'relative',
        top: '1px',
        right: '3px',
      }}
    >
      <g
        clipPath="url(#clip0_4011_11301)"
        transform="scale(-1, 1) translate(-64, 0)" // Flipping horizontally
      >
        <path
          d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
          fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EBEFF2"}
          stroke={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EEF3F7"}
          strokeWidth="6"
        />
      </g>
      <defs>
        <clipPath id="clip0_4011_11301">
          <rect width="64" height="371" fill="white" />
        </clipPath>
      </defs>
    </svg>:<svg
          width="32"
          height="128"
          viewBox="0 0 64 371"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "relative", top: "1px", right: "3px" }}
        >
          <g clipPath="url(#clip0_4011_11301)">
            <path
              d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
              fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EBEFF2"}
              stroke={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EEF3F7"}
              strokeWidth="6"
            />
          </g>
          <defs>
            <clipPath id="clip0_4011_11301">
              <rect width="64" height="371" fill="white" />
            </clipPath>
          </defs>
        </svg>}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <FiChevronRight
            className={`transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"} ${
              isDarkMode ? "text-white" : "text-[#000000]"
            }`}
          />
        </div>
      </button>
    </div>
  </motion.div>
  </div>
  );
}

// const ContactDetail = ({ icon, title, subtitle, description }) => (

//   <div>
//     {icon && (
//       <h3 className="flex items-center mb-2 font-bold">
//         <img src={icon} alt={title} className="h-5 w-5 mr-2" />
//         <span className="  bg-custom-gradient bg-clip-text text-transparent text-lg">
//           {title}
//         </span>
//       </h3>
//     )}
//     {subtitle && (
//             <h4 className={`  font-500 mb-1 text-[14px] ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#667085]"}`}>
//         {subtitle}
//       </h4>
//     )}
//             <p className={`text-[16px]   font-500 ${isDarkMode ? "text-[#FFFFFFCC]" : "text-[#000000]"}`}>
//             {description}
//     </p>
//   </div>
// );

// const SocialIcon = ({ src, alt }) => (
//   <img src={src} alt={alt} className="h-6 w-6" />
// );
