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

export default function BasicInformation({ isEditProfile, setIsEditProfile }) {
  return (
    <div className="py-4 mt-8 h-full">
      <div className="p-4 bg-white rounded-lg h-auto">
        <h1 className="font-medium tracking-wider text-lg">Basic Information</h1>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#0000001A] my-4"></div>

        {/* Data fields */}
        <div className="grid grid-cols-2 gap-8 mb-4 px-4">
          {basicInformation.map((info, index) => (
            <div key={index}>
              <h1 className="text-[#00000099] tracking-wider text-sm">
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
                    className="w-full"
                  />
                )
              ) : (
                <p className="text-black font-medium tracking-wide text-sm">
                  {info.value}
                </p>
              )}
            </div>
          ))}

          {isEditProfile && (
            <Button asChild>
              <div
                onClick={() => setIsEditProfile(false)}
                className="h-12 py-5 cursor-pointer btn-gradient text-white text-base rounded-xl mt-4 tracking-wide"
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
