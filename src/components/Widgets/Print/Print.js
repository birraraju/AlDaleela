import React, { useEffect, useRef } from "react";
import Print from "@arcgis/core/widgets/Print";
import './Print.css';
import { useAuth } from "../../../Providers/AuthProvider/AuthProvider";

const PrintComponent = ({ mapview }) => {
  const printRef = useRef(null);
  const {setprintWidget} = useAuth();

  useEffect(() => {
    if (mapview && printRef.current) {
      try {
        const printWidget = new Print({
          view: mapview,
          container: printRef.current,
          printServiceUrl: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Al_daleela_Print/GPServer/Export%20Web%20Map",
          allowedFormats: ["Portable Document Format (PDF)"],
          allowedLayouts: ["POI_PRINT"],
          templateOptions: {
            title: "My Print",
            //author: "Sam",
            //copyright: "My Company",
            //legendEnabled: false
          }
        });
        // Store the printWidget in the AuthProvider state
        setprintWidget(printWidget);

        // Observe for changes in the printRef container to remove the "Map Only" tab when it appears
        const observer = new MutationObserver(() => {
          const liElement = document.getElementById('printDiv__mapOnlyTab');
          if (liElement) {
            liElement.remove(); // Remove the <li> element directly
            observer.disconnect(); // Stop observing once the element is removed
          }
        });

        observer.observe(printRef.current, { childList: true, subtree: true });

        return () => {
          if(printRef.current){
              //printRef.destroy();
              printRef.current = null;
          }    
        };
      } catch (error) {
        console.error("Error initializing print widget:", error);
      }
    }
  }, [mapview]);

  return <div className=" sm:-mt-[500px]  laptop_s:-mt-[500px] -mt-[520px] " id="printDiv" ref={printRef} />;
};

export default PrintComponent;
