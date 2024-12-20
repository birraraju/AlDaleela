import Home from "../../../assets/navigations/imageSide2.png";
import HomeDark from "../../../assets/navigations/dark.png"; // Dark theme image path
import HomeSign from '../../../assets/navigations/imagesideHome.png';
import plusMinusBg from '../../../assets/navigations/imageSide1.png';
import PlusSign from '../../../assets/navigations/imagePlus.png';
import MinusSign from '../../../assets/navigations/imageMinus.png';
import plusMinusBgDark from '../../../assets/navigations/darkrectangle.png'; // Dark theme background
import Hand from '../../../assets/navigations/imagesideHand.png';
import LeftArrow from '../../../assets/navigations/imagesideLeftArrow.png';
import RightArrow from '../../../assets/navigations/imagesideRigthArrow.png'; // Fixed typo in variable name
import DashSign from '../../../assets/navigations/image.png';
import { useTheme } from "../ThemeContext/ThemeContext";
import { useAuth } from "../../../Providers/AuthProvider/AuthProvider";
import { useEffect, useState, useRef } from "react";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import BookmarkWhite from '../../../assets/sidebarBookmark/bookmark.svg'
import LocationupdatedLogo from '../../../assets/Header/GeneralInformation/updatedLocation.svg';
import LocationupdatedColorLogo from '../../../assets/Header/GeneralInformation/updatedLocation-color.svg';
import StackLogo from '../../../assets/Header/Layerlist/Stack.svg';
import StackLogoColor from '../../../assets/Header/Layerlist/StackColor.svg';

