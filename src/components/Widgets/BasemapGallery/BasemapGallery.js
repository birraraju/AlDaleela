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
          thumbnailUrl:require(`${basemapConfig.thumbnailImg}`) 
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

  // MutationObserver logic to handle dynamic grid styling
  useEffect(() => {
    const observer = new MutationObserver(() => {
      // Apply the grid layout with auto-fill and minmax for column size
      const container = mapRef1.current?.querySelector('.esri-basemap-gallery__item-container');
      if (container) {
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))'; // auto-fill with minmax columns
        container.style.gap = '5px'; // Gap between the grid items
        container.style.paddingBlock = '0px'; // Assuming you want no padding block-wise, change if needed
        container.style.paddingInline = '10px'; // Padding on the left and right
      }
    });
  
    // Observe changes in the gallery container
    if (mapRef1.current) {
      observer.observe(mapRef1.current, {
        childList: true, // Observe direct children changes (e.g., items added)
        subtree: true, // Observe all descendants as well
      });
    }
  
    // Cleanup observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array ensures it runs only once on mount
  
  return (
    <div
      id="basemapDiv"
      className={`sm:-mt-[150%] tab_s:-mt-[145%] tab_m:-mt-[130%] tab_l_1:-mt-[120%] flip:-mt-[105%] laptop_l:-mt-[130%] laptop_l_2:-mt-[100%] laptop_l_2:h-[300px]   laptop_s:h-[420px] laptop_m:-mt-[130%] laptop_m:h-[420px] 2xl:-mt-[110%] mobile_m:-mt-[165%] mobile_m_3:-mt-[185%] mobile_m_4:-mt-[170%]  mobile_l:-mt-[170%]   sm:h-[600px] h-[530px] mobile_s:-mt-[135%] -mt-[185%] bg-transparent overflow-y-auto ${isDarkMode ? 'dark-mode' : ''}`}
    >
      
      <div ref={mapRef1} />
    </div>
  );
};

export default BasemapGalleryComponent;
