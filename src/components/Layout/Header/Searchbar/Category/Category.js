import { useEffect, useState, useRef } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import { useAuth } from "../../../../../Providers/AuthProvider/AuthProvider";
import config from '../../../../Common/config';
import { useTheme } from "../../../ThemeContext/ThemeContext";
 
export default function Category({setInputValue, setShowSearchContent, inputClicked, isLangArab, setInputClicked }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [categoryClasses, setCategoryClasses] = useState([]);
  const { contextMapView } = useAuth();
  const { isDarkMode } = useTheme();
  const scrollContainerRef = useRef(null);
  const [scrollInfo, setScrollInfo] = useState({ scrollTop: 0, scrollHeight: 0, clientHeight: 0 });
 
  useEffect(() => {
    if(inputClicked) {
      setIsOpen(false);
      setSelectedCategory("Category");
    }
  }, [inputClicked]);
 
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setScrollInfo({ scrollTop, scrollHeight, clientHeight });
  };
 
  const handleCategorySelect = (categoryName) => {
    const layerNames = config.featureServices.map(service => service.name);
   
    contextMapView.map.layers.items.forEach(layer => {
      config.featureServices.forEach(service => {
        setDefinitionExpressionForLayers(layer, categoryName, layerNames);
      });
    });
    setSelectedCategory(categoryName);
    setIsOpen(false);
  };
 
  const setDefinitionExpressionForLayers = (layer, className, layerNames) => {
    if (layerNames.includes(layer.title)) {
      const classField = isLangArab ? "ClassAr" : "Class";
      if (className === (isLangArab ? "جميع الفئات" : "All Categories")) {
        layer.definitionExpression = `1=1`;
      } else {
        if(isLangArab){
          layer.definitionExpression = `${classField} = N'${className}'`;   
        }
        else{
          layer.definitionExpression = `${classField} = '${className}'`;          
        }
      }
    }
 
    if (layer.sublayers && layer.sublayers.length > 0) {
      layer.sublayers.forEach(subLayer => {
        setDefinitionExpressionForLayers(subLayer, className, layerNames);
      });
    }
  };
 
  useEffect(() => {
    const loadCategoryClasses = async () => {
      const allCategoryClasses = new Set([isLangArab ? "جميع الفئات" : "All Categories"]);
  
      for (const layerConfig of config.featureServices) {
        const featureLayer = new FeatureLayer({
          url: layerConfig.url,
          outFields: ["*"],
        });
  
        try {
          const query = featureLayer.createQuery();
          query.where = "1=1";
          query.returnGeometry = false;
  
          // Use isLangArab to set the fields dynamically
          const fieldName = isLangArab ? "ClassAr" : "Class";
  
          query.outStatistics = [
            {
              onStatisticField: fieldName,
              outStatisticFieldName: "uniqueClass",
              statisticType: "count",
            },
          ];
          query.groupByFieldsForStatistics = [fieldName];
  
          const results = await featureLayer.queryFeatures(query);
          const features = results.features;
  
          // Add the correct attribute based on the language
          features.forEach(feature => {
            const categoryClass = isLangArab 
              ? feature.attributes.ClassAr 
              : feature.attributes.Class;
  
            if (categoryClass) {
              allCategoryClasses.add(categoryClass);
            }
          });
        } catch (error) {
          console.error(`Error querying layer "${layerConfig.name}":`, error);
        }
      }
  
      setCategoryClasses([...allCategoryClasses]);
    };
  
    loadCategoryClasses();
  }, [isLangArab]); // Add isLangArab as a dependency
  
 
  const getScrollThumbHeight = () => {
    const { scrollHeight, clientHeight } = scrollInfo;
    const scrollRatio = clientHeight / scrollHeight;
    const thumbHeight = Math.max(scrollRatio * clientHeight, 28);
    return thumbHeight;
  };
 
  const getScrollThumbPosition = () => {
    const { scrollTop, scrollHeight, clientHeight } = scrollInfo;
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    const thumbPosition = scrollRatio * (clientHeight - getScrollThumbHeight());
    return thumbPosition;
  };
 
  return (
    <div
    onClick={() => setInputClicked(false)}
    className={`absolute bottom-1 ${isLangArab?"left-1.5":"right-1.5"} z-[2]`}
  >
    <button
      onClick={() => {
        // Prevents dropdown from closing when clicking on the button
        setIsOpen(!isOpen);
        setShowSearchContent(false);
        setInputValue("");
      }}
      className={`rounded-full font-omnes font-500 w-[79px] mobile_s:w-[90px] tab:w-[88px] tab_m:w-[97px] tab_l:w-[102px] laptop_s:w-[75px] laptop_m:w-[90px] laptop_s:rounded-3xl laptop_m:rounded-full flex text-xs justify-evenly items-center mobile_s:px-2 laptop_s:px-1 laptop_m:px-1 laptop_s:py-1  laptop_m:py-3 py-0.5 sm:h-5 tab:h-7  laptop_s:h-5 laptop_m:h-6  h-7 bg-[#C8C8C899] bg-opacity-50 ${
        isDarkMode ? "text-white" : "text-[#000000]"
      } z-[10] relative`} // Added relative positioning and z-index
    >
      {(selectedCategory === "Category") ? (isLangArab ? "الفئة" : selectedCategory) : selectedCategory && selectedCategory?.length > 7 ? `${selectedCategory.substring(0, isLangArab?10:8)}` : selectedCategory}
      {isOpen ? <FaCaretUp className={`${isLangArab?"mr-2":"ml-2"}`} /> : <FaCaretDown className={`${isLangArab?"mr-2":"ml-2"}`} />}
    </button>

    {isOpen && (
      <div
        className={`absolute ${ isLangArab? " left-0.5 sm:left-0 ":" right-0.5 sm:right-0"}  w-[100px] h-44`}
        style={{
          top: '2.5rem', // Adjust the dropdown’s position relative to the button
          zIndex: 9, // Ensure dropdown appears below the button
        }}
      >
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className={`absolute w-full h-full border py-2 rounded-lg ${
            isDarkMode ? "bg-black bg-opacity-60 border-none" : "bg-white"
          } shadow-lg overflow-y-scroll`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="pr-2 ">
            {categoryClasses.map((category, index) => (
              <div
                key={index}
                className={`text-[11px] font-omnes font-500 cursor-pointer px-3 py-0.5 ${
                  isDarkMode
                    ? "text-white hover:bg-[#C8C8C899]"
                    : "text-[#000000] hover:bg-gray-100"
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
        <div
          className="absolute right-0.5 top-2 bottom-0  w-[3px]"
          style={{
            backgroundColor: ' transparent',
            borderRadius: '9999px',
          }}
        >
          <div
            className="absolute w-full rounded-full bg-gray-400"
            style={{
              height: `${getScrollThumbHeight()}px`,
              top: `${getScrollThumbPosition()}px`,
              transition: 'top 0.1s',
            }}
          />
        </div>
      </div>
    )}
  </div>
  );
}