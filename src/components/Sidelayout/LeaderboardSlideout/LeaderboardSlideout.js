import { X } from "lucide-react";
import { motion } from "framer-motion";
import women from "../../../assets/leaderBoard/women.svg";
import men from "../../../assets/leaderBoard/men.svg";
import men1 from "../../../assets/leaderBoard/men1.svg";
import user1 from "../../../assets/leaderBoard/user1.svg";
import user2 from "../../../assets/leaderBoard/user2.svg";
import { useState, useEffect, useRef } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useTheme } from "../../Layout/ThemeContext/ThemeContext"; // Import the theme context

const users = [
  { id: 1, name: "User-1", points: 43, avatar: men },
  { id: 2, name: "User-2", points: 40, avatar: women },
  { id: 3, name: "User-3", points: 38, avatar: men1 },
  { id: 4, name: "User-4", points: 36, avatar: user1 },
  { id: 5, name: "User-5", points: 35, avatar: user2 },
  { id: 6, name: "User-6", points: 34, avatar: user2 },
  { id: 7, name: "User-7", points: 33, avatar: user2 },
  { id: 8, name: "User-8", points: 32, avatar: user1 },
  { id: 9, name: "User-9", points: 31, avatar: user1 },
  { id: 10, name: "User-10", points: 30, avatar: user2 },
];

export default function LeaderboardSlideout({ setIsPopoverOpen, setIsLeaderboard }) {
  const [isOpen, setIsOpen] = useState(true); // Use this for toggling visibility
  const containerRef = useRef(null);
  const { isDarkMode } = useTheme(); // Access isDarkMode from ThemeContext

  // Handle clicks outside the container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsLeaderboard(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsLeaderboard]);

  return (
    <motion.div
      ref={containerRef}  // Attach the ref to the container
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: isOpen ? 0 : "100%", opacity: 1 }} // Animation based on isOpen state
      exit={{ x: "100%", opacity: 0 }}
      transition={{ ease: "easeInOut" }}
      className={`px-8 py-4 fixed sm:top-16 top-12 sm:right-10 right-1 sm:h-[90vh] h-[90vh] sm:w-[27rem] w-[20rem] ${
        isDarkMode
          ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none"
          : "bg-white bg-opacity-70 backdrop-blur-lg border-white"
      } rounded-3xl fontFamily-poppins-0`}    >
      <div className="flex relative justify-between items-center">
      <h1
          className={`font-semibold ${
            isDarkMode ? "text-white" : "text-[#505050]"
          } font-poppins text-[16.37px]`}
        >          Leaderboard</h1>
        <button
          onClick={() => {
            setIsPopoverOpen(true);
            setIsLeaderboard(false);
          }}
        >
 <X className={`${
            isDarkMode ? "text-white" : "text-[#505050]"
          }`} />
                  </button>
      </div>

      <div className="flex justify-between items-end relative mt-10">
        {users.slice(0, 3).map((user, index) => (
          <div
            key={user.id}
            className={`flex flex-col items-center ${
              index === 0 ? "absolute left-1/2 -translate-x-1/2 -top-8" : ""
            }`}
          >
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-18 object-cover rounded-full"
              />
            </div>
            <h1
              className={`font-semibold font-plus-jakarta mt-4 ${
                isDarkMode ? "text-white" : "text-[#505050]"
              }`}
            >              {user.name}</h1>
            <p className={`text-xs font-plus-jakarta ${isDarkMode ? "text-gray-300" : "text-[#898989]"}`}>
            {user.points} Points
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4 mt-10 overflow-y-auto sm:h-[60%] h-[49%]">
        {users.slice(3).map((user, index) => (
          <div
            key={user.id}
            className={`rounded-xl py-2 px-4 flex items-center justify-between gap-4 ${
              isDarkMode ? "bg-[#505050]" : "bg-white"
            }`}
          >
            <div className="w-[20%] flex items-center">
              <span
                 className={`w-4  font-semibold font-plus-jakarta mr-2 ${
              isDarkMode ? "text-white" : "text-[#4F4F4F]"
            }`} >
                {index + 4}
              </span>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            </div>

            <div className="w-[80%] flex justify-between items-center">
              <span 
                 className={`text-sm font-semibold text-[#4F4F4F] font-plus-jakarta ${
              isDarkMode ? "text-white" : "text-[#4F4F4F]"
            }`} >
                {user.name}
              </span>
              <span 
              className={`text-sm text-[#4F4F4F] font-plus-jakarta ${
                isDarkMode ? "text-white" : "text-[#4F4F4F]"
              }`} 
              >
                {user.points} Points
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Toggle button */}
      <div className="absolute top-12 -left-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-8 h-32 focus:outline-none"
          aria-label={isOpen ? "Close side panel" : "Open side panel"}
        >
          <svg
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
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <FiChevronRight
              className={`transition-transform duration-300 ${isOpen ? "rotate-0" : "rotate-180"} ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            />
          </div>
        </button>
      </div>
    </motion.div>
  );
}
