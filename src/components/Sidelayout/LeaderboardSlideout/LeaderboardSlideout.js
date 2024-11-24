import { X } from "lucide-react";
import { motion } from "framer-motion";
import women from "../../../assets/leaderBoard/women.svg";
import men from "../../../assets/leaderBoard/men.svg";
import Top1 from "../../../assets/leaderBoard/Top1.svg";
import Top2 from "../../../assets/leaderBoard/Top2.svg";
import Top3 from "../../../assets/leaderBoard/Top3.svg";
import men1 from "../../../assets/leaderBoard/men1.svg";
import user1 from "../../../assets/leaderBoard/user1.svg";
import user2 from "../../../assets/leaderBoard/user2.svg";
import { useState, useEffect, useRef } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useTheme } from "../../Layout/ThemeContext/ThemeContext"; // Import the theme context

// const Men = () => {
//   return (
    
//   );
// };




// const users = [
//   { id: 1, name: "User-1", points: 43, avatar: men },
//   { id: 2, name: "User-2", points: 40, avatar: women },
//   { id: 3, name: "User-3", points: 38, avatar: men1 },
//   { id: 4, name: "User-4", points: 36, avatar: user1 },
//   { id: 5, name: "User-5", points: 35, avatar: user2 },
//   { id: 6, name: "User-6", points: 34, avatar: user2 },
//   { id: 7, name: "User-7", points: 33, avatar: user2 },
//   { id: 8, name: "User-8", points: 32, avatar: user1 },
//   { id: 9, name: "User-9", points: 31, avatar: user1 },
//   { id: 10, name: "User-10", points: 30, avatar: user2 },
// ];

