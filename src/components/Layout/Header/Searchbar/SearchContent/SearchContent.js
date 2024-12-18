// SearchContent.js
import { useTheme } from "../../../ThemeContext/ThemeContext";
import { useEffect, useState } from "react";
import FilterBtn from "./FilterBtn/FilterBtn";
import AudioContent from "./Filters/AudioFilter/AudioContent";
import AudioFilter from "./Filters/AudioFilter/AudioFilter";
import PhotoContent from "./Filters/PhotoFilter/PhotoContent";
import PhotoFilter from "./Filters/PhotoFilter/PhotoFilter";
import VideoContent from "./Filters/VideoFilter/VideoContent";
import VideoFilter from "./Filters/VideoFilter/VideoFilter";
import * as locator from "@arcgis/core/rest/locator.js";
import { useAuth } from "../../../../../Providers/AuthProvider/AuthProvider";
import Point from "@arcgis/core/geometry/Point.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Graphic from "@arcgis/core/Graphic";
import config from '../../../../Common/config'; // Import your config file

export default function SearchContent({ inputClicked, iscategory,setIscategory, inputValue, setInputValue, setInputClicked }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState("normal");
  const [selectedItem, setSelectedItem] = useState(null);
  const [suggestionNames, setSuggestionNames] = useState([]);
  const {contextMapView, setPopupSelectedGeo, setIsEditPOI} = useAuth();
  const { isDarkMode,isLangArab } = useTheme(); // Access the theme from context
  const [featureLayer, setFeatureLayer] = useState(null);
  const [allNames, setAllNames] = useState([]);  // Stores all names from all layers
  const [filteredNames, setFilteredNames] = useState([]); // Stores filtered names based on search

  useEffect(() => {
    // Load all feature layer names on component mount
    const loadAllNames = async () => {
      const namesArray = [];  // Collect all names from all layers
  
      for (const service of config.featureServices) {
        try {
          const layer = new FeatureLayer({
            url: service.url,
            outFields: ["*"]
          });
  
          let allFeatures = []; // Store all features for this layer
          let query = layer.createQuery();
          query.where = "1=1"; // Retrieve all records
          query.outFields = ["name_en", "name_ar", "OBJECTID"]; // Fields to retrieve
          query.num = 2000; // Maximum records per query
  
          // Pagination: Fetch records in batches until all records are retrieved
          let start = 0;
          let moreRecordsExist = true;
  
          while (moreRecordsExist) {
            query.start = start;
            const results = await layer.queryFeatures(query);
  
            allFeatures = allFeatures.concat(results.features);
  
            // If fewer than 2000 records were returned, we’re done
            if (results.features.length < 2000) {
              moreRecordsExist = false;
            } else {
              start += 2000; // Move to the next batch
            }
          }
  
          // Map the results to the desired format
          const layerNames = allFeatures.map(feature => ({
            Name: isLangArab?feature.attributes.name_ar:feature.attributes.name_en,
            Objectid: feature.attributes.OBJECTID,
            LayerName: service.name
          }));
  
          // Push the layer names into the namesArray
          namesArray.push(...layerNames);
  
        } catch (error) {
          console.error(`Error querying layer "${service.name}":`, error);
        }
      }
  
      // Update state with the collected names
      setAllNames(namesArray);
    };
  
    loadAllNames(); // Call the function to load all names once on mount
  }, []);
  

  useEffect(() => {
    // Filter names based on user input when inputValue changes
    if (inputValue) {
      const filtered = allNames.filter(item =>
        item.Name && item.Name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredNames(filtered);
    } else {
      setFilteredNames([]); // Clear filtered names if input is empty
    }
  }, [inputValue, allNames]);

  const handleSearchAddress = async (objectId, selectedName, selectedLayerName) => {
    // Find the layer based on selected name
    const selectedLayerConfig = config.featureServices.find(
      service => service.name === selectedLayerName
    );
  
    if (!selectedLayerConfig) {
      console.error(`Layer with name ${selectedLayerName} not found in configuration.`);
      return;
    }
  
    try {
      // Create a FeatureLayer instance for the selected layer
      const featureLayer = new FeatureLayer({
        url: selectedLayerConfig.url,
        outFields: ["*"]
      });
  
      // Query the selected layer using the OBJECTID
      const feature = await featureLayer.queryFeatures({
        where: `OBJECTID = ${objectId}`,
        outFields: ["*"],
        returnGeometry: true
      });
  
      // Check if any features are found and handle accordingly
      if (feature.features.length > 0) {
        //openPopup(feature.features[0], objectId); // Open popup with feature info
        
        setInputValue(selectedName); // Set the input value to the selected name
        setInputClicked(false); // Close the suggestions dropdown or related UI
        const pointGraphic = new Graphic({
          geometry: feature.features[0].geometry,
          symbol: {
            type: "simple-marker",
            outline: {
              color: [0, 255, 255, 4],
              width: 1
            }
          }
        });
    
        contextMapView.graphics.add(pointGraphic);
        await contextMapView.goTo({
          target: feature.features[0].geometry,
          center: feature.features[0].geometry,  // Centers on the feature's geometry
          zoom: 15  // Sets the zoom level
        });
        setPopupSelectedGeo(feature.features[0])
        setIsEditPOI(true);
      } else {
        console.log(`No feature found with OBJECTID: ${objectId}`);
      }
    } catch (error) {
      console.error(`Error querying layer ${selectedLayerName}:`, error);
    }
  };

  return (
    <div
      className={` mobile_s:w-[22rem]  mobile_m:w-[23rem] mobile_l:w-[27rem]  tab:w-[20rem] tab_s:w-[22rem] tab_l:w-[24rem] tab_l_1:w-[28rem]  laptop_s:w-[18rem] laptop_m:w-[22rem] rounded-2xl mb-8 absolute top-0 left-0 h-80 ${
        isDarkMode ? "bg-[#606060CC] text-black" : "bg-white text-black"
      } bg-opacity-70 backdrop-blur-lg z-[1]`}
    >
      <div className="relative mt-10">
        {/* Line */}
        <div
          className={`absolute -top-1 left-0 h-[1px] w-full ${
            isDarkMode ? "bg-[#FFFFFF33]" : "bg-black bg-opacity-10"
          }`}
        ></div>

        <div>
          {/* Filters */}
          <div className="flex justify-start items-center px-4 py-1">
            <FilterBtn
              isFiltersOpen={isFiltersOpen}
              setIsFiltersOpen={setIsFiltersOpen}
              setSelectedItem={setSelectedItem}
              isLangArab={isLangArab}
            />

            <div className="flex justify-between items-center ml-4 bg-[#ececec99] rounded-full p-1 text-sm cursor-pointer select-none">
              <PhotoFilter
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
                isLangArab={isLangArab}
                setIsFiltersOpen={setIsFiltersOpen}
              />
              <VideoFilter
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
                isLangArab={isLangArab}
                setIsFiltersOpen={setIsFiltersOpen}
              />
              <AudioFilter
                setSelectedItem={setSelectedItem}
                isLangArab={isLangArab}
                selectedItem={selectedItem}
                setIsFiltersOpen={setIsFiltersOpen}
              />
            </div>
          </div>

          {/* Searched Content */}
          {isFiltersOpen === "normal" ? (
            <div className="h-[13rem] overflow-y-scroll px-4">
              {filteredNames.map((location, locationIndex) => (
                <div
                  key={location.Objectid}
                  onClick={()=>handleSearchAddress(location.Objectid, location.Name, location.LayerName)}
                  className="flex justify-start items-center gap-3  mt-4 cursor-default"
                >
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/Header/Searchbar/direction.svg`}
                      alt=""
                      className="w-4"
                    />
                  </div>

                  <div className={` ${isDarkMode?"text-white":"text-black"}`}>{location.Name}</div>
                </div>
              ))}
            </div>
          ) : isFiltersOpen === "photo" ? (
            <PhotoContent setInputClicked={setInputClicked} setIscategory={setIscategory}/>
          ) : isFiltersOpen === "video" ? (
            <VideoContent setInputClicked={setInputClicked} setIscategory={setIscategory} />
          ) : isFiltersOpen === "audio" ? (
            <AudioContent setInputClicked={setInputClicked} setIscategory={setIscategory} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

const locations = [
  { name: "Al Abhuth" },
  { name: "Al Abhuth" },
  { name: "Al Abhuth" },
  { name: "Al Abhuth" },
  { name: "Al Abhuth" },
];
