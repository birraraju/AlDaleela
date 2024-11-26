"use client";

import React, { useState, useEffect, useRef } from "react";
import { ImageIcon, FileIcon, XCircleIcon } from "lucide-react";
import UploadImage from "../../assets/Droppedpin/Upload.svg";
import { ChevronLeft } from "lucide-react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { useAuth } from "../../Providers/AuthProvider/AuthProvider";
import config from "../Common/config"; // Import your config file
import Graphic from "@arcgis/core/Graphic.js";
import Point from "@arcgis/core/geometry/Point.js";
import { UserActivityLog } from "../Common/UserActivityLog";
import UploadMedia from '../../assets/Droppedpin/UploadMediaIcon.svg'
import CloseUploadedFile from '../../assets/POIEdit/FileUploadCancel.svg'
import { useTheme } from "../Layout/ThemeContext/ThemeContext";



const Component = ({mapview,isLangArab, selectedLayer, addPointGeometry, setFormShow,setPOIFormsuccessShow,setmessage,onClose,setPOIFormisOpenModalShow,isFormShow}) => {

  const [poiData, setPoiData] = useState({
    organization: "",
    name: "",
    class: "",
    classD: "",
    status: "",
    comment: "",
    description: "",
    poems: "",
    stories: "",
    classification: selectedLayer,
    municipality: "",
    emirate: "",
    city: "",
    coordinateType: "dms",
    dms: {
      pointx: { degrees: "", minutes: "", seconds: "" },
      pointy: { degrees: "", minutes: "", seconds: "" },
    },
    decimal: {
      pointx: "",
      pointy: "",
    },
  });
  const [buttonDisable, setButtonDisable] = useState(false);

  const {isDarkMode} = useTheme()
  const [errors, setErrors] = useState({});
  
  console.log("pioData :>> ", poiData);
  console.log("buttonDisable :>> ", buttonDisable);
  const { profiledetails, contextMapView } = useAuth();

  // const organizationOptions = ["جمع في الميدان", "مكتب الشيخ حمدان بن زايد", "دائـــرة التــخطيـط العـــمراني والبلديـــــات", "Org 4"];
  // const classOptions = ["Zubara", "Option 2", "Option 3"];
  // const statusOptions = ["Needs Review", "Approved", "Rejected"];
  // const classificationOptions = ["Marine", "Terrestrial", "Island"];
  // const municipalityOptions = ["Al Dhafra", "Municipality 2", "Municipality 3"];

  const [organizationOptions, setOrganizationOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [municipalityOptions, setMunicipalityOptions] = useState([]);

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
            default:
              console.warn(`Unhandled field: ${field.fieldName}`);
          }
        });

        // Set the state for options
        setOrganizationOptions(newOrganizationOptions);
        setStatusOptions(newStatusOptions);
        setMunicipalityOptions(newMunicipalityOptions);

        // Update poiData only if options are available
        if (newOrganizationOptions.length > 0) {
          setPoiData((prevState) => ({
            ...prevState,
            organization: newOrganizationOptions[0].value, // Update organization
            status: newStatusOptions[0]?.value || "", // Update status
            municipality: newMunicipalityOptions[0]?.value || "", // Update municipality
          }));
        }
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    };

    fetchDomains(); // Call the async function
  }, []); // Empty dependency array to run once on mount

  // Function to update the point location based on the coordinates provided in the form
  const updatePointLocation = () => {
    let x, y;

    if (poiData.coordinateType === "dms") {
      // Convert DMS to decimal
      const dmsX = convertDMSToDecimal(poiData.dms.pointx);
      const dmsY = convertDMSToDecimal(poiData.dms.pointy);
      x = dmsX;
      y = dmsY;
    } else {
      // Use decimal values directly
      x = parseFloat(poiData.decimal.pointx);
      y = parseFloat(poiData.decimal.pointy);
    }

    // Check if x and y are valid numbers
    if (!isNaN(x) && !isNaN(y)) {
      // Update the addPointGeometry with the new coordinates
      addPointGeometry = {
        type: "point",
        x,
        y,
        spatialReference: { wkid: 4326 },
      };
      mapview.graphics.removeAll();
      const point = new Point({
        longitude: x,
        latitude: y,
        spatialReference: { wkid: 4326 }, // WGS84
      });
      // setaddPointGeometry({
      //   type: "point",
      //   x: longitude,
      //   y: latitude,
      //   spatialReference: { wkid: 4326 } // WGS84
      // })

      const pointGraphic = new Graphic({
        geometry: point,
        symbol: {
          type: "simple-marker",
          color: "blue",
          size: "8px",
          outline: {
            color: "white",
            width: 1,
          },
        },
      });
      mapview.graphics.add(pointGraphic);
    } else {
      alert("Please enter valid coordinates.");
    }
  };

  // Function to convert DMS to Decimal Degrees
  const convertDMSToDecimal = (dms) => {
    const degrees = parseFloat(dms.degrees) || 0;
    const minutes = parseFloat(dms.minutes) || 0;
    const seconds = parseFloat(dms.seconds) || 0;
    return degrees + minutes / 60 + seconds / 3600;
  };

  useEffect(() => {
    const { x, y } = addPointGeometry;

    if (x !== null && y !== null) {
      const dmsX = convertDDToDMS(x);
      const dmsY = convertDDToDMS(y);

      setPoiData((prevData) => ({
        ...prevData,
        dms: {
          pointx: dmsX,
          pointy: dmsY,
        },
      }));
      setPoiData((prevData) => ({
        ...prevData,
        decimal: {
          pointx: x,
          pointy: y,
        },
      }));
    }
  }, [addPointGeometry]);

  // Function to convert Decimal Degrees to DMS
  const convertDDToDMS = (decimalDegrees) => {
    const degrees = Math.floor(decimalDegrees);
    const minutesDecimal = (decimalDegrees - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = Math.round((minutesDecimal - minutes) * 60 * 100) / 100;

    return { degrees, minutes, seconds };
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPoiData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCoordinateTypeChange = (e) => {
    setPoiData((prevData) => ({
      ...prevData,
      coordinateType: e.target.value,
    }));
  };

  const handleCoordinateChange = (e) => {
    const { id, value } = e.target;
    const [type, point, unit] = id.split("_");
    // Update the specific nested value in poiData
    setPoiData((prevData) => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [point]: {
          ...prevData[type][point],
          [unit]: value,
        },
      },
    }));
  };

  // useEffect to validate the fields whenever poiData changes
  useEffect(() => {

   /* organization: "",
    name: "",
    class: "",
    classD: "",
    status: "",
    comment: "",
    description: "",
    poems: "",
    stories: "",
    classification: selectedLayer,
    municipality: "",
    emirate: "",
    city: "", */ 
    if (
      poiData.name !== "" &&
      poiData.class !== "" &&
      poiData.classD !== "" &&
      poiData.status !== ""&&
      poiData.comment !== ""&&
      poiData.description !== ""&&
      poiData.poems !== ""&&
      poiData.stories !== ""&&
      poiData.municipality !== ""&&
      poiData.emirate !== ""&&
      poiData.city !== "") {
      setButtonDisable(true);
    }
    if (poiData.coordinateType === "dms") {
      const { degrees, minutes, seconds } = poiData.dms.pointx;
      const {
        degrees: degY,
        minutes: minY,
        seconds: secY,
      } = poiData.dms.pointy;

      if (degrees && minutes && seconds && degY && minY && secY) {
        updatePointLocation();
      }
    }
    if (poiData.coordinateType === "decimal") {
      if (poiData.decimal.pointx && poiData.decimal.pointy) {
        updatePointLocation();
      }
    }
  }, [poiData]); // Run this effect whenever poiData changes

  // const handleDecimalCoordinateChange = (e) => {
  //   const { id, value } = e.target;
  //   const [type, point] = id.split("_");
  //   setPoiData((prevData) => ({
  //     ...prevData,
  //     [type]: {
  //       ...prevData[type],
  //       [point]: value,
  //     },
  //   }));
  // };

  const handleDecimalCoordinateChange = (e) => {
    const { id, value } = e.target;
    const [type, point] = id.split("_");
  
    // Validate input to allow only numbers with up to two decimal places
    const formattedValue = value.match(/^\d*\.?\d{0,2}$/) ? value : poiData[type][point];
  
    setPoiData((prevData) => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [point]: formattedValue,
      },
    }));
  };
  

  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesShow,setFilesShow] = useState([])
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  if (!isFormShow) return null;

  const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB for images
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50 MB for videos
const MAX_AUDIO_SIZE = 10 * 1024 * 1024; // 10 MB for audio

