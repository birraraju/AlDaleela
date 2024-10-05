import React from "react";
import Logo from "./logo/Logo";
import Menus from "./Menus/Menus";

const Header = ({ isFooteropen, isHeaderOpen }) => {
  return (
    <header className="bg-custom-gradient text-white px-2 py-1 flex items-center justify-between z-8 w-screen">
      <div className="flex items-center space-x-4">
        <Logo />
      </div>

      <div className="flex items-center">
        <Menus isFooteropen={isFooteropen} isHeaderOpen={isHeaderOpen} />
      </div>
    </header>
  );
};

export default Header;
