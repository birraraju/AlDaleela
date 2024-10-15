import { useEffect, useState } from "react";
import GeneralInformation from "./GeneralInformation/GeneralInformation";
import LocationLogo from '../../../../../assets/Header/GeneralInformation/Location.svg';
import LocationColorLogo from '../../../../../assets/Header/GeneralInformation/Location-color.svg';

const Location = ({ isHeaderOpen,isLocationOpen }) => {
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
  } sm:flex hidden rounded-full z-40  mobile_s:h-9 laptop_m:h-8 mobile_s:w-9 laptop_m:w-8 mobile_s:mr-2 laptop_m:mr-4 justify-center items-center cursor-pointer`} 
  onClick={handleClick}
      >
        <img
          src={`${!showInfo ? LocationLogo: LocationColorLogo}`}
          alt=""
          className="mobile_s:w-4 laptop_m:w-5"
        />
      </div>
      {showInfo && <GeneralInformation onClose={handleClose} />}
    </>
  );
};

export default Location;
