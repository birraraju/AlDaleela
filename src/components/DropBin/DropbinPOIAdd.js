'use client'

import React, { useState, useRef } from "react"
import { ImageIcon, FileIcon, XCircleIcon } from "lucide-react"
import UploadImage from "../../assets/Droppedpin/Upload.svg"
import { ChevronLeft } from 'lucide-react';

const Component = ({setFormShow,setPOIFormsuccessShow,setmessage,onClose,setPOIFormisOpenModalShow,isFormShow}) => {
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
    classification: "",
    municipality: "",
    emirate: "",
    city: "",
    coordinateType: "dms",
    dms: {
      point_x: { degrees: "", minutes: "", seconds: "" },
      point_y: { degrees: "", minutes: "", seconds: "" },
    },
    decimal: {
      point_x: "",
      point_y: "",
    },
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setPoiData((prevData) => ({
      ...prevData,
      [id]: value,
    }))
  }

  const handleCoordinateTypeChange = (e) => {
    setPoiData((prevData) => ({
      ...prevData,
      coordinateType: e.target.value,
    }))
  }

  const handleCoordinateChange = (e) => {
    const { id, value } = e.target
    const [type, point, unit] = id.split('_')
    setPoiData((prevData) => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [point]: {
          ...prevData[type][point],
          [unit]: value,
        },
      },
    }))
  }

  const handleDecimalCoordinateChange = (e) => {
    const { id, value } = e.target
    const [type, point] = id.split('_')
    setPoiData((prevData) => ({
      ...prevData,
      [type]: {
        ...prevData[type],
        [point]: value,
      },
    }))
  }

  const [files, setFiles] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  if(!isFormShow) return null

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : []
    const validFiles = selectedFiles.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    )

    if (validFiles.length !== selectedFiles.length) {
      alert("Only images or videos are allowed.")
    }

    setFiles((prevFiles) => [...prevFiles, ...validFiles])
  }

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    const validFiles = droppedFiles.filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    )

    if (validFiles.length !== droppedFiles.length) {
      alert("Only images or videos are allowed.")
    }

    setFiles((prevFiles) => [...prevFiles, ...validFiles])
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleBrowse = () => {
    fileInputRef.current?.click()
  }

  // Remove individual file
  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  // Move files to uploaded state and clear current selection
  const handleDone = () => {
    setUploadedFiles([...uploadedFiles, ...files])
    setFiles([])
  }

  // Remove uploaded file
  const handleRemoveUploadedFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const handleFormSubmit=()=>{
    setPOIFormsuccessShow("Success")
    setmessage("POI uploaded successfully!")
    setPOIFormisOpenModalShow(true)
    setFormShow(false)
  }


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
  )

  return (
    <div className="w-full max-w-md bg-transparent text-black overflow-y-auto">
       <div>
        <button
          onClick={onClose}
          className="px-1 py-3 hover:text-blue-500 flex items-center text-black focus:outline-none"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>
      <div className="p-1 space-y-4">
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
        {renderField("city", "City", poiData.city)}

        {/* Coordinates Section */}
        <div className="space-y-2">
          <div className="flex items-center space-x-4">
            <label className="block text-sm font-medium text-gray-700">Coordinates</label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="coordinateType"
                value="dms"
                checked={poiData.coordinateType === "dms"}
                onChange={handleCoordinateTypeChange}
              />
              <span className="ml-2 text-[14px]">Degrees Minutes Seconds</span>
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
              <span className="ml-2 text-[14px]">Decimal Degrees</span>
            </label>
          </div>
          {poiData.coordinateType === "dms" && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <label className="w-16">Point_X</label>
                <input
                  type="text"
                  id="dms_point_x_degrees"
                  value={poiData.dms.point_x.degrees}
                  onChange={handleCoordinateChange}
                  placeholder="eg:54"
                  className="w-20 p-2 border rounded"
                />
                <input
                  type="text"
                  id="dms_point_x_minutes"
                  value={poiData.dms.point_x.minutes}
                  onChange={handleCoordinateChange}
                  placeholder="eg:13"
                  className="w-20 p-2 border rounded"
                />
                <input
                  type="text"
                  id="dms_point_x_seconds"
                  value={poiData.dms.point_x.seconds}
                  onChange={handleCoordinateChange}
                  placeholder="eg:25.3"
                  className="w-20 p-2 border rounded"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-16">Point_Y</label>
                <input
                  type="text"
                  id="dms_point_y_degrees"
                  value={poiData.dms.point_y.degrees}
                  onChange={handleCoordinateChange}
                  placeholder="eg:23"
                  className="w-20 p-2 border rounded"
                />
                <input
                  type="text"
                  id="dms_point_y_minutes"
                  value={poiData.dms.point_y.minutes}
                  onChange={handleCoordinateChange}
                  placeholder="eg:50"
                  className="w-20 p-2 border rounded"
                />
                <input
                  type="text"
                  id="dms_point_y_seconds"
                  value={poiData.dms.point_y.seconds}
                  onChange={handleCoordinateChange}
                  placeholder="eg:20.3"
                  className="w-20 p-2 border rounded"
                />
              </div>
            </div>
          )}
          {poiData.coordinateType === "decimal" && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <label className="w-16">Point_X</label>
                <input
                  type="text"
                  id="decimal_point_x"
                  value={poiData.decimal.point_x}
                  onChange={handleDecimalCoordinateChange}
                  placeholder="e.g. 54.373"
                  className="w-40 p-2 border rounded"
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-16">Point_Y</label>
                <input
                  type="text"
                  id="decimal_point_y"
                  value={poiData.decimal.point_y}
                  onChange={handleDecimalCoordinateChange}
                  placeholder="e.g. 24.466"
                  className="w-40 p-2 border rounded"
                />
              </div>
            </div>
          )}
        </div>

        {/* File Upload Section */}
        <div className="bg-white p-4 grid grid-cols-1 gap-4 border border-none rounded-lg">
          <h1 className="text-black">Upload Videos/Photos/Audios</h1>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center bg-white ${
              isDragging ? "border-blue-500" : "border-gray-300"
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            {files.length > 0 ? (
              <div className="mt-2 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileIcon className="h-8 w-8 text-gray-600" />
                      <span className="ml-2 text-gray-700">{file.name}</span>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XCircleIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-600">
                Drop your images or videos here, or{" "}
                <button
                  onClick={handleBrowse}
                  className="text-blue-500 hover:text-blue-600 focus:outline-none focus:underline"
                >
                  browse
                </button>
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Supports: <strong>PNG, JPG, GIF, MP4, MOV, AVI</strong>
            </p>
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
              className="w-auto flex items-center justify-center py-2 px-3 bg-[#3398B8] text-white text-xs gap-1 border border-gray-300 rounded-lg"
            >
              <img src={UploadImage} className="w-4 h-4 text-white" alt="Upload" />
              Upload media
            </button>
          </div>
        </div>

        {/* Uploaded Files Section */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-gray-700">Uploaded Files</h2>
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center w-full bg-black/55 h-[60px] justify-between border p-1 rounded-md"
              >
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-[80%] h-[80%] object-cover rounded-md"
                  />
                ) : (
                  <div className="flex items-center">
                    <FileIcon className="h-8 w-8 text-gray-600" />
                    <span className="ml-2  text-gray-700">{file.name}</span>
                  </div>
                )}
                <button
                  onClick={() => handleRemoveUploadedFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <XCircleIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-8 items-center pt-4 pb-16">
            <button onClick={onClose} className="w-auto py-3 px-9 bg-transparent text-xs border border-black rounded-lg">
              Cancel
            </button>
            <button onClick={handleFormSubmit} className="w-auto py-3 px-9 bg-custom-gradient text-xs border border-gray-300 rounded-lg">
              Submit
            </button>
          </div>
      </div>
    </div>
  )
}

export default Component










// "use client";

// import React, { useState,useRef } from "react";
// import { ImageIcon, FileIcon } from 'lucide-react';
// // import { ChevronLeft } from 'lucide-react';
// import UploadImage from '../../assets/Droppedpin/Upload.svg'

// const Component = () => {
//   const [poiData, setPoiData] = useState({
//     organization: "DMT",
//     name: "Al Buwam",
//     class: "Zubara",
//     classD: "DMT",
//     status: "Needs Review",
//     comment: "Imported from UAEU Atlas",
//     description: "Eastern and western",
//     poems: "بيت الزوم وبه ... ما جرى الاحسان بالي شوالك بحر ... ما هو ما",
//     stories: "",
//     classification: "Marine",
//     municipality: "Al Dhafra",
//     emirate: "Abu Dhabi",
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setPoiData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const [files, setFiles] = useState([]); // Store the selected files
//   const [uploadedFiles, setUploadedFiles] = useState([]); // Store the uploaded files
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef(null);


//   // Handle file selection
//   const handleFileChange = (e) => {
//     const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
//     const validFiles = selectedFiles.filter(
//       (file) => file.type.startsWith('image/') || file.type.startsWith('video/')
//     );

//     if (validFiles.length !== selectedFiles.length) {
//       alert('Only images or videos are allowed.');
//     }

//     setFiles((prevFiles) => [...prevFiles, ...validFiles]); // Add new files to the existing ones
//   };

//   // Handle file drop
//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     const validFiles = droppedFiles.filter(
//       (file) => file.type.startsWith('image/') || file.type.startsWith('video/')
//     );

//     if (validFiles.length !== droppedFiles.length) {
//       alert('Only images or videos are allowed.');
//     }

//     setFiles((prevFiles) => [...prevFiles, ...validFiles]); // Add dropped files to the existing ones
//   };

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleBrowse = () => {
//     fileInputRef.current?.click();
//   };

//   const removeFile = (index) => {
//     setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   // Handle "Done" button click - move files to the uploaded state
//   const handleDone = () => {
//     setUploadedFiles([...uploadedFiles, ...files]); // Add selected files to uploaded
//     setFiles([]); // Clear the current selection
//   };

//   // Handle remove uploaded file
//   const handleRemoveUploadedFile = (index) => {
//     setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

  

//   const renderField = (id, label, value, inputType = "text") => (
//     <div className="space-y-2">
//       <label htmlFor={id} className="block text-sm font-medium text-gray-700">
//         {label}
//       </label>
//       {inputType === "select" ? (
//         <select
//           id={id}
//           value={value}
//           onChange={handleChange}
//           className="block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//         >
//           <option value={value}>{value}</option>
//           {/* Add additional options here if needed */}
//         </select>
//       ) : (
//         <input
//           id={id}
//           value={value}
//           onChange={handleChange}
//           className="block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//         />
//       )}
//     </div>
//   );

//   return (
//     <div className="w-full max-w-md bg-transparent overflow-y-auto ">
//       <div className="p-1 space-y-4">
//         {renderField("organization", "Organization", poiData.organization, "select")}
//         {renderField("name", "Name", poiData.name)}
//         {renderField("class", "Class", poiData.class, "select")}
//         {renderField("classD", "ClassD", poiData.classD)}
//         {renderField("status", "Status", poiData.status, "select")}
//         {renderField("comment", "Comment", poiData.comment)}
//         {renderField("description", "Description", poiData.description)}
//         {renderField("poems", "Poems", poiData.poems)}
//         {renderField("stories", "Stories", poiData.stories)}
//         {renderField("classification", "Classification", poiData.classification, "select")}
//         {renderField("municipality", "Municipality", poiData.municipality, "select")}
//         {renderField("emirate", "Emirate", poiData.emirate)}

//         <div className='bg-white p-4 grid grid-cols-1 gap-4 border border-none rounded-lg'>
//         <h1 className='text-black'>Upload Videos/Photos/Audios</h1>
//         <div
//           className={`border-2 border-dashed rounded-lg p-6 text-center bg-white ${
//             isDragging ? 'border-blue-500 ' : 'border-gray-300'
//           }`}
//           onDragEnter={handleDragEnter}
//           onDragOver={handleDragEnter}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//         >
//           <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
//           {files.length > 0 ? (
//             <div className="mt-2 space-y-2">
//               {files.map((file, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <FileIcon className="h-8 w-8 text-gray-600" />
//                     <span className="ml-2 text-gray-700">{file.name}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="mt-2 text-sm text-gray-600">
//               Drop your images or videos here, or{' '}
//               <button
//                 onClick={handleBrowse}
//                 className="text-blue-500 hover:text-blue-600 focus:outline-none focus:underline"
//               >
//                 browse
//               </button>
//             </p>
//           )}
//           <p className="mt-1 text-xs text-gray-500">
//             Supports: <strong>PNG, JPG, GIF, MP4, MOV, AVI</strong>
//           </p>
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleFileChange}
//             className="hidden"
//             accept="image/*,video/*"
//             multiple // Allow multiple file selection
//           />
//         </div>
//         <div className='flex justify-center items-center'>
//           <span className='flex justify-center items-center gap-2'>
//             <button
//               onClick={handleDone}
//               className="w-auto flex items-center justify-center py-2 px-3 bg-[#3398B8] text-white text-xs gap-1 border border-gray-300 rounded-lg"
//             >
//                 <img src={UploadImage} className=" w-4 h-4 text-white" alt="" />
//               Upload media
//             </button>
//           </span>
//         </div>
//       </div>

//         {/* Action Buttons */}
//         <div className="flex justify-center space-x-8 items-center">
//           <button className="w-auto py-3 px-9 bg-transparent text-xs border border-black rounded-lg">
//             Cancel
//           </button>
//           <button className="w-auto py-3 px-9 bg-custom-gradient text-xs border border-gray-300 rounded-lg">
//             Update
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Component;
