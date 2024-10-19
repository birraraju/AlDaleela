import React, { useState } from 'react';
import Logo from "./logo/Logo";
import Menus from "./Menus/Menus";
import { useTheme } from '../ThemeContext/ThemeContext'; // Import the theme context
import Searchbar from './Searchbar/Searchbar';
// import ResponsiveSearch from '../../../assets/Header/Searchbar/SearchBar/imageResponsiveSearch.png'


// const Header = ({ isFooteropen, isHeaderOpen }) => {
//   const { isDarkMode } = useTheme(); // Access the dark mode state
//   const [SearchResponsive, setSearchResponsive] = useState(false);
//   const ResponsiveSearchHeader = () => {
//     setSearchResponsive(true);
//   };

//   const handleResponsiveClose = () => {
//     setSearchResponsive(false);
//   };

const Header = ({  isFooterOpen, isHeaderOpen, mapview}) => {
  const { isDarkMode,isLangArab } = useTheme(); // Access the dark mode state
  const [SearchResponsive, setSearchResponsive] = useState(false);
  const ResponsiveSearchHeader = () => {
    setSearchResponsive(true);
  };

  const handleResponsiveClose = () => {
    setSearchResponsive(false);
  };
  return (
    <>
    {isLangArab ?(<header
      className={`text-white  px-2 ${isLangArab ?" pl-1 ":"sm:pr-10"} py-2 z-30 flex items-center justify-between z-8 w-screen 
        ${isDarkMode ? 'bg-dark-gradient' : 'bg-custom-gradient'}`
      }
    >

      {/* Menus Section */}
     {!SearchResponsive && <div className={`flex items-center`}>
        <Menus 
          isFooterOpen={isFooterOpen} 
          isHeaderOpen={isHeaderOpen} 
          SearchResponsive={SearchResponsive} 
          handleCloseResponsiveSearch={handleResponsiveClose} 
          handleResponsiveSearchHeader={ResponsiveSearchHeader}
          mapview={mapview}
        />
      </div>}

      {/* Searchbar Section */}
      {SearchResponsive && (
        <Searchbar 
          SearchResponsive={SearchResponsive} 
          handleCloseResponsiveSearch={handleResponsiveClose} 
        />
      )}

      {/* Logo Section */}
     {!SearchResponsive && <div className={` items-center space-x-4 ${SearchResponsive ? "hidden" : "flex"}`}>
        <Logo />
      </div>}
      {/* <button
        className={`sm:hidden flex text-white p-2`}
        onClick={ResponsiveSearchHeader}
      >
        <img src={ResponsiveSearch} alt="Search" />
      </button> */}
    </header>) :(<header
      className={`text-white sm:pr-10 px-2 py-2 z-30 flex items-center justify-between z-8 w-screen 
        ${isDarkMode ? 'bg-dark-gradient' : 'bg-custom-gradient'}`
      }
    >
      {/* Logo Section */}
     {!SearchResponsive && <div className={` items-center space-x-4 ${SearchResponsive ? "hidden" : "flex"}`}>
        <Logo />
      </div>}

      {/* Menus Section */}
     {!SearchResponsive && <div className={`flex items-center`}>
        <Menus 
          isFooterOpen={isFooterOpen} 
          isHeaderOpen={isHeaderOpen} 
          SearchResponsive={SearchResponsive} 
          handleCloseResponsiveSearch={handleResponsiveClose} 
          handleResponsiveSearchHeader={ResponsiveSearchHeader}
          mapview={mapview}
        />
      </div>}

      {/* Searchbar Section */}
      {SearchResponsive && (
        <Searchbar 
          SearchResponsive={SearchResponsive} 
          handleCloseResponsiveSearch={handleResponsiveClose} 
        />
      )}

      {/* <button
        className={`sm:hidden flex text-white p-2`}
        onClick={ResponsiveSearchHeader}
      >
        <img src={ResponsiveSearch} alt="Search" />
      </button> */}
    </header>)}
    </>
  );
};

export default Header;
