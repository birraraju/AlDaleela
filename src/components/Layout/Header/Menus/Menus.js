import Searchbar from "../Searchbar/Searchbar";
import Language from "./Language/Language";
import Location from "./Location/Location";
import Profile from "./Profile/Profile";
import Stack from "./Stack/Stack";
import { useState } from "react";



const Menus = ({  isFooterOpen, isHeaderOpen, mapview }) => {
  const [StackOpen,setStackOpen]=useState(false)
  const [SearchOpen,setSearchOpen]=useState(false)
  const [isProfileOpen,setProfileOpen]=useState(false)




  // Function to toggle the Stack component visibility
  const handleStackOpen =()=>{
    setStackOpen(!StackOpen)
  }

  const handleSearchOpen =()=>{
    setSearchOpen(true)
   }

   const handleSearchClose =()=>{
    setSearchOpen(false)
   }

   const handleProfileOpen=(status)=>{
    setProfileOpen(status)
   }

  console.log("Profile status:", isProfileOpen);
  return (
    <div className="text-white flex justify-between z-10 items-center">
      <Searchbar StackOpen={StackOpen} isSearchClose={handleSearchClose} isSearchOpen={handleSearchOpen}  isHeaderOpen={isHeaderOpen}  isFooterOpen={ isFooterOpen}/>
      <Stack
        isFooterOpen={ isFooterOpen}
        SearchOpen={SearchOpen}
        isHeaderOpen={isHeaderOpen}
        isStackOpen={handleStackOpen} // Use the toggle function
        mapview={mapview}
        isProfileOpen={isProfileOpen}
      />
      <Language isHeaderOpen={isHeaderOpen} />
      <Location isHeaderOpen={isHeaderOpen} />
      <Profile
        isFooterOpen={ isFooterOpen}
        StackOpen={StackOpen} // Pass the current state of Stack
        isHeaderOpen={isHeaderOpen}
        isProfileOpen={handleProfileOpen}
      />
    </div>
  );
};

export default Menus;
