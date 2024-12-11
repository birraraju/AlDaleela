import React, { useEffect, useRef, useState } from "react";
// Import ArcGIS modules
import WebMap from "@arcgis/core/WebMap.js";
import esriConfig from "@arcgis/core/config.js";
import Mapview from "@arcgis/core/views/MapView.js";
import { useAuth } from "../../../Providers/AuthProvider/AuthProvider";
import './MapComponent.css'
import * as identify from '@arcgis/core/rest/identify';
import IdentifyParameters from "@arcgis/core/rest/support/IdentifyParameters.js";// Import IdentifyParameters
import config from "../../Common/config"
import Graphic from '@arcgis/core/Graphic';
import { useTheme } from "../ThemeContext/ThemeContext";

const MapComponent = (props) => {
  // Create a ref for the map container
  const mapDiv = useRef(null);

  // State to store the lat, long, and scale
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [scale, setScale] = useState(null);
  const {setconrextMapView, setinitialExtent,setIsEditPOI, setPopupSelectedGeo} = useAuth();
  const {isLangArab} = useTheme()

  const {setMapview, MapView} = props;

  // useEffect to initialize the map once the component mounts
  useEffect(() => {
    let webMap = null;
    if (mapDiv.current) {
      esriConfig.portalUrl = config.PortalUrl;  
      if(isLangArab){
        webMap = new WebMap({       
            portalItem: { // autocasts as new PortalItem()
                id: config.ItemWebMapID // Replace with your Web Map ID
            }
        });
      }
      else{
        webMap = new WebMap({
            portalItem: { // autocasts as new PortalItem()
                id: config.ItemWebMapIDEng // Replace with your Web Map ID
            }
        });
      }
        

        //const view = new View({
        //    container: mapRef.current,
        //    map: webMap,
        //    //zoom: 5,
        //    //center: [15, 65] // Change the coordinates as needed
        //});
        // Create the view
        const view = new Mapview({
            container: mapDiv.current,
            map: webMap,
            //center: [-100.33, 25.69], // Adjust to your area of interest
            //zoom: 5
        });
        setMapview(view)
        setconrextMapView(view)
        view.when(() => {
          setinitialExtent({
            center:view.center,
            zoom:view.zoom
          })
        })        
        view.on("click", handleMapClick(view));
      // // Create a new map
      // const map = new Map({
      //   basemap: "streets" // Change this to 'satellite', 'topo', etc., as needed
      // });

      // // Define the extent for the specified region
      // const customExtent = new Extent({
      //   xmin: 48.0,  // Westernmost point
      //   ymin: 20.0,  // Southernmost point
      //   xmax: 57.5,  // Easternmost point
      //   ymax: 30.0,  // Northernmost point
      //   spatialReference: { wkid: 4326 } // WGS 84
      // });

      // // Create a MapView to display the map
      // const view = new MapView({
      //   container: mapDiv.current, // Reference to the container element
      //   map: map,
      //   extent: customExtent, // Set the extent to the specified region
      //   scale: 2311162, // Set the initial scale to 2,311,162
      //   ui: {
      //     components: [] // Remove all default UI widgets including the zoom widget
      //   }
      // });

      // // Set constraints on the view
      // view.constraints = {
      //   minZoom: 5, // Minimum zoom level
      //   maxScale: 2311162, // Max scale to prevent zooming out too far
      //   geometry: customExtent // Limit the view to this extent
      // };

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
  }, [MapView, isLangArab]);


// Function to handle identify based on the event
const handleIdentify = async(event, mapview) => {
  // Define the fixed identify URL and layer IDs
  const identifyURL = config.BaseUrl;
  const layerIds = [91, 1, 93];

  const groupedResults = {}; // Object to hold results grouped by layer name

  // Create IdentifyParameters
  const identifyParams = new IdentifyParameters();
  identifyParams.layerIds = layerIds; // Use static layer IDs
  identifyParams.returnGeometry = true; // Return geometry of identified features
  identifyParams.tolerance = 3; // Set tolerance for identifying features
  identifyParams.layerOption = 'visible'; // Option to identify only visible layers
  identifyParams.geometry = event.geometry ?? event.mapPoint; // Use the provided geometry or map point
  identifyParams.mapExtent = mapview.extent; // Set the map extent

  // Execute the identify operation
  // Execute the identify operation
  const response = await identify.identify(identifyURL, identifyParams);
  return response.results;
  // return identify.identify(identifyURL, identifyParams) // Use the identify module
  //     .then((response) => {
  //         const results = response.results;
  //         // Group results by layer name
  //         results.forEach(result => {
  //             const layerName = result.layerName; // Get the name of the layer
  //             if (!groupedResults[layerName]) {
  //                 groupedResults[layerName] = { iresults: [] }; // Initialize array for this layer
  //             }
  //             groupedResults[layerName].iresults.push(result); // Push result into the layer's array
  //         });
  //     });
};

// Handle map click events
const handleMapClick = (view) => async(event) => {
  if(!view.activeTool){
    try {
      const results = await handleIdentify(event, view);
      if(results.length !== 0){        
      setIsEditPOI(false);
      view.graphics.removeAll(); // Clears all graphics
        view.goTo({
          target: results[0].feature.geometry,
          zoom: 15 // Adjust the zoom level as needed
        });
        // Create a symbol for drawing the point
        let markerSymbol = {
          type: "simple-marker",
          outline: {
            color: [0, 255, 255, 4],
            width: 1
          }
        }
        
        // Create a graphic and add the geometry and symbol to it
        let pointGraphic = new Graphic({
          geometry: results[0].feature.geometry,
          symbol: markerSymbol
        });
        view.graphics.add(pointGraphic);
        console.log("Results:", results); // Log the results returned from handleIdentify
        setPopupSelectedGeo(results[0])//.graphic)
        setIsEditPOI(true);
      }      
    } catch (error) {
        console.error("Error during identify operation:", error);
    }
  }
  
};


  // const handleMapClick = (view) => (event) => {
  //   view.hitTest(event).then((response) => {
  //     const results = response.results;
  //     if (results.length > 0) {
  //       // Uncomment if you need the layer or graphic for further use
  //       // const layer = results[0].layer;
  //       // const graphic = results[0].graphic;
  
  //       // Trigger an alert, then proceed to set isEditPOI
  //       //alert("Map Click Event");
  //       //view.popup.destroy()
  //       setPopupSelectedGeo(results[0])//.graphic)
  //       setIsEditPOI(true);
  //     }
  //   });
  // };
  

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
      {(lat && lon) && <div dir={isLangArab && "rtl"} className={`absolute  tab:h-[55px] sm:w-[12rem] tab:w-[208px] w-[11rem]  sm:h-[60px] h-[50px] mobile_l:bottom-24 laptop_s:bottom-4 bottom-24 text-[#2C2C2C]    font-medium sm:text-[12px] text-[9px] ${isLangArab?"sm:right-10 w-[13rem]  right-2 tab:w-[212px] ":" tab:w-[208px] w-[11rem] sm:left-10 left-2"} bg-white bg-opacity-40 backdrop-blur sm:p-2 p-1 rounded-lg shadow-md`}>
        <p className="text-[#2C2C2C]    font-500 text-[12px] mb-1">
          {isLangArab?"خط الطول":"Long"}: <span className="font-normal">{lon?.toFixed(3)}</span>
          <span className={` ${isLangArab?" mx-1":"mx-3"}`}></span>
          {isLangArab?"خط العرض":"Lat"}: <span className="font-normal">{lat?.toFixed(3)}</span>
        </p>
        <p className="">
          {isLangArab?"المقياس الحالي":"Current Scale"}: <span className="font-medium">{formatScale(scale)}</span> | UTM 39N
        </p>
      </div>}
    </div>
  );
};

export default MapComponent;
