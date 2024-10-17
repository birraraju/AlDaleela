import { useEffect, useState } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Graphic from "@arcgis/core/Graphic";
import { useAuth } from "../../../../../../../Providers/AuthProvider/AuthProvider";

export default function VideoContent() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { contextMapView } = useAuth();
  const [featureLayer, setFeatureLayer] = useState(null);

  useEffect(() => {
    const loadAttachments = async () => {
      const layer = new FeatureLayer({
        url: "https://maps.smartgeoapps.com/server/rest/services/AlDaleela/IslandNamingProject_v2/FeatureServer/0",
        outFields: ["*"]
      });
      setFeatureLayer(layer);

      try {
        const query = layer.createQuery();
        query.where = "1=1";
        query.returnGeometry = true;
        query.outFields = ["*"];
        const results = await layer.queryFeatures(query);

        const objectIds = results.features.map(feature => feature.attributes.OBJECTID);
        const attachments = await layer.queryAttachments({ objectIds });

        const arrayMediaItemsObject = [];
        
        results.features.forEach(feature => {
          const objectId = feature.attributes.OBJECTID;
          if (attachments[objectId] && attachments[objectId].length > 0) {
            attachments[objectId].forEach(attachment => {
              if (attachment.contentType.startsWith('video/')) {
                const mediaItemObject = {
                  type: attachment.contentType,
                  url: attachment.url,
                  objectId: objectId
                };
                arrayMediaItemsObject.push(mediaItemObject);
              }              
            });
          }
        });

        setMediaItems(arrayMediaItemsObject);
      } catch (error) {
        console.error("Error querying feature layer or attachments:", error);
        setError("Failed to load media items.");
      } finally {
        setLoading(false);
      }
    };

    loadAttachments();
  }, [mediaItems]);

  const queryAttachments = async (objectId) => {
    return await featureLayer.queryAttachments({ objectIds: [objectId] });
  };

  const openPopup = async (feature, objectId) => {
    const attributes = feature.attributes;
    const attachments = await queryAttachments(objectId);

    let popupContent = `<h3>${attributes.name_ar}</h3><table class="popup-table"><tbody>`;
    let rowIndex = 0;

    for (const key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        const value = attributes[key];
        popupContent += `
          <tr style="background-color: ${rowIndex++ % 2 === 0 ? '#f2f2f2' : '#ffffff'};">
            <td style="border-right: 3px solid #0000000d;">${key}</td>
            <td>${value !== null && value !== '' ? (key.includes('date') ? new Date(value).toLocaleDateString() : value) : ''}</td>
          </tr>`;
      }
    }

    popupContent += '</tbody></table>';

    if (attachments[objectId] && attachments[objectId].length > 0) {
      popupContent += '<h4>Attachments:</h4>';
      attachments[objectId].forEach(attachment => {
        const mediaUrl = attachment.url;
        const mediaType = attachment.contentType;

        if (mediaType.includes('image')) {
          popupContent += `<img src="${mediaUrl}" alt="Image" style="max-width: 100%; height: auto;"/>`;
        } else if (mediaType.includes('video')) {
          popupContent += `<video controls style="max-width: 100%; height: auto;">
            <source src="${mediaUrl}" type="${mediaType}">Your browser does not support the video tag.
          </video>`;
        } else if (mediaType.includes('audio')) {
          popupContent += `<audio controls style="max-width: 100%; height: auto;">
            <source src="${mediaUrl}" type="${mediaType}">Your browser does not support the audio element.
          </audio>`;
        }
      });
    } else {
      popupContent += '<p>No attachments available for this feature.</p>';
    }

    const pointGraphic = new Graphic({
      geometry: feature.geometry,
      symbol: {
        type: "simple-marker",
        outline: {
          color: [0, 255, 255, 4],
          width: 1
        }
      }
    });

    contextMapView.graphics.add(pointGraphic);

    contextMapView.openPopup({
      title: "Feature Details",
      location: feature.geometry,
      content: popupContent
    });

    await contextMapView.goTo({
      target: feature.geometry,
      zoom: 15 // Adjust the zoom level as needed
    });
  };

  const handleVideoClick = async (objectId) => {
    const feature = await featureLayer.queryFeatures({
      where: `OBJECTID = ${objectId}`,
      outFields: ["*"],
      returnGeometry: true
    });

    if (feature.features.length > 0) {
      openPopup(feature.features[0], objectId);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="p-4 h-[17rem] overflow-y-scroll">
      <div className="grid grid-cols-4 gap-2">
        {mediaItems.map((item) => (
          <div key={item.objectId} className="relative bg-black rounded-xl overflow-hidden" onClick={() => handleVideoClick(item.objectId)}>
            <video
              src={item.url}
              className="w-full h-auto"
            ></video>
            <button className="absolute inset-0 flex items-center justify-center">
              <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/playBtn.svg`} alt="" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const videos = [
  { videoName: "video1.mp4" },
  { videoName: "video1.mp4" },
  { videoName: "video1.mp4" },
  { videoName: "video1.mp4" },
  { videoName: "video1.mp4" },
  { videoName: "video1.mp4" },
  { videoName: "video1.mp4" },
  { videoName: "video1.mp4" },
];
