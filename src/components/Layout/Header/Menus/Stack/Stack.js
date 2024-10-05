import { useEffect, useState } from "react";
import LayersList from "./LayersList/LayersList";

const Stack = ({ isFooteropen, isHeaderOpen, isStackOpen }) => {
  const [showLayers, setShowLayers] = useState(false);

  const toggleLayers = () => {
    setShowLayers(!showLayers);
    isHeaderOpen();
    isStackOpen();
  };

  useEffect(() => {
    if (isFooteropen) {
      setShowLayers(false);
    }
  }, [isFooteropen]);

  return (
    <>
      <div
        className="bg-white bg-opacity-5 flex rounded-full mobile_s:h-9 mobile_s:w-9 laptop_m:h-10 laptop_m:w-10 mobile_s:mr-2 laptop_m:mr-4 justify-center items-center cursor-pointer"
        onClick={toggleLayers}
      >
        <img
          src="/Header/Layerlist/Stack.svg"
          alt=""
          className="mobile_s:w-5 laptop_m:w-6"
        />
      </div>
      {showLayers && <LayersList onClose={toggleLayers} />}
    </>
  );
}

export default Stack;
