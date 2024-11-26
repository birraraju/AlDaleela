import React, { useEffect, useRef } from "react";
import Print from "@arcgis/core/widgets/Print";
import './Print.css';
import { useAuth } from "../../../Providers/AuthProvider/AuthProvider";
import PrintIcon from "../../../assets/print/printLogo.svg"; // Correct import path
import { queries } from "@testing-library/react";
import config from "../../Common/config";

const PrintComponent = ({ mapview }) => {
  const printRef = useRef(null);
  const { setprintWidget } = useAuth();

  useEffect(() => {
    // MutationObserver for dynamic content updates
    const observer = new MutationObserver(() => {
      const layoutTab = document.querySelector('#printDiv__layoutTab');
      if (layoutTab) layoutTab.textContent = 'Print';

      // const exportsTab = document.querySelector('#printDiv__exportedFilesTab');
      // if (exportsTab) exportsTab.textContent = 'Result';
    });

   

    const targetNode = document.querySelector('#printDiv');
    if (targetNode) {
      observer.observe(targetNode, { childList: true, subtree: true });
    }

    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mapview && printRef.current) {
      try {
        const printWidget = new Print({
          view: mapview,
          container: printRef.current,
          printServiceUrl: config.Print.printServiceUrl,
          allowedFormats: config.Print.allowedFormats,
          allowedLayouts: config.Print.allowedLayouts,
          templateOptions: {
            title: "My Print",
          },
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
          if (printRef.current) {
            //printRef.destroy();
            printRef.current = null;
          }
        };
      } catch (error) {
        console.error("Error initializing print widget:", error);
      }
    }
  }, [mapview]);

  

  useEffect(() => {
    // Update ESRI button text content after widget initialization
    const buttonObserver = new MutationObserver(() => {
      // Safely check for the calcite-combobox and its shadowRoot
      const calciteCombobox = document.querySelector('calcite-combobox');
      const WrapperShadow = calciteCombobox?.shadowRoot?.querySelector('.wrapper');
  
      if (WrapperShadow) {
        WrapperShadow.style.borderColor = "white";
        WrapperShadow.style.height = "40px";
        WrapperShadow.style.borderRadius = "12px";
      }
  
      // Update the print button text
      const printButton = document.querySelector('.esri-button');
      if (printButton) {
        printButton.textContent = 'Print';
      }
  
      // Update the layout wrapper styling
      const toggleLayout = document.querySelector('.wrapper');
      if (toggleLayout) {
        toggleLayout.style.border = 'white';
      }
    });
  
    // Start observing the body or container where the button is rendered
    const bodyNode = document.querySelector('body');
    if (bodyNode) {
      buttonObserver.observe(bodyNode, { childList: true, subtree: true });
    }
  
    // Cleanup observer on unmount
    return () => buttonObserver.disconnect();
  }, []);
  

  return <div className=" sm:-mt-[500px] h-[400px] overflow-auto   laptop_s:-mt-[450px] -mt-[420px]" id="printDiv" ref={printRef} />;
};

export default PrintComponent;
