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
      className={`px-2 py-1 rounded-full flex justify-center items-center gap-1 ${
        selectedItem === "photo" ? "bg-white" : "bg-none opacity-50"
      }`}
    >
<div className={`flex items-center ${isLangArab ? "flex-row-reverse" : ""}`}>
  <div>
    {/* <img src="/Header/Searchbar/photo.svg" alt="" className="w-6" /> */}
    <img src={PhotoSvg} alt="" className="w-6" />
  </div>
  <div className={`${isLangArab ? "mr-2" : "ml-2"} ${isDarkMode?"text-white":" text-black"}`}>{isLangArab ? "صوت" : "Photo"}</div>
</div>
    </div>
  );
}
