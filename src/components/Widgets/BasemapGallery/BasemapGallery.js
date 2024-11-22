import React, { useEffect, useRef } from "react";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import MapView from "@arcgis/core/views/MapView"; // Import the correct MapView type
import './BasemapGallery.css';
import { useTheme } from '../../Layout/ThemeContext/ThemeContext'; // Import the theme context
import Basemap from "@arcgis/core/Basemap";
import TileLayer from "@arcgis/core/layers/TileLayer";
import config from '../../Common/config'; // Import your config file

const BasemapGalleryComponent = ({ mapview }) => {
  const mapRef1 = useRef(null); // Specify type for useRef
  const { isDarkMode } = useTheme(); // Access the dark mode state


  useEffect(() => {
    if (mapview && mapRef1.current) {
      console.log(mapview);
      // const basemapGallery = new BasemapGallery({
      //   view: mapview,
      //   container: mapRef1.current,
      // });
      const basemaps = config.basemaps.map((basemapConfig) => {
        return new Basemap({
          title: basemapConfig.title,
          id: basemapConfig.id,
          baseLayers: basemapConfig.baseLayers.map(
            (url) => new TileLayer({ url }) // Create TileLayer instances
          ),
          thumbnailUrl:require('./images/Landsat_1972.png')
        });
      });
      // Add the basemap gallery
      const basemapGallery = new BasemapGallery({
        view: mapview,
        source: basemaps,
        container: mapRef1.current
      });
      
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
