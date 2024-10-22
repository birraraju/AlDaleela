"use client";

import React from "react";
import SeaPOI from '../../../assets/POIEdit/imagePOISea.png'
import PlayIconPOI from '../../../assets/POIEdit/imagePlayvideoIcon.png'
import PlayThumbPOI from '../../../assets/POIEdit/POIVideoThumb.png'
import AudioPlayPOI from '../../../assets/POIEdit/AudioPlay.svg'
import AudioLineStylePOI from '../../../assets/POIEdit/AudioLineStyle.svg'

const Component = ({ POIFormShow, setPOIUploaderShow,setIsShowEditPOI, setPOIFormShow, isEditShowPOI }) => {

  if (!POIFormShow) return null;
  
  const renderFieldOrText = (id, label, value, inputType = "text") => {
    return (
      <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {isEditShowPOI ? (
          inputType === "select" ? (
            <select id={id} defaultValue={value} className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value={value}>{value}</option>
            </select>
          ) : (
            <input
              id={id}
              defaultValue={value}
              className="block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          )
        ) : (
          <p className="p-2 border rounded-md bg-gray-100">{value}</p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md bg-transparent overflow-y-auto ">
      <div className="p-2 space-y-4">
        {renderFieldOrText("organization", "Organization", "DMT", "select")}
        {renderFieldOrText("name", "Name", "Al Buwam")}
        {renderFieldOrText("class", "Class", "Zubara", "select")}
        {renderFieldOrText("classD", "ClassD", "DMT")}
        {renderFieldOrText("status", "Status", "Needs Review", "select")}
        {renderFieldOrText("comment", "Comment", "Imported from UAEU Atlas")}
        {renderFieldOrText("description", "Description", "Eastern and western")}
        {renderFieldOrText("poems", "Poems", "بيت الزوم وبه ... ما جرى الاحسان بالي شوالك بحر ... ما هو ما")}
        {renderFieldOrText("stories", "Stories", "")}
        {renderFieldOrText("classification", "Classification", "Marine", "select")}
        {renderFieldOrText("municipality", "Municipality", "Al Dhafra", "select")}
        {renderFieldOrText("emirate", "Emirate", "Abu Dhabi")}

        {/* Photos Section */}
        <div className="px-3 py-6 border border-none rounded-lg bg-white space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Photos</h3>
            <div className="rounded-lg overflow-hidden">
              <img
                src={SeaPOI}
                alt="Coastal area with turquoise water"
                className="w-[50%] h-[90px] object-cover"
              />
            </div>
          </div>

          {/* Videos Section */}
          <div>
            <h3 className="text-sm font-medium mb-2">Videos</h3>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2].map((index) => (
                <div key={index} className="relative h-[90px] rounded-lg overflow-hidden">
                  <img
                    src={PlayThumbPOI}
                    alt={`Video thumbnail ${index}`}
                    className="w-full h-auto object-cover"
                  />
                  <button
                    className="absolute inset-0 m-auto bg-black/50 hover:bg-black/70 flex items-center justify-center"
                  >
                    <img src={PlayIconPOI} className=" h-10" alt="" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Audio Section */}
          <div>
            <h3 className="text-sm font-medium mb-2">Audio</h3>
            <div className="flex p-2 h-10 bg-gray-300 rounded-full justify-center items-center overflow-hidden">
              <button className=" h-8 rounded-full">
                <img src={AudioPlayPOI} className=" h-full" alt="" />
              </button>
              <div className=" pl-3">
                <img src={AudioLineStylePOI} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditShowPOI && (
          <div className="flex justify-center space-x-8 items-center">
            <button onClick={()=>setIsShowEditPOI(false)} className="w-auto py-3 px-9 bg-transparent text-xs border border-black rounded-lg">
              Cancel
            </button>
            <button onClick={()=>setIsShowEditPOI(false)} className="w-auto py-3 px-9 bg-custom-gradient text-xs border border-gray-300 rounded-lg">
              Update
            </button>
          </div>
        )}

        {isEditShowPOI && (<><div className="grid grid-cols-1 py-3 justify-center items-center">
          <p className="flex justify-center text-sm items-center">Want to share photos, videos, and audio</p>
          <p className="flex justify-center text-sm items-center">for this location?</p>
          <p className="flex justify-center text-sm items-center">Please click the upload button.</p>
        </div>
        <div className="flex justify-center items-center">
          <p onClick={() => { setPOIUploaderShow(true); setPOIFormShow(false); }} className="cursor-pointer text-blue-500 hover:text-blue-800 underline">
            Upload a file
          </p>
        </div>
        </>)}

        <div className="text-sm text-gray-500 px-12">X 54.2971051, Y 24.0622842</div>
      </div>
    </div>
  );
};

export default Component;
