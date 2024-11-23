import PhotoSvg from "../../../../../../../assets/Header/Searchbar/photo.svg"
import { useTheme } from "../../../../../ThemeContext/ThemeContext";

export default function PhotoFilter({ setSelectedItem, isLangArab,setIsFiltersOpen, selectedItem }) {
  const {isDarkMode} = useTheme();
  return (
    <div
      onClick={() => {
        setSelectedItem("photo");
        setIsFiltersOpen("photo");
      }}
      className={`px-1.5 py-0.5 rounded-full flex justify-center items-center gap-0.5 ${
        selectedItem === "photo" ? "bg-white" : "bg-none opacity-50"
      }`}
    >
<div className={`flex items-center ${isLangArab ? "flex-row-reverse" : ""}`}>
  <div>
    {/* <img src="/Header/Searchbar/photo.svg" alt="" className="w-6" /> */}
    <img src={PhotoSvg} alt="" className="w-5" />
  </div>
  <div className={`  text-[10px] font-omnes font-500 ${isLangArab ? "mr-0.5" : "ml-0.5"} ${isDarkMode?(selectedItem === "photo" ?"text-black":"text-white"):" text-black"}`}>{isLangArab ? "صوت" : "Photo"}</div>
</div>
    </div>
  );
}
