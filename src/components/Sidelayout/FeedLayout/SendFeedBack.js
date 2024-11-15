// import { useState } from "react";
// import { SmilePlus, Smile, Meh, Frown } from "lucide-react";
// import excellent from "../../../assets/FeedBack/Excellent.svg";
// import good from "../../../assets/FeedBack/good.svg";
// import average from "../../../assets/FeedBack/average.svg";
// import poor from "../../../assets/FeedBack/poor.svg";
// import bad from "../../../assets/FeedBack/bad.svg";
// import excellentDark from "../../../assets/FeedBack/ExcellentDark.svg";
// import goodDark from "../../../assets/FeedBack/goodDark.svg";
// import averageDark from "../../../assets/FeedBack/averageDark.svg";
// import poorDark from "../../../assets/FeedBack/poorDark.svg";
// import badDark from "../../../assets/FeedBack/badDark.svg";
// import { useTheme } from '../../Layout/ThemeContext/ThemeContext'; // Import theme context

// export default function Feedback({ setIsSuccess, setIsMsgStatus, setModalMessage,
//   setIsFeedBack, setIsPopoverOpen }) {
//   const [rating, setRating] = useState(null);
//   console.log(rating);
//   const [fbname, setfbname] = useState(null);
//   const [fbemail, setfbemail] = useState(null);
//   const [fbcomments, setfbcomments] = useState(null);
//   const { isDarkMode,isLangArab } = useTheme(); // Access dark mode from theme context

