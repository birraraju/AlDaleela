import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { X } from "lucide-react";
import { useTheme } from '../Layout/ThemeContext/ThemeContext';
import EditPOIPoint from '../../assets/Droppedpin/EditPoints.svg';
import { ChevronLeft } from 'lucide-react';
import Draw from "@arcgis/core/views/draw/Draw.js";
import Graphic from "@arcgis/core/Graphic.js";
import Point from "@arcgis/core/geometry/Point.js";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils.js";

export default function EditAddPOI({
  children,
  setselectedLayer,
  setaddPointGeometry,
  mapview,
  onClose,
  isShowEdit
}) {


  const [isOpen, setIsOpen] = useState(true);
  const [isFullyClosed, setIsFullyClosed] = useState(false);
  const panelRef = useRef(null);
  const { isDarkMode, isLangArab} = useTheme();
  const poiOptions = [
    { label: "Terrestrial", isHighlighted: false },
    { label: "Marine", isHighlighted: false },
    { label: "Island", isHighlighted: true }
  ];

  const [selectedIndex, setSelectedIndex] = useState(null); // Track the selected item

  const handleSelect = (index, label) => {
    setSelectedIndex(index);
    setselectedLayer(label)
    mapview.graphics.removeAll(); // Clears all graphics
    // Set up the Draw widget
    const draw = new Draw({
      view: mapview
    });
    const action = draw.create("point");
    // Listen for the draw completion event
    action.on("draw-complete", (event) => {
      addPointToMap(event.coordinates[0], event.coordinates[1]);
      onClose()
    });
  };
   // Function to add a point graphic to the map
   const addPointToMap = (longitude, latitude) => {
    const geographicCoords = webMercatorUtils.xyToLngLat(longitude, latitude);
    const pointGraphic = createPointGraphicFromCoordinates(geographicCoords[0], geographicCoords[1]);
    mapview.graphics.add(pointGraphic);
  };

  // Function to create a new point graphic using coordinates
  const createPointGraphicFromCoordinates = (longitude, latitude) => {
    const point = new Point({
      longitude: longitude,
      latitude: latitude,
      spatialReference: { wkid: 4326 } // WGS84
    });
    setaddPointGeometry({
      type: "point",
      x: longitude,
      y: latitude,
      spatialReference: { wkid: 4326 } // WGS84
    })

    return new Graphic({
      geometry: point,
      symbol: {
        type: "simple-marker",
        color: "blue",
        size: "8px",
        outline: {
          color: "white",
          width: 1
        }
      }
    });
  };

  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      // Prevents automatic panel close on outside clicks
    }
  };

  useEffect(() => {
    if (isFullyClosed) {
      const timer = setTimeout(onClose, 300);
      return () => clearTimeout(timer);
    }
  }, [isFullyClosed, onClose]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if(!isShowEdit) return null;

  if (isFullyClosed) return null;

  return (
        <div className="p-1 overflow-y-auto h-full">
          {children || (
            <>
              <div className="px-1 py-3">
      <div className="flex-1 gap-2">
        {poiOptions.map((option, index) => (
          <div
            key={index}
            onClick={() => {handleSelect(index, option.label);}} // Set selected index on click
            className={`flex gap-2 px-2 py-1 cursor-pointer ${
              selectedIndex === index ? "bg-[#DFE2E3]" : ""
            }`}
          >
            <img src={EditPOIPoint} className="w-3" alt="Icon" />
            <p className=" text-black">{option.label}</p>
          </div>
        ))}
      </div>
    </div>
            </>
          )}
        </div>
  );
}
