import Language from "../../../../Layout/Header/Menus/Language/Language";
import Profile from "../../../../Layout/Header/Menus/Profile/Profile";
import Stack from "../../../../Layout/Header/Menus/Stack/Stack";
import { useState } from "react";

const Menus = ({ isFooteropen, isHeaderOpen }) => {
  const [stackOpen, setStackOpen] = useState(false);
  const close = false;

  const handleStackOpen = () => {
    setStackOpen(!stackOpen);
  };

  return (
    <div className="text-white flex justify-between z-10 gap-2 items-center">
      {close && <Stack isFooteropen={isFooteropen} isHeaderOpen={isHeaderOpen} isStackOpen={handleStackOpen} />}
      <Language isHeaderOpen={isHeaderOpen} />
      <Profile isFooteropen={isFooteropen} stackOpen={stackOpen} isHeaderOpen={isHeaderOpen} />
    </div>
  );
};

export default Menus;
