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

  const contentRef = useRef(null);
  const { isDarkMode } = useTheme(); // Access the dark mode state

  // Close search when the footer opens
  useEffect(() => {
    if (isFooterOpen) {
      setInputClicked(false);
    }
  }, [isFooterOpen]);

  // Manage search open/close state
  useEffect(() => {
    if (inputClicked) {
      isHeaderOpen();
      isSearchOpen();
    } else {
      isSearchClose();
    }
  }, [inputClicked, isHeaderOpen, isSearchOpen, isSearchClose]);

  // Handle click outside to close the input and category
  useEffect(() => {
    function handleClickOutside(event) {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setInputClicked(false);
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
      setIscategory(true);
    }
  }, [SearchResponsive]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={`mobile_s:mr-2 ${SearchResponsive ? "grid" : "sm:grid hidden"} laptop_m:mr-4 mr-4`}>
      <div className="relative" ref={contentRef}>
        <Input
          id="search"
          value={inputValue}
          onClick={() => {
            setInputClicked(true);
            setIscategory(true);
          }}
          onChange={handleInputChange}
          className={`mobile_s:w-[19rem] ${
            inputClicked || iscategory ? "laptop_m:w-[40rem]" : "laptop_m:w-[40rem]"
          } mobile_s:h-9 laptop_m:h-8 border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-white rounded-full pl-16 relative z-[2] ${
            inputValue
              ? "text-black border-none shadow-none"
              : isDarkMode
              ? "text-[#FFFFFFCC]"
              : "text-[#FFFFFF]"
          } ${iscategory || inputClicked ? "bg-opacity-70" : "bg-opacity-15"}`}
        />

        <Props
          inputClicked={inputClicked}
          setInputClicked={setInputClicked}
          setIscategory={setIscategory}
          handleCloseResponsiveSearch={handleCloseResponsiveSearch}
          iscategory={iscategory}
        />

        {iscategory && (
          <Category
            inputClicked={inputClicked}
            setInputClicked={setInputClicked}
          />
        )}

        {inputClicked && (
          <SearchContent iscategory={iscategory} inputClicked={inputClicked} />
        )}
      </div>
    </div>
  );
};

export default Searchbar;
