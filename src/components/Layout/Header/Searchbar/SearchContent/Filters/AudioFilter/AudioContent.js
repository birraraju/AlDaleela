// import { useEffect, useState,useRef } from "react";
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
// import Graphic from "@arcgis/core/Graphic";
// import { useAuth } from "../../../../../../../Providers/AuthProvider/AuthProvider";
// import config from '../../../../../../Common/config'; // Import your config file
// import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader
// import { FaPlay, FaPause } from 'react-icons/fa'; // Example using Font Awesome icons

// export default function AudioContent({setInputClicked,setIscategory}) {
//   const [mediaItems, setMediaItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { contextMapView, setPopupSelectedGeo, setIsEditPOI } = useAuth();
//   const [featureLayer, setFeatureLayer] = useState(null);
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

  

//   useEffect(() => {
//     const loadAttachments = async () => {
//       const allMediaItems = []; // Array to store media items from all layers
  
//       // Loop through each layer in the configuration
//       for (const layerConfig of config.featureServices) {
//         const layer = new FeatureLayer({
//           url: layerConfig.url,
//           outFields: ["*"]
//         });
  
//         try {
//           const query = layer.createQuery();
//           query.where = "1=1";
//           query.returnGeometry = true;
//           query.outFields = ["*"];
//           const results = await layer.queryFeatures(query);
  
//           const objectIds = results.features.map(feature => feature.attributes.OBJECTID);
//           const attachments = await layer.queryAttachments({ objectIds });
  
//           results.features.forEach(feature => {
//             const objectId = feature.attributes.OBJECTID;
  
//             // Check if attachments exist for this feature and add to media items array
//             if (attachments[objectId] && attachments[objectId].length > 0) {
//               attachments[objectId].forEach(attachment => {
//                 if (attachment.contentType.startsWith('audio/')) {
//                   const mediaItemObject = {
//                     type: attachment.contentType,
//                     url: attachment.url,
//                     objectId: objectId,
//                     layerName: layerConfig.name // Add the layer name for reference
//                   };
//                   allMediaItems.push(mediaItemObject);
//                 }
//               });
//             }
//           });
//         } catch (error) {
//           console.error(`Error querying layer "${layerConfig.name}" or attachments:`, error);
//         }finally{
//           //setLoading(false)
//         }
//       }
//       setLoading(false)
//       // Update state with media items from all layers
//       setMediaItems(allMediaItems);
//     };
  
//     loadAttachments();
//   }, []);

//   const togglePlayPause = () => {
//     if (audioRef.current.paused) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     } else {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }

//   };

//   const handleVideoClick = async (objectId, selectedLayerName) => {
//     setIscategory(false)
//     setInputClicked(false);
//     // Find the layer based on selected name
//     const selectedLayerConfig = config.featureServices.find(
//       service => service.name === selectedLayerName
//     );
  
//     if (!selectedLayerConfig) {
//       console.error(`Layer with name ${selectedLayerName} not found in configuration.`);
//       return;
//     }
  
//     try {
//       // Create a FeatureLayer instance for the selected layer
//       const featureLayer = new FeatureLayer({
//         url: selectedLayerConfig.url,
//         outFields: ["*"]
//       });
  
//       // Query the selected layer using the OBJECTID
//       const feature = await featureLayer.queryFeatures({
//         where: `OBJECTID = ${objectId}`,
//         outFields: ["*"],
//         returnGeometry: true
//       });
  
//       // Check if any features are found and handle accordingly
//       if (feature.features.length > 0) {
//         //openPopup(feature.features[0], objectId); // Open popup with feature info
//         const pointGraphic = new Graphic({
//           geometry: feature.features[0].geometry,
//           symbol: {
//             type: "simple-marker",
//             outline: {
//               color: [0, 255, 255, 4],
//               width: 1
//             }
//           }
//         });
    
//         contextMapView.graphics.add(pointGraphic);
//         await contextMapView.goTo({
//           target: feature.features[0].geometry,
//           center: feature.features[0].geometry,  // Centers on the feature's geometry
//           zoom: 15  // Sets the zoom level
//         });
        
//         setPopupSelectedGeo(feature.features[0])
//         setIsEditPOI(true);
//       } else {
//         console.log(`No feature found with OBJECTID: ${objectId}`);
//       }
//     } catch (error) {
//       console.error(`Error querying layer ${selectedLayerName}:`, error);
//     }
//   };

  
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center absolute left-48 top-28  h-full">
//         <ClipLoader color="#808080" size={40} /> {/* Gray, medium-sized loader */}
//       </div>
//     );
//   }

  

//   if (error) {
//     return <div>{error}</div>;
//   }
//   return (
//     <div className="p-4 h-[17rem] overflow-y-scroll">
//       <div className="grid grid-cols-4 gap-2">
//         {mediaItems.map((audio, audioIndex) => (
//           <div
//             key={audio.objectId}
//             className="bg-white p-2 rounded-xl overflow-hidden"
//             onClick={() => handleVideoClick(audio.objectId, audio.layerName)}
//           >
//             <p className="text-xs whitespace-nowrap font-medium truncate mb-4">
//               {audio.audioName}
//             </p>

