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
    <div className="flex items-center justify-center z-10">
      <div
        ref={layersListRef}
        className={`fixed ${isLangArab ? "left-12" : "right-12"} top-32 sm:top-14 laptop_s:top-20 h-96 p-4 rounded-lg shadow-lg w-96 transition-colors duration-300
          ${isDarkMode ? "bg-[rgba(96,96,96,0.8)] text-white" : "bg-white bg-opacity-95 text-black"}`}
      >
        <div>
          <h1
            className={`font-omnes text-[16px] font-medium ${
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
                className="mr-2"
              />
              <label className={isLangArab ? "text-right" : "text-left"}>
                {service.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
