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
    // const updatedLayers = [...sampleData.Layers];
    // config.featureServices.forEach(service => {
    //   updatedLayers.push(service.name);
    // });
    // English and Arabic fields
    const englishFields = [
      { name: "Island", value: "Island" },
      { name: "Marine", value: "Marine" },
      { name: "Terrestrial", value: "Terrestrial" },
    ];

    const arabicFields = [
      { name: "جزيرة", value: "Island" },
      { name: "موقع بحري", value: "Marine" },
      { name: "موقع بري", value: "Terrestrial" },
    ];

  // Render appropriate fields based on language
  const fieldsToDisplay = isLangArab ? arabicFields : englishFields;

    // Use setSampleData to trigger a re-render
    setSampleData(prevState => ({
      ...prevState,
      Layers: fieldsToDisplay,
    }));    
  },[])

  const onChangeLayers = (layername) =>{
    setLayerTwoData("--empty--");
    setSampleData(prevState => ({
      ...prevState,
      Layers2: [], // Clear the Layers array
    }));
    // English and Arabic fields
    const englishFields = [
      { name: "Organization", value: "organization_En" },
      { name: "Name", value: "name_en" },
      { name: "Class", value: "Class" },
      { name: "Class Description", value: "ClassD" },
      { name: "Status", value: "Status" },
      { name: "Comment", value: "Comment" },
      { name: "Description", value: "description" },
      { name: "Poems", value: "poems" },
      { name: "Stories", value: "stories" },
      { name: "Classification", value: "Classification" },
      { name: "Region", value: "Municipality" },
      { name: "Emirate", value: "Emirate" },
      { name: "Area", value: "City" },
    ];

    const arabicFields = [
      { name: "الجهة", value: "organization" },
      { name: "اسم", value: "name_ar" },
      { name: "النوع", value: "ClassAr" },
      { name: "المعنى الجغرافي", value: "ClassD_Ar" },
      { name: "المدينة", value: "MunicipalityAr" },
      { name: "الإمارة", value: "EmirateAr" },
      { name: "التصنيف", value: "Classification_ar" },
      { name: "المنطقة", value: "CityAr" },
    ];

  // Render appropriate fields based on language
  const fieldsToDisplay = isLangArab ? arabicFields : englishFields;
  setSampleData(prevState => ({
    ...prevState,
    Layer2: fieldsToDisplay,
  }));
    // const terrestrialLayer = config.featureServices.find(service => service.name === layername);

    // if (terrestrialLayer) {
    //   const layer = new FeatureLayer({
    //     url: terrestrialLayer.url,
    //   });

    //   layer.load().then(() => {
    //     const fieldNames = layer.fields.map(field => field.name);

    //     setSampleData(prevState => ({
    //       ...prevState,
    //       Layer2: fieldNames,
    //     }));
    //   }).catch(error => {
    //     console.error("Error loading FeatureLayer: ", error);
    //   });
    //}
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
        const queryValues = [...new Set(result.features.map(feature => feature.attributes[fieldname]))];
  
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
     // Reset only the necessary parts of the sampleData state
    setSampleData(prevState => ({
      ...prevState,
      Layers: prevState.Layers, // Preserve Layers
      Layer2: [], // Preserve Layer2
      Layer3: []  // Preserve Layer3
    }));
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
    if (layerNames.includes(layer.title)) {
      if (fieldValue) {
        if(isLangArab){
          layer.definitionExpression = `${fieldName} = N'${fieldValue}'`; // For string fields
        }
        else{
          // Apply filter to the selected layer
          layer.definitionExpression = `${fieldName} = '${fieldValue}'`; // For string fields
        }
      } else {
        // Show all data for the selected layer if no fieldValue is provided
        layer.definitionExpression = "1=1";
      }
    } else {
      // Hide data for layers not in the list by setting an invalid filter
      layer.definitionExpression = "1=0";
    }
  
    // Recursively apply the logic to sublayers, if they exist
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
    const fieldName = LayerTwoData; // Field name (e.g., "Class")
    const fieldValue = LayerThreeData; // Field value (e.g., "CategoryA")
  
    // Get the name of the selected layer from LayerOneData
    const selectedLayerName = LayerOneData; // Single layer name to filter (e.g., "Terrestrial")
  
    // Filter all layers: show only the selected layer and hide others
    contextMapView.map.layers.items.forEach(layer => {
      // Apply the definition expression to the selected layer
      setDefinitionExpressionForLayers(layer, fieldName, fieldValue, [selectedLayerName]);
      // if (layer.title === selectedLayerName) {
      //   // Apply the definition expression to the selected layer
      //   setDefinitionExpressionForLayers(layer, fieldName, fieldValue, [selectedLayerName]);
      // } else {
      //   // Hide all other layers
      //   setDefinitionExpressionForLayers(layer, fieldName, null, []);
      // }
    });
    let whereCondition = null;
    if(isLangArab){
      whereCondition = `${fieldName} = N'${fieldValue}'`; // For string fields
    }
    else{
      // Apply filter to the selected layer
      whereCondition = `${fieldName} = '${fieldValue}'`; // For string fields
    }
  
    // Query and zoom to the selected layer with the specified filter
    queryAndZoomToLayers(selectedLayerName, whereCondition);
  };
  
  const queryAndZoomToLayers = async (layerName, whereCondition) => {
    try {
      // Find the layer configuration for the specified name
      const selectedLayerConfig = config.featureServices.find(
        service => service.name === layerName
      );
  
      if (!selectedLayerConfig) {
        console.error(`Layer with name ${layerName} not found in configuration.`);
        return; // Exit if the layer is not found
      }
  
      // Create a FeatureLayer instance for the selected layer
      const featureLayer = new FeatureLayer({
        url: selectedLayerConfig.url,
        outFields: ["*"]
      });
  
      // Query the layer using the provided whereCondition
      const result = await featureLayer.queryFeatures({
        where: whereCondition,
        outFields: ["*"],
        returnGeometry: true
      });
  
      // Check if features are found
      if (result.features.length > 0) {
        // Initialize extent for zooming
        let combinedExtent = null;
  
        // Loop through features and add them as graphics
        result.features.forEach(feature => {
          const featureGeometry = feature.geometry;
  
          // Add the feature as a graphic
          const graphic = new Graphic({
            geometry: featureGeometry,
            symbol: {
              type: "simple-marker", // Customize as needed
              color: [0, 255, 255, 0.5],
              outline: {
                color: [0, 255, 255, 1],
                width: 2
              }
            }
          });
          contextMapView.graphics.add(graphic);
  
          // Handle extent for point geometry or other geometries
          let featureExtent;
          if (featureGeometry.type === "point") {
            // Create a small extent for point geometries
            featureExtent = new Extent({
              xmin: featureGeometry.x - 0.0001,
              ymin: featureGeometry.y - 0.0001,
              xmax: featureGeometry.x + 0.0001,
              ymax: featureGeometry.y + 0.0001,
              spatialReference: featureGeometry.spatialReference
            });
          } else {
            // Use the existing extent for other geometries
            featureExtent = featureGeometry.extent;
          }
  
          // Combine extents for all features
          if (!combinedExtent) {
            combinedExtent = featureExtent;
          } else {
            combinedExtent = combinedExtent.union(featureExtent);
          }
        });
  
        // Zoom to the combined extent of the features
        if (combinedExtent) {
          await contextMapView.goTo({
            target: combinedExtent,
            zoom: 10 // Adjust zoom level as needed
          });
        }
      } else {
        console.warn(`No features found in layer "${layerName}" for condition "${whereCondition}".`);
      }
    } catch (error) {
      console.error("Error querying or zooming to the layer:", error);
    }
  };
  
  return (
    <div className="relative h-full" dir={isLangArab ? "rtl" : "ltr"}>
      <div className={`z-50 ${isDarkMode ? "text-white" : "text-black"}`}>
        <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
          {/* Layer 1 */}
          <div className="flex justify-between gap-3 w-full">
            <span className="space-y-2 w-full">
              <select
                className="text-[13px] h-9 w-full rounded-md p-2 text-black bg-[#FFFFFF] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={LayerOneData}
                onChange={(e) => {
                  const value = e.target.value;
                  setLayerOneData(value);
                  onChangeLayers(value);
                }}
              >
                <option value="--empty--" disabled>
                --empty--
                </option>
                {sampleData.Layers && sampleData.Layers.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </span>
  
            {/* Layer 2 */}
            <span className="space-y-2 w-full">
              <select
                className="text-[13px] h-9 w-full rounded-md p-2 text-black bg-[#FFFFFF] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={LayerTwoData}
                onChange={(e) => {
                  const value = e.target.value;
                  setLayerTwoData(value);
                  onChaneFileds(value);
                }}
              >
                <option value="--empty--" disabled>
                --empty--
                </option>
                {sampleData.Layer2 && sampleData.Layer2.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </span>
  
            {/* Layer 3 */}
            <span className="space-y-2 w-full">
              <select
                className="text-[13px] h-9 w-full rounded-md p-2 text-black bg-[#FFFFFF] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={LayerThreeData}
                onChange={(e) => {
                  const value = e.target.value;
                  setLayerThreeData(value);
                }}
              >
                <option value="--empty--" disabled>
                --empty--
                </option>
                {sampleData.Layer3 && sampleData.Layer3.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </span>
  
            <span className="w-[10%] hidden  justify-center relative items-center">
              <button
                onClick={handleCloseRedClick}
                className="absolute top-2 w-[100%]"
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
