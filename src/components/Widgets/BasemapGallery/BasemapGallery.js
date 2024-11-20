import React, { useEffect, useRef } from "react";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import MapView from "@arcgis/core/views/MapView"; // Import the correct MapView type
import './BasemapGallery.css';
import { useTheme } from '../../Layout/ThemeContext/ThemeContext'; // Import the theme context

// import '@arcgis/core/assets/esri/themes/light/main.css';

const BasemapGalleryComponent = ({ mapview }) => {
  const mapRef1 = useRef(null); // Specify type for useRef
  const { isDarkMode } = useTheme(); // Access the dark mode state


  useEffect(() => {
    if (mapview && mapRef1.current) {
      console.log(mapview);
      const basemapGallery = new BasemapGallery({
        view: mapview,
        container: mapRef1.current,
      });

      // Optional: Add the basemap gallery to the view's UI (if needed)
      // mapview.ui.add(basemapGallery, "top-right"); // Position can be adjusted

      // Cleanup on component unmount
      return () => {
        // basemapGallery.destroy();
      };
    }
  }, [mapview]); // Include mapview in the dependency array

  return (
    <div
      id="basemapDiv"
      className={`sm:-mt-[150%] tab_s:-mt-[145%] tab_m:-mt-[130%]     laptop_s:h-[450px] laptop_m:-mt-[120%] 2xl:-mt-[110%]  sm:h-[600px] h-[530px] -mt-[620px] bg-transparent overflow-y-auto ${isDarkMode ? 'dark-mode' : ''}`}
    >


      
      <div ref={mapRef1} />
    </div>
  );
};

export default BasemapGalleryComponent;
