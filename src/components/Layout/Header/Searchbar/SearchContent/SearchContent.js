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

export default function SearchContent({ inputClicked, iscategory, inputValue, setInputValue, setInputClicked }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState("normal");
  const [selectedItem, setSelectedItem] = useState(null);
  const [suggestionNames, setSuggestionNames] = useState([]);
  const {contextMapView} = useAuth();
  const { isDarkMode,isLangArab } = useTheme(); // Access the theme from context
  const [featureLayer, setFeatureLayer] = useState(null);

  useEffect(()=>{
    // const locatorUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"; // Use your geocoder URL
    // if (inputValue.length > 2) {
    //   // Use the input value for geocoding
    //   locator.addressToLocations(locatorUrl, {
    //       address: { "SingleLine": inputValue },
    //       maxLocations: 10,
    //       outFields: ["*"]
    //   }).then(results => {
    //       setSuggestionNames([])
    //       //suggestionsList.innerHTML = '';
    //       const locatorAddress = [];
    //       results.forEach(suggestion => {
    //         locatorAddress.push(suggestion);
    //           setSuggestionNames(locatorAddress);
    //       });          
        
    //   }).catch(err => {
    //       console.error(err);
    //   });
    const loadAttachments = async () => {
      const layer = new FeatureLayer({
        url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/IslandNamingProject_v2/FeatureServer/0",
        outFields: ["*"]
      });
      setFeatureLayer(layer);

      try {
        const query = layer.createQuery();
        query.where = `name_en LIKE '%${inputValue}%'`;
        query.returnGeometry = true;
        query.outFields = ["*"];
        const results = await layer.queryFeatures(query);
        setSuggestionNames([])
        const arrayNamesObject = [];
        const Names = results.features.map(feature => feature.attributes.name_en);
        results.features.forEach(feature => {
          const searchobject = {
            Name:feature.attributes.name_en,
            Objectid: feature.attributes.OBJECTID
          }
          arrayNamesObject.push(searchobject);
        });
        
        setSuggestionNames(arrayNamesObject);
      } catch (error) {
        console.error("Error querying feature layer or attachments:", error);
        //setError("Failed to load media items.");
      } finally {
        //setLoading(false);
      }
    };

      loadAttachments();
    
  },[inputValue])

  const queryAttachments = async (objectId) => {
    return await featureLayer.queryAttachments({ objectIds: [objectId] });
  };

  const openPopup = async (feature, objectId) => {
    const attributes = feature.attributes;
    const attachments = await queryAttachments(objectId);

    let popupContent = `<h3>${attributes.name_ar}</h3><table class="popup-table"><tbody>`;
    let rowIndex = 0;

    for (const key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        const value = attributes[key];
        popupContent += `
          <tr style="background-color: ${rowIndex++ % 2 === 0 ? '#f2f2f2' : '#ffffff'};">
            <td style="border-right: 3px solid #0000000d;">${key}</td>
            <td>${value !== null && value !== '' ? (key.includes('date') ? new Date(value).toLocaleDateString() : value) : ''}</td>
          </tr>`;
      }
    }

    popupContent += '</tbody></table>';

    if (attachments[objectId] && attachments[objectId].length > 0) {
      popupContent += '<h4>Attachments:</h4>';
      attachments[objectId].forEach(attachment => {
        const mediaUrl = attachment.url;
        const mediaType = attachment.contentType;

        if (mediaType.includes('image')) {
          popupContent += `<img src="${mediaUrl}" alt="Image" style="max-width: 100%; height: auto;"/>`;
        } else if (mediaType.includes('video')) {
          popupContent += `<video controls style="max-width: 100%; height: auto;">
            <source src="${mediaUrl}" type="${mediaType}">Your browser does not support the video tag.
          </video>`;
        } else if (mediaType.includes('audio')) {
          popupContent += `<audio controls style="max-width: 100%; height: auto;">
            <source src="${mediaUrl}" type="${mediaType}">Your browser does not support the audio element.
          </audio>`;
        }
      });
    } else {
      popupContent += '<p>No attachments available for this feature.</p>';
    }

    const pointGraphic = new Graphic({
      geometry: feature.geometry,
      symbol: {
        type: "simple-marker",
        outline: {
          color: [0, 255, 255, 4],
          width: 1
        }
      }
    });

    contextMapView.graphics.add(pointGraphic);

    contextMapView.openPopup({
      title: "Feature Details",
      location: feature.geometry,
      content: popupContent
    });

    await contextMapView.goTo({
      target: feature.geometry,
      zoom: 15 // Adjust the zoom level as needed
    });
  };

  const handleSeachAddress = async(objectId, selectedName) =>{
    const feature = await featureLayer.queryFeatures({
      where: `OBJECTID = ${objectId}`,
      outFields: ["*"],
      returnGeometry: true
    });

    if (feature.features.length > 0) {
      openPopup(feature.features[0], objectId);
      setInputValue(selectedName);
      setInputClicked(false)
    }

    //alert(selectedAddress)
                  // Get the location (latitude and longitude) of the selected suggestion
                  // const location = selectedAddress.location;


                  // contextMapView.goTo({
                  //     target: new Point({
                  //         longitude: location.x,
                  //         latitude: location.y
                  //     }),
                  //     zoom: 15
                  // }).then(() => {

                  //   contextMapView.popup.open({
                  //         title: "Selected Location",
                  //         location: new Point({
                  //             longitude: location.x,
                  //             latitude: location.y
                  //         }),
                  //         content: `Address: ${selectedAddress.address}`
                  //     });
                  // });
                  // setInputValue(selectedAddress.address);
                  // setInputClicked(false)
  }

  return (
    <div
      className={`mobile_s:w-[19rem] ${(inputClicked || iscategory) ? "laptop_m:w-[30rem]" : "laptop_m:w-[30rem]"} rounded-2xl mb-8 absolute top-0 left-0 h-96 ${
        isDarkMode ? "bg-[#606060CC] text-black" : "bg-white text-black"
      } bg-opacity-70 backdrop-blur-lg z-[1]`}
    >
      <div className="relative mt-10">
        {/* Line */}
        <div
          className={`absolute top-0 left-0 h-[1px] w-full ${
            isDarkMode ? "bg-[#FFFFFF33]" : "bg-black bg-opacity-10"
          }`}
        ></div>

        <div>
          {/* Filters */}
          <div className="flex justify-start items-center px-4 py-2">
            <FilterBtn
              isFiltersOpen={isFiltersOpen}
              setIsFiltersOpen={setIsFiltersOpen}
              setSelectedItem={setSelectedItem}
              isLangArab={isLangArab}
            />

            <div className="flex justify-between items-center ml-4 bg-[#ececec99] rounded-full p-2 text-sm cursor-pointer select-none">
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
            <div className="h-[17rem] overflow-y-scroll px-4">
              {suggestionNames.map((location, locationIndex) => (
                <div
                  key={location.Objectid}
                  onClick={()=>handleSeachAddress(location.Objectid, location.Name)}
                  className="flex justify-start items-center gap-2 mt-4 cursor-default"
                >
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/Header/Searchbar/direction.svg`}
                      alt=""
                      className="w-6"
                    />
                  </div>

                  <div>{location.Name}</div>
                </div>
              ))}
            </div>
          ) : isFiltersOpen === "photo" ? (
            <PhotoContent />
          ) : isFiltersOpen === "video" ? (
            <VideoContent />
          ) : isFiltersOpen === "audio" ? (
            <AudioContent />
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
