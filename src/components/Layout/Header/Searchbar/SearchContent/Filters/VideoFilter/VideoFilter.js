import { useTheme } from "../../../../../ThemeContext/ThemeContext";

export default function VideoFilter({ setSelectedItem,isLangArab, setIsFiltersOpen, selectedItem }) {
  const {isDarkMode} = useTheme()
  return (
    <div
      onClick={() => {
        setSelectedItem("video");
        setIsFiltersOpen("video");
      }}
      className={`px-1.5 py-0.5 rounded-full flex justify-center items-center gap-1 ${
        selectedItem === "video" ? "bg-white" : "bg-none opacity-50"
      }`}
    >
      <div className={`flex items-center ${isLangArab ? "flex-row-reverse" : ""}`}>
      <div>
        <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/video.svg`} alt="" className="w-5" />
      </div>
      <div className={`  text-[10px]   font-500 ${isLangArab ? "mr-0.5" : "ml-0.5"} ${isDarkMode? (selectedItem === "video"?"text-black":"text-white"):" text-black"}`}>{isLangArab?"فيديو":"Video"}</div>
    </div>
    </div>
  );
}






