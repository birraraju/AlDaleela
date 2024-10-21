"use client";

import React from "react";
import SeaPOI from '../../../assets/POIEdit/imagePOISea.png'
import PlayIconPOI from '../../../assets/POIEdit/imagePlayvideoIcon.png'
import PlayThumbPOI from '../../../assets/POIEdit/POIVideoThumb.png'
import AudioPlayPOI from '../../../assets/POIEdit/AudioPlay.svg'
import AudioLineStylePOI from '../../../assets/POIEdit/AudioLineStyle.svg'





const Component = ({POIFormShow,setPOIUploaderShow,setPOIFormShow}) => {

  if(!POIFormShow) return null;
  return (
    <div className="w-full max-w-md bg-transparent overflow-y-auto ">
      <div className="p-2 space-y-4">
        <div className="space-y-2">
          <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
            Organization
          </label>
          <select id="organization" defaultValue="DMT" className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="DMT">DMT</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            defaultValue="Al Buwam"
            className="block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="class" className="block text-sm font-medium text-gray-700">
            Class
          </label>
          <select id="class" defaultValue="Zubara" className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="Zubara">Zubara</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="classD" className="block text-sm font-medium text-gray-700">
            ClassD
          </label>
          <input
            id="classD"
            defaultValue="DMT"
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select id="status" defaultValue="needs-review" className="block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="needs-review">Needs Review</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Comment
          </label>
          <input
            id="comment"
            defaultValue="Imported from UAEU Atlas"
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            id="description"
            defaultValue="Eastern and western"
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="poems" className="block text-sm font-medium text-gray-700">
            Poems
          </label>
          <input
            id="poems"
            defaultValue="بيت الزوم وبه ... ما جرى الاحسان بالي شوالك بحر ... ما هو ما"
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-arabic"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="stories" className="block text-sm font-medium text-gray-700">
            Stories
          </label>
          <input
            id="stories"
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="classification" className="block text-sm font-medium text-gray-700">
            Classification
          </label>
          <select id="classification" defaultValue="marine" className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="marine">Marine</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="municipality" className="block text-sm font-medium text-gray-700">
            Municipality
          </label>
          <select id="municipality" defaultValue="al-dhafra" className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="al-dhafra">Al Dhafra</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="emirate" className="block text-sm font-medium text-gray-700">
            Emirate
          </label>
          <input
            id="emirate"
            defaultValue="Abu Dhabi"
            className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
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
              <div className="flex p-2 h-10 bg-gray-300 rounded-full justify-center items-center  overflow-hidden">
              <button className=" h-8 rounded-full">
                <img src={AudioPlayPOI} className=" h-full" alt="" />
              </button>
              <div className=" pl-3">
              <img src={AudioLineStylePOI} alt="" />
              </div>
              </div>
          </div>
        </div>
        <div className="flex justify-center space-x-8 items-center">
                <button
                  className="w-auto py-3 px-9 bg-transparent text-xs border border-black rounded-lg"
                >
                  Cancel
                </button>
                <button
                  className="w-auto py-3 px-9 bg-custom-gradient text-xs border border-gray-300 rounded-lg"
                >
                  Update
                </button>
              </div>
              <div className=" grid grid-cols-1 py-3 justify-center items-center">
                <p className=" flex justify-center text-sm items-center">Want to share photos, videos, and audio </p>
                <p className=" flex justify-center text-sm items-center">for this location?</p>
                <p className=" flex justify-center text-sm items-center">please click the upload button.</p>
              </div>
              <div className=" flex justify-center items-center">
                <p onClick={()=>{setPOIUploaderShow(true);setPOIFormShow(false)}} className=" cursor-pointer text-blue-500 hover:text-blue-800  underline">upload a file</p>
              </div>

        <div className="text-sm text-gray-500 px-12">X 54.2971051, Y 24.0622842</div>
      </div>
    </div>
  );
};

export default Component;

