import React, { useState } from "react";
import Searchbar from "../Searchbar/Searchbar";
import Language from "./Language/Language";
import Location from "./Location/Location";
import Profile from "./Profile/Profile";
import Stack from "./Stack/Stack";
import ResponsiveSearch from '../../../../assets/Header/Searchbar/SearchBar/imageResponsiveSearch.png'
import { useTheme } from '../../../Layout/ThemeContext/ThemeContext'; // Import the theme context



const Menus = ({
  isFooterOpen,
  isHeaderOpen,
  mapview,
  handleResponsiveSearchHeader,
  handleCloseResponsiveSearch, // Accept handleCloseResponsiveSearch if needed
}) => {
  const [isStackOpen, setStackOpen] = useState(false); // State for Stack visibility
  const [isSearchOpen, setSearchOpen] = useState(false); // State for Searchbar visibility
  const [isProfileOpen, setProfileOpen] = useState(false); // State for Profile visibility
  const [isLocationOpen, setLocationOpen] = useState(false); // State for Location visibility
  const { isLangArab } = useTheme(); // Access the dark mode state


  // Function to toggle the Stack component visibility
  const toggleStackOpen = (status) => {
    setStackOpen(status);
  };

  // Functions to handle Searchbar visibility
  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  // Function to handle Profile visibility status
  const handleProfileOpen = (status) => {
    setProfileOpen(status);
  };

  // Function to handle Location visibility status
  const handleLocationStatus = (status) => {
    setLocationOpen(status);
  };

  console.log("StackStatus:",isStackOpen)
  return (
    <div className="text-white flex justify-between z-10 items-center">
      
      {isLangArab?(<>

      {/* Profile with necessary props */}
      <Profile
        isFooterOpen={isFooterOpen}
        StackOpen={isStackOpen} // Pass the current state of Stack
        isHeaderOpen={isHeaderOpen}
        isProfileInOpen={handleProfileOpen} // Control profile state
      />
      {/* Location with status management */}
      <Location
        isHeaderOpen={isHeaderOpen}
        isLocationOpen={handleLocationStatus}
      />

      {/* Language Component */}
      <Language  />

      {/* Stack with necessary props */}
      <Stack
        isFooterOpen={isFooterOpen}
        isHeaderOpen={isHeaderOpen}
        isStackOpen={toggleStackOpen} // Pass the current state of Stack
        mapview={mapview}
        isProfileOpen={isProfileOpen}
        isSearchOpen={isSearchOpen}
        isLocationOpen={isLocationOpen}
      />
      
      {/* Searchbar with necessary props */}
      <Searchbar
        isHeaderOpen={isHeaderOpen}
        isFooterOpen={isFooterOpen}
        isSearchOpen={handleSearchOpen}
        isSearchClose={handleSearchClose}
        StackOpen={isStackOpen}
        handleCloseResponsiveSearch={handleCloseResponsiveSearch} // Ensure this prop is passed if needed
      />

    <div className=" sm:hidden grid" onClick={()=>handleResponsiveSearchHeader()} >
    <img src={ResponsiveSearch}  alt="" className=" h-8" />
    </div>
      
      </>):
      (<>{/* Searchbar with necessary props */}

    <div className=" sm:hidden grid" onClick={()=>handleResponsiveSearchHeader()} >
    <img src={ResponsiveSearch}  alt="" className=" h-8" />
    </div>

      <Searchbar
        isHeaderOpen={isHeaderOpen}
        isFooterOpen={isFooterOpen}
        isSearchOpen={handleSearchOpen}
        isSearchClose={handleSearchClose}
        StackOpen={isStackOpen}
        handleCloseResponsiveSearch={handleCloseResponsiveSearch} // Ensure this prop is passed if needed
      />

      {/* Stack with necessary props */}
      <Stack
        isFooterOpen={isFooterOpen}
        isHeaderOpen={isHeaderOpen}
        isStackOpen={toggleStackOpen} // Pass the current state of Stack
        mapview={mapview}
        isProfileOpen={isProfileOpen}
        isSearchOpen={isSearchOpen}
        isLocationOpen={isLocationOpen}
      />

      {/* Language Component */}
      <Language  />

      {/* Location with status management */}
      <Location
        isHeaderOpen={isHeaderOpen}
        isLocationOpen={handleLocationStatus}
      />

      {/* Profile with necessary props */}
      <Profile
        isFooterOpen={isFooterOpen}
        StackOpen={isStackOpen} // Pass the current state of Stack
        isHeaderOpen={isHeaderOpen}
        isProfileInOpen={handleProfileOpen} // Control profile state
      />
      </>)}
    </div>
  );
};

export default Menus;
