"use client";
import { FaPlay, FaPause } from "react-icons/fa"; // Example using Font Awesome icons

import React, { useEffect, useRef, useState } from "react";
import SeaPOI from "../../../assets/POIEdit/imagePOISea.png";
import PlayIconPOI from "../../../assets/POIEdit/imagePlayvideoIcon.png";
import PlayThumbPOI from "../../../assets/POIEdit/POIVideoThumb.png";
import AudioPlayPOI from "../../../assets/POIEdit/playPOIEdit.svg";
import AudioLineStylePOI from "../../../assets/POIEdit/AudioLineStyle.svg";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { useAuth } from "../../../Providers/AuthProvider/AuthProvider";
import config from "../../Common/config"; // Import your config file
import { UserActivityLog } from "../../Common/UserActivityLog";
import { useTheme } from "../ThemeContext/ThemeContext";
import RoleServices from '../../servicces/RoleServices';


const Component = ({
  POIFormShow,
  isLangArab,
  setPOIUploaderShow,
  setIsShowEditPOI,
  setPOIFormShow,
  isEditShowPOI,
  queryresults,
  setIsEditPOI,
  uploadedFiles,
  setPOImessageShow,
  setPOIFormsuccessShow,
  setPOIFormisOpenModalShow,
  setUploadedFiles,
}) => {
  const [poiData, setPoiData] = useState({
    organization: "DMT",
    name_en: "Al Buwam",
    Class: "Zubara",
    ClassD: "DMT",
    Status: "Needs Review",
    Comment: "Imported from UAEU Atlas",
    description: "Eastern and western",
    poems: "بيت الزوم وبه ... ما جرى الاحسان بالي شوالك بحر ... ما هو ما",
    stories: "",
    Classification: "Marine",
    MunicipalityAr: "Al Dhafra",
    Emirate: "Abu Dhabi",
    City: "Western Region",
  });
  const { profiledetails, contextMapView } = useAuth();
  const [isShowMore, setIsShowMore] = useState(false);

  //const organizationOptions = ["DMT", "Org 2", "Org 3", "Org 4"];
  const classOptions = ["Zubara", "Option 2", "Option 3"];
  //const statusOptions = ["Needs Review", "Approved", "Rejected"];
  const classificationOptions = ["Marine", "Terrestrial", "Aerial"];
  //const municipalityOptions = ["Al Dhafra", "Municipality 2", "Municipality 3"];

  const [images, setimages] = useState([]);
  const [videos, setvideos] = useState([]);
  const [audios, setAudios] = useState([]);

  const [organizationOptions, setOrganizationOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [municipalityOptions, setMunicipalityOptions] = useState([]);
  const [classOption, setClassOptions] = useState([]);
  const [classArOption, setClassArOptions] = useState([]);


  const audioRefs = useRef([]); // Array of refs for each audio
  const [playingIndex, setPlayingIndex] = useState(null); // Track which audio is playing
  const [pausedAt, setPausedAt] = useState(0); // Tracks the paused position
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (
      queryresults &&
      queryresults.features &&
      queryresults.features.length > 0
    ) {
      const attributes = queryresults.features[0].attributes;

      // Extract only the fields you want to update in poiData
      const updatedData = {
        organization: isLangArab? attributes.organization : attributes.organization_En,
        name_en: isLangArab?attributes.name_ar: attributes.name_en,
        Class: isLangArab?attributes.ClassAr:attributes.Class,
        ClassD: isLangArab? attributes.ClassD_Ar : attributes.ClassD,
        Status: attributes.Status,
        Comment: attributes.Comment,
        description: attributes.description,
        poems: attributes.poems,
        stories: attributes.stories,
        Classification: isLangArab? attributes.Classification_ar : attributes.Classification,
        MunicipalityAr: isLangArab? attributes.MunicipalityAr : attributes.Municipality,
        Emirate: isLangArab? attributes.EmirateAr :attributes.Emirate,
        City: isLangArab? attributes.CityAr : attributes.City,
      };

      setPoiData(updatedData);
    }
  }, [queryresults,isLangArab]);

  useEffect(() => {
    if (isEditShowPOI) {
      setIsShowMore(true);
    }
  }, [isEditShowPOI]);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        // Retrieve the Terrestrial URL from config
        const terrestrialUrl = config.featureServices.find(
          (service) => service.name
        )?.url;

        if (!terrestrialUrl) {
          console.error("Terrestrial service URL not found");
          return;
        }

        // Fetch data from the service URL
        const response = await fetch(`${terrestrialUrl}?f=json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${terrestrialUrl}`);
        }

        const data = await response.json();
        const domainFields = data.fields.filter((field) => field.domain);

        // Iterate over fields and set state based on the field name
        const newOrganizationOptions = [];
        const newStatusOptions = [];
        const newMunicipalityOptions = [];
        const newClassOptions = [];
        const newClassArOptions = [];


        domainFields.forEach((field) => {
          const options = field.domain.codedValues.map((codedValue) => ({
            label: codedValue.name, // Description or name
            value: codedValue.code, // Coded value
          }));

          switch (field.name) {
            case "organization":
              newOrganizationOptions.push(...options);
              break;
            case "Status":
              newStatusOptions.push(...options);
              break;
            case "MunicipalityAr":
              newMunicipalityOptions.push(...options);
              break;
            case "Class":
              newClassOptions.push(...options);
              break;
            case "ClassAr":
              newClassArOptions.push(...options);
              break;
            default:
              console.warn(`Unhandled field: ${field.fieldName}`);
          }
        });

        // Set the state for options
        setOrganizationOptions(newOrganizationOptions);
        setStatusOptions(newStatusOptions);
        setMunicipalityOptions(newMunicipalityOptions);
        setClassOptions(newClassOptions);
        setClassArOptions(newClassArOptions)
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    };

    fetchDomains(); // Call the async function
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    const featchattachments = async () => {
      if (queryresults !== "") {
        try {
          setimages([]);
          setvideos([]);
          setAudios([]);
          // Finding the corresponding URL in the config
          const LayerConfig = config.featureServices.find((service) =>
            queryresults.features[0].layer.title.includes(service.name)
          );
          const featureLayer = new FeatureLayer({
            url: LayerConfig.url,
            outFields: ["*"],
          });
          const imageArray = [];
          const videoArray = [];
          const audioArray = [];
          const attachments = await featureLayer.queryAttachments({
            objectIds: queryresults.features[0].attributes.OBJECTID,
          });
          if (
            attachments[queryresults.features[0].attributes.OBJECTID] &&
            attachments[queryresults.features[0].attributes.OBJECTID].length > 0
          ) {
            attachments[queryresults.features[0].attributes.OBJECTID].forEach(
              (attachment) => {
                //addMediaToContainer(attachment.contentType, attachment.url, objectId, nameEng);
                console.log(attachment);
                if (attachment.contentType.includes("image")) {
                  const imageObj = {
                    name: attachment.name,
                    url: attachment.url,
                  };
                  imageArray.push(imageObj);
                } else if (attachment.contentType.includes("video")) {
                  const videoObj = {
                    name: attachment.name,
                    url: attachment.url,
                  };
                  videoArray.push(videoObj);
                } else {
                  const audioObj = {
                    name: attachment.name,
                    url: attachment.url,
                  };
                  audioArray.push(audioObj);
                }
              }
            );
            setimages(imageArray);
            setvideos(videoArray);
            setAudios(audioArray);
          }
        } catch (error) {
          console.error("Error querying attachments:", error);
        }
      }
    };

    featchattachments();
  }, [queryresults]);

  // useEffect(() => {
  //   if (!(videos.length > 0 || audios.length > 0 || images.length > 0)) {
  //     setIsShowMore(true);
  //   }
  // }, [videos, audios, images]);

  const handleAudioLoadedMetadata = (index) => {
    const audioElement = audioRefs.current[index];
    if (audioElement) {
      const duration = audioElement.duration; // Duration in seconds
      console.log(`Audio ${index} duration: ${duration} seconds`);
    }
  };

  const handleAttributesUpdate = () => {
    // Find the URL for the layer that includes "Terrestrial" in its name
    const LayerConfig = config.featureServices.find((service) =>
      queryresults.features[0].layer.title.includes(service.name)
    );
    const featureLayerURL = LayerConfig.url;
    const objectid = queryresults.features[0].attributes.OBJECTID;
    // Use updated poiAttributes for updating attributes
    const updatedFields = {
      ...poiData,
      OBJECTID: objectid,
      Isadminapproved: 2,
    };
    //console.log(files);
    //const attributes = queryresults.features[0].attributes;
    let finalUpdatedFields = null;
    if(isLangArab){
      finalUpdatedFields={
        organization: updatedFields.organization,
        name_ar: updatedFields.name_en,
        ClassAr: updatedFields.Class,
        ClassD_Ar: updatedFields.ClassD,
        Classification_ar: updatedFields.Classification,
        MunicipalityAr: updatedFields.MunicipalityAr,
        CityAr: updatedFields.City,
        OBJECTID: objectid,
        Isadminapproved: 2,
      }
    }
    else{
      finalUpdatedFields={
        organization_En: updatedFields.organization,
        name_en: updatedFields.name_en,
        Class: updatedFields.Class,
        ClassD: updatedFields.ClassD,
        Status: updatedFields.Status,
        Comment: updatedFields.Comment,
        //description: attributes.description,
        poems: updatedFields.poems,
        stories: updatedFields.stories,
        Classification: updatedFields.Classification,
        Municipality: updatedFields.MunicipalityAr,
        //Emirate: isLangArab? attributes.EmirateAr :attributes.Emirate,
        City: updatedFields.City,
        OBJECTID: objectid,
        Isadminapproved: 2,
      }
    }
    updateAttributes(featureLayerURL, objectid, finalUpdatedFields);
  };

  const updateAttributes = async (
    featureServiceURL,
    objectId,
    updatedFields
  ) => {
    // Find the URL for the layer that includes "Terrestrial" in its name
    const LayerConfig = config.featureServices.find((service) =>
      queryresults.features[0].layer.title.includes(service.name)
    );
    // Create the feature layer
    const featureLayer = new FeatureLayer({
      url: LayerConfig.url,
    });
    const updateData = [
      {
        attributes: updatedFields,
      },
    ];
    try {
      const result = await featureLayer.applyEdits({
        updateFeatures: updateData,
      });

      if (result.updateFeatureResults.length > 0) {
        if (uploadedFiles.length > 0) {
          handleUploadFile();
        } else {
          handleStoreFeatureData("", LayerConfig.url);
        }
        setIsShowEditPOI(false);
        //setIsEditPOI(false);
        //sucessModel("Sucessfully Data Updated","Success", true)
        console.log("Update successful:", result.updateFeatureResults);
      } else {
        console.error("Update failed:", result);
      }
    } catch (error) {
      console.error("Error updating feature:", error);
    }
  };

  const handleUploadFile = async () => {
    if (uploadedFiles.length > 0) {
      // Ensure there are uploaded files
      // Find the URL for the layer that includes "Terrestrial" in its name
      const LayerConfig = config.featureServices.find((service) =>
        queryresults.features[0].layer.title.includes(service.name)
      );
      const attachmentUrl = `${LayerConfig.url}/${queryresults.features[0].attributes.OBJECTID}/addAttachment`;
      const promises = Array.from(uploadedFiles).map((file) => {
        const formData = new FormData();
        formData.append("attachment", file);
        formData.append("f", "json"); // Specify the response format

        return fetch(attachmentUrl, {
          method: "POST",
          body: formData,
        });
      });

      try {
        const results = await Promise.all(promises);

        // Check for errors in each response
        const responses = await Promise.all(
          results.map(async (res) => {
            if (!res.ok) {
              // If the response is not OK, throw an error
              const errorData = await res.json();
              throw new Error(`Error: ${errorData.message || "Unknown error"}`);
            }
            return res.json(); // Parse and return the response JSON
          })
        );
        if (responses.length > 0) {
          const attachmentIds = responses
            .map((response) =>
              response.addAttachmentResult
                ? response.addAttachmentResult.objectId
                : null
            )
            .filter((id) => id !== null);

          handleStoreFeatureData(String(attachmentIds), LayerConfig.url);
        }
        console.log("Attachments added successfully:", responses);
      } catch (error) {
        console.error("Error adding attachments:", error);
      }
    } else {
      setPOImessageShow( isLangArab?"يرجى تحميل الملفات قبل المتابعة.": "Please upload files before proceeding.");
      setPOIFormsuccessShow("Failure"); // or "Failure" based on your logic
      setPOIFormisOpenModalShow(true);
      // alert("Please upload files before proceeding."); 
    }
  };

  const handleStoreFeatureData = async (attachmentIds, LayerUrl) => {
    const attributes = queryresults.features[0].attributes;
    let FeatureData = null;
    if(isLangArab){
      FeatureData = {
        Username: profiledetails.username,
        Email: profiledetails.email,
        FeatureObjectId: attributes.OBJECTID,
        OrganizationAr: attributes.organization || "",
        NameAr: attributes.name_ar || "",
        ClassAr: attributes.ClassAr || "",
        ClassDAr: attributes.ClassD_Ar || "",
        ClassificationDAr: attributes.Classification_ar || "",
        MunicipalityAr: attributes.MunicipalityAr || "",
        CityAr: attributes.CityAr || "",
        AttachementsObjectIds: attachmentIds,
        ApprovalStatus: "Pending",
        featureServiceURL: LayerUrl,
        POIOperation: "Update Feature",
        isLanguageArabic:isLangArab
      };
    }
    else{
      // Extract only the fields you want to update in poiData
      FeatureData = {
        Username: profiledetails.username,
        Email: profiledetails.email,
        FeatureObjectId: attributes.OBJECTID,
        OrganizationEn: attributes.organization_En || "",
        NameEn: attributes.name_en || "",
        Class: attributes.Class || "",
        ClassD: attributes.ClassD || "",
        Status: attributes.Status || "",
        Comment: attributes.Comment || "",
        //Description: attributes.description || "",
        Poems: attributes.poems || "",
        stories: attributes.stories || "",
        Classification: attributes.Classification || "",
        Municipality: attributes.Municipality || "",
        //Emirate: attributes.Emirate || "",
        City: attributes.City || "",
        AttachementsObjectIds: attachmentIds,
        ApprovalStatus: "Pending",
        featureServiceURL: LayerUrl,
        POIOperation: "Update Feature",
        isLanguageArabic:isLangArab
      };
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/FeatureServiceData/featureservicedatainsert`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(FeatureData),
        }
      );
      const data = await response.json();
      if (data.success) {
        console.log(data.message);
        contextMapView.graphics.removeAll(); // Clears all graphics
        contextMapView.map.layers.forEach((layer) => {
          if (layer.refresh) {
            layer.refresh();
          }
        });
        UserActivityLog(profiledetails, "POI Updated");
        setPOImessageShow(
          isLangArab ? "تم تحميل الملف بنجاح!" : "File uploaded successfully!"
        );
        setPOIFormsuccessShow("Success"); // or "Failure" based on your logic
        setPOIFormisOpenModalShow(true); // Show the modal
        setPOIFormShow(false);
        setPOIUploaderShow(false);
        setUploadedFiles([]); // Clear the uploaded files if necessary
      } else {
        setPOImessageShow(
          isLangArab ? "فشل في تحميل الملف!" : " Failed to  uploaded File!"
        );
        setPOIFormsuccessShow("Failure"); // or "Failure" based on your logic
        setPOIFormisOpenModalShow(true); // Show the modal
        setPOIFormShow(false);
        setPOIUploaderShow(false);
        setUploadedFiles([]);
        console.log(data.message);
      }
    } catch (error) {
      setPOImessageShow(
        isLangArab ? "فشل في تحميل الملف!" : " Failed to  uploaded File!"
      );
      setPOIFormsuccessShow("Failure"); // or "Failure" based on your logic
      setPOIFormisOpenModalShow(true); // Show the modal
      setPOIFormShow(false);
      setPOIUploaderShow(false);
      setUploadedFiles([]);
      console.error("Error submitting form:", error);
    }
  };

  if (!POIFormShow) return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPoiData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handlePlayAudio = (index) => {
    if (playingIndex === index) {
      // If already playing, pause it
      handlePauseAudio(index);
    } else {
      // If a different track is selected, pause the currently playing track
      if (playingIndex !== null && audioRefs.current[playingIndex]) {
        audioRefs.current[playingIndex].pause();
      }
      // Resume from last paused position if available
      audioRefs.current[index].currentTime = pausedAt;
      audioRefs.current[index].play();
      setPlayingIndex(index);
      setPausedAt(0); // Reset paused position when a new track is played
    }
  };

  const handlePauseAudio = (index) => {
    // Pause the audio and store the current position
    audioRefs.current[index].pause();
    setPausedAt(audioRefs.current[index].currentTime);
    setPlayingIndex(null); // Set playingIndex to null when paused
  };

  const handleAudioEnded = () => {
    // Reset state when audio finishes
    setPlayingIndex(null);
    setPausedAt(0);
  };

  console.log("POI organization:",organizationOptions)

  const renderFieldOrText = (
    id,
    label,
    value,
    options = [],
    inputType = "text",
    disable
  ) => (
    <div
      className={` ${!isEditShowPOI && " relative"} z-50`}
    >
      {isEditShowPOI && (
        <label
        dir={isLangArab && "rtl"}
          htmlFor={id}
          className={`block  text-[14px] font-medium ${
            isDarkMode ? "text-white" : "text-gray-700"
          }`}
        >
          {label}
        </label>
      )}
      {isEditShowPOI ? (
        inputType === "select" ? (
          <select
          dir={isLangArab && "rtl"}
            id={id}
            value={poiData[id]}
            onChange={handleChange}
            className={` block w-full p-2 rounded-md text-black text-[13px] h-9 border-gray-300 ${ isDarkMode?" bg-white/80":"bg-[#FFFFFF]"} shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
          >
            {options.length > 0 && (
              <>
                {/* Display the first item directly if you want a placeholder */}
                {/* <option value="" disabled>Select an option</option> Placeholder */}

                {/* Map over the options */}
                {options.map((option) => (
                  <option
                    key={option.value}
                    className="  "
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </>
            )}
          </select>
        ) : (
          <input
          dir={isLangArab && "rtl"}
            id={id}
            value={poiData[id]}
            disabled={disable}
            onChange={handleChange}
            className={` block text-[13px] h-9 w-full rounded-md p-2 text-black ${ isDarkMode?" bg-white/80":"bg-[#FFFFFF]"} border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
          />
        )
      ) : (
        value &&
        (value?.length > 30 ? (
          <>
            <div dir={isLangArab && "rtl"} className={`border flex flex-col p-2 border-transparent rounded-md  ${ isDarkMode?" bg-white/80":"bg-[#FFFFFF]"}`}>
              {value && !isEditShowPOI && (
                 <label
                 htmlFor={id}
                 className={`block text-[14px] font-semibold ${
                   isDarkMode ? "text-[#303030]" : "text-[#303030]"
                 }`}
               >
                 {label}
               </label>
              )}
              <p
      className={`input-fields break-words font-600  ${isLangArab ? "text-left" : "text-rigth"} 
         h-auto w-full text-[14px] rounded-lg text-[#399C72] `}
    >
      {value}
    </p>
            </div>
          </>
        ) : (
          <>
            <div className=" relative">
              {(value && value !== " " && !isEditShowPOI) && (
                <label
                  htmlFor={id}
                  className={`block  absolute ${
                    isLangArab ? " right-2" : " left-2"
                  } top-2  text-[14px]  font-semibold ${
                    isDarkMode ? " text-[#303030]" : " text-[#303030]"
                  }`}
                >
                  {label}
                </label>
              )}
             {(value && value !== " " && !isEditShowPOI) &&  <p
                className={` border ${value ? "p-2" : "p-5"}    input-fields ${
                  isLangArab ? "text-left" : "text-right"
                } w-auto    laptop_s:h-[39px]    h-9 text-[14px] rounded-lg text-[#399C72] font-600 ${ isDarkMode?" bg-white/80":"bg-[#FFFFFF]"}`}
              >
                {" "}
                {/* {value?.length > 40 ? `${value.substring(0, 20)}` : value} */}
                {value}
              </p>}
            </div>
          </>
        ))
      )}
    </div>
  );
  console.log("Passed POI:", queryresults.features)
  return (
    <div className="w-full max-w-md bg-transparent overflow-y-auto ">
      <div className="p-2 space-y-1">
        {!queryresults.features || queryresults.features.length === 0 ? (
          <p></p> // Display message if there are no features
        ) : (
          <>
          { isEditShowPOI && 
              renderFieldOrText(
                "name_en",
                isLangArab ? "الاسم" : "Name",
                isLangArab ? queryresults.features[0].attributes.name_ar : queryresults.features[0].attributes.name_en
              )}

            { isLangArab? renderFieldOrText(
              "organization",
              isLangArab ? "الجهة" : "Organization",
              isLangArab? queryresults.features[0].attributes.organization : queryresults.features[0].attributes.organization_En,
              organizationOptions,
              "select"
            ) : renderFieldOrText(
              "organization",
              isLangArab ? "الجهة" : "Organization",
              isLangArab? queryresults.features[0].attributes.organization : queryresults.features[0].attributes.organization_En
            )}

           

            {renderFieldOrText(
              "Class",
              isLangArab ? "النوع" : "Class",
              isLangArab? queryresults.features[0].attributes.ClassAr : queryresults.features[0].attributes.Class,
               isLangArab? classArOption : classOption,
              "select"
            )}



            { isLangArab? renderFieldOrText(
              "MunicipalityAr",
              isLangArab ? "المدينة" : "Region",
              isLangArab ? queryresults.features[0].attributes.MunicipalityAr : queryresults.features[0].attributes.Municipality,
              municipalityOptions,
              "select"
            ) : renderFieldOrText(
              "MunicipalityAr",
              isLangArab ? "المدينة" : "Region",
               isLangArab ? queryresults.features[0].attributes.MunicipalityAr : queryresults.features[0].attributes.Municipality
            )}

            {/* {renderFieldOrText(
              "Emirate",
              isLangArab ? "الإمارة" : "Emirate",
              queryresults.features[0].attributes.Emirate
            )} */}



            {
              renderFieldOrText(
                "ClassD",
                isLangArab ? "المعنى الجغرافي" : "Class Description",
                isLangArab ? queryresults.features[0].attributes.ClassD_Ar : queryresults.features[0].attributes.ClassD
              )}

            {(RoleServices.isAdmin() && !isLangArab) &&
              renderFieldOrText(
                "Status",
                isLangArab ? "الحالة" : "Status",
                queryresults.features[0].attributes.Status,
                statusOptions,
                "select"
              )}

            {( RoleServices.isAdmin() && !isLangArab) &&
              renderFieldOrText(
                "Comment",
                isLangArab ? "التعليق" : "Comment",
                queryresults.features[0].attributes.Comment
              )}

            {/* {( !isLangArab) &&
              renderFieldOrText(
                "description",
                isLangArab ? "الوصف" : "Description",
                queryresults.features[0].attributes.description
              )} */}

            {!isLangArab &&
              renderFieldOrText(
                "poems",
                isLangArab ? "القصائد" : "Poems",
                queryresults.features[0].attributes.poems
              )}

            {!isLangArab &&
              renderFieldOrText(
                "stories",
                isLangArab ? "القصص" : "Stories",
                queryresults.features[0].attributes.stories
              )}
             {isShowMore &&
             renderFieldOrText(
              "Classification",
              isLangArab ? "التصنيف" : "Classification",
              isLangArab? queryresults.features[0].attributes.Classification_ar : queryresults.features[0].attributes.Classification,
              [],
              "text",
              true
             )}


              {isShowMore &&
              renderFieldOrText(
              "City",
              isLangArab ? "المنطقة" : "Area",
              isLangArab ? queryresults.features[0].attributes.CityAr : queryresults.features[0].attributes.City
            )}

            {!isEditShowPOI &&
              // (videos.length > 0 || audios.length > 0 || images.length > 0) && (
                <div dir={isLangArab && "rtl"} className=" flex justify-end ">
                  <button
                    className={` ${ isDarkMode?" text-white":"text-[#028DC8]"} font-medium text-[12px] underline`}
                    onClick={() => setIsShowMore(!isShowMore)}
                  >
                    {isShowMore
                      ? isLangArab
                        ? "يخفي"
                        : "Hide"
                      : isLangArab
                      ? "أكثر"
                      : "More"}{" "}
                    {isLangArab ? "معلومات" : "Info"}
                  </button>
                </div>
              }
            {/* Photos Section */}
            <div
              dir={isLangArab && "rtl"}
              className={`px-3 py-4  border border-none rounded-lg bg-white translate-y-2 space-y-4 ${
                videos.length > 0 || audios.length > 0 || images.length > 0
                  ? "block"
                  : "hidden"
              }`}
            >
              {images.length > 0 && (
                <div dir={isLangArab && "rtl"}>
                  <h3 className="text-[14px] text-[#303030] font-medium mb-2">
                    {isLangArab ? "صور" : "Photos"}
                  </h3>
                  <div className=" grid grid-cols-2 gap-2 ">
                    {images.length > 0 ? (
                      images.map((image, index) => (
                        <div
                          key={index}
                          className="relative m-2 w-full h-[90px] rounded-lg overflow-hidden"
                        >
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))
                    ) : (
                      <p
                        className={`${
                          isDarkMode ? " text-white" : "text-[#303030]"
                        } text-[12px]  `}
                      >
                        {isLangArab
                          ? "لا توجد صور متاحة."
                          : "No photos available."}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Videos Section */}
              {videos.length > 0 && (
                <div className=" z-20">
                  <h3 className="text-[14px] font-medium text-[#303030] mb-2">
                    {isLangArab ? "فيديوهات" : "Videos"}
                  </h3>
                  {videos.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {videos.map((video, index) => (
                        <div
                          key={index}
                          className="relative h-[90px] rounded-lg overflow-hidden"
                        >
                          {/* Video thumbnail with poster */}
                          <video
                            id={`video-${index}`}
                            src={video.url}
                            className="w-full h-full object-fill"
                            poster={PlayThumbPOI} // Thumbnail image
                            controls={false} // Disable controls until play
                            onClick={() => {
                              const videoElement = document.getElementById(
                                `video-${index}`
                              );
                              const playButton = document.getElementById(
                                `play-button-${index}`
                              );

                              if (videoElement) {
                                if (!videoElement.paused) {
                                  videoElement.pause(); // Pause the video
                                  if (playButton)
                                    playButton.style.display = "flex"; // Show the play button
                                } else {
                                  videoElement.play(); // Resume video playback
                                  if (playButton)
                                    playButton.style.display = "none"; // Hide the play button
                                }
                              }
                            }}
                            onPlay={() => {
                              const playButton = document.getElementById(
                                `play-button-${index}`
                              );
                              if (playButton) playButton.style.display = "none"; // Hide play button on play
                            }}
                            onPause={() => {
                              const playButton = document.getElementById(
                                `play-button-${index}`
                              );
                              if (playButton) playButton.style.display = "flex"; // Show play button on pause
                            }}
                          />

                          {/* Play button overlay */}
                          <button
                            id={`play-button-${index}`}
                            className="absolute inset-0 z-10 bg-black/50 hover:bg-black/70 flex items-center justify-center"
                            onClick={() => {
                              const videoElement = document.getElementById(
                                `video-${index}`
                              );
                              if (videoElement) {
                                videoElement.play(); // Start video playback
                                // videoElement.setAttribute("controls", "true"); // Show controls after play starts
                              }
                            }}
                          >
                            <img
                              src={PlayIconPOI} // Play button image
                              alt="Play button"
                              className="w-10 h-10"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p
                      className={`${
                        isDarkMode ? " text-white" : "text-[#303030]"
                      } text-[12px]  `}
                    >
                      {isLangArab
                        ? "لا توجد مقاطع فيديو متاحة."
                        : "No videos available."}
                    </p>
                  )}
                </div>
              )}
              {/* Audio Section */}
              {audios.length > 0 && (
                <div>
                  <h3 className="text-[12px] font-medium mb-2 text-[#303030]">
                    {isLangArab ? "صوتي" : "Audio"}
                  </h3>
                  {audios.length > 0 ? (
                    audios.map((audio, index) => (
                      <div
                        key={index}
                        className="flex p-2 h-10 bg-gray-300 rounded-full justify-start items-center overflow-hidden"
                      >
                        <button onClick={() => handlePlayAudio(index)}>
                          {playingIndex === index ? (
 <FaPause className={` ${
  isLangArab && "rotate-180"
} w-[70%] p-1 m-1 h-full`}/>) : (
                            <img
                              src={AudioPlayPOI}
                              alt="Audio Wave"
                              className={`w-[70%] h-full ${
                                isLangArab && "rotate-180"
                              }`}
                            />
                          )}
                        </button>
                        <div className="relative w-[95%] h-full">
                          <img
                            src={AudioLineStylePOI}
                            alt="Audio Wave"
                            className={` w-full h-full`}
                            style={{
                              filter: `hue-rotate(${
                                (audioRefs.current[index]?.currentTime /
                                  audioRefs.current[index]?.duration || 0) * 360
                              }deg)`,
                            }}
                          />
                        </div>
                        <audio
                          ref={(el) => (audioRefs.current[index] = el)}
                          src={audio.url}
                          onLoadedMetadata={() =>
                            handleAudioLoadedMetadata(index)
                          }
                          onEnded={handleAudioEnded}
                        />
                      </div>
                    ))
                  ) : (
                    <p
                      className={`${
                        isDarkMode ? " text-white" : "text-[#303030]"
                      } text-[12px]  `}
                    >
                      {isLangArab
                        ? "لا توجد ملفات صوتية متاحة."
                        : "No audio files available."}
                    </p>
                  )}
                </div>
              )}
            </div>

            {isEditShowPOI && (
              <>
                <div
                  dir={isLangArab && "rtl"}
                  className="grid grid-cols-1 py-3 justify-center items-center"
                >
                  <p
                    className={`flex justify-center text-[12px] ${
                      isDarkMode ? "text-white" : "text-black"
                    } items-center`}
                  >
                    {isLangArab
                      ? "هل تريد مشاركة الصور والفيديوهات والصوتيات"
                      : "Want to share photos, videos, and audio"}
                  </p>
                  <p
                    className={`flex justify-center text-[12px] ${
                      isDarkMode ? "text-white" : "text-black"
                    } items-center`}
                  >
                    {isLangArab ? "لهذا الموقع؟" : "for this location?"}
                  </p>
                  <p
                    className={`flex justify-center text-[12px] ${
                      isDarkMode ? "text-white" : "text-black"
                    } items-center`}
                  >
                    {isLangArab
                      ? "يرجى الضغط على زر التحميل."
                      : "Please click the upload button."}
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <p
                    onClick={() => {
                      setPOIUploaderShow(true);
                      setPOIFormShow(false);
                    }}
                    className={`cursor-pointer ${
                      isDarkMode
                        ? "hover:text-white/70 text-[12px] text-white "
                        : "text-blue-500 hover:text-blue-800"
                    } underline`}
                  >
                    {isLangArab ? "تحميل ملف" : "Upload a file"}
                  </p>
                </div>
              </>
            )}

                <div
                dir={isLangArab && "rtl"}
                className={`text-[12px] py-2 w-[95%] ${ (!isShowMore && !(videos.length > 0 || audios.length > 0 || images.length > 0)) && "absolute bottom-0"} gap-1  flex justify-center items-center  ${
                  isDarkMode ? "text-white" : "text-gray-500"
                } sm:px-12 px-7`}
              >
                <span> X 54.2971051 </span> , <span>Y 24.0622842</span>
              </div>

            {/* {(videos.length > 0 || audios.length > 0 || images.length > 0) &&
            !isEditShowPOI ? (
              <div
                dir={isLangArab && "rtl"}
                className={`text-[12px] py-2 w-[95%]  flex justify-center items-center  ${
                  isDarkMode ? "text-white" : "text-gray-500"
                } sm:px-12 px-7`}
              >
                X 54.2971051, Y 24.0622842
              </div>
            ) : (!isEditShowPOI) ? (
              <div
                dir={isLangArab && "rtl"}
                className={`text-[12px] py-2 w-[95%] absolute -bottom-1   flex justify-center gap-1 items-center  ${
                  isDarkMode ? "text-white" : "text-gray-500"
                } sm:px-12 px-7`}
              >
                <p> X 54.2971051</p>,<p> Y 24.0622842</p>
              </div>
            ) : (
              <div
                className={`text-[12px] py-2 w-[95%]  flex justify-center gap-1 items-center  ${
                  isDarkMode ? "text-white" : "text-gray-500"
                } sm:px-12 px-7`}
              >
                <p>X 54.2971051</p>,<p> Y 24.0622842</p>
              </div>
            )} */}

            {/* Action Buttons */}
            {isEditShowPOI && (
              <div dir={isLangArab && "rtl"} className={`flex  ${isLangArab?"justify-between":" justify-center"} py-1 space-x-8 items-center`}>
                <button
                  onClick={() => setIsShowEditPOI(false)}
                  className={`w-auto  px-10 py-3 sm:py-3 sm:px-14 outline-none  text-xs ${
                    isDarkMode ? " text-[#505050] bg-white" : "text-[#505050] bg-transparent"
                  } ${isLangArab && "mr-5"} border border-[#909090] rounded-lg`}
                >
                  {isLangArab ? "يلغي" : "Cancel"}
                </button>
                <button
                  onClick={() => {
                    handleAttributesUpdate();
                  }}
                  className="w-auto px-10 py-3 sm:py-3 sm:px-14 bg-custom-gradient text-white text-xs border border-transparent rounded-lg"
                >
                  {isLangArab ? "تحديث" : "Update"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Component;