//             <div className="flex justify-between items-center gap-2">
//               <div className="flex justify-start items-center gap-2">
//                 <div>
//                   <img
//                     src={`${process.env.PUBLIC_URL}/Header/Searchbar/music.svg`}
//                     alt=""
//                     className="w-4"
//                   />
//                 </div>
//                 <div>
//                   <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/audioWave.svg`} alt="" />
//                 </div>
//                 <audio controls className="w-13" style={{ width: '100px' }}>
//                   <source src={audio.url} />
//                   Your browser does not support the audio tag.
//                 </audio>
//               </div>

//               <div className="text-xs text-black text-opacity-50">{audio.audioSec}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const audios = [
//   {
//     audioName: "Maskar Al Hidaybah",
//     audioSec: "12:00",
//   },
//   {
//     audioName: "Al'Imayrah",
//     audioSec: "12:00",
//   },
//   {
//     audioName: "Qassar Afij",
//     audioSec: "12:00",
//   },
//   {
//     audioName: "Sat-h Al Bateel",
//     audioSec: "12:00",
//   },
//   {
//     audioName: "Jazeerat Um Al Nar",
//     audioSec: "12:00",
//   },
//   {
//     audioName: "Ras Ar Rive Ah",
//     audioSec: "12:00",
//   },
// ];

import { useEffect, useState,useRef } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Graphic from "@arcgis/core/Graphic";
import { useAuth } from "../../../../../../../Providers/AuthProvider/AuthProvider";
import config from '../../../../../../Common/config'; // Import your config file
import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader
import { FaPlay, FaPause } from 'react-icons/fa'; // Example using Font Awesome icons
import { useTheme } from "../../../../../ThemeContext/ThemeContext";

export default function AudioContent({setInputClicked,setIscategory}) {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { contextMapView, setPopupSelectedGeo, setIsEditPOI } = useAuth();
  const [playingIndex, setPlayingIndex] = useState(null); // Track which audio is playing
  const {isLangArab} = useTheme()
  const audioRefs = useRef([]); // Array of refs for each audio



  useEffect(() => {
    const loadAttachments = async () => {
      const allMediaItems = []; // Array to store media items from all layers
  
      // Loop through each layer in the configuration
      for (const layerConfig of config.featureServices) {
        const layer = new FeatureLayer({
          url: layerConfig.url,
          outFields: ["*"]
        });
  
        try {
          const query = layer.createQuery();
          query.where = "1=1";
          query.returnGeometry = true;
          query.outFields = ["*"];
          const results = await layer.queryFeatures(query);
  
          const objectIds = results.features.map(feature => feature.attributes.OBJECTID);
          const attachments = await layer.queryAttachments({ objectIds });
  
          results.features.forEach(feature => {
            const objectId = feature.attributes.OBJECTID;
  
            // Check if attachments exist for this feature and add to media items array
            if (attachments[objectId] && attachments[objectId].length > 0) {
              attachments[objectId].forEach(attachment => {
                if (attachment.contentType.startsWith('audio/')) {
                  const mediaItemObject = {
                    type: attachment.contentType,
                    url: attachment.url,
                    objectId: objectId,
                    layerName: layerConfig.name,
                    addPOIName:feature.attributes.name_en // Add the layer name for reference
                  };
                  allMediaItems.push(mediaItemObject);
                }
              });
            }
          });
        } catch (error) {
          console.error(`Error querying layer "${layerConfig.name}" or attachments:`, error);
        }finally{
          //setLoading(false)
        }
      }
      setLoading(false)
      // Update state with media items from all layers
      // Process media items to add duration for audio
  const processedMediaItems = await processMediaItems(allMediaItems);

  // Store processed media items in state
  setMediaItems(processedMediaItems);
    };
  
    loadAttachments();
  }, []);

  // Helper function to format duration
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60); // Get whole minutes
  const remainingSeconds = Math.floor(seconds % 60); // Get remaining seconds
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return minutes > 0 ? `${minutes}.${formattedSeconds} min` : `0.${formattedSeconds}s`;
}

