import React, { useState } from 'react';
import Logo from "./logo/Logo";
import Logo2 from "./logo2/Logo2"
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
    // <>
    // {isLangArab ?(<header
    //   className={`text-white  px-2 laptop_s:px-0.5 laptop_m:px-2 ${isLangArab ?" pl-1 ":" sm:pr-10 laptop_s:pr-2 laptop_m:pr-10"} py-1 z-30 flex items-center justify-between z-8 w-screen 
    //     ${isDarkMode ? 'bg-dark-gradient' : 'bg-custom-gradient'}`
    //   }
    // >

    //   {/* Menus Section */}
    //  {!SearchResponsive && <div className={`flex items-center`}>
    //     <Menus 
    //       isFooterOpen={isFooterOpen} 
    //       isHeaderOpen={isHeaderOpen} 
    //       SearchResponsive={SearchResponsive} 
    //       handleCloseResponsiveSearch={handleResponsiveClose} 
    //       handleResponsiveSearchHeader={ResponsiveSearchHeader}
    //       mapview={mapview}
    //     />
    //   </div>}

    //   {/* Searchbar Section */}
    //   {SearchResponsive && (
    //     <Searchbar 
    //       SearchResponsive={SearchResponsive} 
    //       handleCloseResponsiveSearch={handleResponsiveClose} 
    //     />
    //   )}

    //   {/* Logo Section */}
    //  {!SearchResponsive && <div className={` items-center space-x-4 ${SearchResponsive ? "hidden" : "flex"}`}>
    //     <Logo />
    //   </div>}
      
    //   {!SearchResponsive && <div className={` items-center space-x-4 ${SearchResponsive ? "hidden" : "flex"}`}>
    //     <Logo2 />
    //   </div>}


     
    // </header>) :
    
    // (<header
    //   className={`text-white sm:pr-10 laptop_s:pr-1 laptop_m: px-2 laptop_s:px-0.5 laptop_m:px-2 py-1.5 laptop_s:py-1 laptop_m:py-1.5 z-30 flex items-center justify-between z-8 w-screen 
    //     ${isDarkMode ? 'bg-dark-gradient' : 'bg-custom-gradient'}`
    //   }
    // >
    //   {/* Logo Section */}
    //  {!SearchResponsive && <div className={` items-center space-x-4 laptop_s:space-x-2 laptop_m:space-x-4 ${SearchResponsive ? "hidden" : "flex"}`}>
    //     <Logo />
    //   </div>}

    //   {!SearchResponsive && <div className={` items-center space-x-4 laptop_s:space-x-2 laptop_m:space-x-4 ${SearchResponsive ? "hidden" : "flex"}`}>
    //     <Logo2 />
    //   </div>}

    //   {/* Menus Section */}
    //  {!SearchResponsive && <div className={`flex items-center`}>
    //     <Menus 
    //       isFooterOpen={isFooterOpen} 
    //       isHeaderOpen={isHeaderOpen} 
    //       SearchResponsive={SearchResponsive} 
    //       handleCloseResponsiveSearch={handleResponsiveClose} 
    //       handleResponsiveSearchHeader={ResponsiveSearchHeader}
    //       mapview={mapview}
    //     />
    //   </div>}

    //   {/* Searchbar Section */}
    //   {SearchResponsive && (
    //     <Searchbar 
    //       SearchResponsive={SearchResponsive} 
    //       handleCloseResponsiveSearch={handleResponsiveClose} 
    //     />
    //   )}

      
    // </header>)}
    // </>
    <header
      className={`text-white sm:pr-10 laptop_s:pr-1  px-1 laptop_s:px-0.5 laptop_m:px-2 py-1.5 laptop_s:py-1 laptop_m:py-1.5 z-30 flex items-center justify-between z-8 w-screen 
        ${isDarkMode ? 'bg-dark-gradient' : 'bg-custom-gradient'}`
      }
    >
      {/* Logo Section */}
      {!SearchResponsive && <div className="flex items-center justify-between">
        <div className="flex laptop_s:justify-between laptop_s:items-center   sm:space-x-0 laptop_s:space-x-2 laptop_m:space-x-4">
          <div className="">
            <Logo />
          </div>
          <div className="border-r hidden sm:block border-gray-400 h-7"></div>
            <Logo2 />
        </div>
         {/* Add any other content or components you need here */}
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
    </header>
  );
};

export default Header;
