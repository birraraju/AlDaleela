import React, { useState } from "react";
import Measurment from "../../../../assets/Measurment.svg";
import AreaMeasurment from "../../../../assets/AreaMeasurment.svg";
import logo from "@/assets/Measurements/imageTick.png";
import { X } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";

export default function SideLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isDropDown, setDropDown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Kilometers");
  const [selectedCArea, setSelectedArea] = useState("Sq Kilometers");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDistance, setIsDistance] = useState(true);

  const countries = [
    "Kilometers",
    "Miles",
    "Feet",
    "Meters",
    "Yards",
    "Nautical Miles",
    "France",
  ];

  const Areas = [
    "Sq Kilometers",
    "Sq Miles",
    "Sq Feet",
    "Sq Meters",
    "Sq Yards",
    "Sq Nautical Miles",
    "Sq France",
  ];

  const toggleDropdown = () => {
    setDropDown((prev) => !prev); // Toggle dropdown open/close
  };

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setDropDown(false);
  };

  const handleAreaSelect = (country) => {
    setSelectedArea(country);
    setDropDown(false);
  };

  return (
    <div
      className={`fixed top-16 right-4 h-[calc(95vh-2rem)] w-[454.84px] transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-96"
      }`}
    >
      <div className="relative h-[65%] mt-10 w-[80%] bg-white float-end bg-opacity-70 z-20 backdrop-blur-lg rounded-[20px] shadow-lg overflow-hidden border-none">
        <div className="p-5 overflow-y-auto">
          {children || (
            <>
              <div className="flex flex-row text-black items-center justify-between border-gray-300">
                <h2 className="text-base font-medium">Measurment</h2>
                <button
                  className="p-2 rounded-md hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close</span>
                </button>
              </div>

              <div className="flex flex-row h-12 text-black items-center bg-black/5 border border-transparent rounded-lg justify-between border-gray-300">
                <label
                  htmlFor="Toggle3"
                  className="inline-flex items-center px-1 rounded-md text-black cursor-pointer dark:text-gray-100"
                >
                  <span
                    onClick={() => setIsDistance(true)}
                    className={`flex items-center px-1 py-2 font-medium text-black text-[12px] rounded-md ${
                      isDistance ? "bg-white" : ""
                    } dark:bg-violet-600 peer-checked:dark:bg-gray-700`}
                  >
                    <img src={Measurment} alt="Distance" className="w-5 mr-2" />
                    Distance Measurement
                  </span>
                  <span
                    onClick={() => setIsDistance(false)}
                    className={`flex items-center ml-1 pl-1 pr-5 py-2 text-[12px] rounded-md ${
                      !isDistance ? "bg-white" : ""
                    } dark:bg-gray-700 peer-checked:dark:bg-violet-600`}
                  >
                    <img src={AreaMeasurment} alt="Area" className="w-5 mr-2" />
                    Area Measurement
                  </span>
                </label>
              </div>

              {/* Input field with dropdown toggle icon */}
              <div className="relative py-7 w-full">
                <div
                  className="flex items-center bg-white border border-transparent rounded-lg px-3 py-2 shadow-sm cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <input
                    type="text"
                    value={isDistance ? selectedCountry : selectedCArea}
                    onChange={(e) => setSearchTerm(e.target.value)} // Search filter logic
                    readOnly
                    placeholder="Select Country"
                    className="w-full text-base border-transparent font-medium text-black bg-transparent outline-none"
                  />
                  <IoIosArrowDown
                    className={`ml-2 text-xl text-black transition-transform duration-300 ${
                      isDropDown ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Glassmorphic Dropdown */}
                {isDropDown && (
                  <div className="absolute w-full mt-1 bg-white/35 text-black backdrop-blur-lg border border-transparent rounded-2xl z-10 max-h-52 overflow-y-auto">
                    {isDistance ? (
                      <ul className="py-2">
                        {countries
                          .filter((country) =>
                            country.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((country, index) => (
                            <li
                              key={index}
                              onClick={() => handleSelect(country)}
                              className="px-4 py-1 flex justify-between items-center rounded-md hover:bg-custom-measurement-gradient hover:text-white transition duration-200 ease-in-out cursor-pointer"
                            >
                              {country}
                              <img src={logo} alt="" className="h-3" />
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <ul className="py-2">
                        {Areas
                          .filter((area) =>
                            area.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((area, index) => (
                            <li
                              key={index}
                              onClick={() => handleAreaSelect(area)}
                              className="px-4 py-1 flex justify-between items-center rounded-md hover:bg-custom-measurement-gradient hover:text-white transition duration-200 ease-in-out cursor-pointer"
                            >
                              {area}
                              <img src={logo} alt="" className="h-3" />
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <div className={`-mx-4 px-8 pt-2 mb-24 bg-[#E3F0F9]`}>
                <h2 className={`text-base text-black/60 font-normal`}>
                  {isDistance ? "Distance" : "Area"}
                </h2>
                <h4 className={`text-base text-black/80 font-medium`}>
                  {isDistance ? "2.48 Km" : "9.09 Km²"}
                </h4>
              </div>
              <hr className="mt-9" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