async function processMediaItems(mediaItems) {
  // Add formatted duration to each audio item
  const updatedMediaItems = await Promise.all(
    mediaItems.map(async (item) => {
      if (item.type === "audio/mpeg") {
        return new Promise((resolve) => {
          const audioElement = new Audio(item.url);
          audioElement.addEventListener("loadedmetadata", () => {
            const duration = audioElement.duration; // Duration in seconds
            const formattedDuration = formatDuration(duration); // Format duration
            resolve({ ...item, duration: formattedDuration });
          });
          audioElement.addEventListener("error", () => {
            console.error(`Failed to load audio from ${item.url}`);
            resolve({ ...item, duration: "N/A" }); // Handle error gracefully
          });
        });
      }
      return item; // Return non-audio items as is
    })
  );

  return updatedMediaItems;
}

  const togglePlayPause = (index) => {
    if (playingIndex === index) {
      audioRefs.current[index].pause();
      setPlayingIndex(null);
    } else {
      if (playingIndex !== null && audioRefs.current[playingIndex]) {
        audioRefs.current[playingIndex].pause(); // Pause currently playing audio
      }
      audioRefs.current[index].play();
      setPlayingIndex(index);
    }

  };

  const handleVideoClick = async (objectId, selectedLayerName) => {
    setIscategory(false)
    setInputClicked(false);
    // Find the layer based on selected name
    const selectedLayerConfig = config.featureServices.find(
      service => service.name === selectedLayerName
    );
  
    if (!selectedLayerConfig) {
      console.error(`Layer with name ${selectedLayerName} not found in configuration.`);
      return;
    }
  
    try {
      // Create a FeatureLayer instance for the selected layer
      const featureLayer = new FeatureLayer({
        url: selectedLayerConfig.url,
        outFields: ["*"]
      });
  
      // Query the selected layer using the OBJECTID
      const feature = await featureLayer.queryFeatures({
        where: `OBJECTID = ${objectId}`,
        outFields: ["*"],
        returnGeometry: true
      });
  
      // Check if any features are found and handle accordingly
      if (feature.features.length > 0) {
        //openPopup(feature.features[0], objectId); // Open popup with feature info
        const pointGraphic = new Graphic({
          geometry: feature.features[0].geometry,
          symbol: {
            type: "simple-marker", // Customize symbol as needed
            color: [0, 255, 255, 0.5],
            outline: {
              color: [0, 255, 255, 1],
              width: 2
            }
          }
        });
    
        contextMapView.graphics.add(pointGraphic);
        await contextMapView.goTo({
          target: feature.features[0].geometry,
          center: feature.features[0].geometry,  // Centers on the feature's geometry
          zoom: 15  // Sets the zoom level
        });
        
        setPopupSelectedGeo(feature.features[0])
        setIsEditPOI(true);
      } else {
        console.log(`No feature found with OBJECTID: ${objectId}`);
      }
    } catch (error) {
      console.error(`Error querying layer ${selectedLayerName}:`, error);
    }
  };

  
  if (loading) {
    return (
      <div className="flex items-center justify-center   h-full">
        <ClipLoader color="#808080" size={40} /> {/* Gray, medium-sized loader */}
      </div>
    );
  }

  

  if (error) {
    return <div>{error}</div>;
  }

  console.log("Media AudioConsole Data",mediaItems)
  return (
    <div dir={isLangArab && "rtl"} className="p-4 h-[13rem] overflow-y-scroll">
      <div className="grid  tab:grid-cols-3 grid-cols-2 mobile_m:grid-cols-3 gap-2">
        {mediaItems.map((audio, audioIndex) => (
          <div
            key={audio.objectId}
            className="bg-white py-0.5 px-1 h-[42px] rounded-lg overflow-hidden"
            onClick={() => handleVideoClick(audio.objectId, audio.layerName)}
          >
            <p className="text-[13px] text-[#000000] whitespace-nowrap   font-500 truncate mb-0.5">
              {audio.addPOIName}
            </p>

            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <button onClick={() => togglePlayPause(audioIndex)}>
                  {playingIndex === audioIndex ? (
                    <img
                    src={`${process.env.PUBLIC_URL}/Header/Searchbar/music.svg`}
                    alt="Audio Wave"
                    className="w-full h-full"
                  />
                  ) : (
                    <img
                    src={`${process.env.PUBLIC_URL}/Header/Searchbar/music.svg`}
                    alt="Audio Wave"
                    className="w-full h-full"
                  />
                  )}
                </button>
                <div className="relative w-[80%] mobile_l:w-[90%] h-4 ">
                  <img
                    src={`${process.env.PUBLIC_URL}/Header/Searchbar/audioWave.svg`}
                    alt="Audio Wave"
                    className="w-full h-full"
                  />
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-500"
                    style={{ width: `${audioRefs.current[audioIndex]?.currentTime / audioRefs.current[audioIndex]?.duration * 100 || 0}%` }}
                  />
                </div>
                <audio
                  ref={el => (audioRefs.current[audioIndex] = el)}
                  src={audio.url}
                  onEnded={() => setPlayingIndex(null)}
                  style={{ display: 'none' }}
                />
              </div>

              <div className="text-[12px] mobile_l:text-[7px] text-black text-opacity-50">{audio.duration}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const audios = [
  {
    audioName: "Maskar Al Hidaybah",
    audioSec: "12:00",
  },
  {
    audioName: "Al'Imayrah",
    audioSec: "12:00",
  },
  {
    audioName: "Qassar Afij",
    audioSec: "12:00",
  },
  {
    audioName: "Sat-h Al Bateel",
    audioSec: "12:00",
  },
  {
    audioName: "Jazeerat Um Al Nar",
    audioSec: "12:00",
  },
  {
    audioName: "Ras Ar Rive Ah",
    audioSec: "12:00",
  },
];

