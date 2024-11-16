import React from "react";
import Logo from "../../Admin/Header/logo/Adminlogo";
import Menus from "../../Admin/Header/AdminMenu/AdminMenu";
import { useTheme } from '../../ThemeContext/ThemeContext'; // Import the theme context

const Header = ({ isFooteropen, isHeaderOpen }) => {
  const { isDarkMode } = useTheme(); // Access the dark mode state

  return (
    <header
    className={`text-white py-2 px-6 flex items-center justify-between fixed top-0 left-0 w-full z-20 ${
      isDarkMode
        ? 'bg-dark-gradient' // Apply dark theme background
        : 'bg-custom-gradient' // Apply default background
    }`}
  >      <div className="flex items-center space-x-4">
        <Logo />
      </div>
      <div className="flex items-center h-10">
        <Menus isFooteropen={isFooteropen} isHeaderOpen={isHeaderOpen} />
      </div>
    </header>
  );
};

export default Header;
