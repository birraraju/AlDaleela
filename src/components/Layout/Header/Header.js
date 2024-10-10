import React, { useState } from 'react';
import Logo from "./logo/Logo";
import Menus from "./Menus/Menus";
import { useTheme } from '../ThemeContext/ThemeContext'; // Import the theme context
import Searchbar from './Searchbar/Searchbar';

// const Header = ({ isFooteropen, isHeaderOpen }) => {
//   const { isDarkMode } = useTheme(); // Access the dark mode state
//   const [SearchResponsive, setSearchResponsive] = useState(false);
//   const ResponsiveSearchHeader = () => {
//     setSearchResponsive(true);
//   };

//   const handleResponsiveClose = () => {
//     setSearchResponsive(false);
//   };

const Header = ({  isFooterOpen, isHeaderOpen}) => {
  const { isDarkMode } = useTheme(); // Access the dark mode state
  const [SearchResponsive, setSearchResponsive] = useState(false);
  const ResponsiveSearchHeader = () => {
    setSearchResponsive(true);
  };

  const handleResponsiveClose = () => {
    setSearchResponsive(false);
  };
  return (
    <header
      className={`text-white sm:pr-10 px-2 py-2 flex items-center justify-between z-8 w-screen 
        ${isDarkMode ? 'bg-dark-gradient' : 'bg-custom-gradient'}`
      }
    >
      {/* Logo Section */}
      <div className={`flex items-center ${SearchResponsive ? "hidden" : "flex"}`}>
        <Logo />
      </div>

      {/* Menus Section */}
      <div className={`flex items-center ${SearchResponsive ? "hidden" : "flex"}`}>
        <Menus 
          isFooterOpen={isFooterOpen} 
          isHeaderOpen={isHeaderOpen} 
          SearchResponsive={SearchResponsive} 
          handleCloseResponsiveSearch={handleResponsiveClose} 
          handleResponsiveSearchHeader={ResponsiveSearchHeader}
        />
      </div>

      {/* Searchbar Section */}
      {SearchResponsive && (
        <Searchbar 
          SearchResponsive={SearchResponsive} 
          handleCloseResponsiveSearch={handleResponsiveClose} 
        />
      )}

      {/* Responsive Search Toggle Button */}
      <button
        className={`sm:hidden text-white p-2`}
        onClick={ResponsiveSearchHeader}
      >
        {/* Optional icon or text for opening search */}
        <img src="/path/to/search-icon.svg" alt="Search" />
      </button>
    </header>
  );
};

export default Header;
