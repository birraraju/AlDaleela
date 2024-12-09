

import { useEffect,useCallback, useState } from "react";
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
import { useTheme } from "../../Layout/ThemeContext/ThemeContext";
import {UserActivityLog} from "../../Common/UserActivityLog";
import { useAuth } from "../../../Providers/AuthProvider/AuthProvider";
import { FaEmber } from "react-icons/fa";
export default function Feedback({
  setIsSuccess,
  setIsMsgStatus,
  setModalMessage,
  setIsFeedBack,
  setIsPopoverOpen,
}) {
  const [rating, setRating] = useState("-");
  const [fbname, setfbname] = useState("-");
  const [fbemail, setfbemail] = useState("-");
  const [fbcomments, setfbcomments] = useState("-");
  const [errors, setErrors] = useState({});
  const { isDarkMode, isLangArab } = useTheme();
  // const [isValid,setIsValid]=useState(false)
  const {profiledetails}= useAuth();

  console.log("fbname :>> ", fbname);
  console.log("fbcomments :>> ", fbcomments);

  const validate = () => {
    return fbname && fbemail && fbcomments && rating !== "-";
  };


  const ratings = [
    {
      value: isLangArab ? "ممتاز" : "Excellent",
      icon: SmilePlus,
      color: "bg-[#05B22629]",
      textColor:"text-[#05B226]",
      image: isDarkMode ? excellentDark : excellent,
    },
    {
      value: isLangArab ? "جيد" : "Good",
      icon: Smile,
      color: "bg-[#17A2B829]",
      textColor:"text-[#17A2B8]",
      image: isDarkMode ? goodDark : good,
    },
    {
      value: isLangArab ? "متوسط" : "Average",
      icon: Meh,
      color: "bg-[#EED50029]",
      textColor:"text-[#EED500]",
      image: isDarkMode ? averageDark : average,
    },
    {
      value: isLangArab ? "ضعيف" : "Poor",
      icon: Frown,
      color: "bg-[#FDA90029]",
      textColor:"text-[#FDA900]",
      image: isDarkMode ? poorDark : poor,
    },
    {
      value: isLangArab ? "سيء" : "Bad",
      icon: Frown,
      color: "bg-[#FA510029]",
      textColor:" text-[#FA5100]",
      image: isDarkMode ? badDark : bad,
    },
  ];

  useEffect(()=>{
    if(!fbemail){
      setfbemail("-")
      setErrors({ email: "" });
    }
  },[fbemail])

  // const onSubmitFeedback = async () => {
  //   if (!validate()) return; // Stop if validation fails
    
  //   // Only perform email validation if fbemail is not empty
  // if (fbemail) {
  //   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   const isEmailValid = emailRegex.test(fbemail);
  //   if (!isEmailValid) {
  //     setErrors({ email: "Please enter a valid email address (e.g., example@domain.com)." });
  //     return; // Return early if email is invalid
  //   }
  // }

  //   const feedbackObj = {
  //     username: fbname,
  //     email: fbemail,
  //     feedbackstatus: rating,
  //     feedbackinfo: fbcomments,
  //   };

  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_API_URL}/FeedBack/feedbacksent`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(feedbackObj),
  //       }
  //     );

  //     const data = await response.json();
  //     if (data.success) {
  //       if(profiledetails){
  //         UserActivityLog(profiledetails, "Feedback Submited")
  //       }else{
  //         UserActivityLog({"username":fbname,"email":fbemail}, "Feedback Submited")   
  //       }
  //       setIsSuccess(true);
  //       setModalMessage( isLangArab?"شكرا لتعليقاتك!":"Thank you for your feedback!");
  //       setIsMsgStatus("Success");
  //       setIsFeedBack(false);
  //     } else {
  //       setIsSuccess(true);
  //       setModalMessage(isLangArab?"فشل في إرسال ردود الفعل":"Failed to submit feedback");
  //       setIsMsgStatus("Failure");
  //       setIsFeedBack(false);
  //     }
  //   } catch (error) {
  //     setIsSuccess(true);
  //     setModalMessage(isLangArab?"حدث خطأ أثناء إرسال التعليقات":"Error submitting feedback");
  //     setIsMsgStatus("Failure");
  //     setIsFeedBack(false);
  //   }
  // };

  const onSubmitFeedback = async () => {
    // First, validate the form using the validate() function
    if (!validate()) return; // Stop if validation fails
  
    // Only perform email validation if fbemail is not empty
    if (fbemail !== "-") {
      console.log("Feedback email:", fbemail)
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isEmailValid = emailRegex.test(fbemail);
      if (!isEmailValid) {
        setErrors({ email:isLangArab?"يرجى إدخال عنوان بريد إلكتروني صالح (على سبيل المثال ، example@domain.com).": "Please enter a valid email address (e.g., example@domain.com)." });
        return; // Return early if email is invalid
      }
    }
  
    // Prepare the feedback object
    const feedbackObj = {
      username: fbname,
      email: fbemail,
      feedbackstatus: rating,
      feedbackinfo: fbcomments,
    };
  
    try {
      // Send the feedback data via a POST request
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/FeedBack/feedbacksent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(feedbackObj),
        }
      );
  
      const data = await response.json();
      
      // Handle success or failure based on the response data
      if (data.success) {
        // Log the user activity, either using profiledetails or fallback to user input
        if (profiledetails) {
          UserActivityLog(profiledetails, "Feedback Submitted");
        } else {
          UserActivityLog({ username: fbname, email: fbemail }, "Feedback Submitted");
        }
  
        setIsSuccess(true);
        setModalMessage(isLangArab ? "شكرا لتعليقاتك!" : "Thank you for your feedback!");
        setIsMsgStatus("Success");
        setIsFeedBack(false);
      } else {
        setIsSuccess(true);
        setModalMessage(isLangArab ? "فشل في إرسال ردود الفعل" : "Failed to submit feedback");
        setIsMsgStatus("Failure");
        setIsFeedBack(false);
      }
    } catch (error) {
      setIsSuccess(true);
      setModalMessage(isLangArab ? "حدث خطأ أثناء إرسال التعليقات" : "Error submitting feedback");
      setIsMsgStatus("Failure");
      setIsFeedBack(false);
    }
  };
  

  const handleCancel = () => {
    setIsFeedBack(false);
    setIsPopoverOpen(true);
  };

  return (
    <div dir={isLangArab ? "rtl" : "ltr"}>
      <div className={`z-50  ${isDarkMode ? "text-white" : "text-black"} `}>
        <div className=" sm:space-y-4 space-y-2 max-h-[calc(100vh-100px)] overflow-y-auto ">
          <div className="flex gap-2 flex-col sm:gap-0 items-center justify-between">
            <div className="flex  flex-row gap-2 ">
              {ratings.map((item) => (
                <button
                  key={item.value}
                  className={`flex   sm:px-1 laptop_s:px-0.5 px-2.5 justify-center py-2 border sm:rounded-lg   rounded-lg flex-col items-center sm:space-y-1 space-y-2 transition-colors ${
                    isDarkMode
                      ? rating === item.value
                        ? `${item.color} ${item.textColor} border-transparent`
                        : "border-transparent  bg-[#444646]"
                      : rating === item.value
                      ? `${item.color} ${item.textColor}  border-transparent `
                      : "border-transparent bg-white text-black border"
                  }`}
                  onClick={() =>{ setRating(item.value)
                    }} // Ensure onClick works
                >
                  {/* Render the corresponding image */}
                  <img
                    src={item.image}
                    alt={item.value}
                    className="w-6 sm:w-6 h-10 sm:h-7 laptop_s:h-7 laptop_s:w-6 "
                  />
                  <p
                    className={` w-8 sm:w-12   font-400  sm:h-6 h-3 ${
                      isLangArab ? "text-[10px] sm:text-[12px] laptop_lg:text-[13px] " : "text-[10px] sm:text-[12px]" // Increased text size for Arabic
                    } `}
                  >
                    {item.value} {/* Directly display the text */}
                  </p>
                </button>
              ))}
            </div>

            {/* <div className="w-full">
              {errors.rating && (
                <p
                  className="text-start text-xs mt-0 "
                  style={{ color: "red" }}
                >
                  {errors.rating}
                </p>
              )}
            </div> */}
          </div>

          <div className="space-y-4 px-4 sm:px-0">
            <div>
              <label
                htmlFor="name"
                className={`block    font-500 mb-1 transition-colors ${
                  isLangArab ? "text-[14px] mr-2" : "text-[14px]" // Increased text size for Arabic
                } ${
                  isDarkMode ? "text-[#FFFFFF] bg-opacity-70" : "text-[#000000]"
                }`}
              >
                {isLangArab ? "اسم المستخدم" : "Name"}
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) =>{ setfbname(e.target.value) 
                  }}
                placeholder={
                  isLangArab ? "أدخل اسم المستخدم" : "Enter Your Name"
                }
                className={`w-full px-3    font-400 text-[13px] py-2 border rounded-lg outline-none transition-colors ${
                  isDarkMode
                    ? "bg-[#444646]  text-[white] border-transparent "
                    : "bg-[#FFFFFF] text-black border-gray-300"
                }`}
              />
              {/* <div className="w-full">
                {errors.name && (
                  <p
                    className="text-start text-xs mt-0 "
                    style={{ color: "red" }}
                  >
                    {errors.name}
                  </p>
                )}
              </div> */}
            </div>

            <div>
              <label
                htmlFor="email"
                className={`block    font-500 mb-1 transition-colors ${
                  isLangArab ? "text-[13px] mr-2" : "text-[13px]" // Increased text size for Arabic
                } ${
                  isDarkMode ? "text-[#FFFFFF] bg-opacity-70" : "text-[#000000]"
                }`}
              >
                {" "}
                {isLangArab ? "البريد الإلكتروني" : "Email"}
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => {setfbemail(e.target.value)
                
                }}
                placeholder={
                  isLangArab
                    ? "أدخل بريدك الإلكتروني"
                    : "Enter Your Email Address"
                }
                className={`w-full px-3   font-400 text-[13px] py-2 border rounded-lg outline-none transition-colors ${
                  isDarkMode
                    ? "bg-[#444646]  text-white border-transparent "
                    : "bg-[#FFFFFF] text-black border-gray-300"
                }`}
              />
              <div className="w-full">
                {errors.email && (
                  <p
                    className="text-start text-xs mt-0 "
                    style={{ color: "red" }}
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="thoughts"
                className={`block    font-500 mb-1 transition-colors ${
                  isLangArab ? "text-[13px] mr-2" : "text-[14px]" // Increased text size for Arabic
                } ${
                  isDarkMode ? "text-[#FFFFFF] bg-opacity-70" : "text-[#000000]"
                }`}
              >
                {" "}
                {isLangArab
                  ? "يرجى مشاركة أفكارك للتحسين"
                  : "Please share your thoughts to improve"}
              </label>
              <textarea
                id="thoughts"
                rows={4}
                placeholder={
                  isLangArab ? "شارك أفكارك هنا" : "Share Your Thoughts Here"
                }
                onChange={(e) =>{ setfbcomments(e.target.value)
                 }}
                className={`w-full px-3 text-[13px]   font-400  resize-none h-30 py-2 border rounded-lg outline-none transition-colors ${
                  isDarkMode
                    ? "bg-[#444646]  text-white border-transparent "
                    : "bg-[#FFFFFF] text-[#000000] border-gray-300"
                }`}
              ></textarea>
              {/* <div className="w-full">
                {errors.comments && (
                  <p
                    className="text-start text-xs mt-0 "
                    style={{ color: "red" }}
                  >
                    {errors.comments}
                  </p>
                )}
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex pt-6 justify-between items-baseline px-4  sm:px-2">
          <button
            className={`sm:px-12 px-9    font-500 sm:py-2 py-2 border rounded-lg transition-colors ${
              isLangArab ? "text-[14px] " : "text-[14px]" // Increased text size for Arabic
            } ${
              isDarkMode
                ? "bg-transparent  border border-white text-white"
                : "border-[#909090] text-[#505050]"
            }`}
            onClick={handleCancel}
            // Attach the click handler
          >
            {" "}
            {isLangArab ? "إلغاء" : "Cancel"}
          </button>
          <button
            onClick={onSubmitFeedback}
            className={`sm:px-12 px-9   font-500 sm:py-2 text-[14px]  py-2 rounded-lg transition-colors ${
              validate()
                ? "bg-custom-gradient text-white"
                : "bg-gray-600/65 text-white"
            }`}
            disabled={!validate()}
          >
            {isLangArab ? "إرسال" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
