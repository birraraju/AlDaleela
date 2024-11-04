import { useEffect, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import { useAuth } from "../../../../../Providers/AuthProvider/AuthProvider";
import config from '../../../../Common/config'; // Import your config file

export default function Category({ inputClicked, isLangArab, setInputClicked }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [categoryClasses, setCategoryClasses] = useState([]);
  const { contextMapView } = useAuth();

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
      // Set the definition expression for the matched layer
      layer.definitionExpression = `Class = '${className}'`;
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
      const allCategoryClasses = new Set(); // Use a Set to avoid duplicates

      // Loop through each layer in the configuration
      for (const layerConfig of config.featureServices) {
        const featureLayer = new FeatureLayer({
          url: layerConfig.url,
          outFields: ["*"],
        });

        try {
          const query = featureLayer.createQuery();
          query.where = "1=1"; // Fetch all records
          query.returnGeometry = false;
          query.outFields = ["*"];
          
          const results = await featureLayer.queryFeatures(query);
          const features = results.features;

          // Collect unique category classes from the features
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
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full flex justify-center items-center mobile_s:px-2 laptop_m:px-4 py-2 sm:h-6 h-7 bg-white bg-opacity-50 text-black `}
      >
        {(selectedCategory === "Category") ? (isLangArab ? "الفئة" : selectedCategory) : selectedCategory}
        {isOpen ? (
          <FaCaretUp className="ml-2" />
        ) : (
          <FaCaretDown className="ml-2" />
        )}
      </button>

      {isOpen && (
        <div className="absolute w-28 h-44 border rounded bg-white shadow-lg overflow-y-scroll categories-scroll mt-1">
          <div>
            {categoryClasses.map((category, index) => (
              <div
                key={index} // Using index as key since category names may not be unique
                className="text-base p-2 cursor-pointer text-black hover:bg-gray-100"
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

