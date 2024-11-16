import { useEffect, useState } from "react";
import LayersList from "./LayersList/LayersList";
import StackLogo from '../../../../../assets/Header/Layerlist/Stack.svg';
import StackLogoColor from '../../../../../assets/Header/Layerlist/StackColor.svg';

const Stack = ({isSearchOpen,isLocationOpen, isFooterOpen,isProfileOpen, isHeaderOpen, isStackOpen, mapview }) => {
  const [showLayers, setShowLayers] = useState(false);

  const toggleLayers = () => {
    setShowLayers(!showLayers);
    isHeaderOpen();
  };

  useEffect(()=>{
    if(showLayers){
      isStackOpen(showLayers)
    }else{
      isStackOpen(showLayers)
    }
  },[showLayers])

  useEffect(() => {
    if (isFooterOpen) {
      setShowLayers(false);
    }
  }, [isFooterOpen]);

  console.log("Footer status in :",isFooterOpen)

  useEffect(()=>{
    if(isSearchOpen||isProfileOpen||isLocationOpen){
      setShowLayers(false)
    }
  },[isSearchOpen,isProfileOpen,isLocationOpen])
  return (
    <>
       <div
        className={`bg-white ${!showLayers && "bg-opacity-5"}  sm:flex hidden rounded-full mobile_s:h-9 mobile_s:w-9 laptop_m:h-8 laptop_m:w-8 mobile_s:mr-2 laptop_m:mr-2 justify-center items-center cursor-pointer`}
        onClick={toggleLayers}
      >
        <img
          src={showLayers ?StackLogoColor:StackLogo}
          alt=""
          className="mobile_s:w-5 laptop_m:w-5"
        />
      </div>
      {showLayers && <LayersList onClose={toggleLayers} mapview={mapview}/>}
    </>
  );
}

export default Stack;
