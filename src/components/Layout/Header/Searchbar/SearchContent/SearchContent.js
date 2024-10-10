// SearchContent.js
import { useTheme } from "../../../ThemeContext/ThemeContext";
import { useState } from "react";
import FilterBtn from "./FilterBtn/FilterBtn";
import AudioContent from "./Filters/AudioFilter/AudioContent";
import AudioFilter from "./Filters/AudioFilter/AudioFilter";
import PhotoContent from "./Filters/PhotoFilter/PhotoContent";
import PhotoFilter from "./Filters/PhotoFilter/PhotoFilter";
import VideoContent from "./Filters/VideoFilter/VideoContent";
import VideoFilter from "./Filters/VideoFilter/VideoFilter";

export default function SearchContent({ inputClicked, iscategory }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState("normal");
  const [selectedItem, setSelectedItem] = useState(null);

  const { isDarkMode } = useTheme(); // Access the theme from context

  return (
    <div
      className={`mobile_s:w-[19rem] ${(inputClicked || iscategory) ? "laptop_m:w-[40rem]" : "laptop_m:w-[40rem]"} rounded-2xl mb-8 absolute top-0 left-0 h-96 ${
        isDarkMode ? "bg-[#606060CC] text-[#FFFFFFCC]" : "bg-white text-black"
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
            />

            <div className="flex justify-between items-center ml-4 bg-[#ececec99] rounded-full p-2 text-sm cursor-pointer select-none">
              <PhotoFilter
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
                setIsFiltersOpen={setIsFiltersOpen}
              />
              <VideoFilter
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
                setIsFiltersOpen={setIsFiltersOpen}
              />
              <AudioFilter
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
                setIsFiltersOpen={setIsFiltersOpen}
              />
            </div>
          </div>

          {/* Searched Content */}
          {isFiltersOpen === "normal" ? (
            <div className="h-[17rem] overflow-y-scroll px-4">
              {locations.map((location, locationIndex) => (
                <div
                  key={locationIndex}
                  className="flex justify-start items-center gap-2 mt-4 cursor-default"
                >
                  <div>
                    <img
                      src="/Header/Searchbar/direction.svg"
                      alt=""
                      className="w-6"
                    />
                  </div>

                  <div>{location.name}</div>
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
