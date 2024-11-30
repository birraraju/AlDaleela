import filterSvg from "../../../../../../assets/Header/Searchbar/filter.svg"
import DarkfilterSvg from "../../../../../../assets/Header/Searchbar/Darkfilter.svg"
import { useTheme } from "../../../../ThemeContext/ThemeContext";
export default function FilterBtn({ isFiltersOpen, setIsFiltersOpen, setSelectedItem }) {
  const {isLangArab, isDarkMode} = useTheme()
  return (
    <>
      <div
        onClick={() => {
          setIsFiltersOpen("normal");
          setSelectedItem("normal");
        }}
        className={`cursor-pointer ${isLangArab && " ml-1" }`}
      >
        {/* <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/filter.svg"`} alt="" /> */}
        <img src={ isDarkMode ? DarkfilterSvg : filterSvg} alt="" />

      </div>
    </>
  );
}
