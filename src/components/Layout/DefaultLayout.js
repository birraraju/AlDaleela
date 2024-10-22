import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import SideBar from "../../components/Layout/SideBar/sidebar";
// import Footerlogin from "../Popups/Login/Footerpopups/Footerlogin/footerlogin";
import SideLayout from "../Sidelayout/sidelayout";
import SideLayout2 from "../Sidelayout/sidelayout2";
import SideLayout3 from "../Sidelayout/sidelayout3";
import SideLayout4 from "../Sidelayout/sidelayout4";
import SideLayout1 from "../Sidelayout/sidelayout1";
import POIEditLayout1 from "../Sidelayout/POIEditSideLayout";

// import Contribution from "../Sidelayout/ContributionSidelayout/ContributionSidelayout";
// import ContactusSidelayout from "../Sidelayout/ContactusSidelayout/ContactusSidelayout";
import MapComponent from "../Layout/Map/MapComponent";
import SideLayout5 from "../Sidelayout/sidelayout5";
import SideLayout6 from "../Sidelayout/sidelayout6";

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import RoleServices from '../servicces/RoleServices';
import { useAuth } from "../../Providers/AuthProvider/AuthProvider";





const DefaultLayout = ({role}) => {
  const buttonLabels = ["Home", "Add", "Subtract", "Hand", "Next", "Export", "Print"];
  const [popup, setPopup] = useState(null);
  const [resetFooter, setResetFooter] = useState(false);
  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const [mapview, setMapview] = useState(false);
  const {isEditPOI,setIsEditPOI} = useAuth();
   
  console.log("POI status Default:", isEditPOI);


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const sides = queryParams.get('sides');
  const navigate = useNavigate();
    
  useEffect(()=>{
    handleDropbinAdmin(sides)
  },[sides])

  const handleDropbinAdmin=(sides)=>{
    if(sides && !role === "admin"){
      navigate({
        pathname: `/${process.env.REACT_APP_BASE_URL}`,
      });
    }else if(sides && RoleServices.isAdmin){
      setPopup(renderComponent(sides));
    }
  }
 
  const handleClose = () => {
    setPopup(null);
    setResetFooter(true);
    setTimeout(() => setResetFooter(false), 100);
  };

  const renderComponent = (name) => {
    switch (name) {
      case "Home":
        return <SideLayout1 onClose={handleClose} mapview={mapview} />;
      case "Add":
        return <SideLayout2 onClose={handleClose} mapview={mapview} />;
      case "Subtract":
        return <SideLayout3 onClose={handleClose} mapview={mapview} />;
      case "Hand":
        return <SideLayout4 onClose={handleClose} mapview={mapview} />;
      case "Next":
        return <SideLayout onClose={handleClose} mapview={mapview} />;
      case "Export":
        return <SideLayout5 onClose={handleClose} mapview={mapview} />;
      case "Print":
        return <SideLayout6 onClose={handleClose}  mapview={mapview}/>;
        case "POIEdit":
        return <POIEditLayout1   mapview={mapview}/>;
      default:
        return <></>;
    }
  };

  const handleMenuItemClick = (_event, index) => {
    console.log(`Menu item clicked: ${buttonLabels[index]}`);
    setPopup(renderComponent(buttonLabels[index]));
    handleClearDropInAdmin(buttonLabels[index])
  };

  const handleClearDropInAdmin=(index)=>{
    console.log("Sides Admin Footer Index Data:", index);
    if(sides && (sides !== index)){
      console.log("Sides Footer clicked Data:",sides)
      navigate({
        pathname: `/${process.env.REACT_APP_BASE_URL}`,
      });
    }
  }

  useEffect(()=>{
    if(isEditPOI){
      setPopup(renderComponent("POIEdit"));
    }else{
      setPopup(renderComponent(""));
    }
  },[isEditPOI])

  // const handleHeaderOpen = () => {
  //   setPopup(null);
  // };

  useEffect(() => {
    if(popup){
      setIsFooterOpen(true);
    }else{
      setIsFooterOpen(false);
    }
  }, [popup]);


  return (
    <div className="flex flex-col h-screen bg-blue-100">
      <Header isFooterOpen={isFooterOpen} isHeaderOpen={handleClose} isSearchOpen={handleClose} mapview={mapview} />
      <SideBar />

      {popup && <div className="absolute z-50">{popup}</div>}
      {/* {isEditPOI && <POIEditLayout1/>} */}
      <div className="flex-1 relative overflow-hidden">
        <MapComponent setMapview={setMapview} mapview={mapview}/>
        <Footer
          handleMenuItemClick={handleMenuItemClick}
          resetTrigger={resetFooter}
          setPopup={setPopup}
        />
      </div>
    </div>
  );
};

export default DefaultLayout;
