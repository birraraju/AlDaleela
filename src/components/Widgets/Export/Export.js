import React, { useEffect, useRef } from "react";
import Print from "@arcgis/core/widgets/Print";
import './Export.css';
import { useAuth } from "../../../Providers/AuthProvider/AuthProvider";

const PrintComponent = ({ mapview }) => {
  const exportRef = useRef(null);
  const {setexportWidget} = useAuth();

  useEffect(() => {
    if (mapview && exportRef.current) {
      try {
        const exportWidget = new Print({
          view: mapview,
          container: exportRef.current,
          printServiceUrl: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/Print_Layout_Aldaleela/GPServer/Export%20Web%20Map",
          allowedFormats: ["32-bit Portable Network Graphics (PNG32)","Joint Photographic Experts Group (JPG)"],
          allowedLayouts: ["Map"],
          templateOptions: {
            title: "My Print",
            //author: "Sam",
            //copyright: "My Company",
            //legendEnabled: false
          }
        });
        setexportWidget(exportWidget);

     

        
        // Observe for changes in the exportRef container to remove the "Map Only" tab when it appears
        const observer = new MutationObserver(() => {
          const liElement = document.getElementById('exportDiv__mapOnlyTab');
          if (liElement) {
            liElement.remove(); // Remove the <li> element directly
            observer.disconnect(); // Stop observing once the element is removed
          }
        });

        observer.observe(exportRef.current, { childList: true, subtree: true });

        return () => {
          if(exportRef.current){
              //printWidget.destroy();
              exportRef.current = null;
          }
          
        };
      } catch (error) {
        console.error("Error initializing print widget:", error);
      }
    }
  }, [mapview]);

  return <div className=" sm:-mt-[500px]   laptop_s:-mt-[500px] -mt-[520px] Export" id="exportDiv" ref={exportRef} />;
};

export default PrintComponent;
