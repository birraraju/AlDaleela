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

export default function SearchContent({ inputClicked, iscategory, inputValue, setInputValue, setInputClicked }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState("normal");
  const [selectedItem, setSelectedItem] = useState(null);
  const [suggestionNames, setSuggestionNames] = useState([]);
  const {contextMapView} = useAuth();
  const { isDarkMode,isLangArab } = useTheme(); // Access the theme from context

  useEffect(()=>{
    const locatorUrl = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"; // Use your geocoder URL
    if (inputValue.length > 2) {
      // Use the input value for geocoding
      locator.addressToLocations(locatorUrl, {
          address: { "SingleLine": inputValue },
          maxLocations: 10,
          outFields: ["*"]
      }).then(results => {
          setSuggestionNames([])
          //suggestionsList.innerHTML = '';
          const locatorAddress = [];
          results.forEach(suggestion => {
            locatorAddress.push(suggestion);
              setSuggestionNames(locatorAddress);
          });          
          
      }).catch(err => {
          console.error(err);
      });
  }
  },[inputValue])

  const handleSeachAddress = (selectedAddress) =>{
    //alert(selectedAddress)
                  // Get the location (latitude and longitude) of the selected suggestion
                  const location = selectedAddress.location;


                  contextMapView.goTo({
                      target: new Point({
                          longitude: location.x,
                          latitude: location.y
                      }),
                      zoom: 15
                  }).then(() => {

                    contextMapView.popup.open({
                          title: "Selected Location",
                          location: new Point({
                              longitude: location.x,
                              latitude: location.y
                          }),
                          content: `Address: ${selectedAddress.address}`
                      });
                  });
                  setInputValue(selectedAddress.address);
                  setInputClicked(false)
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
                  key={locationIndex}
                  onClick={()=>handleSeachAddress(location)}
                  className="flex justify-start items-center gap-2 mt-4 cursor-default"
                >
                  <div>
                    <img
                      src={`${process.env.PUBLIC_URL}/Header/Searchbar/direction.svg`}
                      alt=""
                      className="w-6"
                    />
                  </div>

                  <div>{location.address}</div>
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
