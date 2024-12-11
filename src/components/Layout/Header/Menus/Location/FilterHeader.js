import { useEffect, useState } from "react";
import GeneralFilterHeader from "./GeneralInformation/GeneralFilterHeader";
import FilterHeaderLogo from '../../../../../assets/Header/GeneralInformation/FilterUpdatedHeader.svg';
import LocationColorLogo from '../../../../../assets/Header/GeneralInformation/Location-color.svg';

const FilterHeader = ({ isHeaderOpen,isLocationOpen }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    setShowInfo(!showInfo);
    isHeaderOpen();
  };

  const handleClose = () => {
    setShowInfo(false);
  };

  useEffect(()=>{
    if(showInfo){
      isLocationOpen(true)
    }else{
      isLocationOpen(false)
    }
  },[showInfo])

  return (
    <>
      <div
  className={`bg-white ${
    !showInfo && "bg-opacity-5"
  } sm:flex hidden rounded-full z-40  mobile_s:h-9 tab:h-7  laptop_s:h-7 laptop_s:w-7 tab:p-1 laptop_s:p-0  laptop_s:mr-0.5  laptop_m:h-8 mobile_s:w-9 laptop_m:w-8 mobile_s:mr-2 tab:mr-0.5  laptop_m:mr-2 justify-center items-center cursor-pointer`} 
  onClick={handleClick}
      >
        <img
          src={`${!showInfo ? FilterHeaderLogo: LocationColorLogo}`}
          alt=""
          className="mobile_s:w-4 laptop_m:w-4"
        />
      </div>
      {showInfo && <GeneralFilterHeader onClose={handleClose} />}
    </>
  );
};

export default FilterHeader;
