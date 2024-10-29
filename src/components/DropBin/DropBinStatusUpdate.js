"use client";

import React, { useEffect, useState } from "react";
import SeaPOI from '../../assets/POIEdit/imagePOISea.png';
import PlayIconPOI from '../../assets/POIEdit/imagePlayvideoIcon.png';
import PlayThumbPOI from '../../assets/POIEdit/POIVideoThumb.png';
import AudioPlayPOI from '../../assets/POIEdit/AudioPlay.svg';
import AudioLineStylePOI from '../../assets/POIEdit/AudioLineStyle.svg';
import { useAuth } from "../../Providers/AuthProvider/AuthProvider";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";  
import Graphic from '@arcgis/core/Graphic';

const DropBinStatusUpdate = ({setMessage,setFormShow,setPOIFormIsOpenModalShow,setPOIFormSuccessShow,isFormShow}) => {
  const [poiData, setPoiData] = useState({
    organization_En: "",
    name_en: "",
    Class: "",
    ClassD: "",
    Status: "",
    Comment: "",
    description: "",
    poems: "",
    stories: "",
    Classification: "",
    Municipality: "",
    Emirate: ""
  });
  const {dropPinObjectId, contextMapView} = useAuth();
  const [images, setimages] = useState([])
  const [videos, setvideos] = useState([])
  const [audios, setAudios] = useState([])

  useEffect(() => {
    let isMounted = true; // Track if the component is still mounted to avoid redundant calls
    
    const loadFeatureServicedata = async () => {
      if (dropPinObjectId && contextMapView && isMounted) {
        const featureLayer = new FeatureLayer({
          url: dropPinObjectId.featureServiceURL,
          outFields: ["*"],
        });
    
        try {
          const query = featureLayer.createQuery();
          query.where = `OBJECTID=${dropPinObjectId.objectID}`;
          query.returnGeometry = true;
          query.outFields = ["*"];
          
          const results = await featureLayer.queryFeatures(query);
          const features = results.features;
          
          if (features.length > 0 && isMounted) {
           const attributes = features[0].attributes;
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
            // Wrap goTo in a try-catch to handle interruptions
            try {
              await contextMapView.when(() => {
                return contextMapView.goTo({
                  target: features[0].geometry,
                  zoom: 15
                });
              });
            } catch (error) {
              console.warn("GoTo was interrupted:", error);
            }
            
            // Define the symbol for drawing the point
            let markerSymbol = {
              type: "simple-marker",
              outline: {
                color: [0, 255, 255, 4],
                width: 1
              }
            };
            
            // Create a graphic and add the geometry and symbol to it
            let pointGraphic = new Graphic({
              geometry: features[0].geometry,
              symbol: markerSymbol
            });
            contextMapView.graphics.add(pointGraphic);
          } else {
            console.warn("No features found for the given ObjectID.");
          }
          
        } catch (error) {
          console.error(`Error querying layer "${dropPinObjectId.objectID}":`, error);
        }
      }        
    };

    loadFeatureServicedata();

    return () => {
      isMounted = false; // Clean up on component unmount to avoid memory leaks
    };
  }, [dropPinObjectId, contextMapView]);

  useEffect(()=>{
    const featchattachments = async() =>{
      if(dropPinObjectId !== ""){
        try {
          setimages([]);
          setvideos([]);
          setAudios([]);
          
          const featureLayer = new FeatureLayer({
            url: dropPinObjectId.featureServiceURL,
            outFields: ["*"]
          });
          const imageArray =[];
          const videoArray =[];
          const audioArray =[];
          const attachments = await featureLayer.queryAttachments({ objectIds: dropPinObjectId.objectID });
          if (attachments[dropPinObjectId.objectID] && attachments[dropPinObjectId.objectID].length > 0) {
            attachments[dropPinObjectId.objectID].forEach(attachment => {
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
  },[])

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

  const handleApprovePOI =async()=>{
    // Create the feature layer
    const featureLayer = new FeatureLayer({
      url: dropPinObjectId.featureServiceURL
    });
    const updateData = [{
          attributes: {
            OBJECTID:dropPinObjectId.objectID,
            Isadminapproved:1
          }
      }];
    try {
      const result = await featureLayer.applyEdits({ updateFeatures: updateData });

      if (result.updateFeatureResults.length > 0) {  
        // if (uploadedFiles.length > 0) { 
        //   handleUploadFile();   
        // }
        // else{
        //   handleStoreFeatureData("",LayerConfig.url)
        // }
        //setIsEditPOI(false);
        //sucessModel("Sucessfully Data Updated","Success", true)
        contextMapView.graphics.removeAll(); // Clears all graphics
        contextMapView.map.layers.forEach(layer => {
          if (layer.refresh) {
            layer.refresh();
          }
        });           
        setMessage("POI Approve Sucessfully");
        setPOIFormSuccessShow("Success");
        setPOIFormIsOpenModalShow(true)
        setFormShow(false);
        console.log('Update successful:', result.updateFeatureResults);
      } else {
        console.error('Update failed:', result);
      }
    } catch (error) {
      console.error('Error updating feature:', error);
    }
    
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
        {renderField("Organization", poiData.organization_En)}
        {renderField("Name", poiData.name_en)}
        {renderField("Class", poiData.Class)}
        {renderField("ClassD", poiData.ClassD)}
        {renderField("Status", poiData.Status)}
        {renderField("Comment", poiData.Comment)}
        {renderField("Description", poiData.description)}
        {renderField("Poems", poiData.poems)}
        {renderField("Stories", poiData.stories)}
        {renderField("Classification", poiData.Classification)}
        {renderField("Municipality", poiData.Municipality)}
        {renderField("Emirate", poiData.Emirate)}

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
