// import { useState, useRef } from 'react';
// import { ImageIcon, FileIcon } from 'lucide-react';
// import { ChevronLeft } from 'lucide-react';


// const FileUploader = ({POIFormUploader,setPOIFormShow,setPOIUploaderShow}) => {
//   const [file, setFile] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef(null);

//   if(!POIFormUploader) return null;

//   // Handle file selection
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files ? e.target.files[0] : null;
//     if (selectedFile && (selectedFile.type.startsWith('image/') || selectedFile.type.startsWith('video/'))) {
//       setFile(selectedFile);
//     } else {
//       alert('Only images or videos are allowed.');
//     }
//   };

//   // Handle file drop
//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile && (droppedFile.type.startsWith('image/') || droppedFile.type.startsWith('video/'))) {
//       setFile(droppedFile);
//     } else {
//       alert('Only images or videos are allowed.');
//     }
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

//   return (
//     <>
//     <div>
//     <button onClick={()=>{setPOIFormShow(true);setPOIUploaderShow(false);}} className=" px-1 py-3 hover:text-blue-500 flex items-center text-black focus:outline-none">
//       <ChevronLeft className="w-5 h-5 " />
//       <span>Back</span>
//     </button>
//     </div>
//     <div className=' bg-white p-6 grid grid-cols-1 gap-4 border border-none rounded-lg '>
//         <h1 className=' text-black'>Upload Video/Photo/Audio</h1>
//     <div
//       className={`border-2 border-dashed rounded-lg p-6 text-center bg-white ${
//         isDragging ? 'border-blue-500 ' : 'border-gray-300'
//       }`}
//       onDragEnter={handleDragEnter}
//       onDragOver={handleDragEnter}
//       onDragLeave={handleDragLeave}
//       onDrop={handleDrop}
//     >
//       <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
//       {file ? (
//         <div className="flex items-center justify-center mt-2">
//           <FileIcon className="h-8 w-8 text-gray-600" />
//           <span className="ml-2 text-gray-700">{file.name}</span> {/* Display file name */}
//         </div>
//       ) : (
//         <p className="mt-2 text-sm text-gray-600">
//           Drop your image or video here, or{' '}
//           <button
//             onClick={handleBrowse}
//             className="text-blue-500 hover:text-blue-600 focus:outline-none focus:underline"
//           >
//             browse
//           </button>
//         </p>
//       )}
//       <p className="mt-1 text-xs text-gray-500">
//         Supports: <strong>PNG, JPG, GIF, MP4, MOV, AVI</strong>
//       </p>
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         className="hidden"
//         accept="image/*,video/*" // Accept only images and videos
//       />
//     </div>
//     <div className=' flex justify-between items-center'>
//         <p className=' text-xs'>Help Centre</p> <span className=' flex justify-center items-center gap-2'>
//         <button
//                   className="w-auto py-1 px-3 bg-transparent text-[9px] border border-black rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="w-auto py-1 px-3 bg-[#AABCDE] text-[9px] border border-gray-300 rounded-lg"
//                 >
//                   Done
//                 </button>
//         </span>
//     </div>
//     </div>
//      <div className=" absolute bottom-5 left-10 flex justify-center space-x-8 items-center">
//      <button
//      onClick={()=>{setPOIFormShow(true);setPOIUploaderShow(false);}}
//        className="w-auto py-3 px-9 bg-transparent text-xs border border-black rounded-lg"
//      >
//        Cancel
//      </button>
//      <button
//      onClick={()=>{setPOIFormShow(true);setPOIUploaderShow(false);}}
//        className="w-auto py-3 px-9 bg-custom-gradient text-xs border border-gray-300 rounded-lg"
//      >
//        Update
//      </button>
//    </div>
//    </>
//   );
// };

// export default FileUploader;

import { useState, useRef } from 'react';
import { ImageIcon, FileIcon } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"; 

