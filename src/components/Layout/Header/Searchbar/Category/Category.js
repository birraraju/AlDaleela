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
      if(className == "All Categories") {
        layer.definitionExpression = `1=1`;
      } else {
        layer.definitionExpression = `Class = '${className}'`;
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
      const allCategoryClasses = new Set(["All Categories"]);
 
      for (const layerConfig of config.featureServices) {
        const featureLayer = new FeatureLayer({
          url: layerConfig.url,
          outFields: ["*"],
        });
 
        try {
          const query = featureLayer.createQuery();
          query.where = "1=1";
          query.returnGeometry = false;
 
          query.outStatistics = [
            {
              onStatisticField: "Class",
              outStatisticFieldName: "uniqueClass",
              statisticType: "count"
            }
          ];
          query.groupByFieldsForStatistics = ["Class"];
 
          const results = await featureLayer.queryFeatures(query);
          const features = results.features;
 
          features.forEach(feature => {
            if (feature.attributes.Class) {
              allCategoryClasses.add(feature.attributes.Class);
            }
          });
        } catch (error) {
          console.error(`Error querying layer "${layerConfig.name}":`, error);
        }
      }
 
      setCategoryClasses([...allCategoryClasses]);
    };
 
    loadCategoryClasses();
  }, []);
 
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
    className="absolute bottom-1 right-1.5 z-[2]"
  >
    <button
      onClick={() => {
        // Prevents dropdown from closing when clicking on the button
        setIsOpen(!isOpen);
        setShowSearchContent(false);
        setInputValue("");
      }}
      className={`rounded-full font-omnes font-500 w-[79px] mobile_s:w-[90px] tab:w-[90px] laptop_s:w-[90px] laptop_s:rounded-3xl laptop_m:rounded-full flex text-xs justify-evenly items-center mobile_s:px-2 laptop_s:px-1 laptop_m:px-1 laptop_s:py-3 py-0.5 sm:h-6 h-7 bg-[#C8C8C899] bg-opacity-50 ${
        isDarkMode ? "text-white" : "text-[#000000]"
      } z-[10] relative`} // Added relative positioning and z-index
    >
      {(selectedCategory === "Category") ? (isLangArab ? "الفئة" : selectedCategory) : selectedCategory && selectedCategory?.length > 7 ? `${selectedCategory.substring(0, 8)}` : selectedCategory}
      {isOpen ? <FaCaretUp className="ml-2" /> : <FaCaretDown className="ml-2" />}
    </button>

    {isOpen && (
      <div
        className="absolute w-[100px] h-44"
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