  import React, { useEffect, useState, useRef } from "react";
  import { IoIosArrowForward } from "react-icons/io";
  import Location from '../../assets/POIEdit/POIBIN.svg';
  import PoiEditShare from '../../assets/POIEdit/PoiEditShare.svg';
  import POIEditWrite from '../../assets/POIEdit/POIEditWrite.svg';
  import POILabelMark from '../../assets/POIEdit/POILabelMark.svg';
  import  POIEditForm from '../Layout/POIEdit/POIEditForm'
  import  POShareForm from '../Layout/POIEdit/POIShareForm'
  import  POIEditFileUploader from '../Layout/POIEdit/POIFileUploader'
  import  POIEditFileUploaderStatusMOdel from '../Layout/POIEdit/POIEditSucessFailure'
  import FeatureLayer from "@arcgis/core/layers/FeatureLayer";  
  import * as projection from "@arcgis/core/geometry/projection.js";
  

  import { X } from "lucide-react";
  import DarkLocation from '../../assets/Droppedpin/Dropped Pin.svg';
  import { useTheme } from '../Layout/ThemeContext/ThemeContext'; // Import the theme context
  import { useAuth } from "../../Providers/AuthProvider/AuthProvider";



  export default function POIEditSideLayout({ children, mapview }) { //height = "calc(95vh - 2rem)",
    const [isOpen, setIsOpen] = useState(true);   // Controls slide in/out
    const [isFullyClosed, setIsFullyClosed] = useState(false); // Controls visibility
    const [toggleCount, setToggleCount] = useState(0);
    const containerRef = useRef(null);
    const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state
    const {setIsEditPOI, popupselectedgeo, profiledetails} = useAuth();
    const [POIFormShow , setPOIFormShow]=useState(true);
    const [POIFormUploader , setPOIUploaderShow]=useState(false);
    const [isEditShowPOI, setIsShowEditPOI] = useState(false); // Default value is false
    const [message , setPOImessageShow]=useState("");
    const [POIFormsuccessShow , setPOIFormsuccessShow]=useState("");
    const [POIFormisOpenModalShow , setPOIFormisOpenModalShow]=useState(false);
    const [POIShareShow , setPOIShareShow]=useState(false);
    const [queryresults , setQueryResults]=useState("");
    console.log("POI Share status:", POIShareShow)




    console.log("IsSucess POI open:", POIFormisOpenModalShow)
    console.log("Message POI open:", message)

    console.log("Status POI open:", POIFormisOpenModalShow)



    // Toggles the side panel sliding in and out
    const toggleSideLayout = () => {
      setIsOpen(prev => !prev); // Toggle visibility
      setToggleCount(prev => prev + 1); // Increment toggle count
    };

    // Completely closes the side panel
    const closePanel = () => {
      setIsFullyClosed(true);
    };

    // Handle outside click detection (removed the close functionality)
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
          // Removed closePanel() call here.
          // You can still handle other logic if needed for outside clicks.
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [containerRef]);

    useEffect(() => {
      // If the panel is fully closed, call onClose after a short delay
      if (isFullyClosed) {
        const timer = setTimeout(() => {
        }, 300); // Adjust this timing to match your transition duration
  
        return () => clearTimeout(timer);
      }
    }, [isFullyClosed]);

    useEffect(()=>{
      handleBookmarkEvent("onload");
    },[popupselectedgeo])

    const handleInsertBookmarkData = async(res)=>{
      if(res){
        try {
          if(res.features[0].attributes.name_en === undefined){
            res.features[0].attributes.name_en= "Bookmarks"
          }
          const bookmarkObj ={
            email:profiledetails.email,
            username:profiledetails.username,
            title:res.features[0].attributes.name_en,
            // extent:res.features[0].geometry.x +","+res.features[0].geometry.y,
            objectid:res.features[0].attributes.OBJECTID
          }
          const response = await fetch(`${process.env.REACT_APP_API_URL}/Bookmarks/bookmarksent`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(bookmarkObj),
          });
          const data = await response.json();
          if(data.success){
            //console.log(values);
            //UserActivityLog(profiledetails, "Forget Password")  
            alert(data.message);
          }
          else{
            //console.log(data)          
          }
        }catch (error) {
          console.error('Error submitting form:', error);
        } 
      }
    }

    const handleBookmarkEvent = async(e) =>{
      //alert(popupselectedgeo.graphic[0].geometry.x)
      let layerUrl =''
      if(popupselectedgeo.layer.layerId != null && popupselectedgeo.layer.layerId != 'undefined'){
        layerUrl = popupselectedgeo.layer.url+"/"+popupselectedgeo.layer.layerId
      }else{
        layerUrl = popupselectedgeo.layer.url

      }
      let featureLayer = new FeatureLayer({
        url : layerUrl
      })
      // Wait for the layer to load
      featureLayer.load().then(() => {
        // Now you can safely access spatialReference
        const projectedPoint = projection.project(popupselectedgeo.mapPoint, featureLayer.spatialReference);

        let query = featureLayer.createQuery();
        //query.geometry = projectedPoint;
        query.where = "OBJECTID="+popupselectedgeo.graphic.attributes.OBJECTID
        query.returnGeometry = true;
        //query.spatialRelationship = "intersects"; 
        query.outFields = ['*'];
        //query.outSpatialReference = { wkid: featureLayer.spatialReference.wkid };

        // Execute the query
        featureLayer.queryFeatures(query).then(function(response) {
          console.log('Features found:', response.features);
          if(e !== "onload"){
            handleInsertBookmarkData(response);
          }
          else{
            setQueryResults(response)
          }          
        });
      }).catch(error => {
        console.error('Feature layer failed to load:', error);
      });

      // const query = new Query();
      // query.geometry = popupselectedgeo.mapPoint; // Use the clicked map point
      // query.spatialRelationship = 'intersects'; // Define the spatial relationship
      // query.returnGeometry = true; // Return geometry
      // query.outFields = ['*']; // Specify fields to return
      // query.outSpatialReference = { wkid: 3857 };
      // // Execute the query
      // try {
      //   const response = await featureLayer.queryFeatures(query);
      //   console.log('Features found:', response.features);
      //   // Handle the features (e.g., display them on the map)
      //   handleInsertBookmarkData(response);
      // } catch (error) {
      //   console.error('Query failed:', error);
      // }
    }

    // If the panel is fully closed, don't render anything
    if (isFullyClosed) return null;

    console.log("Edit POI Status:", isEditShowPOI)

    return (
      <div
        className={`fixed top-16 w-[510px] ${POIShareShow?"-[65%] laptop_s:w-[370px]":"h-[90%]"} sm:w-[400px] laptop_s:w-[330px]  ${ isLangArab?"left-3 sm:left-16 laptop_s:left-3":"right-3 sm:right-16 laptop_s:right-3"} transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : ( isLangArab?"-translate-x-[104%]":"translate-x-[103%]")
        }`}
        // style={{ width, height, zIndex: 50 }}  // Ensure it's above other elements
        ref={containerRef}  // Reference to the panel
      >
        <div className={`relative sm:h-[80%] laptop_s:h-[89%] h-[98%]  w-[65%] float-end sm:w-full rounded-2xl shadow-lg overflow-hidden border transition-colors duration-300 ${
            isDarkMode
              ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none" // Dark mode styles
              : "bg-white bg-opacity-70 border-white"
          }`}>
          {/* Content */}
          <div className="p-2 overflow-y-auto h-full relative">
            {children || (<>
              {!POIShareShow && queryresults !== "" && <div className="absolute top-6 left-4 flex  gap-x-1">
                <img src={isDarkMode ? DarkLocation : Location }alt="Location" className="h-8" />
                <p className={`font-semibold font-poppins ${
                      isDarkMode ? "text-white" : "text-gray-600"
                    }`}> <h1 className=" text-[12px]">{queryresults.features[0].attributes.name_ar}</h1>
                    <h2 className=" text-[12px]">{queryresults.features[0].attributes.name_en}</h2></p>
              </div>}
              <div className={`${POIShareShow?"mt-3":"mt-20"} overflow-y-auto`}>
              {POIShareShow && <POShareForm  onClose={()=>{setPOIFormShow(true);setPOIShareShow(false);}}/>}
             {(isEditShowPOI||POIFormShow) && <POIEditForm isEditShowPOI={isEditShowPOI}  setIsShowEditPOI={setIsShowEditPOI}  POIFormShow={POIFormShow} setPOIFormShow={setPOIFormShow} setPOIUploaderShow={setPOIUploaderShow} queryresults={queryresults}/>}
              <POIEditFileUploader setPOImessageShow={setPOImessageShow} setPOIFormsuccessShow={setPOIFormsuccessShow} POIFormUploader={POIFormUploader} setPOIFormisOpenModalShow={setPOIFormisOpenModalShow} setPOIFormShow={setPOIFormShow} setPOIUploaderShow={setPOIUploaderShow}/>
               {/* Render the modal only when the state is true */}
  {POIFormisOpenModalShow && (
    <POIEditFileUploaderStatusMOdel  
      message={message} 
      success={POIFormsuccessShow} 
      isOpenModal={POIFormisOpenModalShow} 
      onClose={() => { 
        setPOIFormShow(true);
        setPOIFormisOpenModalShow(false);
      }} 
    />
  )}
           </div>
              </>
            )}
          </div>
          
          {!POIShareShow && <div className="absolute top-4 flex right-2 p-2 transition-colors h-10 cursor-pointer z-50">
  {/* POI Share Icon */}
  <button
    onClick={() => {setPOIShareShow(true);setPOIFormShow(false);setPOIFormisOpenModalShow(false)}} // Toggle the state
    aria-label="Edit POI"
    className="h-full"
    style={{ border: 'none', background: 'none' }} // No styles, functionality only
  >
  <img
    
    src={PoiEditShare} // isDarkMode check was redundant as both conditions had the same value
    alt="Share Location"
    className="h-full"
  />
  </button>

  {/* Edit POI Button */}
  <button
    onClick={() => setIsShowEditPOI((prev) => !prev)} // Toggle the state
    aria-label="Edit POI"
    className="h-full"
    style={{ border: 'none', background: 'none' }} // No styles, functionality only
  >
    <img
      src={POIEditWrite} // isDarkMode check was redundant here as well
      alt="Edit POI"
      className="h-full"
    />
  </button>

  {/* POI Label Mark */}
  <button onClick={handleBookmarkEvent}>
  <img
    src={POILabelMark} // isDarkMode check was redundant here too
    alt="Location Mark"
    className="h-full"
  />
  </button>
  

  {/* Close Button (X) */}
  <button
    onClick={() => setIsEditPOI(false)}
    className={`transition-colors cursor-pointer z-50 ${
      isDarkMode ? "hover:text-gray-300" : "text-green-900"
    }`}  // Ensure it's clickable
    aria-label="Close side panel"
    style={{ zIndex: 100 }} // Ensure the "X" button is on top
  >
    <X className="h-5 w-6" />
  </button>
</div>}
        </div>

        {/* Toggle button */}
        <div className={`absolute top-4 ${isLangArab?"-right-7":"-left-6"}`}>
          <button
            onClick={toggleSideLayout}
            className="relative w-8 h-32 focus:outline-none cursor-pointer" // Ensure cursor pointer
            aria-label={isOpen ? "Close side panel" : "Open side panel"}
          >
            {isLangArab ?<svg
        width="32"
        height="128"
        viewBox="0 0 64 371"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'relative',
          top: '1px',
          right: '3px',
        }}
      >
        <g
          clipPath="url(#clip0_4011_11301)"
          transform="scale(-1, 1) translate(-64, 0)" // Flipping horizontally
        >
          <path
            d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
            fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EBEFF2"}
            stroke={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EEF3F7"}
            strokeWidth="6"
          />
        </g>
        <defs>
          <clipPath id="clip0_4011_11301">
            <rect width="64" height="371" fill="white" />
          </clipPath>
        </defs>
      </svg>:<svg
              width="32"
              height="128"
              viewBox="0 0 64 371"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: 'relative',
                top: '1px',
                right: '3px',
              }}
            >
              <g clipPath="url(#clip0_4011_11301)">
                <path
                  d="M3.82642 130.396L3.82598 244.617C3.82594 252.779 6.14893 260.773 10.5235 267.664L70.7275 362.497V8.50244L10.1031 108.027C5.99796 114.766 3.82645 122.505 3.82642 130.396Z"
                  fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EBEFF2"} // Updated for dark mode
                  stroke={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "#EEF3F7"}
                  strokeWidth="6"
                />
              </g>
              <defs>
                <clipPath id="clip0_4011_11301">
                  <rect width="64" height="371" fill="white" />
                </clipPath>
              </defs>
            </svg>}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <IoIosArrowForward
                className={`text-black text-xl transition-transform duration-300 ${
                  isOpen ? "rotate-360" : ""
                } ${!isOpen && (toggleCount > 0 ? "rotate-180" : "")}`}
                style={{ color: isDarkMode ? "#fff" : "#000" }}
              />
            </div>
          </button>
        </div>
      </div>
    );
  }