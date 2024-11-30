import { Label } from "../../../../ui/label";
import { useAuth } from "../../../../../Providers/AuthProvider/AuthProvider";
import { useTheme } from "../../../ThemeContext/ThemeContext";
export default function Props({
  inputClicked,
  setInputValue,
  setInputClicked,
  setIscategory,
  handleCloseResponsiveSearch,
  setShowSearchContent,
  iscategory
}) {
  const {isLangArab, isDarkMode} = useTheme()
  const {contextMapView,setIsEditPOI} = useAuth();
  return (
    <>
      {/* Search Icon */}
      <div dir={ isLangArab && "rtl"} className="relative flex justify-between items-center z-[2]">
        <Label htmlFor="search" className={`absolute mobile_s:-top-7 laptop_s:-top-[24px] laptop_m:-top-[24px] ${isLangArab?"right-3":"left-3"}`}>
          <img
            src={`${process.env.PUBLIC_URL}/Header/Searchbar/search-${inputClicked || iscategory ? isDarkMode?"white.svg": "black.svg" : "white.svg"}`}
            alt=""
            className="h-4"
          />
        </Label>

        {/* Line */}
        <Label htmlFor="search" className={`absolute mobile_s:-top-[30px] laptop_s:-top-[26px] laptop_m:-top-[28px] ${isLangArab?"right-11":"left-11"}`}>
          <img
            src={`${process.env.PUBLIC_URL}/Header/Searchbar/line-${inputClicked || iscategory ? isDarkMode?"white.svg": "black.svg" : "white.svg"}`}
            alt=""
          />
        </Label>

        {/* Close */}
        {(inputClicked || iscategory) && (
          <div
            onClick={() => {
              // setInputClicked(false);
              setInputValue("")
              // setIscategory(false);
              handleCloseResponsiveSearch();
              setIsEditPOI(false)
              contextMapView.graphics.removeAll();
              // setShowSearchContent(false)
            }}
            className={`absolute mobile_s:-top-7 laptop_s:-top-[26px]  laptop_m:-top-[26px] ${isLangArab?"sm:left-[31%] left-32":"sm:right-[31%] right-32"} cursor-pointer`}
          >
            <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/close.svg`} alt="" className="w-5 laptop_s:w-6 laptop_m:w-6" />
          </div>
        )}

        {/* Line */}
        {(inputClicked || iscategory) && (
          <Label htmlFor="search" className={`absolute mobile_s:-top-[30px] laptop_s:-top-[25px] laptop_m:-top-[28px] ${isLangArab?"sm:left-[30%] left-28":"sm:right-[30%] right-28"}`}>
            <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/line-${isDarkMode?"white.svg": "black.svg"}`} alt="" />
          </Label>
        )}
      </div>
    </>
  );
}
