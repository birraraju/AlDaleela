import React, { useEffect,useState, useRef } from "react";
import Measurement from "@arcgis/core/widgets/Measurement.js";
import './Measurement.css';
import '@arcgis/core/assets/esri/themes/light/main.css';
import Measurment from "../../../assets/Measurment.svg";
import AreaMeasurment from "../../../assets/AreaMeasurment.svg";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../../../Providers/AuthProvider/AuthProvider";
import { useTheme } from "../../Layout/ThemeContext/ThemeContext";
import { transform } from "framer-motion";
const MeasurementsComponent = ({ mapview }) => {
  const mapRef1 = useRef(null);
  const measurementRef = useRef(null); // Store reference to Measurement widget
  const [isDistanceSelected, setIsDistanceSelected] = useState(false);
  const [isAreaSelected, setIsAreaSelected] = useState(false);
  const {setMeasurementOpenWidget} = useAuth();
  const {isLangArab, isDarkMode} = useTheme()

  const styleShadowDropdown = () => {
    // Find the interaction container within the Shadow DOM
    const interactionContainer = document.querySelector(".interaction-container");

    if (interactionContainer) {
      const shadowRoot = interactionContainer.shadowRoot;

      if (shadowRoot) {
        // Check if a style element has already been injected
        if (!shadowRoot.querySelector("style")) {
          const style = document.createElement("style");

          // Add custom styles for the select dropdown
          style.textContent = `
            .wrapper {
              max-height: 400px !important;
              overflow-y: auto !important;
            }

            .select {
              font-size: 16px !important;
              background-color: #f8f9fa !important;
              border: 1px solid #ccc !important;
              border-radius: 4px;
              padding: 8px;
            }
          `;

          // Append the style to the Shadow DOM
          shadowRoot.appendChild(style);
        }
      }
    }
  };

  useEffect(() => {
    if (mapview && mapRef1.current) {
      //console.log("test")
      measurementRef.current = new Measurement({
        view: mapview,
        container: mapRef1.current
      });

      setMeasurementOpenWidget(measurementRef.current)

      // Style the calcite-select dropdown
      styleShadowDropdown();

      // Cleanup on component unmount
      return () => {
        if (measurementRef.current) {
          //measurementRef.current.destroy();
          measurementRef.current = null;
        }
      };
    }
  }, [mapview]);

  useEffect(() => {
    // Function to update styles for the calcite-select component
    const updateCalciteSelectStyles = () => {
      const calciteSelect = document.querySelector('calcite-select');
      if (calciteSelect?.shadowRoot) {
        calciteSelect.setAttribute('size', '4');
        calciteSelect.style.height = "40px"
        const interactionContainer = calciteSelect.shadowRoot.querySelector('.interaction-container');
        const selectElement = interactionContainer?.querySelector('select');
  
        if (selectElement) {
          selectElement.style.borderColor = "white";
          selectElement.style.height = "40px";
          selectElement.style.borderRadius = "10px";
        }
        
      }

      const calciteButton = document.querySelector('calcite-button');

if (calciteButton?.shadowRoot) {
  const interactionContainer = calciteButton.shadowRoot.querySelector('.interaction-container');
  const button = interactionContainer?.querySelector('button')
  if (button) {
    // Reset display to its default value
    button.style.borderRadius = "12px";
    button.style.height = "40px"
    button.style.background = "linear-gradient(270.18deg, #036068 -14.27%, #596451 47.55%, #1E7C87 76.37%, #4C7950 107.69%, #1199A8 147.31%)"
     // Removes inline "none"

    // Alternatively, remove all inline styles
    // interactionContainer.removeAttribute('style');
  }
}

    };
  
    // Create a MutationObserver to observe changes in the DOM
    const buttonObserver = new MutationObserver(() => {
      updateCalciteSelectStyles();
    });
  
    // Start observing the body for changes
    const bodyNode = document.querySelector('body');
    if (bodyNode) {
      buttonObserver.observe(bodyNode, { childList: true, subtree: true });
    }
  
    // Initial update to ensure styles are applied immediately
    updateCalciteSelectStyles();
  
    // Cleanup observer on component unmount
    return () => {
      buttonObserver.disconnect();
    };
  }, []);
    

  const handleClickDistance = () => {
    if (measurementRef.current) {
      const type = mapview.type;
      measurementRef.current.activeTool = type.toUpperCase() === "2D" ? "distance" : "direct-line";
      setIsDistanceSelected(true);
      setIsAreaSelected(false);
    }
  };

  const handleClickArea = () => {
    if (measurementRef.current) {
      measurementRef.current.activeTool = "area";
      setIsDistanceSelected(false);
      setIsAreaSelected(true);
    }
  };

  const handleClear = () => {
    if (measurementRef.current) {
      measurementRef.current.clear();
      setIsDistanceSelected(false);
      setIsAreaSelected(false);
    }
  };

  return (
    <div id="measurementDiv" className="measurement bg-transparent     py-5">
      <div id="toolbarDiv" className="esri-component esri-widget flex justify-between items-center py-2 px-1">
      <div className="flex esri-component esri-widget flex-row h-12  items-center bg-black/5 border border-transparent rounded-lg justify-between border-gray-300">
                <label
                  htmlFor="Toggle3"
                  className="inline-flex bg-black/10 py-1   items-center px-1 rounded-lg text-black cursor-pointer dark:text-gray-100"
                >
                  <span 
                    onClick={() => {handleClickDistance()}}   
                    className={`flex items-center  px-1 py-2 font-medium text-black text-[10px] rounded-md ${
                      isDistanceSelected ? "bg-white" : ""
                    } dark:bg-violet-600 peer-checked:dark:bg-gray-700`}
                  >
                    <img src={Measurment} alt="Distance" className={`w-5 ${isLangArab?"ml -1 sm:ml-2":"mr-1 sm:mr-2"}`} />
                    <button id="distance" className={` font-poppins font-500 ${isDistanceSelected? (isDarkMode ?" text-[#404040]":"text-[#404040]"):(isDarkMode?" text-white ":"text-[#404040]")}`} title="Distance Measurement Tool">{isLangArab?"قياس المسافة":"Distance Measurement"}</button>
                  </span>
                  <span
                    onClick={() => {handleClickArea()}}
                    className={`flex items-center  ml-1 pl-1 sm:pr-5 pr-1 py-2 text-[10px] rounded-md ${
                        isAreaSelected ? "bg-white" : ""
                    } dark:bg-gray-700 peer-checked:dark:bg-violet-600`}
                  >
                    <img src={AreaMeasurment} alt="Area" className={`w-5 ${isLangArab?"ml -1 sm:ml-2":"mr-1 sm:mr-2"}`} />
                    <button id="area" className={ ` font-poppins font-500 ${isAreaSelected? (isDarkMode ?" text-[#404040]":"text-[#404040]"):(isDarkMode?" text-white ":"text-[#404040]")}`} title="Area Measurement Tool">{isLangArab?"قياس المساحة":"Area Measurement"}</button>
                  </span>
                </label>
              </div>        
        <button id="clear" onClick={()=>{handleClear()}} className=" text-red-500 border border-none rounded-lg w-6 h-9 flex justify-center items-center" title="Clear Measurements"><FaTrash className=" w-3 h-9" /></button>
      </div>
      
      <div ref={mapRef1} />
    </div>
  );
};

export default MeasurementsComponent;
