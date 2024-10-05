import { X } from "lucide-react";
import { motion } from "framer-motion";
import women from "../../../assets/leaderBoard/women.svg";
import men from "../../../assets/leaderBoard/men.svg";
import men1 from "../../../assets/leaderBoard/men1.svg";
import user1 from "../../../assets/leaderBoard/user1.svg";
import user2 from "../../../assets/leaderBoard/user2.svg";
import { useState, useEffect, useRef } from "react";
import { FiChevronRight } from "react-icons/fi";

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
  const [isShrink, setIsShrink] = useState(false);
  const containerRef = useRef(null);

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
      whileInView={{ x: isShrink ? "110%" : 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ ease: "easeInOut" }}
      className="px-8 py-4 fixed top-16 right-10 h-[90vh] w-[27rem] bg-white bg-opacity-80 backdrop-blur rounded-3xl text-black fontFamily-poppins-0"
    >
      <div className="flex relative justify-between items-center">
        <h1 className="font-semibold text-[#505050] font-poppins text-[16.37px]">Leaderboard</h1>
        <button
          onClick={() => {
            setIsPopoverOpen(true);
            setIsLeaderboard(false);
          }}
        >
          <X />
        </button>

        {isShrink ? (
          <div onClick={() => setIsShrink(false)} className="absolute top-6 -left-14">
            <svg
              width="32"
              height="128"
              viewBox="0 0 64 371"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_4011_11301)">
                <path
                  d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
                  fill="#EBEFF2"
                  stroke="#EEF3F7"
                  strokeWidth="6"
                />
              </g>
              <defs>
                <clipPath id="clip0_4011_11301">
                  <rect width="64" height="371" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        ) : (
          <div onClick={() => setIsShrink(true)} className="absolute top-6 -left-14">
            <svg
              width="32"
              height="128"
              viewBox="0 0 64 371"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_4011_11301)">
                <path
                  d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
                  fill="#EBEFF2"
                  stroke="#EEF3F7"
                  strokeWidth="6"
                />
              </g>
              <defs>
                <clipPath id="clip0_4011_11301">
                  <rect width="64" height="371" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        )}

        {isShrink ? (
          <div onClick={() => setIsShrink(false)} className="absolute top-[4.7rem] -left-12 text-xl rotate-180">
            <FiChevronRight />
          </div>
        ) : (
          <div onClick={() => setIsShrink(true)} className="absolute top-[4.7rem] -left-12 text-xl">
            <FiChevronRight />
          </div>
        )}
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
            <p className="mt-2 font-bold text-sm font-plus-jakarta">{user.name}</p>
            <p className="text-xs text-black font-plus-jakarta">
              {user.points} Points
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4 mt-10 overflow-y-auto h-[60%]">
        {users.slice(3).map((user, index) => (
          <div
            key={user.id}
            className="bg-white rounded-xl py-2 px-4 flex items-center justify-between gap-4"
          >
            <div className="w-[20%] flex items-center">
              <span className="w-4 text-[#4F4F4F] font-semibold font-plus-jakarta mr-2">
                {index + 4}
              </span>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            </div>

            <div className="w-[80%] flex justify-between items-center">
              <span className="text-sm font-semibold text-[#4F4F4F] font-plus-jakarta">
                {user.name}
              </span>
              <span className="text-sm text-[#4F4F4F] font-plus-jakarta">
                {user.points} Points
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
