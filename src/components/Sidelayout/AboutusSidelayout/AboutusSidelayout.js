import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { FiChevronRight } from "react-icons/fi";
import Mottos from "./Mottos/Mottos";
import AboutDescription from "./AboutDescription/AboutDescription";

export default function AboutusSidelayout({ setIsPopoverOpen, setIsAboutUs }) {
  const [isShrink, setIsShrink] = useState(false);
  const containerRef = useRef(null);

  // Handle clicks outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsAboutUs(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsAboutUs]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ x: "100%", opacity: 0 }}
      whileInView={{ x: isShrink ? "110%" : 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ ease: "easeInOut" }}
      className="px-8 py-4 fixed top-16 right-10 bg-white bg-opacity-75 backdrop-blur rounded-3xl text-black"
    >
      <div className="flex relative justify-between items-center">
        <h1 className="font-semibold text-[#505050] text-lg">About us</h1>
        <div
          className="cursor-pointer"
          onClick={() => {
            setIsPopoverOpen(true);
            setIsAboutUs(false);
          }}
        >
          <X />
        </div>

        <div onClick={() => setIsShrink(!isShrink)} className="absolute top-6 -left-14">
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

        <div onClick={() => setIsShrink(!isShrink)} className="absolute top-[4.7rem] -left-12 text-xl">
          <FiChevronRight className={isShrink ? "rotate-180" : ""} />
        </div>
      </div>

      <div className="relative h-[80vh] w-[27rem] overflow-y-scroll">
        <AboutDescription />
        <Mottos />
      </div>
    </motion.div>
  );
}
