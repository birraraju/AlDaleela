import { useState } from "react";
import { SmilePlus, Smile, Meh, Frown } from "lucide-react";
import excellent from "../../../assets/FeedBack/Excellent.svg";
import good from "../../../assets/FeedBack/good.svg";
import average from "../../../assets/FeedBack/average.svg";
import poor from "../../../assets/FeedBack/poor.svg";
import bad from "../../../assets/FeedBack/bad.svg";

export default function Feedback() {
  const [rating, setRating] = useState(null);
  console.log(rating);

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
    <div className="z-50">
      <div className="py-4 space-y-4 max-h-[calc(100vh-100px)] overflow-y-auto">
        <div className="flex gap-2 items-center justify-between">
          {/* Map over ratings to display the images */}
          {ratings.map((item) => (
            <button
              key={item.value}
              className={`flex bg-white px-4 justify-center py-2 border border-transparent rounded-xl flex-col items-center space-y-1`}
              onClick={() => setRating(item.value)}
            >
              {/* Render the corresponding image */}
              <img src={item.image} alt={item.value} className="w-8 h-10" />
              <p className="text-black flex justify-center text-xs w-8 h-6">{item.value}</p>
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Your Name"
              className="w-full px-3 py-3 border outline-none border-transparent rounded-xl"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email Address"
              className="w-full px-3 py-3 border outline-none border-transparent rounded-xl"
            />
          </div>
          <div>
            <label htmlFor="thoughts" className="block text-sm font-medium text-black mb-1">
              Please share your thoughts to improve
            </label>
            <textarea
              id="thoughts"
              rows={4}
              placeholder="Share Your Thoughts Here"
              className="w-full px-3 py-2 border outline-none border-transparent rounded-xl"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex pt-6 justify-between items-baseline px-2">
        <button className="px-14 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-14 py-3 bg-custom-gradient text-white rounded-md hover:bg-teal-700">
          Submit
        </button>
      </div>
    </div>
  );
}
