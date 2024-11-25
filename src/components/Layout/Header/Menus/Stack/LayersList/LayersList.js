import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useTheme } from "../../../../ThemeContext/ThemeContext"; // Import ThemeContext
import "../Stack.css"; // Import CSS file
import config from '../../../../../Common/config'; // Import your config file

export default function LayersList({ onClose, mapview }) {
  const layersListRef = useRef(null);
  const { isDarkMode, isLangArab } = useTheme(); // Access isDarkMode and language from context
  const [layerVisibility, setLayerVisibility] = useState({});
  const layersRef = useRef({}); // Store references to layers for easy access
  console.log("Layer List:", config)

  useEffect(() => {
    // Filter existing WebMap layers based on config and set visibility control
    const mapLayers = mapview.map.layers;
    config.layerListServices.forEach((service) => {
      const layer = mapLayers.find((layer) => layer.title === service.name);
      if (layer) {
        layersRef.current[service.name] = layer; // Store each layer in layersRef
      }
    });

    // Set initial visibility state for each layer based on the config (use the 'visible' property from config)
    const initialVisibility = Object.fromEntries(
      config.layerListServices.map((service) => [
        service.name,
        service.visible, // Set initial visibility from config
      ])
    );
    setLayerVisibility(initialVisibility);

    // Cleanup on component unmount
    return () => {
      layersRef.current = {};
    };
  }, [mapview]);

  const toggleLayerVisibility = (layerName) => {
    setLayerVisibility((prevVisibility) => {
      const newVisibility = !prevVisibility[layerName];

      // Iterate through all layers in the map
      mapview.map.layers.items.forEach((layer) => {
        // Check if the parent layer matches by title (partial match)
        if (layer.title && layer.title.includes(layerName)) {
          // Update the parent layer visibility
          layer.visible = newVisibility;

          // Check if the layer has sublayers
          if (layer.sublayers) {
            // Iterate through all sublayers and check their titles for the match
            layer.sublayers.forEach((sublayer) => {
              if (sublayer.title && sublayer.title.includes(layerName)) {
                // Update the visibility of the matching sublayer
                sublayer.visible = newVisibility;
              }
            });
          }
        } else if (layer.sublayers) {
          // In case the parent layer's title doesn't match, check its sublayers
          layer.sublayers.forEach((sublayer) => {
            if (sublayer.title && sublayer.title.includes(layerName)) {
              // Update the visibility of the matching sublayer
              sublayer.visible = newVisibility;
            }
          });
        }
      });

      // Update the state to reflect the new visibility
      return { ...prevVisibility, [layerName]: newVisibility };
    });
  };

  return (
    <div dir={isLangArab && "rtl"} className="flex items-center justify-center z-10">
      <div
        ref={layersListRef}
        className={`fixed ${isLangArab ? "left-12" : "right-12"} top-32 sm:top-14 laptop_s:top-20 h-96 p-4 rounded-lg shadow-lg w-96 transition-colors duration-300
          ${isDarkMode ? "bg-[rgba(96,96,96,0.8)] text-white" : "bg-white bg-opacity-95 text-black"}`}
      >
        <div>
          <h1
            className={`  text-[16px] font-medium ${
              isLangArab ? "text-right" : "text-left"
            }`}
          >
            {isLangArab ? "قائمة الطبقات" : "Layer List"}
          </h1>
          <button
            className={`absolute top-4 ${isLangArab ? "left-4" : "right-4"} hover:text-gray-800 ${
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

        {/* Custom Layer List */}
        <ul>
          {config.layerListServices.map((service) => (
            <li key={service.name} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={layerVisibility[service.name]}
              onChange={() => toggleLayerVisibility(service.name)}
              className={`hidden peer  `} // Hides the default checkbox
              id={`checkbox-${service.name}`}
            />
            <span
              className={`${isLangArab?"ml-2":"mr-2"} h-5 w-5 rounded-sm border border-gray-400 bg-white peer-checked:bg-[#69A9C2] 
                         flex items-center justify-center transition-colors duration-300 cursor-pointer`}
              onClick={() => toggleLayerVisibility(service.name)}
            >
              {/* Checkmark icon appears only when the checkbox is checked */}
              {layerVisibility[service.name] && (
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
            <label
              htmlFor={`checkbox-${service.name}`}
              className={`   font-500 text-[14px]`}
            >
              {service.name}
            </label>
          </li>
          
          
          ))}
        </ul>
      </div>
    </div>
  );
}