//   const ratings = [
//     {
//       value: isLangArab ?"ممتاز":"Excellent",
//       icon: SmilePlus,
//       color: "text-green-500",
//       image:  isDarkMode ? excellentDark:excellent,
//     },
//     { value: isLangArab?"جيد":"Good", icon: Smile, color: "text-green-400", image: isDarkMode?goodDark:good },
//     {
//       value: isLangArab?"متوسط":"Average",
//       icon: Meh,
//       color: "text-yellow-400",
//       image: isDarkMode?averageDark:average,
//     },
//     { value: isLangArab?"ضعيف":"Poor", icon: Frown, color: "text-orange-400", image: isDarkMode?poorDark: poor },
//     { value: isLangArab?"سيء":"Bad", icon: Frown, color: "text-red-500", image:isDarkMode?badDark: bad },
//   ];
//   const onSubmitFeedback = async()=>{
//     console.log(fbname,fbemail,fbcomments)
//     const feedbackObj={
//       username: fbname,
//       email: fbemail,
//       feedbackstatus: rating,
//       feedbackinfo: fbcomments
//     }
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/FeedBack/feedbacksent`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(feedbackObj),
//       });
//       const data = await response.json();
//       if(data.success){
//         console.log(data.success);
//         setIsSuccess(true);
//         setModalMessage("Thank You for your Feedback !")
//         setIsMsgStatus("Success")
//         setIsFeedBack(false)
//       }
//       else{
//         setIsSuccess(true);
//         setModalMessage("Fail to udpate feedback")
//         setIsMsgStatus("Failure")
//         setIsFeedBack(false)
//         console.log(data.success)
//       }
//     }catch (error) {
//       setIsSuccess(true);
//         setModalMessage("Fail to udpate feedback")
//         setIsMsgStatus("Failure")
//         setIsFeedBack(false)
//       console.error('Error submitting form:', error);
//     }
//   }

//   // Handle cancel action
//   const handleCancel = () => {
//     setIsFeedBack(false);  // Close feedback panel
//     setIsPopoverOpen(true);  // Open popover
//   };
//   return (
//     <div dir={isLangArab ? "rtl" : "ltr"}>
//     <div className={`z-50  ${isDarkMode ? "text-white" : "text-black"}`}>
//       <div className=" sm:space-y-4 space-y-2 max-h-[calc(100vh-100px)] overflow-y-auto">
//       <div className="flex gap-2 items-center justify-between">
//   {ratings.map((item) => (
//     <button
//       key={item.value}
//       className={`flex bg-transparent sm:px-3 laptop_s:px-3 px-3 justify-center py-2 border sm:rounded-xl rounded-lg flex-col items-center sm:space-y-1 space-y-2 transition-colors ${
//         isDarkMode
//           ? rating === item.value
//             ? "bg-black text-white border-white"
//             : "border-transparent bg-[#444646]"
//           : rating === item.value
//           ? "bg-white text-white"
//           : "border-transparent border bg-black"
//       }`}
//       onClick={() => setRating(item.value)} // Ensure onClick works
//     >
//       {/* Render the corresponding image */}
//       <img src={item.image} alt={item.value} className="w-8 sm:w-6 h-10 sm:h-7 laptop_s:h-8 laptop_s:w-6" />
//       <p className={` w-8 sm:h-6 h-3 ${
//     isLangArab ? "text-xl " : "text-[12px]" // Increased text size for Arabic
//   } ${item.color}`}>
//         {item.value} {/* Directly display the text */}
//       </p>
//     </button>
//   ))}
// </div>

//         <div className="space-y-4">
//           <div>
//           <label
//   htmlFor="name"
//   className={`block  font-medium mb-1 transition-colors ${
//     isLangArab ? "text-xl mr-2" : "text-sm" // Increased text size for Arabic
//   } ${isDarkMode ? "text-[#FFFFFF] bg-opacity-70" : "text-black"}`}
// >
//   {isLangArab?"سيء":"Name"}
//             </label>
//             <input
//               type="text"
//               id="name"
//               onChange={(e)=> setfbname(e.target.value)}
//               placeholder={isLangArab?"أدخل اسم المستخدم":"Enter Your Name"}
//               className={`w-full px-3 py-3 border rounded-xl outline-none transition-colors ${
//                 isDarkMode
//         ? "bg-[#444646]  text-[white] border-transparent "
//         : "bg-white text-black border-gray-300"
//     }`}            />
//           </div>
//           <div>
//           <label
//               htmlFor="email"
//               className={`block  font-medium mb-1 transition-colors${
//                 isLangArab ? "text-xl mr-2" : "text-sm" // Increased text size for Arabic
//               } ${
//                 isDarkMode ? "text-[#FFFFFF] bg-opacity-70" : "text-black"
//               }`}
//             >              {isLangArab?"البريد الإلكتروني":"Email"}
//             </label>
//             <input
//               type="email"
//               id="email"
//               onChange={(e)=> setfbemail(e.target.value)}
//               placeholder=  {isLangArab?"أدخل بريدك الإلكتروني":"Enter Your Email Address"}
//               className={`w-full px-3 py-3 border rounded-xl outline-none transition-colors ${
//                 isDarkMode
//         ? "bg-[#444646]  text-white border-transparent "
//         : "bg-white text-black border-gray-300"
//     }`}            />
//           </div>
//           <div>
//           <label
//               htmlFor="thoughts"
//               className={`block  font-medium mb-1 transition-colors ${
//                 isLangArab ? "text-xl mr-2" : "text-sm" // Increased text size for Arabic
//               } ${
//                 isDarkMode ? "text-[#FFFFFF] bg-opacity-70" : "text-black"
//               }`}
//             >              {isLangArab?"يرجى مشاركة أفكارك للتحسين": "Please share your thoughts to improve"}
//             </label>
//             <textarea
//               id="thoughts"
//               rows={4}
//               placeholder={ isLangArab?"شارك أفكارك هنا":"Share Your Thoughts Here"}
//               onChange={(e)=> setfbcomments(e.target.value)}
//               className={`w-full px-3 py-2 border rounded-xl outline-none transition-colors ${
//                 isDarkMode
//         ? "bg-[#444646]  text-white border-transparent "
//         : "bg-white text-black border-gray-300"
//     }`}            ></textarea>
//           </div>
//         </div>
//       </div>
//       <div className="flex pt-6 justify-between items-baseline px-2">
//       <button
//           className={`sm:px-14 px-9 sm:py-3 py-2 border rounded-md transition-colors ${
//     isLangArab ? "text-sm " : "text-sm" // Increased text size for Arabic
//   } ${
//             isDarkMode ? "bg-transparent  border border-white text-white" : "border-gray-300 text-gray-700"
//           }`}
//           onClick={handleCancel}
//           // Attach the click handler

//         >          { isLangArab?"إلغاء":"Cancel"}
//         </button>
//         <button onClick={onSubmitFeedback} className={`sm:px-14 px-9 sm:py-3 py-2 rounded-md transition-colors ${
//           isDarkMode ? "bg-custom-gradient text-white" : "bg-custom-gradient text-white"
//         }`}>          {isLangArab?"إرسال":"Submit"}
//         </button>
//       </div>
//     </div>
//     </div>
//   );
// }

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
  // const [errors, setErrors] = useState({});
  const { isDarkMode, isLangArab } = useTheme();
  // const [isValid,setIsValid]=useState(false)
  const {profiledetails}= useAuth();

  console.log("fbname :>> ", fbname);
  console.log("fbcomments :>> ", fbcomments);

  const validate = () => {
    return fbname && fbemail && fbcomments && rating !== "-";
  };

  // const validate = useCallback(() => {
  //   // const newErrors = {};
  //   if (fbname || fbemail ||fbcomments || rating ){
  //       return true
  //   }else{
  //     return false;
  //   }

      // newErrors.name = isLangArab ? "الاسم مطلوب" : "Name is required";
    // if (!fbemail)
    //   newErrors.email = isLangArab
    //     ? "البريد الإلكتروني مطلوب"
    //     : "Email is required";
    // else if (!/\S+@\S+\.\S+/.test(fbemail))
    //   newErrors.email = isLangArab
    //     ? "بريد إلكتروني غير صالح"
    //     : "Invalid email address";
    // if (!fbcomments)
    //   newErrors.comments = isLangArab
    //     ? "التعليقات مطلوبة"
    //     : "Comments are required";
    // if (!rating)
    //   newErrors.rating = isLangArab ? "التقييم مطلوب" : "Rating is required";
    // setErrors(newErrors);
    // return Object.keys(newErrors).length === 0;
  // });

  // useEffect(() => {
  //   setIsValid(validate());
  // }, [validate]);

  // console.log("errors :>> ", errors);

  const ratings = [
    {
      value: isLangArab ? "ممتاز" : "Excellent",
      icon: SmilePlus,
      color: "text-green-500",
      highlight: "border-green-500",
      image: isDarkMode ? excellentDark : excellent,
    },
    {
      value: isLangArab ? "جيد" : "Good",
      icon: Smile,
      color: "text-green-400",
      highlight: "border-green-400",
      image: isDarkMode ? goodDark : good,
    },
    {
      value: isLangArab ? "متوسط" : "Average",
      icon: Meh,
      color: "text-yellow-400",
      highlight: "border-yellow-400",
      image: isDarkMode ? averageDark : average,
    },
    {
      value: isLangArab ? "ضعيف" : "Poor",
      icon: Frown,
      color: "text-orange-400",
      highlight: "border-orange-400",
      image: isDarkMode ? poorDark : poor,
    },
    {
      value: isLangArab ? "سيء" : "Bad",
      icon: Frown,
      color: "text-red-500",
      highlight: "border-red-500",
      image: isDarkMode ? badDark : bad,
    },
  ];

  const onSubmitFeedback = async () => {
    if (!validate()) return; // Stop if validation fails

    const feedbackObj = {
      username: fbname,
      email: fbemail,
      feedbackstatus: rating,
      feedbackinfo: fbcomments,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/FeedBack/feedbacksent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(feedbackObj),
        }
      );

      const data = await response.json();
      if (data.success) {
        if(profiledetails){
          UserActivityLog(profiledetails, "Feedback Submited")
        }else{
          UserActivityLog({"username":fbname,"email":fbemail}, "Feedback Submited")   
        }
        setIsSuccess(true);
        setModalMessage( isLangArab?"شكرا لتعليقاتك!":"Thank you for your feedback!");
        setIsMsgStatus("Success");
        setIsFeedBack(false);
      } else {
        setIsSuccess(true);
        setModalMessage(isLangArab?"فشل في إرسال ردود الفعل":"Failed to submit feedback");
        setIsMsgStatus("Failure");
        setIsFeedBack(false);
      }
    } catch (error) {
      setIsSuccess(true);
      setModalMessage(isLangArab?"حدث خطأ أثناء إرسال التعليقات":"Error submitting feedback");
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
                  className={`flex bg-transparent  sm:px-2.5 laptop_s:px-1 px-3 justify-center py-2 border sm:rounded-xl rounded-lg flex-col items-center sm:space-y-1 space-y-2 transition-colors ${
                    isDarkMode
                      ? rating === item.value
                        ? `bg-black text-white ${item.highlight}`
                        : "border-transparent bg-[#444646]"
                      : rating === item.value
                      ? `bg-white text-white ${item.highlight}`
                      : "border-transparent bg-white text-white border"
                  }`}
                  onClick={() =>{ setRating(item.value)
                    }} // Ensure onClick works
                >
                  {/* Render the corresponding image */}
                  <img
                    src={item.image}
                    alt={item.value}
                    className="w-6 sm:w-6 h-10 sm:h-7 laptop_s:h-8 laptop_s:w-6"
                  />
                  <p
                    className={` w-8 sm:w-12  sm:h-6 h-3 ${
                      isLangArab ? "text-xl " : "text-[10px] sm:text-[12px]" // Increased text size for Arabic
                    } ${item.color}`}
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
                className={`block  font-medium mb-1 transition-colors ${
                  isLangArab ? "text-xl mr-2" : "text-sm" // Increased text size for Arabic
                } ${
                  isDarkMode ? "text-[#FFFFFF] bg-opacity-70" : "text-black"
                }`}
              >
                {isLangArab ? "سيء" : "Name"}
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) =>{ setfbname(e.target.value) 
                  }}
                placeholder={
                  isLangArab ? "أدخل اسم المستخدم" : "Enter Your Name"
                }
                className={`w-full px-3 py-3 border rounded-xl outline-none transition-colors ${
                  isDarkMode
                    ? "bg-[#444646]  text-[white] border-transparent "
                    : "bg-white text-black border-gray-300"
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
                className={`block  font-medium mb-1 transition-colors${
                  isLangArab ? "text-xl mr-2" : "text-sm" // Increased text size for Arabic
                } ${
                  isDarkMode ? "text-[#FFFFFF] bg-opacity-70" : "text-black"
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
                className={`w-full px-3 py-3 border rounded-xl outline-none transition-colors ${
                  isDarkMode
                    ? "bg-[#444646]  text-white border-transparent "
                    : "bg-white text-black border-gray-300"
                }`}
              />
              {/* <div className="w-full">
                {errors.email && (
                  <p
                    className="text-start text-xs mt-0 "
                    style={{ color: "red" }}
                  >
                    {errors.email}
                  </p>
                )}
              </div> */}
            </div>

            <div>
              <label
                htmlFor="thoughts"
                className={`block  font-medium mb-1 transition-colors ${
                  isLangArab ? "text-xl mr-2" : "text-sm" // Increased text size for Arabic
                } ${
                  isDarkMode ? "text-[#FFFFFF] bg-opacity-70" : "text-black"
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
                className={`w-full px-3  resize-none h-40 py-2 border rounded-xl outline-none transition-colors ${
                  isDarkMode
                    ? "bg-[#444646]  text-white border-transparent "
                    : "bg-white text-black border-gray-300"
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
            className={`sm:px-14 px-9 sm:py-3 py-2 border rounded-md transition-colors ${
              isLangArab ? "text-sm " : "text-sm" // Increased text size for Arabic
            } ${
              isDarkMode
                ? "bg-transparent  border border-white text-white"
                : "border-gray-300 text-gray-700"
            }`}
            onClick={handleCancel}
            // Attach the click handler
          >
            {" "}
            {isLangArab ? "إلغاء" : "Cancel"}
          </button>
          <button
            onClick={onSubmitFeedback}
            className={`sm:px-14 px-9 sm:py-3 py-2 rounded-md transition-colors ${
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