// Helper function to check image dimensions
const checkImageDimensions = (file) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const { width, height } = img;
      URL.revokeObjectURL(img.src); // Clean up the object URL
      const isValid = width >= 500 && width <= 2000 && height >= 500 && height <= 2000;
      if (!isValid) {
        alert(`${ isLangArab ?"يجب أن يكون حجم الصورة أقل من 10 ميغابايت.":"Image dimensions must be between 500x500 and 2000x2000 pixels."}`);
      }
      resolve(isValid);
    };
  });
};

// Helper function to validate file type, size, and dimensions for images
const isValidFile = async (file) => {
  const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
  const isVideo = file.type === 'video/mp4';
  const isAudio = file.type === 'audio/mpeg' || file.type === 'audio/wav';

  if (!isImage && !isVideo && !isAudio) {
    alert(` ${isLangArab ? "نوع الملف غير صالح. يُسمح فقط بصور JPEG و PNG و GIF، وملفات الصوت MP3 و WAV، وفيديو MP4.":"Invalid file type. Only JPEG, PNG, GIF images, MP3, WAV audio, and MP4 video are allowed."}`);
    return false;
  }

  if (isImage) {
    if (file.size > MAX_IMAGE_SIZE) {
      alert(`${ isLangArab ?"حجم الصورة يجب أن يكون أقل من 10 ميجابايت.":"Image size must be under 10 MB."}`);
      return false;
    }
    const isValidDimensions = await checkImageDimensions(file);
    if (!isValidDimensions) return false;
  } else if (isVideo) {
    if (file.size > MAX_VIDEO_SIZE) {
      alert(`${isLangArab?"يجب أن يكون حجم الفيديو أقل من 50 ميغابايت.":"Video size must be under 50 MB."}`);
      return false;
    }
  } else if (isAudio) {
    if (file.size > MAX_AUDIO_SIZE) {
      alert(`${isLangArab?"يجب أن يكون حجم الصوت أقل من 10 ميغابايت.":"Audio size must be under 10 MB."}`);
      return false;
    }
  }


  return true;
};

