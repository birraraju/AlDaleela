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
import config from '../../Common/config'; // Import your config file
import {UserActivityLog} from "../../Common/UserActivityLog";

const Popup1 = ({isDarkMode,isLangArab,BookMarkGreen,DarkBookMarkGreen,setIsManageVisible, isManageVisible,setIsSuccess,setisMsgStatus,setIsmodalMessage,onclose}) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [condtioncheck, setCondtionCheck] = useState(true);
  const [count, setCount] = useState(0);
  const [ids, setIds] = useState([]); // State to hold the array of IDs
  const {profiledetails, contextMapView} = useAuth();
  // Array of images with icons

  console.log('ids :>> ', ids);
  const images = [
    { src: Book1, title: 'Maskar Al Hidaybah', icon: [{ iconBg: CemaraBg, Icon: CameraIcon }, { iconBg: VideoBg, Icon: VideoIcon }, { iconBg: AudioBg, Icon: AudioIcon }] },
    { src: Book2, title: "Al 'Imayrah", icon: [{ iconBg: AudioBg, Icon: AudioIcon }] },
    { src: Book3, title: 'Qassar Afij', icon: [{ iconBg: AudioBg, Icon: AudioIcon }, { iconBg: VideoBg, Icon: VideoIcon }] },
    { src: Book4, title: 'Sat-h Al Bateel', icon: [{ iconBg: VideoBg, Icon: VideoIcon }] },
    { src: Book5, title: 'Jazeerat Um Al Nar', icon: [{ iconBg: CemaraBg, Icon: CameraIcon }] },
  ];
  const [selectedMarks, setSelectedMarks] = useState({}); // Store selection state for each image
  
  console.log('selectedMarks :>> ', selectedMarks);
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

  useEffect(() => {   

    fetchBookmarks();
  }, []); // Empty dependency array means this effect runs once on mount

  const getAttachements = async (res) => {
    try {

      console.log('res :>> ', res);
      const objectIds = res.data.map(feature => feature.objectid);
      const localbookmarks = [];
      let imageAdded = false;
      for (const layer of config.featureServices) {
        const featureLayer = new FeatureLayer({
          url: layer.url,
          outFields: ["*"]
        });
  
        // Query attachments for the current layer
        const attachments = await featureLayer.queryAttachments({ objectIds: objectIds });
  
        // Loop through features and their corresponding attachments
        res.data.forEach(feature => {
          const objectId = feature.objectid;
          const nameEng = feature.title;
          
          // Check if the feature's layername matches the current layer's name
          if (feature.layername.includes(layer.name)) {
            setCount(0); // Initialize count for each feature
  
            if (attachments[objectId] && attachments[objectId].length > 0) {
              attachments[objectId].forEach(attachment => {
                setCount(prevCount => prevCount + 1); // Increment count
  
                if (!imageAdded && attachment.contentType.includes("image") && condtioncheck) {
                  setCondtionCheck(false);
                  localbookmarks.push({
                    src: attachment.url,
                    title: nameEng,
                    id: feature.id,
                    objectid: feature.objectid,
                    layername: feature.layername
                  });
                  imageAdded = true; // Mark that an image has been added
                }
  
                // if (res.data.length === count && condtioncheck) {
                //   setCondtionCheck(true);
                //   localbookmarks.push({
                //     src: Book1,
                //     title: nameEng,
                //     id: feature.id,
                //     objectid: feature.objectid,
                //     layername: feature.layername
                //   });
                // }
              });
            } 
            else {
              localbookmarks.push({
                src:"",
                title: nameEng,
                id: feature.id,
                objectid: feature.objectid,
                layername: feature.layername
              });
            }
          }
        });
      }
  
      setBookmarks(localbookmarks); // Update bookmarks with accumulated results
    } catch (error) {
      console.error("Error querying attachments:", error);
    }
  };
  
  

  const handleZoomtoLocation=(id, objectId, LayerName)=>{
    // Find the correct layer URL from the config based on the provided LayerName
    const layerConfig = config.featureServices.find(layer => LayerName.includes(layer.name));
    const featureLayer = new FeatureLayer({
      url: layerConfig.url,
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
      setIds((prevIds) => {
        // Check if the ID is already in the array
        if (prevIds.includes(index)) {
          // If it exists, remove it
          return prevIds.filter((existingId) => existingId !== index);
        } else {
          // If it doesn't exist, add it
          return [...prevIds, index];
        }
      });
      //console.log("ids",ids);
      return newMarks;
    });
  };

  const handleSave = async() => {
    console.log("ids",ids);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/Bookmarks/deletemultiplebookmarks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ids),
      });
      const data = await response.json();
          if(data.success){
            console.log(data.message);
            fetchBookmarks();
            UserActivityLog(profiledetails, "Bookmark Removed")
             // Close management view
            setSelectedMarks({});
            setIds([]) // Reset the selected marks
            fetchBookmarks()
            setisMsgStatus("Success")
            setIsmodalMessage(isLangArab?"تم حذف الإشارة المرجعية بنجاح":"Bookmark Deleted Sucessfully")
            setIsSuccess(true)
            setIsManageVisible(false);
          }
          else{
            setisMsgStatus("Failure")
            setSelectedMarks({});
            setIds([]) // Reset the selected marks
            fetchBookmarks()
            setIsmodalMessage(isLangArab?"فشل حذف الإشارة المرجعية!":"Failed to Deleted Bookmark!")
            setIsSuccess(true)
            setIsManageVisible(false); // Close management view

            console.log(data.message);
          }

          
      
      } catch (error) {
        setisMsgStatus("Failure")
        setSelectedMarks({});
            setIds([]) // Reset the selected marks
            fetchBookmarks()
            setIsmodalMessage(isLangArab?"فشل حذف الإشارة المرجعية!":" Failed to Deleted Bookmark!")
            setIsSuccess(true)
            setIsManageVisible(false);
          console.error('Error submitting form:', error);
      }    
  };

  const handleClose = () => {
    setIsManageVisible(false); // Close management view
    setSelectedMarks({}); // Reset the selected marks
  };

  return (
    <div className="relative grid grid-cols-1  h-full">
      <div className="grid grid-cols-3 justify-start pt-[1rem]  h-[81%] tab_s:h-[87%] laptop_s:h-[76%] overflow-y-auto items-start gap-y-4 gap-x-0">
  {(bookmarks.length > 0) ? bookmarks.map((image, index) => (
    <div key={image.id} className="relative flex flex-col  items-center">
      {/* Image and title section */}
      <div onClick={() => handleZoomtoLocation(image.id, image.objectid, image.layername)} className={`relative  sm:w-28 w-[96%] h-20  sm:h-24 flex flex-col items-center`}>
        { image.src ?<img
          src={image.src}
          alt={image.title}
          className=" sm:w-full w-[100%]   sm:h-full object-cover shadow-xl rounded-md"
        /> : 
        <span className={` ${ isDarkMode?" bg-[#152227CC]":"bg-white/80"} w-full flex justify-center items-center h-[80%] rounded-md`}>
          <img src={BookMarkGreen} className=' w-7 h-7' alt="" />
        </span>
        }
        
        <h3 className="text-start   font-500 w-full border text-[#FFFFFF] text-[10px] sm:text-[12px]  border-transparent rounded-md absolute bg-[#504848] h-6 justify-start items-center pl-2 flex bottom-0  leading-4 break-words">
        {image.title?.length > 12 ? `${image.title.substring(0, 15)}` : image.title}
        </h3>
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

      {/* Bookmark button outside image wrapper */}
      {isManageVisible && (
        <div className="mt-1">
          <button
            onClick={() => {
              handleSelectMark(image.id); // Toggle selection on click
            }}
            className=" absolute top-2 right-3"
          >
            <img
              src={BookYellow}
              className={`h-5 shadow-black cursor-pointer 
                          ${selectedMarks[image.id] ? 'invert brightness-0' : ''}`} // Apply filters conditionally
              alt="Mark"
            />
          </button>
        </div>
      )}
    </div>
  )):<div className=' fixed flex items-center justify-center right-3  left-3 top-40 bottom-40   '>
    <p className={`text-center  ${isDarkMode?"text-white":"text-black"}`}>
   {isLangArab?"لا توجد إشارات مرجعية متاحة":" No Bookmarks Available"}
    </p>
    </div>}
</div>
      <div className={` absolute bottom-5 tab_s:bottom-5   left-3 right-3 flex flex-col  space-y-1 ${isManageVisible ? 'mt-2 ' : 'mt-2 '}`}>
            <hr className='mx-2 mb-2 ' />
            {!isManageVisible ? (
              <span className="flex gap-x-1 justify-center items-center">
                <img src={isDarkMode ? DarkBookMarkGreen : BookMarkGreen } alt="" className="h-5" />
                <p className={`${ isDarkMode?"text-white font-400":"text-[#1365B1]"} underline text-sm laptop_s:text-[14px] laptop_lg:tett-[16px] cursor-pointer  font-medium`} onClick={() => setIsManageVisible(true)}>{ isLangArab?"إدارة العلامات المرجعية":"Manage Bookmarks"}</p>
              </span>
            ) : (
              <div className={`flex   mobile_m_360:justify-center justify-between  ${isLangArab?"gap-4":"  mobile_m_360:space-x-9"} mobile_m_360:items-center`}>
                
                <button onClick={handleClose}
                  className={`w-auto py-3 text-[12px]   font-500 mobile_s:text-[10px] mobile_m:text-[12px] px-12 text-black ${isDarkMode?" bg-white":" bg-transparent border-[#909090]"}  border  rounded-lg`}
                >
                  {isLangArab ? "إلغاء":"Cancel"}
                </button>
                <button
                  onClick={handleSave}
                  disabled={ids.length === 0}
                  className={ids.length===0?"w-auto py-3    font-500 text-[#FFFFFF] px-4 mobile_s:px-3 mobile_m_360:px-5 mobile_m:px-5  mobile_m_390:px-6  sm:px-8 bg-custome-gray1 text-[12px] mobile_s:text-[10px] mobile_m:text-[11px] mobile_m_390:text-[12px]   border border-transparent rounded-lg":"w-auto py-3 px-4 mobile_s:px-3 mobile_m_360:px-5 mobile_m:px-6  sm:px-10 bg-custom-gradient text-[12px] mobile_s:text-[10px] mobile_m:text-[11px] mobile_m_390:text-[12px]  border border-transparent rounded-lg"}
                >
                  {isLangArab?"حفظ التغييرات":"Save Changes"}
                </button>
              </div>
              
            )}
          </div>
    </div>
  );
};
export default Popup1
 