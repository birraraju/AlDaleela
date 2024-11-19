import { Label } from "../../../../ui/label";
import { useAuth } from "../../../../../Providers/AuthProvider/AuthProvider";

export default function Props({
  inputClicked,
  setInputValue,
  setInputClicked,
  setIscategory,
  handleCloseResponsiveSearch,
  iscategory
}) {
  const {contextMapView,setIsEditPOI} = useAuth();
  return (
    <>
      {/* Search Icon */}
      <div className="relative z-[2]">
        <Label htmlFor="search" className="absolute mobile_s:-top-7 laptop_m:-top-[26px] left-3">
          <img
            src={`${process.env.PUBLIC_URL}/Header/Searchbar/search-${inputClicked || iscategory ? "black.svg" : "white.svg"}`}
            alt=""
            className="h-4"
          />
        </Label>

        {/* Line */}
        <Label htmlFor="search" className="absolute mobile_s:-top-[30px] laptop_m:-top-[28px] left-11">
          <img
            src={`${process.env.PUBLIC_URL}/Header/Searchbar/line-${inputClicked || iscategory ? "black.svg" : "white.svg"}`}
            alt=""
          />
        </Label>

        {/* Close */}
        {(inputClicked || iscategory) && (
          <div
            onClick={() => {
              setInputClicked(false);
              setInputValue("")
              setIscategory(false);
              handleCloseResponsiveSearch();
              setIsEditPOI(false)
              contextMapView.graphics.removeAll();
            }}
            className="absolute mobile_s:-top-7 laptop_m:-top-[26px] sm:right-[31%] right-32 cursor-pointer"
          >
            <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/close.svg`} alt="" className="w-5" />
          </div>
        )}

        {/* Line */}
        {(inputClicked || iscategory) && (
          <Label htmlFor="search" className="absolute mobile_s:-top-[30px] laptop_m:-top-[28px] sm:right-[30%] right-28">
            <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/line-black.svg`} alt="" />
          </Label>
        )}
      </div>
    </>
  );
}
