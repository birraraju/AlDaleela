import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import loc from "../../../assets/Contribution/image.png";
import { FiChevronRight } from "react-icons/fi";

export default function ContributionPopup({ setIsPopoverOpen, setIsContribution }) {
  const [isShrink, setIsShrink] = useState(false);
  const containerRef = useRef(null);

  const contributions = [
    { date: "2024-10-11", poiName: "Al Makhtabshah", status: "Pending" },
    { date: "2024-10-11", poiName: "Al Qahhah", status: "Approved" },
    { date: "2024-10-11", poiName: "Al Abhuth", status: "Pending" },
    { date: "2024-10-11", poiName: "Al Buwem", status: "Approved" },
    { date: "2024-10-11", poiName: "Al Khabaq", status: "Approved" },
  ];

  // Detect outside click to close the popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsPopoverOpen(false);
        setIsContribution(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsPopoverOpen, setIsContribution]);

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
        <h1 className="font-semibold text-[#505050] text-lg">Contribution</h1>
        <div
          className="cursor-pointer"
          onClick={() => {
            setIsPopoverOpen(false);
            setIsContribution(false);
          }}
        >
          <X />
        </div>

        {/* Shrinking Toggle */}
        <div onClick={() => setIsShrink(!isShrink)} className="absolute top-6 -left-14 cursor-pointer">
          <svg width="32" height="128" viewBox="0 0 64 371" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        
        <div className="absolute top-[4.7rem] -left-12 text-xl cursor-pointer" onClick={() => setIsShrink(!isShrink)}>
          <FiChevronRight className={isShrink ? "rotate-180" : ""} />
        </div>
      </div>

      <div className="p-1 w-[450px] max-h-[calc(100vh-200px)] overflow-y-auto mt-2">
        <div className="grid font-omnes grid-cols-3 gap-4 font-medium text-[14px] text-[#667085] mb-2 px-4">
          <div>Date</div>
          <div>POI Name</div>
          <div>Status</div>
        </div>
        {contributions.map((contribution, index) => (
          <div
            key={index}
            className={`grid grid-cols-3 gap-4 py-5 text-sm px-4 ${index % 2 === 0 ? "bg-[#D5E5DE] bg-opacity-30" : "bg-transparent"}`}
          >
            <div className="font-medium font-omnes text-[16px] text-[#101828]">{contribution.date}</div>
            <div className="font-medium font-omnes text-[16px] text-[#3E3E3E]">{contribution.poiName}</div>
            <div className="flex justify-between items-center">
              <span className={`${contribution.status === "Approved" ? "bg-custom-gradient font-omnes text-[16px] font-medium bg-clip-text text-transparent" : "text-[#EFB45D] font-omnes text-[16px] font-medium"}`}>
                {contribution.status}
              </span>
              <img src={loc} alt="Location icon" className="w-7 h-7" />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
