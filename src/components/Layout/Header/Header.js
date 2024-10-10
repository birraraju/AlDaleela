import React from "react";
import Logo from "./logo/Logo";
import Menus from "./Menus/Menus";

const Header = ({  isFooterOpen, isHeaderOpen , mapview}) => {
  console.log("Header Footer Status: ",  isFooterOpen)
  return (
    <header className="bg-custom-gradient text-white px-2 py-1 flex items-center justify-between z-8 w-screen">
      <div className="flex items-center space-x-4">
        <Logo />
      </div>

      <div className="flex items-center">
        <Menus isFooterOpen={ isFooterOpen} isHeaderOpen={isHeaderOpen} mapview={mapview} />
      </div>
    </header>
  );
};

export default Header;
