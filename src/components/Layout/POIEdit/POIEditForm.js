"use client";

import React, { useEffect, useState } from "react";
import SeaPOI from '../../../assets/POIEdit/imagePOISea.png';
import PlayIconPOI from '../../../assets/POIEdit/imagePlayvideoIcon.png';
import PlayThumbPOI from '../../../assets/POIEdit/POIVideoThumb.png';
import AudioPlayPOI from '../../../assets/POIEdit/AudioPlay.svg';
import AudioLineStylePOI from '../../../assets/POIEdit/AudioLineStyle.svg';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";  
import { useAuth } from "../../../Providers/AuthProvider/AuthProvider";
import config from '../../Common/config'; // Import your config file

const Component = ({ POIFormShow, setPOIUploaderShow, setIsShowEditPOI, setPOIFormShow, isEditShowPOI, queryresults, setIsEditPOI, uploadedFiles, setPOImessageShow, setPOIFormsuccessShow, setPOIFormisOpenModalShow, setUploadedFiles }) => {
  const [poiData, setPoiData] = useState({
    organization_En: "DMT",
    name_en: "Al Buwam",
    Class: "Zubara",
    ClassD: "DMT",
    Status: "Needs Review",
    Comment: "Imported from UAEU Atlas",
    description: "Eastern and western",
    poems: "بيت الزوم وبه ... ما جرى الاحسان بالي شوالك بحر ... ما هو ما",
    stories: "",
    Classification: "Marine",
    Municipality: "Al Dhafra",
    Emirate: "Abu Dhabi",
    City: "Western Region"
  });
  const { profiledetails, contextMapView } = useAuth();

  const organizationOptions = ["DMT", "Org 2", "Org 3", "Org 4"];
  const classOptions = ["Zubara", "Option 2", "Option 3"];
  const statusOptions = ["Needs Review", "Approved", "Rejected"];
  const classificationOptions = ["Marine", "Terrestrial", "Aerial"];
  const municipalityOptions = ["Al Dhafra", "Municipality 2", "Municipality 3"];

  const [images, setimages] = useState([])
  const [videos, setvideos] = useState([])
  const [audios, setAudios] = useState([])

  useEffect(() => {
    if (queryresults && queryresults.features && queryresults.features.length > 0) {
      const attributes = queryresults.features[0].attributes;
      
      // Extract only the fields you want to update in poiData
      const updatedData = {
        organization_En: attributes.organization_En,
        name_en: attributes.name_en,
        Class: attributes.Class,
        ClassD: attributes.ClassD,
        Status: attributes.Status,
        Comment: attributes.Comment,
        description: attributes.description,
        poems: attributes.poems,
        stories: attributes.stories,
        Classification: attributes.Classification,
        Municipality: attributes.Municipality,
        Emirate: attributes.Emirate,
        City: attributes.City,
      };

      setPoiData(updatedData);
    }
  }, [queryresults]);

  useEffect(()=>{
    const featchattachments = async() =>{
      if(queryresults !== ""){
        try {
          setimages([]);
          setvideos([]);
          setAudios([]);
          // Finding the corresponding URL in the config
          const LayerConfig = config.featureServices.find(service => queryresults.features[0].layer.title.includes(service.name));
          const featureLayer = new FeatureLayer({
            url: LayerConfig.url,
            outFields: ["*"]
          });
          const imageArray =[];
          const videoArray =[];
          const audioArray =[];
          const attachments = await featureLayer.queryAttachments({ objectIds: queryresults.features[0].attributes.OBJECTID });
          if (attachments[queryresults.features[0].attributes.OBJECTID] && attachments[queryresults.features[0].attributes.OBJECTID].length > 0) {
            attachments[queryresults.features[0].attributes.OBJECTID].forEach(attachment => {
                //addMediaToContainer(attachment.contentType, attachment.url, objectId, nameEng);
                console.log(attachment)
                if(attachment.contentType.includes("image")){
                  const imageObj ={
                    name: attachment.name,
                    url: attachment.url
                  }
                  imageArray.push(imageObj)
                }else if(attachment.contentType.includes("video")){
                  const videoObj ={
                    name: attachment.name,
                    url: attachment.url
                  }
                  videoArray.push(videoObj)
                }else{
                  const audioObj ={
                    name: attachment.name,
                    url: attachment.url
                  }
                  audioArray.push(audioObj)
                }
            });
            setimages(imageArray);
            setvideos(videoArray);
            setAudios(audioArray);
        }
        }catch(error){
          console.error("Error querying attachments:", error);
        }
      }
    }
    
    featchattachments()
  },[queryresults])

  const handleAttributesUpdate =() =>{
    // Find the URL for the layer that includes "Terrestrial" in its name
    const LayerConfig = config.featureServices.find(service => queryresults.features[0].layer.title.includes(service.name));
    const featureLayerURL = LayerConfig.url;
    const objectid = queryresults.features[0].attributes.OBJECTID
    // Use updated poiAttributes for updating attributes
    const updatedFields = { ...poiData, OBJECTID: objectid, Isadminapproved:2 };
    //console.log(files);
    updateAttributes(featureLayerURL, objectid, updatedFields);
  }
  
  const updateAttributes = async (featureServiceURL, objectId, updatedFields) => {
    // Find the URL for the layer that includes "Terrestrial" in its name
    const LayerConfig = config.featureServices.find(service => queryresults.features[0].layer.title.includes(service.name));
    // Create the feature layer
    const featureLayer = new FeatureLayer({
      url: LayerConfig.url
    });
    const updateData = [{
          attributes: updatedFields
      }];
    try {
      const result = await featureLayer.applyEdits({ updateFeatures: updateData });

      if (result.updateFeatureResults.length > 0) {  
        if (uploadedFiles.length > 0) { 
          handleUploadFile();   
        }
        else{
          handleStoreFeatureData("",LayerConfig.url)
        }
        setIsShowEditPOI(false);   
        //setIsEditPOI(false);
        //sucessModel("Sucessfully Data Updated","Success", true)
        console.log('Update successful:', result.updateFeatureResults);
      } else {
        console.error('Update failed:', result);
      }
    } catch (error) {
      console.error('Error updating feature:', error);
    }
  }

  const handleUploadFile = async() => {
    if (uploadedFiles.length > 0) { // Ensure there are uploaded files
      // Find the URL for the layer that includes "Terrestrial" in its name
      const LayerConfig = config.featureServices.find(service => queryresults.features[0].layer.title.includes(service.name));
      const attachmentUrl = `${LayerConfig.url}/${queryresults.features[0].attributes.OBJECTID}/addAttachment`;
      const promises = Array.from(uploadedFiles).map(file => {
        const formData = new FormData();
        formData.append("attachment", file);
        formData.append("f", "json"); // Specify the response format

        return fetch(attachmentUrl, {
          method: 'POST',
          body: formData,
        });
      });

      try {
        const results = await Promise.all(promises);
        
        // Check for errors in each response
        const responses = await Promise.all(results.map(async res => {
          if (!res.ok) {
            // If the response is not OK, throw an error
            const errorData = await res.json();
            throw new Error(`Error: ${errorData.message || 'Unknown error'}`);
          }
          return res.json(); // Parse and return the response JSON
        }));
        if(responses.length >0){

          const attachmentIds = responses.map(response => 
            response.addAttachmentResult ? response.addAttachmentResult.objectId : null
          ).filter(id => id !== null);

          handleStoreFeatureData(String(attachmentIds), LayerConfig.url)
        }
        console.log("Attachments added successfully:", responses);
      } catch (error) {
        console.error("Error adding attachments:", error);
      }
    } else {
      alert('Please upload files before proceeding.'); // Optional alert for user feedback
    }
  };

  const handleStoreFeatureData = async(attachmentIds, LayerUrl) =>{
    const attributes = queryresults.features[0].attributes;
      
          // Extract only the fields you want to update in poiData
          const FeatureData = {
            Username: profiledetails.username,
            Email: profiledetails.email,
            FeatureObjectId: attributes.OBJECTID,
            OrganizationEn: attributes.organization_En || "",
            NameEn: attributes.name_en || "",
            Class: attributes.Class || "",
            ClassD: attributes.ClassD || "",
            Status: attributes.Status || "",
            Comment: attributes.Comment || "",
            Description: attributes.description || "",
            Poems: attributes.poems || "",
            stories: attributes.stories || "",
            Classification: attributes.Classification || "",
            Municipality: attributes.Municipality || "",
            Emirate: attributes.Emirate || "",
            City: attributes.City || "",
            AttachementsObjectIds:attachmentIds,
            ApprovalStatus: "Pending",
            featureServiceURL:LayerUrl
          };
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/FeatureServiceData/featureservicedatainsert`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(FeatureData),
            });
            const data = await response.json();
                if(data.success){
                  console.log(data.message);     
                  contextMapView.graphics.removeAll(); // Clears all graphics  
                  contextMapView.map.layers.forEach(layer => {
                    if (layer.refresh) {
                      layer.refresh();
                    }
                  });           
                  setPOImessageShow("Your file and data has been uploaded successfully!");
                  setPOIFormsuccessShow("Success"); // or "Failure" based on your logic
                  setPOIFormisOpenModalShow(true); // Show the modal
                  setPOIFormShow(false);
                  setPOIUploaderShow(false);
                  setUploadedFiles([]); // Clear the uploaded files if necessary
                }
                else{
                  console.log(data.message);
                }
            
            } catch (error) {
                console.error('Error submitting form:', error);
            }   
  }

  if (!POIFormShow) return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPoiData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };  

  console.log("POI Data:", poiData);

  const renderFieldOrText = (id, label, value,options = [], inputType = "text") => (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {isEditShowPOI ? (
        inputType === "select" ? (
          <select
            id={id}
            value={poiData[id]}
            onChange={handleChange}
            className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            value={poiData[id]}
            onChange={handleChange}
            className="block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        )
      ) : (
        <p className={` border ${value? "p-2": "p-5" } rounded-md bg-gray-100`}>{value}</p>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-md bg-transparent overflow-y-auto ">
      <div className="p-2 space-y-4">
        {(!queryresults.features || queryresults.features.length === 0) ? (
          <p>No results found.</p> // Display message if there are no features
        ) : (
          <>
            {renderFieldOrText("organization_En", "Organization", queryresults.features[0].attributes.organization_En,organizationOptions, "select")}
            {renderFieldOrText("name_en", "Name", queryresults.features[0].attributes.name_en)}
            {renderFieldOrText("Class", "Class", queryresults.features[0].attributes.Class,classOptions, "select")}
            {renderFieldOrText("ClassD", "ClassD", queryresults.features[0].attributes.ClassD)}
            {renderFieldOrText("Status", "Status", queryresults.features[0].attributes.Status,statusOptions, "select")}

            {renderFieldOrText("Comment", "Comment", queryresults.features[0].attributes.Comment)}
            {renderFieldOrText("description", "Description", queryresults.features[0].attributes.description)}
            {renderFieldOrText("poems", "Poems", queryresults.features[0].attributes.poems)}
            {renderFieldOrText("stories", "Stories", queryresults.features[0].attributes.stories)}

            {renderFieldOrText("Classification", "Classification", queryresults.features[0].attributes.Classification,classificationOptions, "select")}
            {renderFieldOrText("Municipality", "Municipality", queryresults.features[0].attributes.Municipality, municipalityOptions,"select")}

            {renderFieldOrText("Classification", "Classification", queryresults.features[0].attributes.Classification || "None", "select")}
            {renderFieldOrText("Municipality", "Municipality", queryresults.features[0].attributes.Municipality || "None", "select")}

            {renderFieldOrText("Emirate", "Emirate", queryresults.features[0].attributes.Emirate)}
            {renderFieldOrText("City", "City", queryresults.features[0].attributes.City)}

             {/* Photos Section */}
             <div className="px-3 py-6 border border-none rounded-lg bg-white space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Photos</h3>
                {images.length > 0 ? (
                  images.map((image, index) => (
                    <div key={index} className="relative h-[90px] rounded-lg overflow-hidden">
                      <img src={image.url} alt={image.name} className="w-[50%] h-[90px] object-cover" />
                    </div>
                  ))
                ) : (
                  <p>No photos available.</p>
                )}
              </div>

              {/* Videos Section */}
              <div>
                <h3 className="text-sm font-medium mb-2">Videos</h3>
                {videos.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {videos.map((video, index) => (
                      <div key={index} className="relative h-[90px] rounded-lg overflow-hidden">
                        <img src={PlayThumbPOI} alt={`Video thumbnail ${index}`} className="w-full h-auto object-cover" />
                        <button className="absolute inset-0 m-auto bg-black/50 hover:bg-black/70 flex items-center justify-center">
                          <video
                            src={video.url}
                            className="w-full h-auto"
                            controls
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No videos available.</p>
                )}
              </div>

              {/* Audio Section */}
              <div>
                <h3 className="text-sm font-medium mb-2">Audio</h3>
                {audios.length > 0 ? (
                  audios.map((audio, index) => (
                    <div key={index} className="flex p-2 h-10 bg-gray-300 rounded-full justify-center items-center overflow-hidden">
                      <audio controls className="w-13" style={{ width: '100px' }}>
                        <source src={audio.url} />
                        Your browser does not support the audio tag.
                      </audio>
                    </div>
                  ))
                ) : (
                  <p>No audio files available.</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {isEditShowPOI && (
              <div className="flex justify-center space-x-8 items-center">
                <button onClick={() => setIsShowEditPOI(false)} className="w-auto py-3 px-9 bg-transparent text-xs border border-black rounded-lg">
                  Cancel
                </button>
                <button onClick={() => { handleAttributesUpdate()}} className="w-auto py-3 px-9 bg-custom-gradient text-xs border border-gray-300 rounded-lg">
                  Update
                </button>
              </div>
            )}

            {isEditShowPOI && (
              <>
                <div className="grid grid-cols-1 py-3 justify-center items-center">
                  <p className="flex justify-center text-sm items-center">Want to share photos, videos, and audio</p>
                  <p className="flex justify-center text-sm items-center">for this location?</p>
                  <p className="flex justify-center text-sm items-center">Please click the upload button.</p>
                </div>
                <div className="flex justify-center items-center">
                  <p onClick={() => { setPOIUploaderShow(true); setPOIFormShow(false); }} className="cursor-pointer text-blue-500 hover:text-blue-800 underline">
                    Upload a file
                  </p>
                </div>
              </>
            )}

            <div className="text-sm text-gray-500 px-12">X 54.2971051, Y 24.0622842</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Component;
