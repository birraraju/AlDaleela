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

export default function Sidebar() {
  const { isDarkMode,isLangArab } = useTheme(); // Access the theme from context
  const {contextMapView, initialExtent, extentHistory, setExtentHistory, currentExtentIndex, setCurrentExtentIndex} = useAuth();
  const [panmode, setpanmode] = useState(true)

    // Mutable refs for extent history
    const _prevExtent = useRef(false);
    const _preExtent = useRef(null);
    const _currentExtent = useRef(null);
    const _extentHistory = useRef([]);
    const _extentHistoryIndx = useRef(0);
    const _nextExtent = useRef(false);
    const zoomPrevBtn = useRef(null);
    const zoomNextBtn = useRef(null);


  useEffect(()=>{
    if(contextMapView){
      // Handle extent change
      reactiveUtils.when(
        () => contextMapView.stationary,
        () => {
            extentChangeHandler(contextMapView.extent);
        }
      );
    }
    
  },[contextMapView])

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
  }

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
}

  var handleHomeClick = () =>{
    if(contextMapView) {
      contextMapView.goTo({
        center: initialExtent.center,
        zoom: initialExtent.zoom,
      });
    }
  }
  var handleNextLevelClick = () =>{
    _nextExtent.current = true;
    _extentHistoryIndx.current++;
    if (_extentHistoryIndx.current > _extentHistory.current.length - 1) {
        _extentHistoryIndx.current = _extentHistory.current.length - 1;
    }
    contextMapView.goTo(_extentHistory.current[_extentHistoryIndx.current].currentExtent);
  }
  var handlePrivousLevelClick = () =>{
    if (_extentHistory.current.length > 0 && _extentHistory.current[_extentHistoryIndx.current].preExtent) {
      _prevExtent.current = true;
      contextMapView.goTo(_extentHistory.current[_extentHistoryIndx.current].preExtent);
      _extentHistoryIndx.current--;
  }
  }
  const handlePanModeClick = () =>{
    if(panmode){
      contextMapView.surface.style.cursor = "pointer";
      setpanmode(false)
    }
    else{
      contextMapView.surface.style.cursor = "default";
      setpanmode(true)
    }    
  }
  return (
    <div className={`fixed ${isLangArab? "right-4" :"left-4"}  ml-3 laptop_s:top-1/2 sm:top-64 sm:mt-2 laptop_s:mt-0 laptop_s:-translate-y-1/2 z-10 sm:flex hidden flex-col items-center space-y-2 bg-transparent p-2 rounded-full`}>
      {/* Home Button */}
      <button onClick={handleHomeClick} className="w-12 h-12 text-white rounded-full flex items-center justify-center transition-colors duration-200">
        <img src={isDarkMode ? HomeDark : Home} alt="Home Icon" className="w-10 h-10" />
        <div className="absolute py-6 flex-1 justify-between">
          <img src={HomeSign} alt="Home Sign" className="w-6" />
        </div>
      </button>

      {/* Plus Minus Section */}
      <div className="w-12 text-white rounded-full flex flex-col items-center transition-colors duration-200">
        <button className="w-full h-8 my-10 flex items-center justify-center">
          <img src={isDarkMode ? plusMinusBgDark : plusMinusBg} alt="Plus Minus Background" className="relative w-10" />
          <div className="absolute py-6 flex-1 justify-between">
            <img src={PlusSign} alt="Plus Sign" className="w-6 -translate-y-5" />
            <img src={DashSign} alt="Dash Sign" className="w-6 -translate-y-2" />
            <img src={MinusSign} alt="Minus Sign" className="w-4 ml-1 translate-y-2" />
          </div>
        </button>
      </div>

      {/* Hand Button */}
      <button onClick={handlePanModeClick} className="w-12 h-12 text-white rounded-full flex items-center justify-center transition-colors duration-200">
        <img src={isDarkMode ? HomeDark : Home} alt="Hand Icon" className="w-10 h-10" />
        <div className="absolute py-6 flex-1 justify-between">
          <img src={Hand} alt="Hand Sign" className="w-4 mr-1" />
        </div>
      </button>

      {/* Right Arrow Button */}
      <button onClick={handleNextLevelClick} ref={zoomNextBtn} className="w-12 h-12 text-white rounded-full flex items-center justify-center transition-colors duration-200">
        <img src={isDarkMode ? HomeDark : Home} alt="Right Arrow Icon" className="w-10 h-10" />
        <div className="absolute py-6 flex-1 justify-between">
          <img src={RightArrow} alt="Right Arrow" className="w-3" />
        </div>
      </button>

      {/* Left Arrow Button */}
      <button onClick={handlePrivousLevelClick} ref={zoomPrevBtn} className="w-12 h-12 text-white rounded-full flex items-center justify-center transition-colors duration-200">
        <img src={isDarkMode ? HomeDark : Home} alt="Left Arrow Icon" className="w-10 h-10" />
        <div className="absolute py-6 flex-1 justify-between">
          <img src={LeftArrow} alt="Left Arrow" className="w-3 mr-1" />
        </div>
      </button>
    </div>
  );
}
