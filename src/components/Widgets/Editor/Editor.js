import React, { useEffect, useRef } from "react";
import EditorWidget from "@arcgis/core/widgets/Editor";
import './Editor.css';

const PrintComponent = ({ mapview }) => {
  const EditorRef = useRef(null);

  useEffect(() => {
    if (mapview && EditorRef.current) {
      try {

        const editor = new EditorWidget({
          view: mapview,
          container: EditorRef.current
        });

        return () => {
          if(EditorRef.current){
              //printWidget.destroy();
              EditorRef.current = null;
          }
          
        };
      } catch (error) {
        console.error("Error initializing print widget:", error);
      }
    }
  }, [mapview]);

  return <div className="edit sm:-mt-[500px]  laptop_s:-mt-[500px] -mt-[520px]" id="printDiv" ref={EditorRef} />;
};

export default PrintComponent;
