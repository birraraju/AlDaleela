import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useTheme } from "../../../../ThemeContext/ThemeContext"; // Import ThemeContext
import "../Stack.css"; // Import CSS file
import config from '../../../../../Common/config'; // Import your config file

export default function LayersList({ onClose, mapview }) {
  const layersListRef = useRef(null);
  const { isDarkMode, isLangArab } = useTheme(); // Access isDarkMode and language from context
  const [layerVisibility, setLayerVisibility] = useState({});
  const [parentVisibility, setParentVisibility] = useState({});
  const [expandedParent, setExpandedParent] = useState({});

 // Set initial visibility from the configuration file and update when language changes
useEffect(() => {
  const initialParentVisibility = {};
  const initialLayerVisibility = {};

  // Choose the correct language configuration based on isLangArab
  const selectedLanguageConfig = isLangArab
    ? config.layerListServices.arabic
    : config.layerListServices.english;

  selectedLanguageConfig.forEach((category) => {
    initialParentVisibility[category.parent.name] = category.parent.visible;
    category.children.forEach((child) => {
      initialLayerVisibility[child.url] = child.visible;
    });
  });

  setParentVisibility(initialParentVisibility);
  setLayerVisibility(initialLayerVisibility);
}, [isLangArab]); // Add isLangArab as a dependency

  // Toggle visibility of individual layers
  const toggleLayerVisibility = (layerName) => {
    setLayerVisibility((prevVisibility) => {
      const newVisibility = !prevVisibility[layerName];
  
      // Iterate through all layers in the map
      mapview.map.layers.items.forEach((layer) => {
        // Check if the parent layer matches by title (partial match)
        if (layer.url && layer.url == layerName) {
          // Update the parent layer visibility
          layer.visible = newVisibility;
        }
  
        // Check for sublayers in the parent layer
        if (layer.sublayers) {
          // Iterate through all sublayers
          layer.sublayers.forEach((sublayer) => {
            if (sublayer.url && sublayer.url == layerName) {
              // Update the visibility of the matching sublayer
              sublayer.visible = newVisibility;
            }
  
            // Recursively check nested sublayers
            const updateNestedSublayers = (nestedSublayer) => {
              if (nestedSublayer.sublayers) {
                nestedSublayer.sublayers.forEach((nested) => {
                  if (nested.url && nested.url == layerName) {
                    nested.visible = newVisibility;
                  }
                  // Further recursive check for deeply nested sublayers
                  if (nested.sublayers) {
                    updateNestedSublayers(nested);
                  }
                });
              }
            };
  
            // Call the recursive function
            updateNestedSublayers(sublayer);
          });
        }
      });
  
      // Update the state to reflect the new visibility
      return { ...prevVisibility, [layerName]: newVisibility };
    });
  };

  // Toggle visibility of parent layers and their children
  const toggleParentVisibility = (parentName, children, layerName) => {
    setParentVisibility((prevVisibility) => {
      const newParentVisibility = !prevVisibility[parentName];

      // Iterate through all layers in the map
      mapview.map.layers.items.forEach((layer) => {
        // Check if the parent layer matches by title (partial match)
        if (layer.url && layer.url == layerName) {
          // Update the parent layer visibility
          layer.visible = newParentVisibility;
        }
  
        // Check for sublayers in the parent layer
        if (layer.sublayers) {
          // Iterate through all sublayers
          layer.sublayers.forEach((sublayer) => {
            if (sublayer.url && sublayer.url == layerName) {
              // Update the visibility of the matching sublayer
              sublayer.visible = newParentVisibility;
            }
  
            // Recursively check nested sublayers
            const updateNestedSublayers = (nestedSublayer) => {
              if (nestedSublayer.sublayers) {
                nestedSublayer.sublayers.forEach((nested) => {
                  if (nested.url && nested.url == layerName) {
                    nested.visible = newParentVisibility;
                  }
                  // Further recursive check for deeply nested sublayers
                  if (nested.sublayers) {
                    updateNestedSublayers(nested);
                  }
                });
              }
            };
  
            // Call the recursive function
            updateNestedSublayers(sublayer);
          });
        }
      });

      // Update child layers' visibility state
      const updatedLayerVisibility = { ...layerVisibility };
      children.forEach((child) => {
        updatedLayerVisibility[child.url] = newParentVisibility;
      });

      //setLayerVisibility(updatedLayerVisibility);
      return { ...prevVisibility, [parentName]: newParentVisibility };
    });
  };

  // Toggle parent expansion
  const toggleParent = (parentName) => {
    setExpandedParent((prevState) => ({
      ...prevState,
      [parentName]: !prevState[parentName],
    }));
  };

  // Render the layer list
  const renderLayerList = (layers) => {
    return (
      <ul>
        {layers.map((category) => (
          <li key={category.parent.name}>
            <div
              className={` cursor-pointer ${isLangArab ? "text-right" : "text-left"}`}
            >
              <span
                className="mr-2"
                onClick={() => toggleParent(category.parent.name)}
              >
                {expandedParent[category.parent.name] ? "▼" : "▶"}
              </span>

              <input
                type="checkbox"
                checked={parentVisibility[category.parent.name]}
                onChange={() => toggleParentVisibility(category.parent.name, category.children, category.parent.url)}
                className="mr-2"
              />
              {category.parent.name}
            </div>

            {expandedParent[category.parent.name] && (
              <ul className="ml-4">
                {category.children.map((child) => (
                  <li key={child.url} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={layerVisibility[child.url]}
                      onChange={() => toggleLayerVisibility(child.url)}
                      className="hidden peer"
                      id={`checkbox-${child.url}`}
                    />
                    <span
                      className={`${
                        isLangArab ? "ml-2" : "mr-2"
                      } h-4 w-4 rounded-sm border border-gray-400 bg-white peer-checked:bg-[#69A9C2] 
                                 flex items-center justify-center transition-colors duration-300 cursor-pointer`}
                      onClick={() => toggleLayerVisibility(child.url)}
                    >
                      {layerVisibility[child.url] && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 font-bold text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                    <label htmlFor={`checkbox-${child.url}`}>{child.name}</label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div dir={isLangArab && "rtl"} className="flex items-center justify-center z-10">
      <div
        ref={layersListRef}
        className={`fixed ${isLangArab ? "left-12" : "right-12"} top-32 sm:top-14 laptop_s:top-20 h-[430px] p-4 rounded-lg shadow-lg w-96 transition-colors duration-300
          ${isDarkMode ? "bg-[rgba(96,96,96,0.8)] text-white" : "bg-white bg-opacity-95 text-black"}`}
      >
        <div>
          <h1 className={`text-[16px] font-medium ${isLangArab ? "text-right" : "text-left"}`}>
            {isLangArab ? "قائمة الطبقات" : "Layer List"}
          </h1>
          <button
            className={`absolute top-4 ${isLangArab ? "left-4" : "right-4"} ${
              isDarkMode ? "text-[#FFFFFFFF] text-opacity-80" : "text-gray-800"
            }`}
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div
          className={`my-2 h-[1px] w-full transition-colors duration-300 ${
            isDarkMode ? "bg-white bg-opacity-50" : "bg-black bg-opacity-20"
          }`}
        ></div>
        <div>
        <div>
        {isLangArab
          ? renderLayerList(config.layerListServices.arabic)
          : renderLayerList(config.layerListServices.english)}
      </div>
        </div>
      </div>
    </div>
  );
}
