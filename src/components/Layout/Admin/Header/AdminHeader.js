import React from "react";
import Logo from "../../Admin/Header/logo/Adminlogo";
import Menus from "../../Admin/Header/AdminMenu/AdminMenu";

const Header = ({ isFooteropen, isHeaderOpen }) => {
  return (
    <header className="bg-custom-gradient text-white py-3 px-6 flex items-center justify-between fixed top-0 left-0 w-full z-20">
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
