  import React, { useEffect, useState, useRef } from "react";
  import { IoIosArrowForward } from "react-icons/io";
  import Location from '../../assets/POIEdit/POIBIN.svg';
  import PoiEditShare from '../../assets/POIEdit/PoiEditShare.svg';
  import POIEditWrite from '../../assets/POIEdit/POIEditWrite.svg';
  import POILabelMark from '../../assets/BookmarkThemeicons/Green Outline.svg';
  import POILabelFillMark from '../../assets/BookmarkThemeicons/Green Fill.svg';
  import POILabelDarkMark from '../../assets/BookmarkThemeicons/White Outline.svg';
  import POILabelDarkFillMark from '../../assets/BookmarkThemeicons/White Fill.svg';

  import  POIEditForm from '../Layout/POIEdit/POIEditForm'
  import  POShareForm from '../Layout/POIEdit/POIShareForm'
  import  POIEditFileUploader from '../Layout/POIEdit/POIFileUploader'
  import  POIEditFileUploaderStatusMOdel from '../Layout/POIEdit/POIEditSucessFailure'
  import FeatureLayer from "@arcgis/core/layers/FeatureLayer";  
  import RoleServices from '../servicces/RoleServices';
  import config from '../Common/config'; // Import your config file
  import LeftArrow from "../../assets/Droppedpin/leftArrow.svg"
  import RigthArrow from "../../assets/Droppedpin/RigthArrow.svg"
  import DarkLeftArrow from "../../assets/Droppedpin/DarkArrowleft.svg"
  import DarkRigthArrow from "../../assets/Droppedpin/DarkArrowRigth.svg"


  import { X } from "lucide-react";
  import DarkLocation from '../../assets/Droppedpin/Dropped Pin.svg';
  import { useTheme } from '../Layout/ThemeContext/ThemeContext'; // Import the theme context
  import { useAuth } from "../../Providers/AuthProvider/AuthProvider";
  import {UserActivityLog} from "../Common/UserActivityLog";


  export default function POIEditSideLayout({ children,onClose,setIsMsgStatus,
    setModalMessage,setIsSuccess, mapview }) { //height = "calc(95vh - 2rem)",
    const [isOpen, setIsOpen] = useState(true);   // Controls slide in/out
    const [isFullyClosed, setIsFullyClosed] = useState(false); // Controls visibility
    const [toggleCount, setToggleCount] = useState(0);
    const containerRef = useRef(null);
    const { isDarkMode, isLangArab } = useTheme(); // Access the dark mode state
    const {setIsEditPOI,setIsAuthPopUp, popupselectedgeo, profiledetails} = useAuth();
    const [POIFormShow , setPOIFormShow]=useState(true);
    const [POIFormUploader , setPOIUploaderShow]=useState(false);
    const [isEditShowPOI, setIsShowEditPOI] = useState(false); // Default value is false
    const [message , setPOImessageShow]=useState("");
    const [POIFormsuccessShow , setPOIFormsuccessShow]=useState("");
    const [POIFormisOpenModalShow , setPOIFormisOpenModalShow]=useState(false);
    const [POIShareShow , setPOIShareShow]=useState(false);
    const [queryresults , setQueryResults]=useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]); // Store the uploaded files
    const [isBookMarkClick,setBookMarkClick]=useState(false)
    const [isBookMarked, setIsBookMarked] = useState(false)
    const [userBookmarkIds,setuserBookmarkIds]= useState([])
    


    const [POIPoints, setPOIPoinst] = useState({
      CurrentPoint:0,
      TotalPoints:0
    })
    console.log("POI Share status:", POIShareShow)




    console.log("IsSucess POI open:", POIFormisOpenModalShow)
    console.log("Message POI open:", message)

    console.log("Status POI open:", POIFormisOpenModalShow)



    // Toggles the side panel sliding in and out
    const toggleSideLayout = () => {
      setIsOpen(prev => !prev); // Toggle visibility
      setToggleCount(prev => prev + 1); // Increment toggle count
    };

    const handleRigthPOIPoint = ()=>{
      console.log("RigthPOI clicked!")
    }

    const handleLeftPOIPoint = ()=>{
      console.log("LeftPOI clicked!")
    }

    // Completely closes the side panel
    const closePanel = () => {
      setIsFullyClosed(true);
      setIsEditPOI(false)
      onClose()
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
      const numbers = userBookmarkIds;
      const target = popupselectedgeo?.feature?.attributes?.OBJECTID;
      console.log("Passed Geo POI edit:",target)
      console.log("Passed userIds POI edit:",userBookmarkIds)

      const result = numbers.some(num => num === target);
      if(result){
        setIsBookMarked(true)
      }else{
        setIsBookMarked(false)
      }
    },[popupselectedgeo,userBookmarkIds])

    const handleInsertBookmarkData = async(res)=>{
      if(isBookMarked){
        // alert("Bookmark Already Marked!")
        setIsMsgStatus("Success");
        setModalMessage( isLangArab?"المرجعية ملحوظ بالفعل!":"Bookmark Already Marked!");
        setIsSuccess(true);
        return ;
      }
      if(res){
        try {
          if(res.features[0].attributes.name_en === undefined){
            res.features[0].attributes.name_en= "Bookmarks"
          }
          const bookmarkObj ={
            email:profiledetails.email,
            username:profiledetails.username,
            title:res.features[0].attributes.name_en,
            layername:res.features[0].layer.title,
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
            UserActivityLog(profiledetails, "Bookmark Added")  
            setBookMarkClick(false)
            setIsMsgStatus("Success");
            setModalMessage(data.message === "Bookmark created successfully." && (isLangArab ?"تم إنشاء الإشارة المرجعية بنجاح.":"Bookmark created successfully."));
            setIsSuccess(true);
            // alert(data.message === "Bookmark created successfully." && (isLangArab ?"تم إنشاء الإشارة المرجعية بنجاح.":"Bookmark created successfully."));
            fetchBookmarks()
          }
          else{
            //console.log(data)         
            setBookMarkClick(false) 
          }
        }catch (error) {
          setBookMarkClick(false)
          console.error('Error submitting form:', error);
        } 
      }
    }

    
  const fetchBookmarks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/Bookmarks/${profiledetails.email}`);

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      if(res.success){              
        const objectIds = res.data.map(feature => feature.objectid);
        if(objectIds.length > 0){
          setuserBookmarkIds(objectIds)
        }
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

    const handleBookmarkEvent = async (eventType) => {
      if(eventType === "click"){
        setBookMarkClick(true)
      }
      
      // Use a more descriptive parameter name like eventType instead of 'e'
      let layerUrl = '';
      let Objectid = '';
    
      // Fetch layer configurations and set layerUrl and Objectid as per logic
      if (popupselectedgeo?.layerName) {
          const terrestrialLayerConfig = config.featureServices.find(service => 
              service.name === popupselectedgeo?.layerName
          );
          layerUrl = terrestrialLayerConfig?.url;
          Objectid = "OBJECTID=" + popupselectedgeo?.feature?.attributes?.OBJECTID;
      } else if (popupselectedgeo?.layer?.layerId !== null && popupselectedgeo?.layer?.layerId !== 'undefined') {
          layerUrl = `${popupselectedgeo?.layer?.url}/${popupselectedgeo?.layer?.layerId}`;
          Objectid = "OBJECTID=" + popupselectedgeo?.attributes?.OBJECTID;
      } else {
          layerUrl = popupselectedgeo?.layer?.url;
          Objectid = "OBJECTID=" + popupselectedgeo?.attributes?.OBJECTID;
      }
    
      try {
          const featureLayer = new FeatureLayer({
              url: layerUrl
          });
    
          const query = featureLayer.createQuery();
          query.where = Objectid;
          query.returnGeometry = true;
          query.outFields = ['*'];
    
          const response = await featureLayer.queryFeatures(query);
          console.log('Features found:', response.features);
    
          if (eventType !== "onload") {
              handleInsertBookmarkData(response);
          } else {
              setQueryResults(response);
          }
      } catch (error) {
          console.error('Query failed:', error);
          setBookMarkClick(false);
    
          // Check if it's an HTML response indicating a server error
          if (error.message.includes("Unexpected token '<'")) {
              console.error('Received an HTML response. The URL might be incorrect or the server is down.');
          }
      }
  };
  
  

    // If the panel is fully closed, don't render anything
    if (isFullyClosed) return null;
    const handleShowPOIEdit=()=>{
      if(RoleServices.isAuth()){
        setIsShowEditPOI((prev) => !prev)
      }else{
        setIsAuthPopUp(true);
      }
    }
    console.log("Edit POI Status:", userBookmarkIds)

    const ArabicHeaderName = (queryresults?.features && queryresults.features[0]?.attributes?.name_ar) || '';
const EnglishHeaderName = (queryresults?.features && queryresults.features[0]?.attributes?.name_en) || '';



    return (
      <div
        className={`fixed top-20 w-[95%] ${POIShareShow?"-[65%] laptop_s:w-[400px]": POIFormisOpenModalShow ?" ":"h-[90%]"} sm:w-[400px] laptop_s:w-[400px]  ${ isLangArab?"left-3 sm:left-16 laptop_s:left-6":"right-3 sm:right-16 laptop_s:right-6"} transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : ( isLangArab?" sm:-translate-x-[116%] laptop_s:-translate-x-[106%]":" sm:translate-x-[116%]  laptop_s:translate-x-[106%]")
        }`}
        // style={{ width, height, zIndex: 50 }}  // Ensure it's above other elements
        ref={containerRef}  // Reference to the panel
      >
        <div className={`relative sm:h-[80%] laptop_s:h-[89%] laptop_lg:h-[70%] h-[98%]  w-[99%] mobile_m:w-[80%] float-end sm:w-full rounded-2xl shadow-lg overflow-hidden border transition-colors duration-300 ${
            isDarkMode
              ? "bg-[rgba(96,96,96,0.8)] bg-opacity-80 border-none" // Dark mode styles
              : "bg-white bg-opacity-80 border-white"
          }`}>
          {/* Content */}
          <div className="p-2 overflow-y-auto h-full relative">
            {children || (<>
              {!POIShareShow && queryresults !== "" && <div dir={isLangArab && "rtl"} className={`absolute top-3 w-[95%]  ${!isLangArab && "left-4"} flex   gap-x-1`}>
                { isDarkMode ?<img src={Location}alt="Location" className={`"h-7 w-8 " ${isLangArab && "mr-1 sm:mr-2"} ${POIFormisOpenModalShow ?"opacity-0":" "}`} />
                :
                <img src={Location}alt="Location" className={`"h-7 w-5" ${isLangArab && "mr-1 sm:mr-2"} ${POIFormisOpenModalShow ?"opacity-0":" "}`} />}
                <p className={`font-semibold    ${
                      isDarkMode ? "text-white" : "text-gray-600"
                    }`}> <h1 className={` font-cairo text-[20px] ${POIFormisOpenModalShow ?"opacity-0":" "}`}>{ArabicHeaderName?.length > 20 ? `${ArabicHeaderName.substring(0, (isLangArab? 50 : 40))}` : ArabicHeaderName}</h1>
                    <h2 className={` text-[16px] ${POIFormisOpenModalShow ?"opacity-0":" "}`}>{EnglishHeaderName?.length > 20 ? `${EnglishHeaderName.substring(0, 50)}` : EnglishHeaderName}</h2></p>
                    {!POIShareShow && <div className={`flex justify-center items-center absolute ${isLangArab?"-left-1":"right-3"} -top-2   p-2 transition-colors h-10 cursor-pointer z-50 `}>
  {/* POI Share Icon */}
  <button
    onClick={() => {setPOIShareShow(true);setPOIFormShow(false);setPOIFormisOpenModalShow(false)}} // Toggle the state
    aria-label="Edit POI"
    className={`h-full  ${POIFormisOpenModalShow ?"opacity-0":" "}`}
    style={{ border: 'none', background: 'none' }} // No styles, functionality only
  >
  <img
    
    src={PoiEditShare} // isDarkMode check was redundant as both conditions had the same value
    alt="Share Location"
    className={`h-full  ${isDarkMode ?"invert brightness-0 text-white ":" "} `}
  />
  </button>

  {/* Edit POI Button */}
  <button
    onClick={() =>  handleShowPOIEdit()} // Toggle the state
    aria-label="Edit POI"
    className={`h-full ${!RoleServices.isAuth() && " hidden"} ${POIFormisOpenModalShow ?"opacity-0":" "} `}
    style={{ border: 'none', background: 'none' }} // No styles, functionality only
  >
    <img
      src={POIEditWrite} // isDarkMode check was redundant here as well
      alt="Edit POI"
      className={`h-full ${isDarkMode ?"invert brightness-0 text-white ":" "} `}
    />
  </button>

  {/* POI Label Mark */}
  <button onClick={() => RoleServices.isAuth() ? handleBookmarkEvent('click') : setIsAuthPopUp(true)}
    className={POIFormisOpenModalShow ?"opacity-0":" "}
  >
  <img
    src={isBookMarked? (isDarkMode ? POILabelDarkFillMark :POILabelFillMark): (isDarkMode ? POILabelDarkMark :POILabelMark)}
    alt="Location Mark"
    className={` h-full`}
  />
</button>

  

  {/* Close Button (X) */}
  <button
    onClick={closePanel}
    className={`transition-colors cursor-pointer z-50 ${
      isDarkMode ? "text-white" : "text-green-900"
    } `}  // Ensure it's clickable
    aria-label="Close side panel"
    style={{ zIndex: 100 }} // Ensure the "X" button is on top
  >
    <X className="h-5 w-6" />
  </button>
</div>}       </div>}
              <div className={`${POIShareShow?"mt-3":"mt-20"} overflow-y-auto`}>
                {/* {(!isEditShowPOI && !POIShareShow) && <div dir={isLangArab && "rtl"} className=" w-[95%] flex justify-end items-center"><span className=" flex justify-between gap-0.5  items-center"> <button onClick={handleLeftPOIPoint}><img src={ isDarkMode?DarkLeftArrow:LeftArrow} alt="" className={`w-2.5 ${isLangArab && " rotate-180"} h-2.5`} /></button> <span className= {`flex justify-between gap-0.5 items-center ${ isDarkMode?"text-white":"text-[#808080]"} font-500 text-[12px]`}><p>{POIPoints.CurrentPoint}</p> <p>of</p> <p>{POIPoints.TotalPoints}</p></span>  <button onClick={handleRigthPOIPoint} ><img src={ isDarkMode?DarkRigthArrow: RigthArrow} alt="" className={`w-2.5 ${isLangArab && " rotate-180"} h-2.5 ${isDarkMode && " text-white"} `} /></button></span></div>} */}
              {POIShareShow && <POShareForm  onClose={()=>{setPOIFormShow(true);setPOIShareShow(false);}} queryresults={queryresults}/>}
             {(isEditShowPOI||POIFormShow) && <POIEditForm isLangArab={isLangArab} isEditShowPOI={isEditShowPOI}  setIsShowEditPOI={setIsShowEditPOI}  POIFormShow={POIFormShow} setPOIFormShow={setPOIFormShow} setPOIUploaderShow={setPOIUploaderShow} queryresults={queryresults} setIsEditPOI={setIsEditPOI} uploadedFiles={uploadedFiles} setPOImessageShow={setPOImessageShow} setPOIFormsuccessShow={setPOIFormsuccessShow} setPOIFormisOpenModalShow={setPOIFormisOpenModalShow} setUploadedFiles={setUploadedFiles}/>}
              <POIEditFileUploader  setIsSuccess={setIsSuccess}
            setIsMsgStatus={setIsMsgStatus}
            setModalMessage={setModalMessage} isLangArab={isLangArab} setPOImessageShow={setPOImessageShow} setPOIFormsuccessShow={setPOIFormsuccessShow} POIFormUploader={POIFormUploader} setPOIFormisOpenModalShow={setPOIFormisOpenModalShow} setPOIFormShow={setPOIFormShow} setPOIUploaderShow={setPOIUploaderShow} queryresults={queryresults} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles}/>
               {/* Render the modal only when the state is true */}
  {POIFormisOpenModalShow && (
    <POIEditFileUploaderStatusMOdel  
    label={"POIEdit"}
      message={message} 
      success={POIFormsuccessShow} 
      isOpenModal={POIFormisOpenModalShow} 
      onClose={() => { 
        setPOIFormShow(true);
        setPOIFormisOpenModalShow(false);
        onClose();
      }} 
    />
  )}
 
           </div>
              </>
            )}
          </div>
        </div>

        {/* Toggle button */}
        <div className={`absolute hidden sm:block top-4 ${isLangArab?"-right-7":"-left-6"}`}>
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
                fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "rgba(255, 255, 255, 0.7)"}
                stroke="none"
                strokeWidth="0"
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
                fill={isDarkMode ? "rgba(96, 96, 96, 0.8)" : "rgba(255, 255, 255, 0.7)"}
                stroke="none"
                strokeWidth="0"
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
                  isOpen ? (isLangArab? "rotate-180 " : "rotate-360") : ""
                } ${!isOpen && (toggleCount > 0 ? isLangArab? "rotate-360" : "rotate-180" : "")}`}
                style={{ color: isDarkMode ? "#fff" : "#000" }}
              />
            </div>
          </button>
        </div>
      </div>
    );
  }