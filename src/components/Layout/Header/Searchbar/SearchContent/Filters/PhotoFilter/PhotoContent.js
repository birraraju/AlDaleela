import { useEffect, useState } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Graphic from "@arcgis/core/Graphic";
import { useAuth } from "../../../../../../../Providers/AuthProvider/AuthProvider";
import config from '../../../../../../Common/config'; // Import your config file
import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader

export default function PhotoContent({setInputClicked,setIscategory}) {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { contextMapView, setPopupSelectedGeo, setIsEditPOI } = useAuth();
  const [featureLayer, setFeatureLayer] = useState(null);

  useEffect(() => {
    const loadAttachments = async () => {
      const allMediaItems = []; // Array to store media items from all layers
  
      // Loop through each layer in the configuration
      for (const layerConfig of config.featureServices) {
        const layer = new FeatureLayer({
          url: layerConfig.url,
          outFields: ["*"]
        });
  
        try {
          const query = layer.createQuery();
          query.where = "1=1";
          query.returnGeometry = true;
          query.outFields = ["*"];
          const results = await layer.queryFeatures(query);
  
          const objectIds = results.features.map(feature => feature.attributes.OBJECTID);
          const attachments = await layer.queryAttachments({ objectIds });
  
          results.features.forEach(feature => {
            const objectId = feature.attributes.OBJECTID;
  
            // Check if attachments exist for this feature and add to media items array
            if (attachments[objectId] && attachments[objectId].length > 0) {
              attachments[objectId].forEach(attachment => {
                if (attachment.contentType.startsWith('image/')) {
                  const mediaItemObject = {
                    type: attachment.contentType,
                    url: attachment.url,
                    objectId: objectId,
                    layerName: layerConfig.name // Add the layer name for reference
                  };
                  allMediaItems.push(mediaItemObject);
                }
              });
            }
          });
        } catch (error) {
          console.error(`Error querying layer "${layerConfig.name}" or attachments:`, error);
        }finally{
          //setLoading(false)
        }
      }
      setLoading(false)
      // Update state with media items from all layers
      setMediaItems(allMediaItems);
    };
  
    loadAttachments();
  }, []);

  const handleImageClick = async (objectId, selectedLayerName) => {
    setIscategory(false);
    setInputClicked(false);
    // Find the layer based on selected name
    const selectedLayerConfig = config.featureServices.find(
      service => service.name === selectedLayerName
    );
  
    if (!selectedLayerConfig) {
      console.error(`Layer with name ${selectedLayerName} not found in configuration.`);
      return;
    }
  
    try {
      // Create a FeatureLayer instance for the selected layer
      const featureLayer = new FeatureLayer({
        url: selectedLayerConfig.url,
        outFields: ["*"]
      });
  
      // Query the selected layer using the OBJECTID
      const feature = await featureLayer.queryFeatures({
        where: `OBJECTID = ${objectId}`,
        outFields: ["*"],
        returnGeometry: true
      });
  
      // Check if any features are found and handle accordingly
      if (feature.features.length > 0) {
        //openPopup(feature.features[0], objectId); // Open popup with feature info
        const pointGraphic = new Graphic({
          geometry: feature.features[0].geometry,
          symbol: {
            type: "simple-marker",
            outline: {
              color: [0, 255, 255, 4],
              width: 1
            }
          }
        });
    
        contextMapView.graphics.add(pointGraphic);
        await contextMapView.goTo({
          target: feature.features[0].geometry,
          center: feature.features[0].geometry,  // Centers on the feature's geometry
          zoom: 15  // Sets the zoom level
        });
        
        setPopupSelectedGeo(feature.features[0])
        setIsEditPOI(true);
      } else {
        console.log(`No feature found with OBJECTID: ${objectId}`);
      }
    } catch (error) {
      console.error(`Error querying layer ${selectedLayerName}:`, error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center   h-full">
        <ClipLoader color="#808080" size={40} /> {/* Gray, medium-sized loader */}
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-3 h-[13rem] overflow-y-scroll">
  <div className="grid grid-cols-3 gap-2">
    {mediaItems.map((item) => (
      <div
        key={item.objectId}
        className=" tab:rounded-lg rounded-md  overflow-hidden   laptop_s:w-[99%] h-[60px] tab:h-[60px]" // Set fixed dimensions for each container
        onClick={() => handleImageClick(item.objectId, item.layerName)}
      >
        {item.type.startsWith('image/') && (
          <img
            src={item.url}
            alt="Media content"
            className="w-full h-full object-cover" // Ensures the image covers the container uniformly
          />
        )}
      </div>
    ))}
  </div>
</div>
  );
}


const images = [
  { imageName: "image1.png" },
  { imageName: "image2.png" },
  { imageName: "image3.png" },
  { imageName: "image4.png" },
  { imageName: "image5.png" },
  { imageName: "image6.png" },
  { imageName: "image7.png" },
  { imageName: "image8.png" },
];
