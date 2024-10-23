import { useState } from "react";
import { SmilePlus, Smile, Meh, Frown } from "lucide-react";
import excellent from "../../../assets/FeedBack/Excellent.svg";
import good from "../../../assets/FeedBack/good.svg";
import average from "../../../assets/FeedBack/average.svg";
import poor from "../../../assets/FeedBack/poor.svg";
import bad from "../../../assets/FeedBack/bad.svg";
import excellentDark from "../../../assets/FeedBack/ExcellentDark.svg";
import goodDark from "../../../assets/FeedBack/goodDark.svg";
import averageDark from "../../../assets/FeedBack/averageDark.svg";
import poorDark from "../../../assets/FeedBack/poorDark.svg";
import badDark from "../../../assets/FeedBack/badDark.svg";
import { useTheme } from '../../Layout/ThemeContext/ThemeContext'; // Import theme context
 
export default function Feedback({
  setIsFeedBack, setIsPopoverOpen }) {
  const [rating, setRating] = useState(null);
  console.log(rating);
  const [fbname, setfbname] = useState(null);
  const [fbemail, setfbemail] = useState(null);
  const [fbcomments, setfbcomments] = useState(null);
  const { isDarkMode,isLangArab } = useTheme(); // Access dark mode from theme context

  const ratings = [
    {
      value: isLangArab ?"ممتاز":"Excellent",
      icon: SmilePlus,
      color: "text-green-500",
      image:  isDarkMode ? excellentDark:excellent,
    },
    { value: isLangArab?"جيد":"Good", icon: Smile, color: "text-green-400", image: isDarkMode?goodDark:good },
    {
      value: isLangArab?"متوسط":"Average",
      icon: Meh,
      color: "text-yellow-400",
      image: isDarkMode?averageDark:average,
    },
    { value: isLangArab?"ضعيف":"Poor", icon: Frown, color: "text-orange-400", image: isDarkMode?poorDark: poor },
    { value: isLangArab?"سيء":"Bad", icon: Frown, color: "text-red-500", image:isDarkMode?badDark: bad },
  ];
  const onSubmitFeedback = async()=>{
    console.log(fbname,fbemail,fbcomments)
    const feedbackObj={
      username: fbname,
      email: fbemail,
      feedbackstatus: rating,
      feedbackinfo: fbcomments
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/FeedBack/feedbacksent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(feedbackObj),
      });      
      const data = await response.json();
      if(data.success){
        console.log(data.success);
      }
      else{
        console.log(data.success)
      }
    }catch (error) {
      console.error('Error submitting form:', error);
    }
  }
 
  // Handle cancel action
  const handleCancel = () => {
    setIsFeedBack(false);  // Close feedback panel
    setIsPopoverOpen(true);  // Open popover
  };
  return (
    <div className={`z-50 ${isDarkMode ? "text-white" : "text-black"}`}>
      <div className=" sm:space-y-4 space-y-2 max-h-[calc(100vh-100px)] overflow-y-auto">
      <div className="flex gap-2 items-center justify-between">
  {ratings.map((item) => (
    <button
      key={item.value}
      className={`flex bg-transparent sm:px-3 laptop_s:px-3 px-3 justify-center py-2 border sm:rounded-xl rounded-lg flex-col items-center sm:space-y-1 space-y-2 transition-colors ${
        isDarkMode
          ? rating === item.value
            ? "bg-black text-white border-white"
            : "border-transparent bg-[#444646]"
          : rating === item.value
          ? "bg-white text-white"
          : "border-transparent border bg-black"
      }`}
      onClick={() => setRating(item.value)} // Ensure onClick works
    >
      {/* Render the corresponding image */}
      <img src={item.image} alt={item.value} className="w-8 sm:w-6 h-10 sm:h-7 laptop_s:h-8 laptop_s:w-6" />
      <p className={`text-[12px] sm:text-[12px] laptop_s:text-[12px] w-8 sm:h-6 h-3 ${item.color}`}>
        {item.value} {/* Directly display the text */}
      </p>
    </button>
  ))}
</div>

        <div className="space-y-4">
          <div>
          <label
              htmlFor="name"
              className={`block text-sm font-medium mb-1 transition-colors ${
                isDarkMode ? "text-[#FFFFFF] bg-opacity-70" : "text-black"
              }`}
            >              {isLangArab?"سيء":"Name"}
            </label>
            <input
              type="text"
              id="name"
              onChange={(e)=> setfbname(e.target.value)}
              placeholder={isLangArab?"أدخل اسم المستخدم":"Enter Your Name"}
              className={`w-full px-3 py-3 border rounded-xl outline-none transition-colors ${
                isDarkMode
        ? "bg-[#444646]  text-[white] border-transparent "
        : "bg-white text-black border-gray-300"
    }`}            />
          </div>
          <div>
          <label
              htmlFor="email"
              className={`block text-sm font-medium mb-1 transition-colors ${
                isDarkMode ? "text-[#FFFFFF] bg-opacity-70" : "text-black"
              }`}
            >              {isLangArab?"البريد الإلكتروني":"Email"}
            </label>
            <input
              type="email"
              id="email"
              onChange={(e)=> setfbemail(e.target.value)}
              placeholder=  {isLangArab?"أدخل بريدك الإلكتروني":"Enter Your Email Address"}
              className={`w-full px-3 py-3 border rounded-xl outline-none transition-colors ${
                isDarkMode
        ? "bg-[#444646]  text-white border-transparent "
        : "bg-white text-black border-gray-300"
    }`}            />
          </div>
          <div>
          <label
              htmlFor="thoughts"
              className={`block text-sm font-medium mb-1 transition-colors ${
                isDarkMode ? "text-[#FFFFFF] bg-opacity-70" : "text-black"
              }`}
            >              {isLangArab?"يرجى مشاركة أفكارك للتحسين": "Please share your thoughts to improve"}
            </label>
            <textarea
              id="thoughts"
              rows={4}
              placeholder={ isLangArab?"شارك أفكارك هنا":"Share Your Thoughts Here"}
              onChange={(e)=> setfbcomments(e.target.value)}
              className={`w-full px-3 py-2 border rounded-xl outline-none transition-colors ${
                isDarkMode
        ? "bg-[#444646]  text-white border-transparent "
        : "bg-white text-black border-gray-300"
    }`}            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex pt-6 justify-between items-baseline px-2">
      <button
          className={`sm:px-14 px-9 sm:py-3 py-2 border rounded-md transition-colors ${
            isDarkMode ? "bg-transparent  border border-white text-white" : "border-gray-300 text-gray-700"
          }`}
          onClick={handleCancel}
          // Attach the click handler
 
        >          { isLangArab?"إلغاء":"Cancel"}
        </button>
        <button onClick={onSubmitFeedback} className={`sm:px-14 px-9 sm:py-3 py-2 rounded-md transition-colors ${
          isDarkMode ? "bg-custom-gradient text-white" : "bg-custom-gradient text-white"
        }`}>          {isLangArab?"إرسال":"Submit"}
        </button>
      </div>
    </div>
  );
}
