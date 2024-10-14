import React from "react";
import { Button } from "../../../../../../../../../../components/ui/button";
import { Input } from "../../../../../../../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../../../../../components/ui/select";
import { useTheme } from "../../../../../../../../../Layout/ThemeContext/ThemeContext"; // Import your theme context


export default function BasicInformation({ isEditProfile, setIsEditProfile }) {
  const { isDarkMode } = useTheme(); // Access dark mode from theme context

  return (
    <div className="sm:py-4 py-1 sm:mt-8 mt-1 h-full">
      <div className={`sm:p-4 p-1  rounded-lg h-auto ${
        isDarkMode
          ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none"
          : "bg-white bg-opacity-70 backdrop-blur-lg border-white"
      }`}>
        <h1 className={`font-medium tracking-wider sm:text-lg text-sm ${
              isDarkMode ? "text-white" : "text-black"
            }`}>Basic Information</h1>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#0000001A] my-4"></div>

        {/* Data fields */}
        <div className="grid grid-cols-2 gap-8 mb-4 px-4">
          {basicInformation.map((info, index) => (
            <div key={index}>
              <h1 className={`tracking-wider sm:text-sm text-xs ${
              isDarkMode ? "text-white" : "text-black"
            }`}>
                {info.heading}
              </h1>
              {isEditProfile ? (
                info.heading === "Country" ? (
                  <Select defaultValue={info.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                      <SelectItem value="France">France</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type="text"
                    defaultValue={info.value}
                    className={`w-full sm:h-auto h-3/4 ${
                      isDarkMode ? "text-[#FFFFFFCC]" : "text-black"
                    }`}
                  />
                )
              ) : (
                <p className={`font-medium tracking-wide sm:text-sm text-[11px] ${
                  isDarkMode ? "text-[#FFFFFFCC]" : "text-black"
                }`}>
                  {info.value}
                </p>
              )}
            </div>
          ))}

          {isEditProfile && (
            <Button asChild>
              <div
                onClick={() => setIsEditProfile(false)}
                className="h-12 sm:py-5 py-1 cursor-pointer btn-gradient text-white text-base sm:rounded-xl rounded-md mt-4 tracking-wide"
              >
                Update
              </div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Basic information data
const basicInformation = [
  {
    heading: "Name",
    value: "Hamad",
  },
  {
    heading: "Email Id",
    value: "Useremailid@gmail.com",
  },
  {
    heading: "Phone Number",
    value: "+971 521234567",
  },
  {
    heading: "Organization",
    value: "ABIA",
  },
  {
    heading: "Country",
    value: "United Arab Emirates",
  },
];
