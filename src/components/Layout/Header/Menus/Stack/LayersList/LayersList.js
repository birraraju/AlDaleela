import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function LayersList({ onClose }) {
  const layersListRef = useRef(null);

  // Removed handleClickOutside as we don't want to close on outside click
  // const handleClickOutside = (event) => {
  //   if (layersListRef.current && !layersListRef.current.contains(event.target)) {
  //     onClose();
  //   }
  // };

  useEffect(() => {
    // Attach a click event listener if needed
    // document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up if you had any other listeners
      // document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-center z-10">
      <div
        ref={layersListRef}
        className="fixed right-12 top-32 h-96 bg-white bg-opacity-95 p-4 rounded-lg shadow-lg text-black w-96"
      >
        <div>
          <h1 className="font-omnes text-[16px] font-medium">Layer List</h1>
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="my-2 bg-black bg-opacity-10 h-[1px] w-full"></div>
      
      </div>
    </div>
  );
}