// Handle file selection
const handleFileChange = async (e) => {
  const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
  const validFiles = [];

  for (const file of selectedFiles) {
    if (await isValidFile(file)) {
      validFiles.push(file);
    }
  }

  if (validFiles.length !== selectedFiles.length) {
    alert(`${isLangArab?"بعض الملفات لم تستوفِ المعايير المطلوبة ولم تتم إضافتها.":"Some files did not meet the required criteria and were not added."}`);
  }

  setFiles((prevFiles) => [...prevFiles, ...validFiles]);
};

// Handle file drop
const handleDrop = async (e) => {
  e.preventDefault();
  setIsDragging(false);

  const droppedFiles = Array.from(e.dataTransfer.files);
  const validFiles = [];

  for (const file of droppedFiles) {
    if (await isValidFile(file)) {
      validFiles.push(file);
    }
  }

  if (validFiles.length !== droppedFiles.length) {
    alert(`${isLangArab?"بعض الملفات لم تستوفِ المعايير المطلوبة ولم تتم إضافتها.":"Some files did not meet the required criteria and were not added."}`);
  }

  setFiles((prevFiles) => [...prevFiles, ...validFiles]);
};


  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  // Remove individual file
  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Move files to uploaded state and clear current selection
  const handleDone = () => {
    setUploadedFiles([...uploadedFiles, ...files]);
    const newFiles = files.map((file) => ({
      file,
      name: file.name,
      progress: 0, // Initialize progress
      preview: URL.createObjectURL(file), // Generate a preview URL
    }));
   
    setFilesShow((prev) => [...prev, ...newFiles]);
    simulateUploads(newFiles);
    setFiles([]);
  };

  const simulateUploads = (newFiles) => {
    newFiles.forEach((file, index) => {
      const interval = setInterval(() => {
        setFilesShow((prev) =>
          prev.map((item, idx) =>
            idx === filesShow.length + index && item.progress < 100
              ? { ...item, progress: item.progress + 10 }
              : item
          )
        );
      }, 300);

      setTimeout(() => clearInterval(interval), 3000);
    });
  };

  // Remove uploaded file
  const handleRemoveUploadedFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFilesShow((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async () => {

    // Validation step
  const validationErrors = {};
  let isValid = true;

  // Check required fields
  if (!poiData.organization) {
    validationErrors.organization = isLangArab ? "حقل المنظمة مطلوب" : "Organization Field is Required";
    isValid = false;
  }
  if (!poiData.name) {
    validationErrors.name = isLangArab ? "حقل الاسم مطلوب" : "Name Field is Required";
    isValid = false;
  }
  if (!poiData.class) {
    validationErrors.class = isLangArab ? "حقل الفئة مطلوب" : "Class Field is Required";
    isValid = false;
  }
  if (!poiData.classD) {
    validationErrors.classD = isLangArab ? "حقل ClassD مطلوب" : "ClassD Field is Required";
    isValid = false;
  }
  if (!poiData.status) {
    validationErrors.status = isLangArab ? "حقل الحالة مطلوب" : "Status Field is Required";
    isValid = false;
  }
  if (!poiData.comment) {
    validationErrors.comment = isLangArab ? "حقل التعليق مطلوب" : "Comment Field is Required";
    isValid = false;
  }
  if (!poiData.description) {
    validationErrors.description = isLangArab ? "حقل الوصف مطلوب" : "Description Field is Required";
    isValid = false;
  }
  if (!poiData.poems) {
    validationErrors.poems = isLangArab ? "حقل القصائد مطلوب" : "Poems Field is Required";
    isValid = false;
  }
  if (!poiData.stories) {
    validationErrors.stories = isLangArab ? "حقل القصص مطلوب" : "Stories Field is Required";
    isValid = false;
  }
  if (!poiData.municipality) {
    validationErrors.municipality = isLangArab ? "حقل البلدية مطلوب" : "Municipality Field is Required";
    isValid = false;
  }
  if (!poiData.emirate) {
    validationErrors.emirate = isLangArab ? "حقل الإمارة مطلوب" : "Emirate Field is Required";
    isValid = false;
  }
  if (!poiData.city) {
    validationErrors.city = isLangArab ? "حقل المدينة مطلوب" : "City Field is Required";
    isValid = false;
  }

  // Set errors if validation fails
  if (!isValid) {
    setErrors(validationErrors);
    console.error("Validation errors:", validationErrors);
    return; // Stop submission
  }

    // Extract only the fields you want to update in poiData
    const updatedData = {
      organization: poiData.organization,
      name_en: poiData.name,
      Class: poiData.class,
      ClassD: poiData.classD,
      Status: poiData.status,
      Comment: poiData.comment,
      description: poiData.description,
      poems: poiData.poems,
      stories: poiData.stories,
      Classification: poiData.classification || selectedLayer,
      MunicipalityAr: poiData.municipality,
      Emirate: poiData.emirate,
      City: poiData.city,
      Isadminapproved: 2,
    };
    // Find the URL for the layer that includes "Terrestrial" in its name
    const LayerConfig = config.featureServices.find((service) =>
      selectedLayer.includes(service.name)
    );

    // Create the feature layer
    const featureLayer = new FeatureLayer({
      url: LayerConfig.url,
    });

    // Define the new feature data, including attributes and geometry
    const addData = [
      {
        attributes: updatedData, // Your new feature's attributes (e.g., { field1: value, field2: value, ... })
        geometry: addPointGeometry, // Geometry object (e.g., { x: longitude, y: latitude, spatialReference: { wkid: 4326 } })
        // geometry: {
        //   type: "point",
        //   x: 51.80652834115199,
        //   y: 23.11240254780675,
        //   spatialReference: { wkid: 4326 } // Ensure the spatial reference matches your service's requirements
        // }
      },
    ];

    try {
      const result = await featureLayer.applyEdits({ addFeatures: addData });

      if (result.addFeatureResults.length > 0) {
        //handleStoreFeatureData("",LayerConfig.url, result.addFeatureResults[0].objectId)
        if (uploadedFiles.length > 0) { 
          handleUploadFile(LayerConfig.url, result.addFeatureResults[0].objectId);   
        } else {
          handleStoreFeatureData("",LayerConfig.url, result.addFeatureResults[0].objectId);
        }
        console.log('Add feature successful:', result.addFeatureResults);

      } else {
        console.error("Add feature failed:", result);
      }
    } catch (error) {

      console.error('Error adding feature:', error);
    }    
  }

  const handleUploadFile = async(LayerURL, ObjectId) => {
    if (uploadedFiles.length > 0) { // Ensure there are uploaded files
      // Find the URL for the layer that includes "Terrestrial" in its name
      //const LayerConfig = config.featureServices.find(service => selectedLayer.includes(service.name));
      const attachmentUrl = `${LayerURL}/${ObjectId}/addAttachment`;
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

          handleStoreFeatureData(String(attachmentIds), LayerURL, ObjectId)
        }
        console.log("Attachments added successfully:", responses);
      } catch (error) {
        console.error("Error adding attachments:", error);
      }
    } else {
      alert(`${isLangArab?"يرجى تحميل الملفات قبل المتابعة.":"Please upload files before proceeding."}`); // Optional alert for user feedback
    }
  };

  const handleStoreFeatureData = async(attachmentIds, LayerUrl, FeatureObjectId) =>{
      
          // Extract only the fields you want to update in poiData
          const FeatureData = {
            Username: profiledetails.username,
            Email: profiledetails.email,
            FeatureObjectId: FeatureObjectId,
            OrganizationEn: poiData.organization || "",
            NameEn: poiData.name || "",
            Class: poiData.class || "",
            ClassD: poiData.classD || "",
            Status: poiData.status || "",
            Comment: poiData.comment || "",
            Description: poiData.description || "",
            Poems: poiData.poems || "",
            stories: poiData.stories || "",
            Classification: poiData.classification || "",
            Municipality: poiData.municipality || "",
            Emirate: poiData.emirate || "",
            City: poiData.city || "",
            AttachementsObjectIds:attachmentIds,
            ApprovalStatus: "Pending",
            featureServiceURL:LayerUrl,
            POIOperation:"Add Feature"
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
                  UserActivityLog(profiledetails, "POI Added")
                  contextMapView.graphics.removeAll(); // Clears all graphics  
                  contextMapView.map.layers.forEach(layer => {
                    if (layer.refresh) {
                      layer.refresh();
                    }
                  }); 
                  setPOIFormsuccessShow("Success")
                  setmessage(isLangArab ?"تم رفع نقطة الاهتمام بنجاح!":"POI uploaded successfully!")
                  setPOIFormisOpenModalShow(true)
                  setFormShow(false)
                }
                else{
                  setPOIFormsuccessShow("Failure")
                  setmessage(isLangArab?"فشل في رفع نقطة الاهتمام!":"Failed to uploaded POI!")
                  setPOIFormisOpenModalShow(true)
                  setFormShow(false)
                  console.log(data.message);
                }
            
            } catch (error) {
                console.error('Error submitting form:', error);
            }   
  }


  const renderField = (
    id,
    label,
    value,
    options = [],
    inputType = "text",
    disable
  ) => (
    <div className="space-y-1">
      <label htmlFor={id} className={`block text-[11px]  ${isDarkMode?"text-white":"text-[#303030]"}    font-500`}>
        {label} <span className="text-red-500 ">*</span>
      </label>
      {inputType === "select" ? (
        <select
          id={id}
          value={value} // Bind to the state value
          disabled={disable} // Disable the dropdown
          onChange={handleChange}
          className="block w-full p-2 h-[42px]   bg-white font-500 rounded-md text-[13px] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {options.length > 0 && (
            <>
              {/* Display the first item directly if you want a placeholder */}
              {/* <option value="" disabled>Select an option</option> Placeholder */}

              {/* Map over the options */}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </>
          )}
        </select>
      ) : (
        <input
          id={id}
          value={value}
          disabled={disable}
          onChange={handleChange}
          className="block w-full text-[13px] h-9 rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      )}
       {/* Error Display */}
  {errors[id] && (
    <p className="text-red-500 text-sm mt-1">{errors[id]}</p>
  )}
    </div>
  );

  return (
    <div className="w-full max-w-md bg-transparent text-black overflow-y-auto">
      <div>
        <button
          onClick={onClose}
          className="px-1 py-3 hover:text-blue-500 flex justify-start items-center text-black focus:outline-none"
        >
          {isLangArab ? (
            <>
              {" "}
              <span className=  {`font-500 ${isDarkMode?"text-white":"text-[#00000099]"} text-[14px]`}>
                {isLangArab ? "خلف" : "Back"}
              </span>{" "}
              <ChevronLeft className={`w-[17px] ${isDarkMode && 'text-white'} h-[17px]`} />
            </>
          ) : (
            <>
              {" "}
              <ChevronLeft className={`w-[17px] ${isDarkMode && 'text-white'} h-[17px]`} />
              <span className=  {`font-500 ${isDarkMode?"text-white":"text-[#00000099]"} text-[14px]`}>
                {isLangArab ? "خلف" : "Back"}
              </span>
            </>
          )}
        </button>
      </div>
      <div className="p-1 space-y-0.5">
        {renderField(
          "organization",
          isLangArab ? "منظمة" : "Organization",
          poiData.organization,
          organizationOptions,
          "select"
        )}
        {renderField("name", isLangArab ? "الاسم" : "Name", poiData.name)}
        {renderField("class", isLangArab ? "الفئة" : "Class", poiData.class)}
        {renderField(
          "classD",
          isLangArab ? "الفئة D" : "ClassD",
          poiData.classD
        )}
        {renderField(
          "status",
          isLangArab ? "الحالة" : "Status",
          poiData.status,
          statusOptions,
          "select"
        )}
        {renderField(
          "comment",
          isLangArab ? "تعليق" : "Comment",
          poiData.comment
        )}
        {renderField(
          "description",
          isLangArab ? "الوصف" : "Description",
          poiData.description
        )}
        {renderField("poems", isLangArab ? "الأشعار" : "Poems", poiData.poems)}
        {renderField(
          "stories",
          isLangArab ? "القصص" : "Stories",
          poiData.stories
        )}
        {renderField(
          "classification",
          isLangArab ? "التصنيف" : "Classification",
          poiData.classification || selectedLayer,
          [],
          "text",
          true
        )}
        {renderField(
          "municipality",
          isLangArab ? "البلدية" : "Municipality",
          poiData.municipality,
          municipalityOptions,
          "select"
        )}
        {renderField(
          "emirate",
          isLangArab ? "الإمارة" : "Emirate",
          poiData.emirate
        )}
        {renderField("city", isLangArab ? "المدينة" : "City", poiData.city)}

        {/* Coordinates Section */}
        <div className="space-y-2 pt-2 pb-6">
          <div className="flex items-center space-x-4">
            <label className={`block text-[11px] font-medium ${isDarkMode?"text-white":"text-gray-700"}`}>
              {isLangArab ? "الإحداثيات" : "Coordinates"}
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="coordinateType"
                value="dms"
                checked={poiData.coordinateType === "dms"}
                onChange={handleCoordinateTypeChange}
              />
              <span className={`ml-1 ${isDarkMode?"text-white":"text-[11px]"}`}>
                {isLangArab ? "درجات دقائق ثواني" : "Degrees Minutes Seconds"}
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="coordinateType"
                value="decimal"
                checked={poiData.coordinateType === "decimal"}
                onChange={handleCoordinateTypeChange}
              />
              <span className={`ml-1 ${isDarkMode?"text-white":"text-[11px]"}`}>
                {isLangArab ? "الدرجات العشرية" : "Decimal Degrees"}
              </span>
            </label>
          </div>
          {poiData.coordinateType === "dms" && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <label className={` ${isDarkMode && "text-white"} text-[11px] w-16`}>
                  {isLangArab ? "نقطة X" : "Point_X"}
                </label>
                <input
                  type="text"
                  id="dms_pointx_degrees"
                  value={poiData.dms.pointx.degrees}
                  onChange={handleCoordinateChange}
                  placeholder="eg:54"
                  className="w-20 p-2 border rounded"
                />
                <input
                  type="text"
                  id="dms_pointx_minutes"
                  value={poiData.dms.pointx.minutes}
                  onChange={handleCoordinateChange}
                  placeholder="eg:13"
                  className="w-20 p-2 border rounded"
                />
                <input
                  type="text"
                  id="dms_pointx_seconds"
                  value={poiData.dms.pointx.seconds}
                  onChange={handleCoordinateChange}
                  placeholder="eg:25.3"
                  className="w-20 p-2 border rounded"
                />
              </div>
              <div className={`flex items-center  space-x-2`}>
                <label className={` ${isDarkMode && "text-white"} text-[11px] w-16`}>
                  {isLangArab ? "نقطة Y" : "Point_Y"}
                </label>
                <input
                  type="text"
                  id="dms_pointy_degrees"
                  value={poiData.dms.pointy.degrees}
                  onChange={handleCoordinateChange}
                  placeholder="eg:23"
                  className="w-20 p-2 border rounded"
                />
                <input
                  type="text"
                  id="dms_pointy_minutes"
                  value={poiData.dms.pointy.minutes}
                  onChange={handleCoordinateChange}
                  placeholder="eg:50"
                  className="w-20 p-2 border rounded"
                />
                <input
                  type="text"
                  id="dms_pointy_seconds"
                  value={poiData.dms.pointy.seconds}
                  onChange={handleCoordinateChange}
                  placeholder="eg:20.3"
                  className="w-20 p-2 border rounded"
                />
              </div>
            </div>
          )}
          {poiData.coordinateType === "decimal" && (
            <div className="space-y-2">
              <div className={`flex items-center ${isDarkMode && " text-white"} space-x-2`}>
                <label className="w-16">
                  {isLangArab ? "نقطة X" : "Point_X"}
                </label>
                <input
                  type="text"
                  id="decimal_pointx"
                  value={poiData.decimal.pointx}
                  onChange={handleDecimalCoordinateChange}
                  placeholder="e.g. 54.373"
                  className="w-[88%] p-2 border rounded"
                />
              </div>
              <div className={`flex items-center ${isDarkMode && " text-white"} space-x-2`}>
                <label className="w-16">
                  {isLangArab ? "نقطة Y" : "Point_Y"}
                </label>
                <input
                  type="text"
                  id="decimal_pointy"
                  value={poiData.decimal.pointy}
                  onChange={handleDecimalCoordinateChange}
                  placeholder="e.g. 24.466"
                  className="w-[88%] p-2 border rounded"
                />
              </div>
            </div>
          )}
        </div>

        {/* File Upload Section */}
        <div className="bg-white p-4  grid grid-cols-1 gap-4 border border-none rounded-lg">
          <h1 className="text-[#000000]    font-500 text-[12px] ">
            {isLangArab
              ? "تحميل مقاطع الفيديو/الصور/التسجيلات الصوتية"
              : "Upload Videos/Photos/Audios"}
          </h1>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center bg-white ${
              isDragging ? "border-blue-500" : "border-gray-300"
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!files.length > 0 && (
              <img
                src={UploadMedia}
                className=" mx-auto h-16 w-16 text-white"
                alt="Upload"
              />
            )}
            {/* <ImageIcon className="mx-auto h-12 w-12 text-gray-400" /> */}
            {files.length > 0 ? (
              <div className="mt-2  space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex w-full h-full items-center justify-between"
                  >
                    <div className="flex w-full h-full items-center">
                      <img
                        src={URL.createObjectURL(file)}
                        className=" mx-auto rounded-xl w-full h-full text-white"
                        alt="Upload"
                      />
                    </div>
                    {/* <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XCircleIcon className="w-5 h-5" />
                    </button> */}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-[11px]    font-400 text-[#132A00]">
                {isLangArab
                  ? "قم بإسقاط الصور أو مقاطع الفيديو الخاصة بك هنا، أو"
                  : "Drop your file here, or"}{" "}
                <button
                  onClick={handleBrowse}
                  className="text-blue-500 text-[12px] hover:text-blue-600 focus:outline-none focus:underline"
                >
                  {isLangArab ? "تصفح" : "browse"}
                </button>
              </p>
            )}
           { !files.length > 0 && <p className="mt-1 text-[7px] text-[#969DB2]    font-400 ">
              {isLangArab ? "يدعم" : "Supports:"}
              {isLangArab ? " PNG, JPG, JPEG, MP3, " : "PNG, JPG, JPEG, MP3, "}
            </p>}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,video/*"
              multiple
            />
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={handleDone}
              className=" w-[131px]  h-[31px] flex items-center    font-500 justify-center py-2 px-3 bg-[#3398B8] text-white text-[11px] gap-1 border border-gray-300 rounded-lg"
            >
              <img
                src={UploadImage}
                className="w-[14px] h-[14px] text-white"
                alt="Upload"
              />
              {isLangArab ? "تحميل الوسائط" : "Upload media"}
            </button>
          </div>
        </div>

        {/* Uploaded Files Section */}
        {filesShow.length > 0 && (
          <div className="mt-4 p-6 bg-transparent rounded-lg shadow-sm">
            <ul className="space-y-2">
              {filesShow.map((file, index) => (
                <li
                  key={index}
                  className="flex flex-col px-2 py-2 bg-transparent rounded-md border border-[#E4E9F0]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="h-9 w-9 rounded-lg object-cover"
                      />
                      <div className="ml-3">
                        <span className="text-gray-700 font-medium text-ellipsis text-[9px] block">
                          {file.name}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveUploadedFile(index)}
                      className="text-red-500 hover:underline text-xs"
                    >
                      <img src={CloseUploadedFile} alt="Remove" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 my-1 mx-1 border-transparent rounded-3xl h-1">
                    <div
                      className="bg-[#1F4690] h-1 border-transparent rounded-3xl"
                      style={{ width: `${file.progress}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between px-4 sm:px-1 laptop_s:space-x-4  space-x-8 items-center pt-4 pb-16">
          <button
            onClick={onClose}
            className="w-auto py-3 px-9 laptop_s:px-12  bg-transparent text-xs border border-black rounded-lg"
          >
            {isLangArab ? "يلغي" : "Cancel"}
          </button>
          <button
            onClick={handleFormSubmit}
            disabled={!buttonDisable}
            className={` ${
              !buttonDisable
                ? "w-auto py-3 px-9 laptop_s:px-12 bg-custome-gray1 text-white text-xs border border-gray-300 rounded-lg"
                : "w-auto py-3 px-9 bg-custom-gradient text-xs border border-gray-300 rounded-lg"
            }`}
          >
            {isLangArab ? "يُقدِّم" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Component;
