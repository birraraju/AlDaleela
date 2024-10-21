import { useState, useRef } from 'react';
import { ImageIcon, FileIcon } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';


const FileUploader = ({POIFormUploader,setPOIFormShow,setPOIUploaderShow}) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  if(!POIFormUploader) return null;

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile && (selectedFile.type.startsWith('image/') || selectedFile.type.startsWith('video/'))) {
      setFile(selectedFile);
    } else {
      alert('Only images or videos are allowed.');
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type.startsWith('image/') || droppedFile.type.startsWith('video/'))) {
      setFile(droppedFile);
    } else {
      alert('Only images or videos are allowed.');
    }
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

  return (
    <>
    <div>
    <button onClick={()=>{setPOIFormShow(true);setPOIUploaderShow(false);}} className=" px-1 py-3 hover:text-blue-500 flex items-center text-black focus:outline-none">
      <ChevronLeft className="w-5 h-5 " />
      <span>Back</span>
    </button>
    </div>
    <div className=' bg-white p-6 grid grid-cols-1 gap-4 border border-none rounded-lg '>
        <h1 className=' text-black'>Upload Video/Photo/Audio</h1>
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
      {file ? (
        <div className="flex items-center justify-center mt-2">
          <FileIcon className="h-8 w-8 text-gray-600" />
          <span className="ml-2 text-gray-700">{file.name}</span> {/* Display file name */}
        </div>
      ) : (
        <p className="mt-2 text-sm text-gray-600">
          Drop your image or video here, or{' '}
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
        accept="image/*,video/*" // Accept only images and videos
      />
    </div>
    <div className=' flex justify-between items-center'>
        <p className=' text-xs'>Help Centre</p> <span className=' flex justify-center items-center gap-2'>
        <button
                  className="w-auto py-1 px-3 bg-transparent text-[9px] border border-black rounded-lg"
                >
                  Cancel
                </button>
                <button
                  className="w-auto py-1 px-3 bg-[#AABCDE] text-[9px] border border-gray-300 rounded-lg"
                >
                  Done
                </button>
        </span>
    </div>
    </div>
     <div className=" absolute bottom-5 left-10 flex justify-center space-x-8 items-center">
     <button
     onClick={()=>{setPOIFormShow(true);setPOIUploaderShow(false);}}
       className="w-auto py-3 px-9 bg-transparent text-xs border border-black rounded-lg"
     >
       Cancel
     </button>
     <button
     onClick={()=>{setPOIFormShow(true);setPOIUploaderShow(false);}}
       className="w-auto py-3 px-9 bg-custom-gradient text-xs border border-gray-300 rounded-lg"
     >
       Update
     </button>
   </div>
   </>
  );
};

export default FileUploader;
