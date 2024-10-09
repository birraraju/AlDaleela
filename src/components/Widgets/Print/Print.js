import React, { useEffect, useRef } from "react";
import Print from "@arcgis/core/widgets/Print";
import './Print.css';

const PrintComponent = ({ mapview }) => {
  const printRef = useRef(null);

  useEffect(() => {
    if (mapview && printRef.current.innerHTML == "") {
      try {
        const printWidget = new Print({
          view: mapview,
          container: printRef.current,
          printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
        });

        return () => {
          if(printRef.current.innerHTML){
              printWidget.destroy();
          }
          
        };
      } catch (error) {
        console.error("Error initializing print widget:", error);
      }
    }
  }, []);

  return <div className="Print" id="printDiv" ref={printRef} />;
};

export default PrintComponent;
