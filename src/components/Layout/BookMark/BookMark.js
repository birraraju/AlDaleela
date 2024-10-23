import React, { useEffect, useState } from 'react';
import Book1 from '../../../assets/bookmarks/imageBook1.png';
import Book2 from '../../../assets/bookmarks/imageBook2.png';
import Book3 from '../../../assets/bookmarks/imageBook3.png';
import Book4 from '../../../assets/bookmarks/imageBook4.png';
import Book5 from '../../../assets/bookmarks/imageBook5.png';
import CemaraBg from '../../../assets/bookmarks/imageCamerBg.png';
import CameraIcon from '../../../assets/bookmarks/imageCameraIcon.png';
import VideoIcon from '../../../assets/bookmarks/imageVideoIcon.png';
import AudioIcon from '../../../assets/bookmarks/imageMusicIcon.png';
import VideoBg from '../../../assets/bookmarks/imageVideoBg.png';
import AudioBg from '../../../assets/bookmarks/imageMusicBg.png';
import BookYellow from '../../../assets/bookmarks/imageBookYellow.png';
import { useAuth } from "../../../Providers/AuthProvider/AuthProvider";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";  
import Graphic from '@arcgis/core/Graphic';

const Popup1 = ({isDarkMode,isLangArab,BookMarkGreen,DarkBookMarkGreen,setIsManageVisible, isManageVisible,onclose}) => {
  const [bookmarks, setBookmarks] = useState([]);
  const {profiledetails, contextMapView} = useAuth();
  // Array of images with icons
  const images = [
    { src: Book1, title: 'Maskar Al Hidaybah', icon: [{ iconBg: CemaraBg, Icon: CameraIcon }, { iconBg: VideoBg, Icon: VideoIcon }, { iconBg: AudioBg, Icon: AudioIcon }] },
    { src: Book2, title: "Al 'Imayrah", icon: [{ iconBg: AudioBg, Icon: AudioIcon }] },
    { src: Book3, title: 'Qassar Afij', icon: [{ iconBg: AudioBg, Icon: AudioIcon }, { iconBg: VideoBg, Icon: VideoIcon }] },
    { src: Book4, title: 'Sat-h Al Bateel', icon: [{ iconBg: VideoBg, Icon: VideoIcon }] },
    { src: Book5, title: 'Jazeerat Um Al Nar', icon: [{ iconBg: CemaraBg, Icon: CameraIcon }] },
  ];
  const [selectedMarks, setSelectedMarks] = useState({}); // Store selection state for each image
  console.log("Select Bookmark:", selectedMarks)


  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/Bookmarks/${profiledetails.email}`);

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if(data.success){              
          getAttachements(data);
        }
        else{
          //console.log(data)          
        }
        
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchBookmarks();
  }, []); // Empty dependency array means this effect runs once on mount

  const getAttachements = async(res) =>{
    try {
      const featureLayer = new FeatureLayer({
        url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/IslandNamingProject_v2/FeatureServer/0",
        outFields: ["*"]
      });
      const objectIds = res.data.map(feature => feature.objectid);
      const attachments = await featureLayer.queryAttachments({ objectIds: objectIds });
      const localbookmarks =[]
      // Step 4: Loop through features and their corresponding attachments
      res.data.forEach(feature => {
          const objectId = feature.objectid;
          const nameEng = feature.tittle;
          if (attachments[objectId] && attachments[objectId].length > 0) {
              attachments[objectId].forEach(attachment => {
                  //addMediaToContainer(attachment.contentType, attachment.url, objectId, nameEng);
                  if(attachment.contentType.includes("image")){
                    localbookmarks.push({
                      src:attachment.url,
                      title:nameEng,
                      id: feature.id,
                      objectid: feature.objectid,
                      extent: feature.extent
                    })
                  }
                  else{
                    localbookmarks.push({
                      src:Book1,
                      title:nameEng,
                      id: feature.id,
                      objectid: feature.objectid,
                      extent: feature.extent
                    })
                  }
              });
          }
          else{
            localbookmarks.push({
              src:Book1,
              title:nameEng,
              id: feature.id,
              objectid: feature.objectid,
              extent: feature.extent
            })
          }
        });
        setBookmarks(localbookmarks); // Assuming the API returns an array of bookmarks  
      } catch (error) {
          console.error("Error querying attachments:", error);
      }
  }

  const handleZoomtoLocation=(id, objectId)=>{
    //alert(id, objectId);
    const featureLayer = new FeatureLayer({
      url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/IslandNamingProject_v2/FeatureServer/0",
      outFields: ["*"]
    });
    let query = featureLayer.createQuery();
    //query.geometry = projectedPoint;
    query.where = "OBJECTID="+objectId
    query.returnGeometry = true;
    //query.spatialRelationship = "intersects"; 
    query.outFields = ['*'];
    //query.outSpatialReference = { wkid: featureLayer.spatialReference.wkid };

    // Execute the query
    featureLayer.queryFeatures(query).then(function(response) {
      console.log('Features found:', response.features);
      //var latandlon = extent.split(",")
      contextMapView.goTo({
        target: response.features[0].geometry,
        zoom: 15 // Adjust the zoom level as needed
      });
      // let point = {
      //   type: "point", // autocasts as new Point()
      //   x: parseFloat(latandlon[0]),
      //   y: parseFloat(latandlon[1])
      // };
      
      // Create a symbol for drawing the point
      let markerSymbol = {
        type: "simple-marker",
        outline: {
          color: [0, 255, 255, 4],
          width: 1
        }
      }
      
      // Create a graphic and add the geometry and symbol to it
      let pointGraphic = new Graphic({
        geometry: response.features[0].geometry,
        symbol: markerSymbol
      });
      contextMapView.graphics.add(pointGraphic);
    });

    
  }

  const handleSelectMark = (index) => {
    setSelectedMarks((prev) => {
      const newMarks = {
        ...prev,
        [index]: !prev[index], // Toggle the state for the selected image
      };
      console.log('Updated Marks:', newMarks); // Check if state is being updated
      return newMarks;
    });
  };

  const handleSave = () => {
    setIsManageVisible(false); // Close management view
    setSelectedMarks({}); // Reset the selected marks
  };

  return (
    <div className="relative grid grid-cols-1 ">
      <div className="grid grid-cols-3 justify-start pt-3 items-start gap-y-4 gap-x-0">
        {bookmarks.map((image, index) => (
          <div key={image.id} onClick={()=>handleZoomtoLocation(image.id, image.objectid)} className="relative w-28 h-24 flex flex-col items-center">
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover shadow-xl rounded-md"
            />
            <h3 className="text-start w-full border text-white text-xs border-transparent rounded-md absolute bg-[#504848] h-6 justify-start items-center pl-2 flex bottom-0 text-[9px] leading-4 break-words">
              {image.title}
            </h3>

            {isManageVisible && (
              <button
                className="absolute top-1 right-3"
                onClick={() => {
                  handleSelectMark(image.id); // Toggle selection on click
                }}
              >
                <img
                  src={BookYellow} // Same image source
                  className={`h-5 shadow-black cursor-pointer 
                              ${selectedMarks[image.id] ? 'invert brightness-0' : ''}`} // Apply filters conditionally
                  alt="Mark"
                />
              </button>
            )}

            {/* <div className="absolute w-full pl-1 bottom-4 flex">
              {image.icon.map((icons, iconIndex) => (
                <span
                  className="relative p-[3%] bg-[#504848] border-[#504848] rounded-full"
                  key={iconIndex}
                >
                  <img src={icons.iconBg} className="relative h-4 w-4" alt="Icon Background" />
                  <img src={icons.Icon} className="absolute top-1.5 left-1.5 h-2 w-2.5" alt="Icon" />
                </span>
              ))}
            </div> */}
          </div>
          
        ))}
      </div>
      <div className={`grid space-y-3 ${isManageVisible ? 'mt-6' : 'mt-10'}`}>
            <hr className='mx-2' />
            {!isManageVisible ? (
              <span className="flex gap-x-1 justify-center items-center">
                <img src={isDarkMode ? DarkBookMarkGreen : BookMarkGreen } alt="" className="h-5" />
                <p className="text-[#1365B1] underline text-sm cursor-pointer font-medium" onClick={() => setIsManageVisible(true)}>{ isLangArab?"إدارة العلامات المرجعية":"Manage Bookmarks"}</p>
              </span>
            ) : (
              <div className="flex justify-center space-x-9 items-center">
                <button
                  className="w-auto py-3 px-14 bg-white text-xs border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="w-auto py-3 px-14 bg-custom-gradient text-xs border border-gray-300 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
    </div>
  );
};
export default Popup1
 