const FileUploader = ({ POIFormUploader,setPOIFormisOpenModalShow,setPOImessageShow,setPOIFormsuccessShow, setPOIFormShow, setPOIUploaderShow, queryresults, uploadedFiles, setUploadedFiles }) => {
  const [files, setFiles] = useState([]); // Store the selected files
  //const [uploadedFiles, setUploadedFiles] = useState([]); // Store the uploaded files
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  if (!POIFormUploader) return null;

  // Handle file selection
  // const handleFileChange = (e) => {
  //   const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
  //   const validFiles = selectedFiles.filter(
  //     (file) => file.type.startsWith('image/') || file.type.startsWith('video/')
  //   );

  //   if (validFiles.length !== selectedFiles.length) {
  //     alert('Only images or videos are allowed.');
  //   }

  //   setFiles((prevFiles) => [...prevFiles, ...validFiles]); // Add new files to the existing ones
  // };

  // Handle file drop
  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   setIsDragging(false);
  //   const droppedFiles = Array.from(e.dataTransfer.files);
  //   const validFiles = droppedFiles.filter(
  //     (file) => file.type.startsWith('image/') || file.type.startsWith('video/')
  //   );

  //   if (validFiles.length !== droppedFiles.length) {
  //     alert('Only images or videos are allowed.');
  //   }

  //   setFiles((prevFiles) => [...prevFiles, ...validFiles]); // Add dropped files to the existing ones
  // };

  // const handleFileChange = (e) => {
  //   const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
  //   const validFiles = selectedFiles.filter((file) => 
  //     file.type.startsWith('image/') ||
  //     file.type.startsWith('video/') ||
  //     file.type === 'audio/mp3' ||         // Allow mp3 files
  //     file.type === 'image/jpeg' ||        // Allow specific main image formats
  //     file.type === 'image/png' ||
  //     file.type === 'image/gif'
  //   );
  
  //   if (validFiles.length !== selectedFiles.length) {
  //     alert('Only images, videos, or mp3 files are allowed.');
  //   }
  
  //   setFiles((prevFiles) => [...prevFiles, ...validFiles]); // Add new files to the existing ones
  // };
  
  // // Handle file drop
  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   setIsDragging(false);
  //   const droppedFiles = Array.from(e.dataTransfer.files);
  //   const validFiles = droppedFiles.filter((file) => 
  //     file.type.startsWith('image/') ||
  //     file.type.startsWith('video/') ||
  //     file.type === 'audio/mp3' ||         // Allow mp3 files
  //     file.type === 'image/jpeg' ||        // Allow specific main image formats
  //     file.type === 'image/png' ||
  //     file.type === 'image/gif'
  //   );
  
  //   if (validFiles.length !== droppedFiles.length) {
  //     alert('Only images, videos, or mp3 files are allowed.');
  //   }
  
  //   setFiles((prevFiles) => [...prevFiles, ...validFiles]); // Add dropped files to the existing ones
  // };

  const MAX_DURATION = 120; // maximum duration in seconds (2 minutes)

// Helper function to check duration
const checkFileDuration = (file) => {
  return new Promise((resolve) => {
    const media = file.type.startsWith('video/') ? document.createElement('video') : document.createElement('audio');
    media.src = URL.createObjectURL(file);
    media.onloadedmetadata = () => {
      URL.revokeObjectURL(media.src); // clean up the object URL
      resolve(media.duration <= MAX_DURATION);
    };
  });
};

const handleFileChange = async (e) => {
  const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
  
  const validFiles = [];
  for (const file of selectedFiles) {
    const isValidType = file.type.startsWith('image/') ||
                        file.type.startsWith('video/') ||
                        file.type === 'audio/mp3' ||
                        file.type === 'image/jpeg' ||
                        file.type === 'audio/wav' ||  
                        file.type === 'image/png' ||
                        file.type === 'image/gif';

    if (isValidType) {
      // Check duration if it's a video or audio file
      const isValidDuration = file.type.startsWith('video/') || file.type.startsWith('audio/') 
        ? await checkFileDuration(file)
        : true;

      if (isValidDuration) {
        validFiles.push(file);
      } else {
        alert('Only videos or audios of up to 2 minutes are allowed.');
      }
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
    const isValidType = file.type.startsWith('image/') ||
                        file.type.startsWith('video/') ||
                        file.type === 'audio/mp3' ||
                        file.type === 'image/jpeg' ||
                        file.type === 'audio/wav' ||  
                        file.type === 'image/png' ||
                        file.type === 'image/gif';

    if (isValidType) {
      const isValidDuration = file.type.startsWith('video/') || file.type.startsWith('audio/')
        ? await checkFileDuration(file)
        : true;

      if (isValidDuration) {
        validFiles.push(file);
      } else {
        alert('Only videos or audios of up to 2 minutes are allowed.');
      }
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
  const handleDone = () => {
    setUploadedFiles([...uploadedFiles, ...files]); // Add selected files to uploaded
    setFiles([]); // Clear the current selection
  };

  // Handle remove uploaded file
  const handleRemoveUploadedFile = (index) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUploadFile = async() => {
    if (uploadedFiles.length > 0) { 
      setPOIFormShow(true);
      setPOIUploaderShow(false);
      //setUploadedFiles([]); // Clear the uploaded files if necessary
    } else {
      alert('Please upload files before proceeding.'); // Optional alert for user feedback
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
          <span>Back</span>
        </button>
      </div>
      <div className='bg-white p-6 grid grid-cols-1 gap-4 border border-none rounded-lg'>
        <h1 className='text-black'>Upload Videos/Photos/Audios</h1>
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
                    <FileIcon className="h-8 w-8 text-gray-600" />
                    <span className="ml-2 text-gray-700">{file.name}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-gray-600">
              Drop your images or videos here, or{' '}
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
            multiple // Allow multiple file selection
          />
        </div>
        <div className='flex justify-between items-center'>
          <p className='text-xs'>Help Centre</p>
          <span className='flex justify-center items-center gap-2'>
            <button
              className="w-auto py-1 px-3 bg-transparent text-[9px] border border-black rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleDone}
              className="w-auto py-1 px-3 bg-[#AABCDE] text-[9px] border border-gray-300 rounded-lg"
            >
              Done
            </button>
          </span>
        </div>
      </div>

      {/* Display uploaded files */}
      {uploadedFiles.length > 0 && (
        <div className='mt-4 p-6 bg-gray-50 rounded-lg shadow-sm'>
          <h2 className="text-black text-lg mb-3 font-semibold">Uploaded Files:</h2>
          <ul className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <li 
                key={index} 
                className="flex items-center justify-between p-3 bg-white shadow-md rounded-md border border-gray-200"
              >
                <div className="flex items-center">
                  <FileIcon className="h-6 w-6 text-gray-500" />
                  <span className="ml-3 text-gray-700 font-medium">{file.name}</span>
                </div>
                <button 
                  onClick={() => handleRemoveUploadedFile(index)}
                  className="text-red-500 hover:underline text-xs"
                >
                  Cancel
                </button>
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
          className="w-auto py-3 px-9 bg-transparent text-xs border border-black rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={() => { handleUploadFile()
          }}
          className="w-auto m-3 py-3 px-9 bg-custom-gradient text-xs border border-gray-300 rounded-lg"
        >
          Upload
        </button>
      </div>
    </>
  );
};

export default FileUploader;
