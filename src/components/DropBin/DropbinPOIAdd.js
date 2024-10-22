"use client";

import React, { useState } from "react";

const Component = () => {
  const [poiData, setPoiData] = useState({
    organization: "DMT",
    name: "Al Buwam",
    class: "Zubara",
    classD: "DMT",
    status: "Needs Review",
    comment: "Imported from UAEU Atlas",
    description: "Eastern and western",
    poems: "بيت الزوم وبه ... ما جرى الاحسان بالي شوالك بحر ... ما هو ما",
    stories: "",
    classification: "Marine",
    municipality: "Al Dhafra",
    emirate: "Abu Dhabi",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPoiData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const renderField = (id, label, value, inputType = "text") => (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {inputType === "select" ? (
        <select
          id={id}
          value={value}
          onChange={handleChange}
          className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value={value}>{value}</option>
          {/* Add additional options here if needed */}
        </select>
      ) : (
        <input
          id={id}
          value={value}
          onChange={handleChange}
          className="block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      )}
    </div>
  );

  return (
    <div className="w-full max-w-md bg-transparent overflow-y-auto ">
      <div className="p-2 space-y-4">
        {renderField("organization", "Organization", poiData.organization, "select")}
        {renderField("name", "Name", poiData.name)}
        {renderField("class", "Class", poiData.class, "select")}
        {renderField("classD", "ClassD", poiData.classD)}
        {renderField("status", "Status", poiData.status, "select")}
        {renderField("comment", "Comment", poiData.comment)}
        {renderField("description", "Description", poiData.description)}
        {renderField("poems", "Poems", poiData.poems)}
        {renderField("stories", "Stories", poiData.stories)}
        {renderField("classification", "Classification", poiData.classification, "select")}
        {renderField("municipality", "Municipality", poiData.municipality, "select")}
        {renderField("emirate", "Emirate", poiData.emirate)}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-8 items-center">
          <button className="w-auto py-3 px-9 bg-transparent text-xs border border-black rounded-lg">
            Cancel
          </button>
          <button className="w-auto py-3 px-9 bg-custom-gradient text-xs border border-gray-300 rounded-lg">
            Update
          </button>
        </div>

        <div className="text-sm text-gray-500 px-12">X 54.2971051, Y 24.0622842</div>
      </div>
    </div>
  );
};

export default Component;
