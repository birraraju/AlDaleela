import Searchbar from "../Searchbar/Searchbar";
import Language from "./Language/Language";
import Location from "./Location/Location";
import Profile from "./Profile/Profile";
import Stack from "./Stack/Stack";
import { useState } from "react";



const Menus = ({ isFooteropen, isHeaderOpen }) => {
  const [isStackOpen, setStackOpen] = useState(false);

  // Function to toggle the Stack component visibility
  const toggleStackOpen = () => {
    setStackOpen((prev) => !prev);
  };

  return (
    <div className="text-white flex justify-between z-10 items-center">
      <Searchbar />
      <Stack
        isFooteropen={isFooteropen}
        isHeaderOpen={isHeaderOpen}
        isStackOpen={toggleStackOpen} // Use the toggle function
      />
      <Language isHeaderOpen={isHeaderOpen} />
      <Location isHeaderOpen={isHeaderOpen} />
      <Profile
        isFooteropen={isFooteropen}
        StackOpen={isStackOpen} // Pass the current state of Stack
        isHeaderOpen={isHeaderOpen}
      />
    </div>
  );
};

export default Menus;
