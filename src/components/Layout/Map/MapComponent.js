import React, { useEffect, useRef, useState } from "react";
// Import ArcGIS modules
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Extent from "@arcgis/core/geometry/Extent";

const MapComponent = () => {
  // Create a ref for the map container
  const mapDiv = useRef(null);

  // State to store the lat, long, and scale
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [scale, setScale] = useState(null);

  // useEffect to initialize the map once the component mounts
  useEffect(() => {
    if (mapDiv.current) {
      // Create a new map
      const map = new Map({
        basemap: "streets" // Change this to 'satellite', 'topo', etc., as needed
      });

      // Define the extent for the specified region
      const customExtent = new Extent({
        xmin: 48.0,  // Westernmost point
        ymin: 20.0,  // Southernmost point
        xmax: 57.5,  // Easternmost point
        ymax: 30.0,  // Northernmost point
        spatialReference: { wkid: 4326 } // WGS 84
      });

      // Create a MapView to display the map
      const view = new MapView({
        container: mapDiv.current, // Reference to the container element
        map: map,
        extent: customExtent, // Set the extent to the specified region
        scale: 2311162, // Set the initial scale to 2,311,162
        ui: {
          components: [] // Remove all default UI widgets including the zoom widget
        }
      });

      // Set constraints on the view
      view.constraints = {
        minZoom: 5, // Minimum zoom level
        maxScale: 2311162, // Max scale to prevent zooming out too far
        geometry: customExtent // Limit the view to this extent
      };

      // Listen for pointer-move event to get latitude and longitude
      view.on("pointer-move", (event) => {
        const point = view.toMap({ x: event.x, y: event.y });
        if (point) {
          setLat(point.latitude);
          setLon(point.longitude);
        }
      });

      // Listen for changes in the map's scale
      view.watch("scale", (newScale) => {
        setScale(newScale);
      });

      // Clean up the map when the component is unmounted
      return () => {
        if (view) {
          view.destroy();
        }
      };
    }
  }, []);

  // Function to format the scale value into thousands (e.g., 2,311,162 => 2.3M)
  const formatScale = (scale) => {
    if (scale === null) return "N/A";
    if (scale >= 1000000) {
      return (scale / 1000000).toFixed(1) + "M"; // Convert to millions
    } else if (scale >= 1000) {
      return (scale / 1000).toFixed(1) + "K"; // Convert to thousands
    }
    return scale.toFixed(0); // Return the scale as is if below 1000
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div
        style={{
          height: "100%", // Full height
          width: "100%",  // Full width
        }}
        ref={mapDiv}
      />
      {/* Display Lat, Lon, and Scale */}
      <div className="absolute bottom-4 text-[#2C2C2C] font-poppins font-medium text-[12px] left-10 bg-white bg-opacity-40 backdrop-blur p-3 rounded-lg shadow-md">
        <p className="text-[#2C2C2C] font-poppins font-medium text-[12px] mb-1">
          Long: <span className="font-normal">{lon?.toFixed(3)}</span>
          <span className="mx-4">|</span>
          Lat: <span className="font-normal">{lat?.toFixed(3)}</span>
        </p>
        <p className="">
          Current Scale: <span className="font-medium">{formatScale(scale)}</span> | UTM 39N
        </p>
      </div>
    </div>
  );
};

export default MapComponent;
