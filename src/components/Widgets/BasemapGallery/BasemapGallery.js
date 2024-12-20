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
  const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state


  useEffect(() => {
    if (mapview && mapRef1.current) {
      // Select basemaps based on the current language
      const basemapConfig = isLangArab ? config.basemapsConfig.Arabic : config.basemapsConfig.English;
  
      // Create new basemap instances
      const newBasemaps = basemapConfig.map((basemap) => {
        return new Basemap({
          title: basemap.title,
          id: basemap.id,
          baseLayers: basemap.baseLayers.map(
            (url) => new TileLayer({ url }) // Create TileLayer instances
          ),
          thumbnailUrl: require(`${basemap.thumbnailImg}`) // Dynamically load thumbnail
        });
      });
  
      let basemapGallery = mapRef1.current.__basemapGallery;
  
      if (!basemapGallery) {
        // Initialize the BasemapGallery if it doesn't exist
        basemapGallery = new BasemapGallery({
          view: mapview,
          container: mapRef1.current
        });
        mapRef1.current.__basemapGallery = basemapGallery;
      }
  
      // Update the source of the BasemapGallery
      basemapGallery.source = newBasemaps; // Directly set the source with the new basemaps
    }
  
    // Cleanup on component unmount
    return () => {
      if (mapRef1.current?.__basemapGallery) {
        mapRef1.current.__basemapGallery.source = []; // Clear the basemaps when unmounting
      }
    };
  }, [mapview, isLangArab]); // Run when mapview or language changes
  
  
  

  // MutationObserver logic to handle dynamic grid styling
  useEffect(() => {
    const observer = new MutationObserver(() => {
      // Apply the grid layout with auto-fill and minmax for column size
      const container = mapRef1.current?.querySelector('.esri-basemap-gallery__item-container');
      if (container) {
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))'; // auto-fill with minmax columns
        container.style.gap = '5px'; // Gap between the grid items
        container.style.padding = '10px';
        // container.style.paddingBlock = '0px'; 
        // container.style.paddingInline = '10px'; 
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
      className={`sm:-mt-[150%] tab_s:-mt-[145%] tab_m:-mt-[130%] tab_l_1:-mt-[120%] flip:-mt-[105%] laptop_l:-mt-[130%] laptop_l_2:-mt-[107%] laptop_l_2:h-[300px]   laptop_s:h-[420px] laptop_m:-mt-[130%] laptop_m:h-[420px] 2xl:-mt-[110%] mobile_m:-mt-[165%] mobile_m_3:-mt-[195%] mobile_m_4:-mt-[170%]  mobile_l:-mt-[170%]   sm:h-[600px] h-[530px] mobile_s:-mt-[135%] -mt-[185%] mobile_m_360:-mt-[190%] bg-transparent overflow-y-auto ${isDarkMode ? 'dark-mode' : ''}`}
    >
      
      <div ref={mapRef1} />
    </div>
  );
};

export default BasemapGalleryComponent;
