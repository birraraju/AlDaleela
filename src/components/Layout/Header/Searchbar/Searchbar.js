import { Input } from "../../../ui/input"; // Adjust the import path as needed
import { useEffect, useRef, useState } from "react";
import Category from "./Category/Category"; // Adjust the import path as needed
import Props from "./Props/Props"; // Adjust the import path as needed
import SearchContent from "./SearchContent/SearchContent"; // Adjust the import path as needed
import { useTheme } from "../../ThemeContext/ThemeContext"; // Adjust the import path as needed

const Searchbar = ({
  isSearchOpen,
  isSearchClose,
  isFooterOpen,
  isHeaderOpen,
  SearchResponsive,
  handleCloseResponsiveSearch
}) => {
  const [inputValue, setInputValue] = useState("");
  const [inputClicked, setInputClicked] = useState(false);
  const [iscategory, setIscategory] = useState(false);
  const [ShowSearchContent,setShowSearchContent]= useState(false)

  const contentRef = useRef(null);
  const { isDarkMode,isLangArab } = useTheme(); // Access the dark mode state

  // Close search when the footer opens
  useEffect(() => {
    if (isFooterOpen) {
      setShowSearchContent(false)
      setInputClicked(false);

    }
  }, [isFooterOpen]);

  

  // Manage search open/close state
  useEffect(() => {
    if (inputClicked) {
      if(typeof isHeaderOpen === "function"){
        isHeaderOpen();
      }
      if(typeof isSearchOpen === "function"){
        isSearchOpen();
      }
    } else {
      if(typeof isSearchClose === "function"){
        isSearchClose();
      }
    }
  }, [inputClicked, isHeaderOpen, isSearchOpen, isSearchClose]);

  // Handle click outside to close the input and category
  useEffect(() => {
    function handleClickOutside(event) {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setInputClicked(false);
        setShowSearchContent(false)
        setInputValue("")
        setIscategory(false);

      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Responsive handling
  useEffect(() => {
    if (SearchResponsive) {
      setInputClicked(true);
      setShowSearchContent(true)
      setIscategory(true);
    }
  }, [SearchResponsive]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div dir={isLangArab && "rtl"} className={`mobile_s:mr-2 laptop_s:mr-0.5 ${SearchResponsive ? "grid" : "sm:grid hidden"} laptop_m:mr-2 mr-4`}>
      <div className="relative" ref={contentRef}>
        <Input
          id="search"
          value={inputValue?.length > 18 ? `${inputValue.substring(0, 17)}` : inputValue}
          onClick={() => {
            setInputClicked(true);
            setIscategory(true);
            setShowSearchContent(true)
          }}
          onChange={handleInputChange}
          className={`mobile_s:w-[22rem] ${isLangArab?"pr-14":"pl-14"}   mobile_m:w-[23rem] mobile_l:w-[27rem] tab:w-[20rem] tab_s:w-[22rem]   tab_m:w-[24rem] tab_l:w-[24rem] tab_l_1:w-[28rem]  laptop_s:w-[18rem] laptop_m:w-[22rem] mobile_s:h-9 laptop_s:h-7 laptop_m:h-8  border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0    relative z-[2] ${
             isDarkMode
              ? "text-white"
              : "text-black border-none shadow-none"
          } ${(inputClicked) ? " bg-transparent bg-opacity-25" : isDarkMode? (iscategory?"bg-gray-600 rounded-full bg-opacity-50 ": " bg-white rounded-full bg-opacity-25") : (iscategory?"bg-white rounded-full bg-opacity-80 ": " bg-white rounded-full bg-opacity-25")}`}
        />

        <Props
          inputClicked={inputClicked}
          setInputValue={setInputValue}
        setShowSearchContent={setShowSearchContent}
          setInputClicked={setInputClicked}
          setIscategory={setIscategory}
          handleCloseResponsiveSearch={handleCloseResponsiveSearch}
          iscategory={iscategory}
        />

        {iscategory && (
          <Category
          setInputValue={setInputValue}
          setShowSearchContent={setShowSearchContent}
            inputClicked={inputClicked}
            setInputClicked={setInputClicked}
            isLangArab={isLangArab}
          />
        )}

        { ShowSearchContent && (
          <SearchContent iscategory={iscategory} inputClicked={inputClicked} setIscategory={setIscategory} inputValue={inputValue} setInputValue={setInputValue} setInputClicked={setInputClicked}/>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
