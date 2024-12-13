import { useTheme } from "../../../../../Layout/ThemeContext/ThemeContext";
import { useEffect, useState } from "react";
import RedClose from "../../../../../../assets/Header/GeneralInformation/CloseFilterRed.svg";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { late } from "zod";
import config from '../../../../../Common/config'; // Import your config file
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import { useAuth } from "../../../../../../Providers/AuthProvider/AuthProvider";
import Graphic from "@arcgis/core/Graphic";
import Extent from "@arcgis/core/geometry/Extent";

export default function FilterInnerBody() {
  const { isDarkMode, isLangArab } = useTheme();
  const [LayerOneData, setLayerOneData] = useState("--empty--");
  const [LayerTwoData, setLayerTwoData] = useState("--empty--");
  const [LayerThreeData, setLayerThreeData] = useState("--empty--");
  const [activeLayer1, setActiveLayer1] = useState(false); // Track which layer dropdown is active
  const [activeLayer2, setActiveLayer2] = useState(false);
  const [activeLayer3, setActiveLayer3] = useState(false);
  const { contextMapView } = useAuth();
  const [sampleData, setSampleData] = useState({
    Layers: [],
    Layer2: [],
    Layer3: [],
  });
  useEffect(()=>{
    // Dynamically update Layers with names from featureServices
    const updatedLayers = [...sampleData.Layers];
    config.featureServices.forEach(service => {
      updatedLayers.push(service.name);
    });

    // Use setSampleData to trigger a re-render
    setSampleData(prevState => ({
      ...prevState,
      Layers: updatedLayers,
    }));    
  },[])

  const onChangeLayers = (layername) =>{
    setLayerTwoData("--empty--");
    setSampleData(prevState => ({
      ...prevState,
      Layers2: [], // Clear the Layers array
    }));
    const terrestrialLayer = config.featureServices.find(service => service.name === layername);

    if (terrestrialLayer) {
      const layer = new FeatureLayer({
        url: terrestrialLayer.url,
      });

      layer.load().then(() => {
        const fieldNames = layer.fields.map(field => field.name);

        setSampleData(prevState => ({
          ...prevState,
          Layer2: fieldNames,
        }));
      }).catch(error => {
        console.error("Error loading FeatureLayer: ", error);
      });
    }
  }

  const onChaneFileds = (fieldname) => {
    // Clear previous Layer3 values first
    setLayerThreeData("--empty--");
  
    // Ensure that Layers3 is cleared before fetching new data
    setSampleData(prevState => ({
      ...prevState,
      Layer3: [], // Clear the Layers array
    }));
  
    // Find the Terrestrial layer
    const terrestrialLayer = config.featureServices.find(service => service.name === LayerOneData);
  
    if (terrestrialLayer) {
      const layer = new FeatureLayer({
        url: terrestrialLayer.url,
      });
  
      // Perform a query based on a specific field
      const query = layer.createQuery();
      query.where = "1=1"; // Modify as needed to filter results
      query.outFields = [fieldname]; // Specify the field to query
      query.returnGeometry = false;
  
      // Execute the query
      layer.queryFeatures(query).then(result => {
        // Dynamically access the field's values
        const queryValues = result.features.map(feature => feature.attributes[fieldname]);
  
        // Update Layer3 with the new values
        setSampleData(prevState => ({
          ...prevState,
          Layer3: queryValues,
        }));
      }).catch(error => {
        console.error("Error querying features: ", error);
      });
    }
  };
  

  const handleCancel = () => {
    setLayerOneData("--empty--");
    setLayerTwoData("--empty--");
    setLayerThreeData("--empty--");
    contextMapView.graphics.removeAll();
    const layerNames = config.featureServices.map(service => service.name);

    contextMapView.map.layers.items.forEach(layer => {
      // Apply the filter to layers, clearing or setting expressions
      setDefinitionExpressionForLayersToClear(layer, null, null, layerNames, false);
    });
  };
  const setDefinitionExpressionForLayersToClear = (layer, fieldName, fieldValue, layerNames, clearExpression = false) => {
    // If the 'clearExpression' flag is true, clear the definitionExpression for all layers
    if (clearExpression) {
      layer.definitionExpression = null; // Clear definition expression
    }
  
    // Check if the layer's title is in the list of layer names
    if (layerNames.includes(layer.title)) {
      // If the layer is one of the three layers, set its definition expression to "1=1"
      if (layerNames.includes(layer.title)) {
        layer.definitionExpression = "1=1";
      } else if (fieldValue) {
        // If a fieldValue is provided, construct the definition expression
        layer.definitionExpression = `${fieldName} = '${fieldValue}'`;  // For string fields
      } else {
        // If no fieldValue is provided, include all records (no filtering)
        layer.definitionExpression = "1=1";
      }
    }
  
    // Recursively check and apply the definitionExpression to sub-layers if they exist
    if (layer.sublayers && layer.sublayers.length > 0) {
      layer.sublayers.forEach(subLayer => {
        setDefinitionExpressionForLayers(subLayer, fieldName, fieldValue, layerNames, clearExpression);
      });
    }
  };

  const handleCloseRedClick = () => {
    //alert("RedCancelClicked !");    
  };
  const setDefinitionExpressionForLayers = (layer, fieldName, fieldValue, layerNames) => {
    // Check if the layer's title is in the list of layer names
    if (layerNames.includes(layer.title)) {
      if (fieldValue) {
        // If a fieldValue is provided, construct the definition expression
        layer.definitionExpression = `${fieldName} = '${fieldValue}'`;  // For string fields
      } else {
        // If no fieldValue is provided, include all records (no filtering)
        layer.definitionExpression = "1=1";
      }
    }
  
    // Recursively check and apply the definitionExpression to sub-layers if they exist
    if (layer.sublayers && layer.sublayers.length > 0) {
      layer.sublayers.forEach(subLayer => {
        setDefinitionExpressionForLayers(subLayer, fieldName, fieldValue, layerNames);
      });
    }
  };
  
  // This function handles form submission and applies the filter across layers
  const handleSubmitForm = () => {
    contextMapView.graphics.removeAll();
    // Get the list of layer names to filter from your configuration (config)
    const layerNames = config.featureServices.map(service => service.name);
  
    // Assuming LayerTwoData is the field name and LayerThreeData is the field value to filter by
    const fieldName = LayerTwoData;  // Field name (e.g., "Class")
    const fieldValue = LayerThreeData; // Field value (e.g., "CategoryA")
  
    // Apply the filter to all layers in the map
    contextMapView.map.layers.items.forEach(layer => {
      // Apply the definition expression for each layer
      setDefinitionExpressionForLayers(layer, fieldName, fieldValue, layerNames);
    });
    // Call the function with an array of layer names and the object ID
    queryAndZoomToLayers(layerNames, `${fieldName} = '${fieldValue}'`);
  };
  const queryAndZoomToLayers = async (selectedLayerNames, whereCondition) => {
    try {
      // Loop through the selected layer names (up to three layers in your case)
      for (const selectedLayerName of selectedLayerNames) {
        // Find the layer configuration based on the selected name
        const selectedLayerConfig = config.featureServices.find(
          service => service.name === selectedLayerName
        );
    
        if (!selectedLayerConfig) {
          console.error(`Layer with name ${selectedLayerName} not found in configuration.`);
          continue;  // Skip this layer if not found
        }
    
        // Create a FeatureLayer instance for the selected layer
        const featureLayer = new FeatureLayer({
          url: selectedLayerConfig.url,
          outFields: ["*"]
        });
    
        // Query the selected layer using the OBJECTID
        const feature = await featureLayer.queryFeatures({
          where: whereCondition,
          outFields: ["*"],
          returnGeometry: true
        });
    
         // Check if any features are found
      if (feature.features.length > 0) {
        /// Initialize combinedExtent with null or a new extent if necessary
        let combinedExtent = null;
        // Loop through all the features and add each one as a graphic
        feature.features.forEach((f) => {
          const featureGeometry = f.geometry;
  
          // Add graphic for the feature
          const pointGraphic = new Graphic({
            geometry: featureGeometry,
            symbol: {
              type: "simple-marker",
              outline: {
                color: [0, 255, 255, 4],
                width: 1
              }
            }
          });
  
          // Add graphic to the map
          contextMapView.graphics.add(pointGraphic);
           // Handle extent for Point geometry or other geometries
           let featureExtent;
           if (featureGeometry.type === "point") {
             // For point geometry, manually create an extent around the point
             if (featureGeometry) {
               featureExtent = featureGeometry.extent ? featureGeometry.extent : featureGeometry.clone().extent;
               // If no extent exists for the point, create a small extent around the point
               if (!featureExtent) {
                 featureExtent = new Extent({
                   xmin: featureGeometry.x - 0.0001,
                   ymin: featureGeometry.y - 0.0001,
                   xmax: featureGeometry.x + 0.0001,
                   ymax: featureGeometry.y + 0.0001,
                   spatialReference: featureGeometry.spatialReference
                 });
               }
             }
           } else {
             // For other geometries (Polyline, Polygon), use the existing extent
             featureExtent = featureGeometry.extent;
           }
   
           // If combinedExtent is null, initialize it with the first feature's extent
           if (!combinedExtent) {
             combinedExtent = featureExtent;
           } else {
             // Expand the combined extent to include this feature's geometry
             combinedExtent = combinedExtent.union(featureExtent);
           }
        });
        // Zoom behavior: if only one feature, zoom to that feature's geometry; otherwise, zoom to combined extent
        if (feature.features.length === 1) {
          // Zoom to the single feature's geometry
          const firstFeatureGeometry = feature.features[0].geometry;
          await contextMapView.goTo({
            target: firstFeatureGeometry,
            zoom: 15  // Adjust zoom level as needed for a single feature
          });
        } else if (combinedExtent) {
          // Zoom to the combined extent of all features
          await contextMapView.goTo({
            target: combinedExtent,
            zoom: 10  // Adjust zoom level to fit all features
          });
        }
         
        } else {
          console.log(`No feature found with OBJECTID: ${whereCondition} in layer ${selectedLayerName}`);
        }
      }
    } catch (error) {
      console.error("Error querying layers:", error);
    }
  };
  return (
    <div className=" relative h-full" dir={isLangArab ? "rtl" : "ltr"}>
      <div className={`z-50 ${isDarkMode ? "text-white" : "text-black"}`}>
        <div className=" max-h-[calc(100vh-100px)] overflow-y-auto">
          {/* Layer 1 */}
          <div className="flex justify-between gap-3 w-full ">
            <span className="space-y-2 w-full">
              <div
                className="flex items-center justify-between cursor-pointer text-[13px] h-9 w-full rounded-md p-2 text-black bg-[#FFFFFF] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                onClick={() => setActiveLayer1(!activeLayer1)}
              >
                <p>{LayerOneData}</p>
                <span>
                  {activeLayer1 ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </span>
              </div>
              {activeLayer1 && (
                <div
                  className={`block text-[13px] max-h-[100px] min-h-[100px] overflow-y-scroll w-full rounded-md p-2 text-black bg-[#FFFFFF] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                >
                  {sampleData.Layers.map((item) => (
                    <div
                      key={item}
                      className="cursor-pointer hover:bg-gray-200 border border-transparent rounded-md p-1"
                      onClick={() => {
                        setLayerOneData(item);
                        setActiveLayer1(false);
                        onChangeLayers(item);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </span>

            {/* Layer 2 */}
            <span className="space-y-2 w-full">
              <div
                className="flex items-center justify-between cursor-pointer block text-[13px] h-9 w-full rounded-md p-2 text-black bg-[#FFFFFF] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                onClick={() => setActiveLayer2(!activeLayer2)}
              >
                <p>{LayerTwoData}</p>
                <span>
                  {activeLayer2 ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </span>
              </div>
              {activeLayer2 && (
                <div
                className={`block text-[13px] max-h-[100px] min-h-[100px] overflow-y-scroll w-full rounded-md p-2 text-black bg-[#FFFFFF] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
              >
                  {sampleData.Layer2.map((item) => (
                    <div
                      key={item}
                      className="cursor-pointer border border-transparent rounded-md hover:bg-gray-200 p-1"
                      onClick={() => {
                        setLayerTwoData(item);
                        setActiveLayer2(false);
                        onChaneFileds(item);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </span>

            {/* Layer 3 */}
            <span className="space-y-2 w-full">
              <div
                className="flex items-center justify-between cursor-pointer block text-[13px] h-9 w-full rounded-md p-2 text-black bg-[#FFFFFF] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                onClick={() => setActiveLayer3(!activeLayer3)}
              >
                <p>{LayerThreeData}</p>
                <span>
                  {activeLayer3 ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </span>
              </div>
              {activeLayer3 && (
               <div
               className={`block text-[13px] max-h-[100px] min-h-[100px] overflow-y-scroll w-full rounded-md p-2 text-black bg-[#FFFFFF] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
             >
                  {sampleData.Layer3.map((item) => (
                    <div
                      key={item}
                      className="cursor-pointer border border-transparent rounded-md hover:bg-gray-200 p-1"
                      onClick={() => {
                        setLayerThreeData(item);
                        setActiveLayer3(false);
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </span>
            <span className=" w-[10%] flex justify-center relative items-center">
              {" "}
              <button
                onClick={handleCloseRedClick}
                className=" absolute top-2 w-[100%]"
              >
                <img src={RedClose} className="w-[100%]" alt="" />
              </button>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex pt-6 absolute gap-3 right-2 bottom-0 justify-between items-baseline px-4 sm:px-2">
          <button
            onClick={handleCancel}
            className={`sm:px-12 px-9 font-500 sm:py-2 py-2 border rounded-lg transition-colors ${
              isLangArab ? "text-[14px]" : "text-[14px]"
            } ${
              isDarkMode
                ? "bg-transparent border border-white text-white"
                : "border-[#909090] text-[#505050]"
            }`}
          >
            {isLangArab ? "إلغاء" : "Cancel"}
          </button>
          <button
            onClick={handleSubmitForm}
            className={`sm:px-12 px-9 font-500 sm:py-2 text-[14px] py-2 rounded-lg transition-colors ${
              LayerOneData !== "--empty--" ||
              LayerTwoData !== "--empty--" ||
              LayerThreeData !== "--empty--"
                ? "bg-custom-gradient text-white"
                : "bg-gray-600/65 text-white"
            }`}
            disabled={
              LayerOneData === "--empty--" &&
              LayerTwoData === "--empty--" &&
              LayerThreeData === "--empty--"
            }
          >
            {isLangArab ? "إرسال" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
