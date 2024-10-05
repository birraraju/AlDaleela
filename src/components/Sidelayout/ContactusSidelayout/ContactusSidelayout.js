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

export default function ContactUs({ setIsPopoverOpen, setIsContactUs }) {
  const [isShrink, setIsShrink] = useState(false);
  const containerRef = useRef(null);

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

  const toggleShrink = () => setIsShrink((prev) => !prev);

  return (
    <motion.div
      ref={containerRef}
      initial={{ x: "100%", opacity: 0 }}
      whileInView={{ x: isShrink ? "110%" : 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ ease: "easeInOut" }}
      className="px-8 py-4 fixed top-16 right-10 bg-white bg-opacity-75 backdrop-blur rounded-3xl text-black"
    >
      <div className="flex relative justify-between items-center mb-6">
        <h1 className="font-semibold text-[#505050] text-lg">Contact us</h1>
        <div
          className="cursor-pointer"
          onClick={() => {
            setIsPopoverOpen(false);
            setIsContactUs(false);
          }}
        >
          <X />
        </div>
        <div onClick={toggleShrink} className="absolute top-6 -left-14">
          <svg width="32" height="128" viewBox="0 0 64 371" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
              <path
                d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
                fill="#EBEFF2"
                stroke="#EEF3F7"
                strokeWidth="6"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="64" height="371" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div onClick={toggleShrink} className="absolute top-[4.7rem] -left-12 text-xl">
          <FiChevronRight className={isShrink ? "rotate-180" : ""} />
        </div>
      </div>

      <div className="relative h-[45vh] w-[23rem] overflow-y-scroll">
        <div className="space-y-4">
          <ContactDetail 
            icon={loc} 
            title="Abu Dhabi" 
            subtitle="Location" 
            description="Headquarters Al Mamoura building (A), Building (G2) Al Mamoura St, Al Nahyan, Abu Dhabi, UAE, Postal Code: 22221, P.O Box: 45553" 
          />
          <ContactDetail 
            title="Opening Hours" 
            description="7:30 AM to 3:30 PM | Sunday-Thursday" 
          />
          <ContactDetail 
            title="Phone" 
            description="+971 2 693 4444" 
          />
          <ContactDetail 
            title="Email" 
            description="customerhappiness@ead.gov.ae" 
          />
          <div className="flex justify-center space-x-4 pt-4 border-t border-gray-400">
            <SocialIcon src={fb} alt="Facebook" />
            <SocialIcon src={twitter} alt="Twitter" />
            <SocialIcon src={x} alt="X" />
            <SocialIcon src={linkedin} alt="LinkedIn" />
            <SocialIcon src={insta} alt="Instagram" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const ContactDetail = ({ icon, title, subtitle, description }) => (
  <div>
    {icon && (
      <h3 className="flex items-center mb-2 font-bold">
        <img src={icon} alt={title} className="h-5 w-5 mr-2" />
        <span className="font-omnes bg-custom-gradient bg-clip-text text-transparent text-lg">
          {title}
        </span>
      </h3>
    )}
    {subtitle && (
      <h4 className="flex items-center text-[#667085] font-medium mb-1 text-[14px]">
        {subtitle}
      </h4>
    )}
    <p className="text-[16px] font-omnes text-black font-medium">
      {description}
    </p>
  </div>
);

const SocialIcon = ({ src, alt }) => (
  <img src={src} alt={alt} className="h-6 w-6" />
);
