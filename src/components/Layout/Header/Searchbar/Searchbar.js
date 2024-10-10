import { Input } from "../../../../components/ui/input";
import { useEffect, useRef, useState } from "react";
import Category from "./Category/Category";
import Props from "./Props/Props";
import SearchContent from "./SearchContent/SearchContent";

export default function Searchbar({ isSearchOpen,isSearchClose,isFooterOpen,isHeaderOpen}) {
  const [inputValue, setInputValue] = useState("");
  const [inputClicked, setInputClicked] = useState(false);
  const [iscategory, setIscategory] = useState(false);

  const contentRef = useRef(null);

  useEffect(()=>{
    if(isFooterOpen){
      setInputClicked(false)
    }
  },[isFooterOpen])

  useEffect(()=>{
    if(inputClicked){
      isHeaderOpen();
      isSearchOpen()
    }
    if(!inputClicked){
      isSearchClose()
    }
  },[inputClicked])


  useEffect(() => {
    function handleClickOutside(event) {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setInputClicked(false); // Close when clicking outside
        setIscategory(false); // Optionally close category as well
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="mobile_s:mr-2 laptop_m:mr-4 mr-4">
      <div className="relative" ref={contentRef}>
        <Input
          id="search"
          value={inputValue}
          onClick={() => {
            setInputClicked(true);
            setIscategory(true);
          }}
          onChange={handleInputChange}
          className={`mobile_s:w-[25rem] laptop_m:w-[45rem] mobile_s:h-9 laptop_m:h-10 border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-white bg-opacity-5 rounded-full pl-16 relative z-[2] ${
            inputValue ? "text-black border-none shadow-none" : "text-white"
          }`}
        />

        <Props
          inputClicked={inputClicked}
          setInputClicked={setInputClicked}
          setIscategory={setIscategory}
        />

        {iscategory && (
          <Category
            inputClicked={inputClicked}
            setInputClicked={setInputClicked}
          />
        )}

        {inputClicked && <SearchContent />}
      </div>
    </div>
  );
}
