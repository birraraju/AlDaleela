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
import POIApproval from "../Sidelayout/POIApprovalStatus";
import EditAddPOI from "../Sidelayout/EditAddPOI";

import { useTheme } from '../Layout/ThemeContext/ThemeContext';

// import Contribution from "../Sidelayout/ContributionSidelayout/ContributionSidelayout";
// import ContactusSidelayout from "../Sidelayout/ContactusSidelayout/ContactusSidelayout";
import MapComponent from "../Layout/Map/MapComponent";
import SideLayout5 from "../Sidelayout/sidelayout5";
import SideLayout6 from "../Sidelayout/sidelayout6";

import { useLocation } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import RoleServices from '../servicces/RoleServices';
import { useAuth } from "../../Providers/AuthProvider/AuthProvider";
import AthenticatePopLogin from '../../components/Popups/Login/Footerpopups/Footerlogin/footerlogin'
import config from "../Common/config"
import Graphic from '@arcgis/core/Graphic';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"; 


const DefaultLayout = ({role}) => {
  const buttonLabels = ["Home", "Add", "Subtract", "Hand", "Next", "Export", "Print"];
  const [popup, setPopup] = useState(null);
  const [resetFooter, setResetFooter] = useState(false);
  const [isFooterOpen, setIsFooterOpen] = useState(false);
  const [mapview, setMapview] = useState(false);
  const {isEditPOI,setIsEditPOI,isAuthPopUp,setPopupSelectedGeo,printWidget, setprintWidget, exportWidget, setexportWidget, MeasurementOpenWidget, setMeasurementOpenWidget} = useAuth();
  const [lastRendered, setLastRendered] = useState("");  // Track last rendered component
  const { isPOIAddShow,isLogin,setIsLogin,setIsPOIAddShow } = useTheme();
  console.log("POI status Default:", isEditPOI);
  const { LayerId, objectid } = useParams();   


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const sides = queryParams.get('sides');
  const Activatoin = queryParams.get('UserActivation');
  const navigate = useNavigate();
    
   // Only trigger if `sides` has changed and is different from `lastRendered`
   useEffect(() => {
    if (sides && sides !== lastRendered) {
      handleDropbinAdmin(sides);
    }else if(Activatoin==="Login" ){
      setIsLogin(true);
    }
  }, [sides,Activatoin]);


  const handleDropbinAdmin = (sides) => {
    console.log("Data Sides data:", sides);

    if (!RoleServices.isAuth()) {
      navigate({
        pathname: `/${process.env.REACT_APP_BASE_URL}`,
      });
    } else {
      const newPopup = renderComponent(sides);
      if (newPopup !== popup) {  // Avoid re-rendering the same component
        setPopup(newPopup);
        setLastRendered(sides);
      }
    }
  };

  useEffect(() => {
    if (objectid && mapview) {
      fetchFeatureData(objectid);
      //alert(objectid)
    }
  }, [objectid,mapview]);

  // Fetch feature data and zoom to it on the map
  const fetchFeatureData = async (objectid) => {
    if (!mapview) return; // Ensure mapview is ready

    try {
      const featureLayer = new FeatureLayer({
        url: config.BaseUrl+"/"+LayerId // replace with correct feature layer URL
      });

      const query = featureLayer.createQuery();
      query.where = `OBJECTID = ${objectid}`;
      const response = await featureLayer.queryFeatures(query);

      if (response.features.length > 0) {
        const feature = response.features[0];

        // Add feature to map
        // const pointGraphic = new Graphic({
        //   geometry: feature.geometry,
        //   symbol: {
        //     type: "simple-marker",
        //     color: "blue",
        //     outline: {
        //       color: "lightblue",
        //       width: 2,
        //     },
        //   },
        // });
        const pointGraphic = new Graphic({
          geometry: feature.geometry,
          symbol: {
            type: "simple-marker",
            outline: {
              color: [0, 255, 255, 4],
              width: 1
            }
          }
        });

        mapview.graphics.add(pointGraphic);

        // Go to feature
        // mapview.goTo({
        //   target: feature.geometry,
        //   zoom: 15,
        // });
        // Ensure animation property is available before calling goTo
        if (mapview.animation) {
          mapview.goTo({
            target: feature.geometry,
            zoom: 15,
          });
        } else {
          console.warn("Animation property not available on mapview");
          mapview.center = feature.geometry; // Fallback to centering without animation
          mapview.zoom = 15;
        }

        setPopupSelectedGeo(feature); // if this is part of state
        setIsEditPOI(true); // trigger edit mode
      } else {
        console.log("No feature found with this OBJECTID");
      }
    } catch (error) {
      console.error("Error querying the feature layer:", error);
    }
  };
 
  const handleClose = () => {  
    if(printWidget){
      printWidget.destroy(); // Destroy the widget
      setprintWidget(null); // Set to null to reset the state
    }  
    if(exportWidget){
      exportWidget.destroy(); // Destroy the widget
      setexportWidget(null); // Set to null to reset the state
    }  
    if(mapview){
      mapview.graphics.removeAll();
    }
    if(MeasurementOpenWidget){
      MeasurementOpenWidget.destroy();
      setMeasurementOpenWidget(null);
    }
    setPopup(null);
    setResetFooter(true);
    setIsPOIAddShow(false)
    setIsEditPOI(false)
    setTimeout(() => setResetFooter(false), 100);
  };

  const handlePOIUpdateClose=()=>{
    handleClose()
    navigate({
      pathname: `/admin`,
      search: `?Compenent=ContentManagement`,
    });
  }
  //  AthenticatePopLogin
  const renderComponent = (name) => {
    if(printWidget){
      printWidget.destroy(); // Destroy the widget
      setprintWidget(null); // Set to null to reset the state
    }  
    if(exportWidget){
      exportWidget.destroy(); // Destroy the widget
      setexportWidget(null); // Set to null to reset the state
    } 
    if(mapview && name !== "POIEdit"){
      mapview.graphics.removeAll();
    }
    if(MeasurementOpenWidget){
      MeasurementOpenWidget.destroy();
      setMeasurementOpenWidget(null);
    }
    if (!name) return null;   // Prevent empty name render override
    console.log("Rendering component for name:", name, "and role:", role);
    if (role === null) {
      // If role is null, show the login popup for the specific components
      switch (name) {
        case "Add":
        case "Hand":
          console.log("Rendering Auth Popup for:", name);
          return <AthenticatePopLogin name={name} setPopup={setPopup} setResetFooter={setResetFooter} />;
        default:
          // For other cases, show the component even if the role is null
          return renderSideLayout(name);
      }
    } else {
      // If role is not null, show the corresponding side layouts
      return renderSideLayout(name);
    }
  };
  
  // Extracted function to handle side layout rendering based on component name
  const renderSideLayout = (name) => {
    console.log("Render Side Layout for name:", name);
    switch (name) {
      case "Home":
        return <SideLayout1 onClose={handleClose} mapview={mapview} />;
      case "Add":
        return <SideLayout2 onClose={handleClose} mapview={mapview} />;
      case "Subtract":
        return <SideLayout3 onClose={handleClose} mapview={mapview} />;
      case "Hand":
        console.log("Rendering SideLayout4");
        return <SideLayout4 onClose={handleClose} mapview={mapview} />;
      case "HandPOIAdd":
          return <SideLayout4 onClose={handleClose} mapview={mapview} />;
      case "Next":
        return <SideLayout onClose={handleClose} mapview={mapview} />;
      case "Export":
        return <SideLayout5 onClose={handleClose} mapview={mapview} />;
      case "Print":
        return <SideLayout6 onClose={handleClose} mapview={mapview} />;
      case "POIEdit":
        return <POIEditLayout1 onClose={handleClose}  mapview={mapview} />;
      case "POIApproval":
          return <POIApproval onClose={handlePOIUpdateClose} mapview={mapview} />;
      case "AuthPopUp":
          return <AthenticatePopLogin name={name} setPopup={setPopup} setResetFooter={setResetFooter} />;
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
    }else if(!isEditPOI && !sides){
      setPopup(renderComponent(""));
    }
  },[isEditPOI])

  useEffect(()=>{
    if(isAuthPopUp){
      setPopup(renderComponent("AuthPopUp"));
    }
  },[isAuthPopUp])

  // useEffect(()=>{
  //   if(isPOIAddShow){
  //     setPopup(renderComponent("HandPOIAdd"));
  //   }
  // },[isPOIAddShow])

  // const handleHeaderOpen = () => {
  //   setPopup(null);
  // };

  useEffect(() => {
    if(popup){
      setIsFooterOpen(true);
    }else{
      // handleClose()
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
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

export default DefaultLayout;
