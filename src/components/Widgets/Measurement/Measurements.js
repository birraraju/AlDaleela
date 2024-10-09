import React, { useEffect, useRef } from "react";
import Measurement from "@arcgis/core/widgets/Measurement.js";
import './Measurement.css';
import '@arcgis/core/assets/esri/themes/light/main.css';


const MeasurementsComponent = ({ mapview }) => {
  const mapRef1 = useRef(null);
  const measurementRef = useRef(null); // Store reference to Measurement widget

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
    <div id="measurementDiv" className="measurement">
      <div id="toolbarDiv" className="esri-component esri-widget">
        <button id="distance" className="esri-widget--button esri-interactive esri-icon-measure-line" title="Distance Measurement Tool">Distance</button>
        <button id="area" className="esri-widget--button esri-interactive esri-icon-measure-area" title="Area Measurement Tool">Area</button>
        <button id="clear" className="esri-widget--button esri-interactive esri-icon-trash" title="Clear Measurements">Clear</button>
      </div>
      <div ref={mapRef1} />
    </div>
  );
};

export default MeasurementsComponent;
