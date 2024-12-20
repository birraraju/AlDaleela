import { useEffect, useState } from "react";
import GeneralFilterHeader from "./GeneralInformation/GeneralInformation";
import LocationupdatedLogo from '../../../../../assets/Header/GeneralInformation/updatedLocation.svg';
import LocationupdatedColorLogo from '../../../../../assets/Header/GeneralInformation/updatedLocation-color.svg';
import { useTheme } from "../../../ThemeContext/ThemeContext";

const Location = ({ isHeaderOpen,isLocationOpen }) => {
  // const [showInfo, setShowInfo] = useState(false);
  const {isGeneralInfo,setIsGeneralInfo} = useTheme()

  const handleClick = () => {
    setIsGeneralInfo(!isGeneralInfo);
    isHeaderOpen();
  };

  const handleClose = () => {
    setIsGeneralInfo(false);
  };

  useEffect(()=>{
    if(isGeneralInfo){
      isLocationOpen(true)
    }else{
      isLocationOpen(false)
    }
  },[isGeneralInfo])

  return (
    <>
      <div
  className={`bg-white ${
    !isGeneralInfo && "bg-opacity-5"
  } sm:flex hidden rounded-full z-40  mobile_s:h-9 tab:h-7  laptop_s:h-7 laptop_s:w-7 tab:p-1 laptop_s:p-0  laptop_s:mr-0.5  laptop_m:h-8 mobile_s:w-9 laptop_m:w-8 mobile_s:mr-2 tab:mr-0.5  laptop_m:mr-2 justify-center items-center cursor-pointer`} 
  onClick={handleClick}
      >
        <img
          src={`${!isGeneralInfo ? LocationupdatedLogo: LocationupdatedColorLogo}`}
          alt=""
          className="mobile_s:w-4 laptop_m:w-5 translate-x-0.5"
        />
      </div>
      {isGeneralInfo && <GeneralFilterHeader  onClose={handleClose} />}
    </>
  );
};

export default Location;
