import React, { useEffect, useRef } from "react";
import Print from "@arcgis/core/widgets/Print";
import "./Export.css";
import { useAuth } from "../../../Providers/AuthProvider/AuthProvider";
import config from "../../Common/config";

const PrintComponent = ({ mapview }) => {
  const exportRef = useRef(null);
  const { setexportWidget } = useAuth();

  useEffect(() => {
    const buttonObserver = new MutationObserver(() => {
      const layoutTab = document.querySelector("#exportDiv__layoutTab");
      if (layoutTab) layoutTab.textContent = "Export";

      const calciteCombobox = document.querySelector("calcite-combobox");
      const WrapperShadow =calciteCombobox?.shadowRoot?.querySelector(".wrapper");
      const WrapperShadowActive =calciteCombobox?.shadowRoot?.querySelector(".wrapper--active");
      const List = document.querySelector("calcite-combobox-item");
      const List_Active = List?.shadowRoot?.querySelector(".label--active");

      if (WrapperShadow && WrapperShadowActive && List_Active) {
        WrapperShadow.style.borderColor = "white";
        WrapperShadow.style.height = "40px";
        WrapperShadow.style.borderRadius = "12px";
        WrapperShadowActive.style.outline = "none";

        List_Active.style.outline = "none";
      }

      // const exportsTab = document.querySelector("#exportDiv__exportedFilesTab");
      // if (exportsTab) exportsTab.textContent = "Result";
    });

    const bodyNode = document.querySelector("body");
    if (bodyNode) {
      buttonObserver.observe(bodyNode, { childList: true, subtree: true });
    }

    // Cleanup observer on unmount
    return () => buttonObserver.disconnect();
  }, []);

  useEffect(() => {
    if (mapview && exportRef.current) {
      try {
        const exportWidget = new Print({
          view: mapview,
          container: exportRef.current,
          printServiceUrl: config.Export.printServiceUrl,
          allowedFormats: config.Export.allowedFormats,
          allowedLayouts: config.Export.allowedLayouts,
          templateOptions: {
            title: "My Print",
            //author: "Sam",
            //copyright: "My Company",
            //legendEnabled: false
          },
        });
        setexportWidget(exportWidget);

        // Observe for changes in the exportRef container to remove the "Map Only" tab when it appears
        const observer = new MutationObserver(() => {
          const liElement = document.getElementById("exportDiv__mapOnlyTab");
          if (liElement) {
            liElement.remove(); // Remove the <li> element directly
            observer.disconnect(); // Stop observing once the element is removed
          }
        });

        observer.observe(exportRef.current, { childList: true, subtree: true });

        return () => {
          if (exportRef.current) {
            //printWidget.destroy();
            exportRef.current = null;
          }
        };
      } catch (error) {
        console.error("Error initializing print widget:", error);
      }
    }
  }, [mapview]);


  return <div className=" sm:-mt-[500px] tab:-mt-[100%]  laptop_s:-mt-[365px] laptop_m:-mt-[400px] h-[420px] laptop_s:h-[350px] laptop_lg:-mt-[120%] laptop_lg_2:-mt-[120%] overflow-auto  -mt-[470px] Export" id="exportDiv" ref={exportRef} />;

};

export default PrintComponent;
