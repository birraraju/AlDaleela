import React, { useEffect, useRef } from "react";
import Print from "@arcgis/core/widgets/Print";
import './Print.css';

const PrintComponent = ({ mapview }) => {
  const printRef = useRef(null);

  useEffect(() => {
    if (mapview && printRef.current) {
      try {
        const printWidget = new Print({
          view: mapview,
          container: printRef.current,
          printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
        });

        return () => {
          if(printRef.current){
              //printWidget.destroy();
              printRef.current = null;
          }
          
        };
      } catch (error) {
        console.error("Error initializing print widget:", error);
      }
    }
  }, [mapview]);

  return <div className=" sm:-mt-[500px]  laptop_s:-mt-[500px] -mt-[520px]" id="printDiv" ref={printRef} />;
};

export default PrintComponent;
