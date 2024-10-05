import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import SideBar from "./SideBar/sidebar";
import SideLayout from "../Sidelayout/sidelayout";
import SideLayout1 from "../Sidelayout/sidelayout1";
import SideLayout2 from "../Sidelayout/sidelayout2";
import SideLayout3 from "../Sidelayout/sidelayout3";
import SideLayout4 from "../Sidelayout/sidelayout4";
import SideLayout5 from "../Sidelayout/sidelayout5";
import SideLayout6 from "../Sidelayout/sidelayout6";
import MapComponent from "./Map/MapComponent";

const DefaultLayout = () => {
  const buttonLabels = ["Home", "Add", "Subtract", "Hand", "Next", "Export", "Print"];
  const [popup, setPopup] = useState(null);
  const [resetFooter, setResetFooter] = useState(false);
  const [isFooterOpen, setIsFooterOpen] = useState(false);

  const handleClose = () => {
    setPopup(null);
    setResetFooter(true);
    setTimeout(() => setResetFooter(false), 100);
  };

  const renderComponent = (name) => {
    switch (name) {
      case "Home":
        return <SideLayout1 onClose={handleClose} />;
      case "Add":
        return <SideLayout2 onClose={handleClose} />;
      case "Subtract":
        return <SideLayout3 onClose={handleClose} />;
      case "Hand":
        return <SideLayout4 onClose={handleClose} />;
      case "Next":
        return <SideLayout onClose={handleClose} />;
      case "Export":
        return <SideLayout5 onClose={handleClose} />;
      case "Print":
        return <SideLayout6 onClose={handleClose} />;
      default:
        return <></>;
    }
  };

  const handleMenuItemClick = (_event, index) => {
    console.log(`Menu item clicked: ${buttonLabels[index]}`);
    setPopup(renderComponent(buttonLabels[index]));
  };

  const handleStackOpen = () => {
    setPopup(null);
  };

  useEffect(() => {
    setIsFooterOpen(!!popup);
  }, [popup]);

  return (
    <div className="flex flex-col h-screen bg-blue-100">
      <Header isFooterOpen={isFooterOpen} isHeaderOpen={handleStackOpen} />
      <SideBar />
      {popup && <div className="absolute z-50">{popup}</div>}
      <div className="flex-1 relative overflow-hidden">
        <MapComponent />
        <Footer
          handleMenuItemClick={handleMenuItemClick}
          resetTrigger={resetFooter}
        />
      </div>
    </div>
  );
};

export default DefaultLayout;
