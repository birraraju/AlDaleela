import { useState } from "react";
import { SmilePlus, Smile, Meh, Frown } from "lucide-react";
import excellent from "../../../assets/FeedBack/Excellent.svg";
import good from "../../../assets/FeedBack/good.svg";
import average from "../../../assets/FeedBack/average.svg";
import poor from "../../../assets/FeedBack/poor.svg";
import bad from "../../../assets/FeedBack/bad.svg";
import { useTheme } from '../../Layout/ThemeContext/ThemeContext'; // Import theme context

export default function Feedback() {
  const [rating, setRating] = useState(null);
  console.log(rating);
  const { isDarkMode } = useTheme(); // Access dark mode from theme context

  const ratings = [
    {
      value: "Excellent",
      icon: SmilePlus,
      color: "text-green-500",
      image: excellent,
    },
    { value: "Good", icon: Smile, color: "text-green-400", image: good },
    {
      value: "Average",
      icon: Meh,
      color: "text-yellow-400",
      image: average,
    },
    { value: "Poor", icon: Frown, color: "text-orange-400", image: poor },
    { value: "Bad", icon: Frown, color: "text-red-500", image: bad },
  ];

  return (
    <div className={`z-50 ${isDarkMode ? "text-white" : "text-black"}`}>
      <div className=" sm:space-y-4 space-y-2 max-h-[calc(100vh-100px)] overflow-y-auto">
      <div className="flex gap-2 items-center justify-between">
      {/* Map over ratings to display the images */}
          {ratings.map((item) => (
            <button
              key={item.value}
              className={`flex bg-transparent sm:px-3 laptop_s:px-3 px-3 justify-center  py-2 border sm:rounded-xl rounded-lg flex-col items-center sm:space-y-1 space-y-2 transition-colors ${
                isDarkMode ? "bg-[rgba(96,96,96,0.9)] border-none " : " border-transparent outline-none bg-white"
              }`}
              onClick={() => setRating(item.value)}
            >
              {/* Render the corresponding image */}
              <img src={item.image} alt={item.value} className="w-8 sm:w-6 h-10 sm:h-7 laptop_s:h-8 laptop_s:w-6" />
              <p className={`sm:text-[9px] laptop_s:text-[10px] text-[9px] w-8 sm:h-6 h-3 ${item.color}`}>
                {item.value}</p>
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <div>
          <label
              htmlFor="name"
              className={`block text-sm font-medium mb-1 transition-colors ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Your Name"
              className={`w-full px-3 py-3 border rounded-xl outline-none transition-colors${
                isDarkMode
        ? "bg-[#FFFFFF] bg-opacity-30 text-black border-transparent "
        : "bg-white text-black border-gray-300"
    }`}            />
          </div>
          <div>
          <label
              htmlFor="email"
              className={`block text-sm font-medium mb-1 transition-colors ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email Address"
              className={`w-full px-3 py-3 border rounded-xl outline-none transition-colors${
                isDarkMode
        ? "bg-[#FFFFFF] bg-opacity-30 text-white border-transparent "
        : "bg-white text-black border-gray-300"
    }`}            />
          </div>
          <div>
          <label
              htmlFor="thoughts"
              className={`block text-sm font-medium mb-1 transition-colors ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >              Please share your thoughts to improve
            </label>
            <textarea
              id="thoughts"
              rows={4}
              placeholder="Share Your Thoughts Here"
              className={`w-full px-3 py-2 border rounded-xl outline-none transition-colors${
                isDarkMode
        ? "bg-[#FFFFFF] bg-opacity-30 text-white border-transparent "
        : "bg-white text-black border-gray-300"
    }`}            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex pt-6 justify-between items-baseline px-2">
      <button
          className={`sm:px-14 px-9 sm:py-3 py-2 border rounded-md transition-colors ${
            isDarkMode ? "bg-[rgba(96,96,96,0.8)] border-none text-white" : "border-gray-300 text-gray-700"
          }`}
        >          Cancel
        </button>
        <button className={`sm:px-14 px-9 sm:py-3 py-2 rounded-md transition-colors ${
          isDarkMode ? "bg-custom-gradient text-white" : "bg-custom-gradient text-white"
        }`}>          Submit
        </button>
      </div>
    </div>
  );
}
