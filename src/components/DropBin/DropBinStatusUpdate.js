"use client";

import React, { useState } from "react";
import SeaPOI from '../../assets/POIEdit/imagePOISea.png';
import PlayIconPOI from '../../assets/POIEdit/imagePlayvideoIcon.png';
import PlayThumbPOI from '../../assets/POIEdit/POIVideoThumb.png';
import AudioPlayPOI from '../../assets/POIEdit/AudioPlay.svg';
import AudioLineStylePOI from '../../assets/POIEdit/AudioLineStyle.svg';

const DropBinStatusUpdate = ({setMessage,setFormShow,setPOIFormIsOpenModalShow,setPOIFormSuccessShow,isFormShow}) => {
  const [poiData] = useState({
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

  if(!isFormShow) return null;

  const renderField = (label, value) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="block w-full p-2 rounded-md border-gray-300 shadow-sm bg-gray-50 text-gray-900">
        {value}
      </div>
    </div>
  );

  const handleApprovePOI =()=>{
    setMessage("POI Approve Sucessfully");
    setPOIFormSuccessShow("Success");
    setPOIFormIsOpenModalShow(true)
    setFormShow(false);
  }

  const handleRejectPOI =()=>{
    setMessage("POI Rejected !");
    setPOIFormSuccessShow("Failure");
    setPOIFormIsOpenModalShow(true)
    setFormShow(false);
  }

  return (
    <div className="w-full max-w-lg bg-transparent overflow-y-auto">
      <div className="px-2 py-1 h-full space-y-4">
        {renderField("Organization", poiData.organization)}
        {renderField("Name", poiData.name)}
        {renderField("Class", poiData.class)}
        {renderField("ClassD", poiData.classD)}
        {renderField("Status", poiData.status)}
        {renderField("Comment", poiData.comment)}
        {renderField("Description", poiData.description)}
        {renderField("Poems", poiData.poems)}
        {renderField("Stories", poiData.stories)}
        {renderField("Classification", poiData.classification)}
        {renderField("Municipality", poiData.municipality)}
        {renderField("Emirate", poiData.emirate)}

        {/* Photos Section */}
        <div className="px-3 py-6 border border-none rounded-lg bg-white space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Photos</h3>
            <div className="relative h-[90px] rounded-lg overflow-hidden">
              <img src={SeaPOI} alt="seaPOI" className="w-[50%] h-[90px] object-cover" />
            </div>
          </div>

          {/* Videos Section */}
          <div>
            <h3 className="text-sm font-medium mb-2">Videos</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative h-[90px] rounded-lg overflow-hidden">
                <img src={PlayThumbPOI} alt="Video thumbnail" className="w-full h-auto object-cover" />
                <img src={PlayIconPOI} alt="Play icon" className="w-full h-auto object-cover" />
                <button className="absolute inset-0 m-auto bg-black/50 hover:bg-black/70 flex items-center justify-center">
                  <video src="" className="w-full h-auto" controls />
                </button>
              </div>
            </div>
          </div>

          {/* Audio Section */}
          <div>
            <h3 className="text-sm font-medium mb-2">Audio</h3>
            <div className="flex p-2 h-10 bg-gray-300 rounded-full justify-center items-center overflow-hidden">
              <audio controls className="w-13" style={{ width: '100px' }}>
                <source src="" />
                Your browser does not support the audio tag.
              </audio>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-16 items-center">
          <button onClick={handleApprovePOI} className="w-auto py-3 px-9 bg-custom-gradient text-xs border border-black rounded-lg">
            Approve
          </button>
          <button onClick={handleRejectPOI} className="w-auto py-3 px-9 bg-[#FFE8E8] text-xs border border-[#909090] rounded-lg">
            Reject
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-500 w-full flex justify-center items-center py-2">
        X 54.2971051, Y 24.0622842
      </div>
    </div>
  );
};

export default DropBinStatusUpdate;
