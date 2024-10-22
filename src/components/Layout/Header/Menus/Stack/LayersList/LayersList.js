import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useTheme } from "../../../../ThemeContext/ThemeContext"; // Import ThemeContext
import LayerListAPI from "@arcgis/core/widgets/LayerList.js";
import "../Stack.css" // Import  CSS file
export default function LayersList({ onClose, mapview }) {
  const layersListRef = useRef(null);
  const layerlistRef = useRef(null);
  const { isDarkMode,isLangArab } = useTheme(); // Access isDarkMode from context

  // Removed handleClickOutside as we don't want to close on outside click
  // const handleClickOutside = (event) => {
  //   if (layersListRef.current && !layersListRef.current.contains(event.target)) {
  //     onClose();
  //   }
  // };

  useEffect(() => {
    if (mapview && layerlistRef.current) {
      const layerListDiv = new LayerListAPI({
        view: mapview,
        container: layerlistRef.current
      });

      // Optional: Cleanup on component unmount
      return () => {
        //layerList.destroy(); // Destroy the LayerList when the component unmounts
        if(layerlistRef.current){
          //printWidget.destroy();
          layerlistRef.current = null;
      }
      };
    }
  }, [mapview]); // Add mapview to the dependency array

  return (
    <div className="flex items-center justify-center z-10">
      <div
        ref={layersListRef}
        className={`fixed ${isLangArab?"left-12":"right-12"} top-32 sm:top-14 laptop_s:top-20 h-96 p-4 rounded-lg shadow-lg w-96 transition-colors duration-300
          ${isDarkMode ? "bg-[rgba(96,96,96,0.8)] text-white" : "bg-white bg-opacity-95 text-black"}`}      >
        <div>
          <h1 className="font-omnes text-[16px] font-medium">{isLangArab?"قائمة الطبقات":"Layer List"}</h1>
          <button
className={`absolute top-4 right-4 hover:text-gray-800 ${
  isDarkMode ? "text-[#FFFFFFFF] text-opacity-80" : "text-gray-800"
}`}            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div
 className={`my-2 h-[1px] w-full transition-colors duration-300 ${
  isDarkMode ? "bg-white bg-opacity-50" : "bg-black bg-opacity-20"
}`}         >

         </div>
        <div 
  className={`esri-layer-list__item-content ${isLangArab ? "text-right" : ""} esri-layer-list__visible-toggle ${isLangArab ? "hover:bg-gray-900" : ""}`}
  ref={layerlistRef}></div>
      </div>
    </div>
  );
}
