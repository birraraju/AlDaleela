import { useTheme } from "../../../../../ThemeContext/ThemeContext";

export default function AudioFilter({ setSelectedItem, isLangArab,setIsFiltersOpen, selectedItem }) {
  const {isDarkMode} = useTheme()
  return (
    <div
      onClick={() => {
        setSelectedItem("audio");
        setIsFiltersOpen("audio");
      }}
      className={`px-2 py-1 rounded-full flex justify-center items-center gap-1 ${
        selectedItem === "audio" ? "bg-white" : "bg-none opacity-50"
      }`}
    >
      <div className={`flex items-center ${isLangArab ? "flex-row-reverse" : ""}`}>

      <div>
        <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/audio.svg`} alt="" className="w-6" />
      </div>
      <div className={`${isLangArab ? "mr-2" : "ml-2"} ${isDarkMode ? (selectedItem === "audio" ?"text-black":"text-white"):" text-black"}`}>{isLangArab?"صوت":"Audio"}</div>
    </div>
    </div>
  );
}
