import React, { useState } from 'react';

const Popup1 = () => {
  const [isVisible, setIsVisible] = useState(true); // State to manage the popup visibility

  // Define an array of objects with specific titles and image sources
  const images = [
    { src: 'image 171.svg', title: 'Topography' },
    { src: 'image 178.svg', title: 'National Geographic' },
    { src: 'image 172.svg', title: 'Navigation' },
    { src: 'image 171.svg', title: 'Imagery Hybrid' },
    { src: 'image 178.svg', title: 'Light Gray Canvas' },
    { src: 'image 171.svg', title: 'Newspaper Map' },
    { src: 'image 178.svg', title: 'Midcentury Map' },
    { src: 'image 172.svg', title: 'Navigation (Dark Mode)' },
    { src: 'image 178.svg', title: 'Nova Map' },
    { src: 'image 172.svg', title: 'Human Geographic Map' },
    { src: 'image 178.svg', title: 'Modern Antique Map' },
    { src: 'image 171.svg', title: 'Firefly Imagery Hybrid' },
    { src: 'image 178.svg', title: 'Community Map' },
    { src: 'image 172.svg', title: 'Chartered Territory Map' },
    { src: 'image 171.svg', title: 'Colored Pencil Map' },
  ];

  // Function to close the popup
  const closePopup = () => {
    setIsVisible(false);
  };

  return (
    <div className="relative">
      {/* Image outside the box */}
      <img
        src="Element.png" // Adjust the path according to your public directory
        alt="Top Image"
        className="absolute left-[-50px] top-[-30px] w-20 h-20" // Adjust the position and size as needed
      />
      {isVisible && (
        <div className="fixed py-3 px-1 right-3 mt-14 border rounded-2xl bg-gray-200 text-black w-[340px] shadow-lg">
          {/* Close button */}
          <button 
            onClick={closePopup} 
            className="absolute top-2 right-6 text-black text-xl"
          >
            &times; {/* Close icon */}
          </button>
          <h2 className="ml-5 mb-4 text-black">Base Map Gallery</h2>
          <div className="grid grid-cols-3 gap-y-4">
            {images.map((image, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-26 h-16 object-cover border-4 border-white shadow-xl rounded-md"
                />
                <h3 className="text-center text-[12px] leading-4 w-24 break-words">
                  {image.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup1;