export default function LeaderboardSlideout({ setIsPopoverOpen, setIsLeaderboard }) {
  const [isOpen, setIsOpen] = useState(true); // Use this for toggling visibility
  const containerRef = useRef(null);
  const { isDarkMode,isLangArab } = useTheme(); // Access isDarkMode from ThemeContext
  const [data, setData] = useState([]);
  // console.log("Leader Board Data:", data)
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/FeatureServiceData/top-users`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();        
        if (result.success) {
          setData(result.data);
        } else {
          console.log(result.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [data]); 

  return (
    <div dir={isLangArab ? "rtl" : "ltr"}>

    <motion.div
    ref={containerRef}
    // initial={{ x: "100%", opacity: 0 }}
    // whileInView={{ 
    //   x: isOpen ? 0 : isLangArab ? "-103%" : "103%", // Move to left if Arabic
    //   opacity: 1 
    // }}
    // exit={{ 
    //   x: isLangArab ? "-90%" : "100%", // Exit to left for Arabic, right for others
    //   opacity: 0 
    // }}
    // transition={{ ease: "easeInOut" }}
      className={`px-4 py-4 fixed sm:top-20 top-12 ${isLangArab?"sm:left-10 laptop_s:left-6 left-4":"sm:right-10 laptop_s:right-6 right-4"} sm:h-[45vh] laptop_s:h-[80vh] h-[85vh] sm:w-[20rem] laptop_s:w-[20rem] w-[21rem] ${
        isDarkMode
          ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none"
          : "bg-white bg-opacity-70 backdrop-blur-lg border-white"
      } rounded-3xl font-omnes transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : ( isLangArab?"-translate-x-[104%] sm:-translate-x-[112%] laptop_s:-translate-x-[108%]":" translate-x-[103%] sm:translate-x-[112%] laptop_s:translate-x-[108%]")
      }`}    >
      <div className="flex relative justify-between items-center">
      <h1
          className={`font-600 ${
            isDarkMode ? "text-white" : "text-[#505050]"
          } font-poppins text-[16px]`}
        >          {isLangArab?"لوحة المتصدرين":"Leaderboard"}</h1>
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
        {data.slice(0, 3).map((user, index) => (
          <div
            key={user.rank}
            className={`flex flex-col items-center ${
              index === 0 ? "absolute left-1/2 -translate-x-1/2 -top-8" : ""
            }`}
          >
            <div className="relative flex flex-col justify-center items-center">
          { user.profilePicture ? <svg
      width="80"
      height="80"
      viewBox="0 0 105 105"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <circle
        cx="52.707"
        cy="52.6445"
        r="50.4465"
        fill={`url(#pattern0_502_105402${user.rank})`}
        stroke="#1498A6"
        strokeWidth="3.47907"
      />
      <defs>
        <pattern
          id={`pattern0_502_105402${user.rank}`}
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref={`#image0_502_105402${user.rank}`} transform="scale(0.00195312)" />
        </pattern>
        <image
          id={`image0_502_105402${user.rank}`}
           className=" h-30 w-70 "
          href={user.profilePicture || men} // Replace with the actual image URL or path
        />
      </defs>
    </svg>: <img src={men} alt={user.userName}  className=" h-24 w-20 " />}
               <img
                src={ index === 0 ? Top1 : (index === 1 ? Top2 : (index === 2 && Top3))}
                alt={user.userName}
                className=" w-8 -bottom-3  object-cover absolute rounded-full"
              />
            </div>
            <h1
              className={`font-700 text-[14px] font-plus-jakarta line-clamp-3 mt-2 ${
                isDarkMode ? "text-white" : "text-[#000000]"
              }`}
            >              {user.userName}</h1>
            <p className={`text-xs font-plus-jakarta ${isDarkMode ? "text-gray-300" : "text-[#898989]"}`}>
            {user.entryCount} {isLangArab?"نقاط":"Points"}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4 mt-10 sm:mt-7 laptop_s:mt-10 overflow-y-auto sm:h-[48%] laptop_s:h-[55%] h-[55%]">
        {data.slice(3).map((user, index) => (
          <div
            key={user.rank}
            className={`rounded-xl py-3  px-4 flex items-center justify-between gap-4 ${
              isDarkMode ? "bg-[#505050]" : "bg-white"
            }`}
          >
            <div className="w-[20%] flex items-center">
              <span
                 className={`w-4  font-semibold text-[12px] font-plus-jakarta  ${isLangArab ? "ml-3": "mr-2"} ${
              isDarkMode ? "text-white" : "text-[#4F4F4F]"
            }`} >
                {index + 4}
              </span>
              {user.profilePicture ? <svg
      width="20"
      height="20"
      viewBox="0 0 105 105"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <circle
        cx="52.707"
        cy="52.6445"
        r="50.4465"
        fill={`url(#pattern0_502_105402${user.rank})`}
        stroke="#1498A6"
        strokeWidth="3.47907"
      />
      <defs>
        <pattern
          id={`pattern0_502_105402${user.rank}`}
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref={`#image0_502_105402${user.rank}`} transform="scale(0.00195312)" />
        </pattern>
        <image
          id={`image0_502_105402${user.rank}`}
          width="512"
          height="512"
          href={user.profilePicture} // Replace with the actual image URL or path
        />
      </defs>
    </svg>
    :
    <img src={men} alt={user.userName} className=" h-7 w-8" />
    }
            </div>

            <div className="w-[80%] flex justify-between items-center">
              <span 
                 className={` font-semibold text-[12px] text-[#4F4F4F] font-plus-jakarta ${
              isDarkMode ? "text-white" : "text-[#4F4F4F]"
            }`} >
                {user.userName}
              </span>
              <span 
              className={` text-[#4F4F4F] text-[12px] font-plus-jakarta ${
                isDarkMode ? "text-white" : "text-[#4F4F4F]"
              }`} 
              >
                {user.entryCount} {isLangArab?"نقاط":"Points"}
              </span>
            </div>
          </div>
        ))}
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
                isDarkMode ? "text-white" : "text-black"
              }`}
            />
          </div>
        </button>
      </div>
    </motion.div>
    </div>
  );
}
