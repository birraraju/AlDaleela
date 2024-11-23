import { useTheme } from "../../../../../ThemeContext/ThemeContext";

export default function AudioFilter({ setSelectedItem, isLangArab,setIsFiltersOpen, selectedItem }) {
  const {isDarkMode} = useTheme()
  return (
    <div
      onClick={() => {
        setSelectedItem("audio");
        setIsFiltersOpen("audio");
      }}
      className={`px-1.5 py-0.5 rounded-full flex justify-center items-center gap-1 ${
        selectedItem === "audio" ? "bg-white" : "bg-none opacity-50"
      }`}
    >
      <div className={`flex items-center ${isLangArab ? "flex-row-reverse" : ""}`}>
      <div>
        <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/audio.svg`} alt="" className="w-5" />
      </div>
      <div className={` text-[10px] font-omnes font-500 ${isLangArab ? "mr-0.5" : "ml-0.5"} ${isDarkMode ? (selectedItem === "audio" ?"text-[#000000]":"text-white"):" text-[#000000]"}`}>{isLangArab?"صوت":"Audio"}</div>
    </div>
    </div>
  );
}
