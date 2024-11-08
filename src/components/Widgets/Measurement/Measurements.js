import React, { useEffect,useState, useRef } from "react";
import Measurement from "@arcgis/core/widgets/Measurement.js";
import './Measurement.css';
import '@arcgis/core/assets/esri/themes/light/main.css';
import Measurment from "../../../assets/Measurment.svg";
import AreaMeasurment from "../../../assets/AreaMeasurment.svg";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../../../Providers/AuthProvider/AuthProvider";

const MeasurementsComponent = ({ mapview }) => {
  const mapRef1 = useRef(null);
  const measurementRef = useRef(null); // Store reference to Measurement widget
  const [isDistance, setIsDistance] = useState(true);
  const {setMeasurementOpenWidget} = useAuth();

  useEffect(() => {
    if (mapview && mapRef1.current) {
      //console.log("test")
      measurementRef.current = new Measurement({
        view: mapview,
        container: mapRef1.current
      });

      const handleClickDistance = () => {
        if (measurementRef.current) {
          const type = mapview.type;
          measurementRef.current.activeTool = type.toUpperCase() === "2D" ? "distance" : "direct-line";
        }
      };

      const handleClickArea = () => {
        if (measurementRef.current) {
          measurementRef.current.activeTool = "area";
        }
      };

      const handleClear = () => {
        if (measurementRef.current) {
          measurementRef.current.clear();
        }
      };

      const distanceButton = document.getElementById("distance");
      const areaButton = document.getElementById("area");
      const clearButton = document.getElementById("clear");

      if (distanceButton) {
        distanceButton.onclick = handleClickDistance;
      }
      if (areaButton) {
        areaButton.onclick = handleClickArea;
      }
      if (clearButton) {
        clearButton.onclick = handleClear;
      }
      //handleClickDistance();
      setMeasurementOpenWidget(measurementRef.current)

      // Cleanup on component unmount
      return () => {
        if (measurementRef.current) {
          //measurementRef.current.destroy();
          measurementRef.current = null;
        }
      };
    }
  }, [mapview]);

  return (
    <div id="measurementDiv" className="measurement py-5">
      <div id="toolbarDiv" className="esri-component esri-widget flex justify-between items-center py-2 px-1">
      <div className="flex esri-component esri-widget flex-row h-12  text-black items-center bg-black/5 border border-transparent rounded-lg justify-between border-gray-300">
                <label
                  htmlFor="Toggle3"
                  className="inline-flex bg-black/10 py-1   items-center px-1 rounded-lg text-black cursor-pointer dark:text-gray-100"
                >
                  <span
                    onClick={() => setIsDistance(true)}
                    className={`flex items-center  px-1 py-2 font-medium text-black text-[10px] rounded-md ${
                      isDistance ? "bg-white" : ""
                    } dark:bg-violet-600 peer-checked:dark:bg-gray-700`}
                  >
                    <img src={Measurment} alt="Distance" className="w-5 mr-2" />
                    <button id="distance" className="" title="Distance Measurement Tool">Distance Measurement</button>
                  </span>
                  <span
                    onClick={() => setIsDistance(false)}
                    className={`flex items-center  ml-1 pl-1 pr-5 py-2 text-[10px] rounded-md ${
                      !isDistance ? "bg-white" : ""
                    } dark:bg-gray-700 peer-checked:dark:bg-violet-600`}
                  >
                    <img src={AreaMeasurment} alt="Area" className="w-5 mr-2" />
                    <button id="area" className=" " title="Area Measurement Tool">Area Measurement</button>
                  </span>
                </label>
              </div>        
        <button id="clear" className=" text-red-500 bg-white border border-none rounded-lg w-6 h-9 flex justify-center items-center" title="Clear Measurements"><FaTrash className=" w-3 h-9" /></button>
      </div>
      
      <div ref={mapRef1} />
    </div>
  );
};

export default MeasurementsComponent;