export default function Sidebar({handleBasemapMenuItemClick}) {
  const { isDarkMode, isLangArab ,isGeneralInfo,setIsGeneralInfo,isStackInfo,setIsStockInfo} = useTheme(); // Access the theme from context
  const { contextMapView, initialExtent, extentHistory, setExtentHistory, currentExtentIndex, setCurrentExtentIndex } = useAuth();
  const [panmode, setPanMode] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  // Mutable refs for extent history
  const _prevExtent = useRef(false);
  const _preExtent = useRef(null);
  const _currentExtent = useRef(null);
  const _extentHistory = useRef([]);
  const _extentHistoryIndx = useRef(0);
  const _nextExtent = useRef(false);
  const zoomPrevBtn = useRef(null);
  const zoomNextBtn = useRef(null);

  useEffect(() => {
    if (contextMapView) {
      // Handle extent change
      reactiveUtils.when(
        () => contextMapView.stationary,
        () => {
          extentChangeHandler(contextMapView.extent);
        }
      );
    }
  }, [contextMapView]);

 
  // Handle extent change and history
  const extentChangeHandler = (evt) => {
    console.log('extent changed', evt);
    if (_prevExtent.current || _nextExtent.current) {
      _currentExtent.current = evt;
    } else {
      _preExtent.current = _currentExtent.current;
      _currentExtent.current = evt;
      _extentHistory.current.push({
        preExtent: _preExtent.current,
        currentExtent: _currentExtent.current
      });
      _extentHistoryIndx.current = _extentHistory.current.length - 1;
    }
    _prevExtent.current = _nextExtent.current = false;
    extentHistoryChange();
  };

  // Update button states
  const extentHistoryChange = () => {
    if (_extentHistory.current.length === 0 || _extentHistoryIndx.current === 0) {
      if (zoomPrevBtn.current) zoomPrevBtn.current.classList.add("disabled");
    } else {
      if (zoomPrevBtn.current) zoomPrevBtn.current.classList.remove("disabled");
    }
    if (_extentHistory.current.length === 0 || _extentHistoryIndx.current === _extentHistory.current.length - 1) {
      if (zoomNextBtn.current) zoomNextBtn.current.classList.add("disabled");
    } else {
      if (zoomNextBtn.current) zoomNextBtn.current.classList.remove("disabled");
    }
  };

  const handleHomeClick = () => {
    if (contextMapView) {
      contextMapView.goTo({
        center: initialExtent.center,
        zoom: initialExtent.zoom,
      });
    }
  };

  const handleNextLevelClick = () => {
    _nextExtent.current = true;
    _extentHistoryIndx.current++;
    if (_extentHistoryIndx.current > _extentHistory.current.length - 1) {
      _extentHistoryIndx.current = _extentHistory.current.length - 1;
    }
    contextMapView.goTo(_extentHistory.current[_extentHistoryIndx.current].currentExtent);
  };

  const handlePreviousLevelClick = () => {
    if (_extentHistory.current.length > 0 && _extentHistory.current[_extentHistoryIndx.current].preExtent) {
      _prevExtent.current = true;
      contextMapView.goTo(_extentHistory.current[_extentHistoryIndx.current].preExtent);
      _extentHistoryIndx.current--;
    }
  };

  const handlePanModeClick = () => {
    if (panmode) {
      contextMapView.surface.style.cursor = "pointer";
      setPanMode(false);
    } else {
      contextMapView.surface.style.cursor = "default";
      setPanMode(true);
    }
  };

  return (
    <div
  className={`fixed ${
    isLangArab ? "right-2" : " sm:left-2 "
  } ml-3 laptop_s:top-1/2 sm:top-64  top-20 sm:mt-2 laptop_s:mt-0 laptop_s:-translate-y-1/2 z-10 flex  flex-col items-center space-y-2 bg-transparent p-2 rounded-full`}
>
      <div
  className={`bg-white  sm:hidden flex rounded-full z-40  mobile_s:h-9 tab:h-7  laptop_s:h-7 laptop_s:w-7 tab:p-1 laptop_s:p-0  laptop_s:mr-0.5  laptop_m:h-8 mobile_s:w-9 laptop_m:w-8 mobile_s:mr-2 tab:mr-0.5  laptop_m:mr-2 justify-center items-center cursor-pointer`} 
  onClick={()=>setIsGeneralInfo(!isGeneralInfo)}
      >
        <img
          src={`${LocationupdatedColorLogo}`}
          alt=""
          className="w-[67%] translate-x-1 h-[67%]"
        />
      </div>
      <div
  className={`bg-white sm:hidden flex rounded-full z-40  mobile_s:h-9 tab:h-7  laptop_s:h-7 laptop_s:w-7 tab:p-1 laptop_s:p-0  laptop_s:mr-0.5  laptop_m:h-8 mobile_s:w-9 laptop_m:w-8 mobile_s:mr-2 tab:mr-0.5  laptop_m:mr-2 justify-center items-center cursor-pointer`} 
  onClick={()=>setIsStockInfo(!isStackInfo)}
      >
        <img
          src={`${StackLogoColor}`}
          alt=""
          className="w-[67%]  h-[67%]"
        />
      </div>
  
  <button
    onClick={handleBasemapMenuItemClick}
    className="w-12 h-12 sm:w-10 sm:h-10 text-white -translate-x-1 sm:translate-x-0 rounded-full flex  items-center justify-center transition-colors duration-200"
  >
    <img
      src={isDarkMode ? HomeDark : Home}
      alt="Home Icon"
      className="w-10 h-10 sm:w-8 sm:h-8"
    />
    <div className="absolute py-6 flex-1 justify-between">
      <img src={BookmarkWhite} alt="Home Sign" className="w-5 sm:w-4" />
    </div>
  </button>
  {/* Home Button */}
  <button
    onClick={handleHomeClick}
    className="w-12 h-12 sm:w-10 sm:h-10 text-white rounded-full sm:flex hidden items-center justify-center transition-colors duration-200"
  >
    <img
      src={isDarkMode ? HomeDark : Home}
      alt="Home Icon"
      className="w-10 h-10 sm:w-8 sm:h-8"
    />
    <div className="absolute py-6 flex-1 justify-between">
      <img src={HomeSign} alt="Home Sign" className="w-6 sm:w-5" />
    </div>
  </button>

  {/* Plus Minus Section */}
  <div className="w-12 sm:w-10 text-white rounded-full sm:flex hidden flex-col items-center transition-colors duration-200">
    {/* Plus button (Zoom in) */}
    <button className="w-full h-8 sm:h-6 my-10 sm:my-8 flex items-center justify-center">
      <img
        src={isDarkMode ? plusMinusBgDark : plusMinusBg}
        alt="Plus Minus Background"
        className="relative w-10 sm:w-8"
      />
      <div className="absolute py-6 flex-1 justify-between">
        <button
          className="-translate-y-5 sm:-translate-y-4 flex justify-center items-center"
          onClick={() => (contextMapView.zoom += 1)}
        >
          <img src={PlusSign} alt="Plus Sign" className="w-6 sm:w-5" />
        </button>
        <img src={DashSign} alt="Dash Sign" className="w-6 sm:w-5 -translate-y-2" />
        <button
          className="translate-y-2 p-1 sm:p-0 flex justify-center items-center"
          onClick={() => (contextMapView.zoom -= 1)}
        >
          <img src={MinusSign} alt="Minus Sign" className="w-4 translate-x-1 sm:w-3" />
        </button>
      </div>
    </button>
  </div>

  {/* Hand Button */}
  <button
    onClick={handlePanModeClick}
    className="w-12 h-12 sm:w-10 sm:h-10 text-white rounded-full sm:flex hidden items-center justify-center transition-colors duration-200"
  >
    <img
      src={isDarkMode ? HomeDark : Home}
      alt="Hand Icon"
      className="w-10 h-10 sm:w-8 sm:h-8"
    />
    <div className="absolute py-6 flex-1 justify-between">
      <img src={Hand} alt="Hand Sign" className="w-4 sm:w-3.5 mr-1" />
    </div>
  </button>

  {/* Left Arrow Button */}
  <button
    onClick={handlePreviousLevelClick}
    ref={zoomPrevBtn}
    className="w-12 h-12 sm:w-10 sm:h-10 text-white rounded-full sm:flex hidden items-center justify-center transition-colors duration-200"
  >
    <img
      src={isDarkMode ? HomeDark : Home}
      alt="Left Arrow Icon"
      className="w-10 h-10 sm:w-8 sm:h-8"
    />
    <div className="absolute py-6 flex-1 justify-between">
      <img src={LeftArrow} alt="Left Arrow" className="w-3 sm:w-2.5 mr-1" />
    </div>
  </button>

  {/* Right Arrow Button */}
  <button
    onClick={handleNextLevelClick}
    ref={zoomNextBtn}
    className="w-12 h-12 sm:w-10 sm:h-10 text-white rounded-full sm:flex hidden items-center justify-center transition-colors duration-200"
  >
    <img
      src={isDarkMode ? HomeDark : Home}
      alt="Right Arrow Icon"
      className="w-10 h-10 sm:w-8 sm:h-8"
    />
    <div className="absolute py-6 flex-1 justify-between">
      <img src={RightArrow} alt="Right Arrow" className="w-3 sm:w-2.5" />
    </div>
  </button>
</div>
  );
}


