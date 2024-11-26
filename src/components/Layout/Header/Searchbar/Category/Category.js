import { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import { useAuth } from "../../../../../Providers/AuthProvider/AuthProvider";
import config from '../../../../Common/config'; // Import your config file
import { useTheme } from "../../../ThemeContext/ThemeContext";

export default function Category({setInputValue,setShowSearchContent, inputClicked, isLangArab, setInputClicked }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [categoryClasses, setCategoryClasses] = useState([]);
  const { contextMapView } = useAuth();
  const {isDarkMode} = useTheme()

  useEffect(()=>{
    if(inputClicked){
      setIsOpen(false)
      setSelectedCategory("Category")
    }
  },[inputClicked])

  const handleCategorySelect = (categoryName) => {
    // contextMapView.map.layers.items.forEach(function (layer) {
    //   layer.definitionExpression = `Class = '${categoryName}'`;
    // });
    // Extract layer names and class names from the config
    const layerNames = config.featureServices.map(service => service.name);
    
    // Loop through all layers in the map view
    contextMapView.map.layers.items.forEach(layer => {
      // Set the definition expression for each matching layer in the config
      config.featureServices.forEach(service => {
        setDefinitionExpressionForLayers(layer, categoryName, layerNames);
      });
    });
    setSelectedCategory(categoryName); // Set selected category
    setIsOpen(false); // Close dropdown after selection
  };

  const setDefinitionExpressionForLayers = (layer, className, layerNames) => {
    // Check if the current layer's name is in the config layer names
    if (layerNames.includes(layer.title)) {
      if(className == "All Categories"){
        layer.definitionExpression = `1=1`;
      }
      else{
        // Set the definition expression for the matched layer
        layer.definitionExpression = `Class = '${className}'`;
      }
    }
  
    // If the layer has sublayers, iterate through them
    if (layer.sublayers && layer.sublayers.length > 0) {
      layer.sublayers.forEach(subLayer => {
        setDefinitionExpressionForLayers(subLayer, className, layerNames); // Recursive call for sublayers
      });
    }
  };

  useEffect(() => {
    const loadCategoryClasses = async () => {
      const allCategoryClasses = new Set(["All Categories"]); // Start with "All Categories"
  
      for (const layerConfig of config.featureServices) {
        const featureLayer = new FeatureLayer({
          url: layerConfig.url,
          outFields: ["*"],
        });
  
        try {
          // Query only unique values for the "Class" attribute
          const query = featureLayer.createQuery();
          query.where = "1=1"; // Retrieve all records
          query.returnGeometry = false;
  
          // Use outStatistics to get unique "Class" values
          query.outStatistics = [
            {
              onStatisticField: "Class",
              outStatisticFieldName: "uniqueClass",
              statisticType: "count" // Any statistic type works here for unique values
            }
          ];
          query.groupByFieldsForStatistics = ["Class"]; // Group by "Class" to get unique values
  
          const results = await featureLayer.queryFeatures(query);
          const features = results.features;
  
          // Collect unique classes
          features.forEach(feature => {
            if (feature.attributes.Class) {
              allCategoryClasses.add(feature.attributes.Class);
            }
          });
        } catch (error) {
          console.error(`Error querying layer "${layerConfig.name}":`, error);
        }
      }
  
      // Convert Set to Array and update state
      setCategoryClasses([...allCategoryClasses]);
    };
  
    loadCategoryClasses();
  }, []);
  

  return (
    <div
      onClick={() => setInputClicked(false)}
      className="absolute bottom-1 right-1.5 z-[2]"
    >
      <button
        onClick={() => {setIsOpen(!isOpen);setShowSearchContent(false);setInputValue("")}}
        className={`rounded-full   font-500 w-[79px] mobile_s:w-[90px]  tab:w-[90px] laptop_s:w-[80px] laptop_l:w-[90px] laptop_s:rounded-3xl laptop_m:rounded-full flex text-xs justify-evenly items-center mobile_s:px-2 laptop_s:px-1 laptop_m:px-1 laptop_s:py-3 py-0.5 sm:h-6 h-7 bg-[#C8C8C899] bg-opacity-50 ${isDarkMode?"text-white":"text-[#000000]"} `}
      >
        {(selectedCategory === "Category") ? (isLangArab ? "الفئة" : selectedCategory) : selectedCategory && selectedCategory?.length > 7 ? `${selectedCategory.substring(0, 8)}` : selectedCategory }
        {isOpen ? (
          <FaCaretUp className="ml-2" />
        ) : (
          <FaCaretDown className="ml-2" />
        )}
      </button>

      {isOpen && (
        <div className={`absolute w-24  h-44 border py-2 rounded-lg ${isDarkMode?" bg-black bg-opacity-60 border-none":"bg-white"} shadow-lg overflow-y-scroll  mt-3`}>
          <div className=" ">
            {categoryClasses.map((category, index) => (
              <div
                key={index} // Using index as key since category names may not be unique
                className={`text-[11px]   font-500 overflow-x-hidden cursor-pointer px-3 py-0.5  ${isDarkMode?"text-white hover:bg-[#C8C8C899] ":"text-[#000000] hover:bg-gray-100"}`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

