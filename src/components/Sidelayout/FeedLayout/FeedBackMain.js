import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FiChevronRight } from "react-icons/fi";
import FeedBackBody from './SendFeedBack';

export default function SendFeedBack({ setIsPopoverOpen, setIsFeedBack }) {
  const [isShrink, setIsShrink] = useState(false);
  const feedbackRef = useRef(null);

  // Detect clicks outside of the container
  useEffect(() => {
    function handleClickOutside(event) {
      if (feedbackRef.current && !feedbackRef.current.contains(event.target)) {
        setIsFeedBack(false); // Close the feedback container
      }
    }
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsFeedBack]);

  return (
    <motion.div
      ref={feedbackRef}
      initial={{ x: "100%", opacity: 0 }}
      whileInView={{ x: isShrink ? "110%" : 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ ease: "easeInOut" }}
      className="px-8 py-4 fixed top-16 right-10 h-[75vh] w-[27rem] bg-white bg-opacity-80 backdrop-blur rounded-3xl text-black fontFamily-poppins-0"
    >
      <div className="flex relative justify-between items-center">
        <h1 className="font-semibold text-[#505050] text-lg">Feedback</h1>
        <button
          onClick={() => {
            setIsPopoverOpen(true);
            setIsFeedBack(false);
          }}
        >
          <X />
        </button>

        <div
          onClick={() => setIsShrink(!isShrink)}
          className="absolute top-6 -left-14 cursor-pointer"
        >
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

        <div
          onClick={() => setIsShrink(!isShrink)}
          className="absolute top-[4.7rem] -left-12 text-xl cursor-pointer"
        >
          <FiChevronRight className={isShrink ? "rotate-180" : ""} />
        </div>
      </div>
      <FeedBackBody />
    </motion.div>
  );
}
