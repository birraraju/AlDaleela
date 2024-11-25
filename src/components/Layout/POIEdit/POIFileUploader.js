

import { useState, useRef } from 'react';
import { ImageIcon, FileIcon } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"; 
import CloseUploadedFile from '../../../assets/POIEdit/FileUploadCancel.svg'

const FileUploader = ({ POIFormUploader,isLangArab,setPOIFormisOpenModalShow,setPOImessageShow,setPOIFormsuccessShow, setPOIFormShow, setPOIUploaderShow, queryresults, uploadedFiles, setUploadedFiles }) => {
  const [files, setFiles] = useState([]); // Store the selected files
  //const [uploadedFiles, setUploadedFiles] = useState([]); // Store the uploaded files
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [filesShow,setFilesShow] = useState([])

  if (!POIFormUploader) return null;


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
        URL.revokeObjectURL(img.src); // clean up the object URL
        resolve(width >= 500 && width <= 2000 && height >= 500 && height <= 2000);
      };
    });
  };
  
  // Main validation function for each file
  const validateFile = async (file) => {
    const isValidType = (file.type.startsWith('image/') && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')) ||
                        (file.type === 'audio/mp3' || file.type === 'audio/wav') ||
                        (file.type === 'video/mp4');
  
    if (!isValidType) {
      alert(` ${isLangArab ? "نوع الملف غير صالح. يُسمح فقط بصور JPEG و PNG و GIF، وملفات الصوت MP3 و WAV، وفيديو MP4.":"Invalid file type. Only JPEG, PNG, GIF images, MP3, WAV audio, and MP4 video are allowed."}`);
      return false;
    }
  
    if (file.type.startsWith('image/')) {
      if (file.size > MAX_IMAGE_SIZE) {
        alert(`${ isLangArab ?"حجم الصورة يجب أن يكون أقل من 10 ميجابايت.":"Image size must be under 10 MB."}`);
        return false;
      }
      const isValidDimensions = await checkImageDimensions(file);
      if (!isValidDimensions) {
        alert(`${ isLangArab ?"يجب أن يكون حجم الصورة أقل من 10 ميغابايت.":"Image dimensions must be between 500x500 and 2000x2000 pixels."}`);
        return false;
      }
    } else if (file.type.startsWith('audio/')) {
      if (file.size > MAX_AUDIO_SIZE) {
        alert(`${isLangArab?"يجب أن يكون حجم الصوت أقل من 10 ميغابايت.":"Audio size must be under 10 MB."}`);
        return false;
      }
    } else if (file.type.startsWith('video/')) {
      if (file.size > MAX_VIDEO_SIZE) {
        alert(`${isLangArab?"يجب أن يكون حجم الفيديو أقل من 50 ميغابايت.":"Video size must be under 50 MB."}`);
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
      if (await validateFile(file)) {
        validFiles.push(file);
      }
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
      if (await validateFile(file)) {
        validFiles.push(file);
      }
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

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Handle "Done" button click - move files to the uploaded state
  // const handleDone = () => {
  //   setUploadedFiles([...uploadedFiles, ...files]); // Add selected files to uploaded
  //   setFiles([]); // Clear the current selection
  // };

  const handleDone = () => {
   setUploadedFiles([...uploadedFiles, ...files]); // Add selected files to uploaded
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

  // Handle remove uploaded file
  const handleRemoveUploadedFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFilesShow((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUploadFile = async() => {
    if (uploadedFiles.length > 0) { 
      setPOIFormShow(true);
      setPOIUploaderShow(false);
      //setUploadedFiles([]); // Clear the uploaded files if necessary
    } else {
      alert(`${isLangArab?"يرجى تحميل الملفات قبل المتابعة.":"Please upload files before proceeding."}`); // Optional alert for user feedback
    }
  };
  
  return (
    <>
      <div>
        <button
          onClick={() => {
            setPOIFormShow(true);
            setPOIUploaderShow(false);
          }}
          className="px-1 py-3 hover:text-blue-500 flex items-center text-black focus:outline-none"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className=''>{isLangArab ?"خلف":"Back"}</span>
        </button>
      </div>
      <div className='bg-white p-6 grid grid-cols-1 gap-4 border border-none rounded-lg'>
        <h1 className='text-black text-[13px]'>{isLangArab?"تحميل مقاطع الفيديو/الصور/التسجيلات الصوتية":"Upload Videos/Photos/Audios"}</h1>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center bg-white ${
            isDragging ? 'border-blue-500 ' : 'border-gray-300'
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
                    <img src={URL.createObjectURL(file)}  className="h-8 w-8 text-gray-600"  alt={file.name} />
                    <span className="ml-2 text-[11px] text-gray-700">{file.name}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-[12px] text-gray-600">
              {isLangArab?"قم بإسقاط الصور أو مقاطع الفيديو الخاصة بك هنا، أو":"Drop your images or videos here, or"}{" "}
              <button
                onClick={handleBrowse}
                className="text-blue-500 text-[12px] hover:text-blue-600 focus:outline-none focus:underline"
              >
               {isLangArab?"تصفح":"browse"}
              </button>
            </p>
          )}
          <p className="mt-1 text-[12px] text-gray-500">
          {isLangArab?"يدعم":"Supports"}: <strong>{isLangArab?"PNG، JPG، GIF، MP4، MOV، AVI":"PNG, JPG, GIF, MP4, MOV, AVI"}</strong>

          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,video/*"
            multiple // Allow multiple file selection
          />
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-[12px] opacity-0'>Help Centre</p>
          <span className='flex justify-center items-center gap-2'>
            <button
              className="w-auto py-1 px-3 bg-transparent text-[9px] border text-black  border-black rounded-md"
            >
               {isLangArab ? "يلغي" : "Cancel"}
            </button>
            <button
              onClick={handleDone}
              className="w-auto py-1 px-3 bg-[#AABCDE] text-[9px] border border-gray-300 rounded-md"
            >
              {isLangArab?"منتهي":"Done"}
            </button>
          </span>
        </div>
      </div>

      {/* Display uploaded files */}
      
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


      <div className=" flex justify-center space-x-8 items-center">
        <button
          onClick={() => {
            setPOIFormShow(true);
            setPOIUploaderShow(false);
          }}
          className="w-auto py-3 px-9 bg-transparent text-xs border text-black border-black rounded-lg"
        >
         {isLangArab ? "يلغي" : "Cancel"}
        </button>
        <button
          onClick={() => { handleUploadFile()
          }}
          className="w-auto m-3 py-3 px-9 bg-custom-gradient text-xs border border-gray-300 rounded-lg"
        >
          {isLangArab?"رفع":"Upload"}
        </button>
      </div>
    </>
  );
};

export default FileUploader;
