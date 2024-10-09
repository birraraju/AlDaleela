import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { formatNumber, convertDegreeToDMS } from "../../../lib/Helpers";
import Graphic from "@arcgis/core/Graphic";
import Measurement from "@arcgis/core/widgets/Measurement";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import Handles from "@arcgis/core/core/Handles";
import * as projection from "@arcgis/core/geometry/projection";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine";
import "./Measurement.css";
import measurementconfig from "./MeasurementConfig";
//import { useTheme } from "../../../../components/ThemeSwitcher/ThemeSwitcher";
import ReactDOM from 'react-dom';
var esriUnit;
export default function MapMeasurement(props) {
  const { mapview } = props;
  const { t } = useTranslation();
  //const { theme } = useTheme("");
  const theme = "light";
  const measurementRef = useRef(null);
  const locationResultRef = useRef(null);
  const mapPoint = useRef(null);
  let measureHandles = new Handles();
  const measurementConfig = measurementconfig.measurement;
  const coordinateSystems = measurementconfig.coordinateSystem;
  const locationUnits = measurementconfig.coordinateSystem.wgs84.units;
  const [showMeasurement, setShowMeasurement] = useState(true);
  const [measureTool, setMeasureTool] = useState(null);
  const measureToolRef = useRef(measureTool);
 // const [measureUnit, setMeasureUnit] = useState("square-miles");
  const [measureUnit, setMeasureUnit] = useState({
    distance: 'meters', // default value for distance
    area: 'square-miles', // default value for area
  });
  const [measureResult, setMeasureResult] = useState(null);
  const [newMeasureResult, setNewMeasureResult] = useState(null);
  const [activeTool, setActiveTool] = useState(null);
  const activeToolRef = useRef(activeTool);
  const [selectedCS, setSelectedCS] = useState("wgs84");
  const [locationUnit, setLocationUnit] = useState(undefined);
  const [location, setLocation] = useState({});
  const [latLong, setLatLong] = useState({});
  const [xy, setXY] = useState({});
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);
  const handlesRef = useRef([]);
  const [tooltipContent, setTooltipContent] = useState('');
  const pointCount = useRef(0);
// Function to handle unit change
const handleUnitChange = (type, value) => {
  setMeasureUnit((prev) => ({ ...prev, [type]: value }));
};
  useEffect(() => {
    if (measurementRef.current) {
      measurementRef.current.innerHTML = "";
    }

    if (mapview && showMeasurement) {
      const measurement = new Measurement({
        view: mapview,
        container: measurementRef.current,
        areaUnit: measureUnit.area,
        linearUnit:measureUnit.distance,
      });
      setMeasureTool(measurement);
      setShowMeasurement(true);

      const handlePointerMove = (event) => {
        if (tooltipRef.current) {
          try {
            const screenPoint = { x: event.native.x, y: event.native.y };

            if (
              screenPoint &&
              screenPoint.x && screenPoint.y &&
              Number.isFinite(screenPoint.x) && Number.isFinite(screenPoint.y)
            ) {
              tooltipRef.current.style.display = 'block';
              tooltipRef.current.style.left = `${screenPoint.x + 15}px`;
              tooltipRef.current.style.top = `${screenPoint.y + 15}px`;
            }
          } catch (error) {
            console.error('Error converting screen coordinates to map coordinates:', error);
          }
        }
      };

      const handlePointerOut = () => {
        if (tooltipRef.current) {
          tooltipRef.current.style.display = 'none';
        }
      };

      handlesRef.current.push(mapview.on('pointer-move', handlePointerMove));
      handlesRef.current.push(mapview.on('pointer-out', handlePointerOut));


    }
    if (!showMeasurement) {
      clearMeasurements();
    }

  }, [mapview, showMeasurement]);
  const measureProjectedGeometry = (inputGeometry) => {
    let newMeasure = null;
    let newArea = null;
    let newLength = null;
  
    // Determine the correct measurement unit based on geometry type
    const currentUnit = inputGeometry.type === "polygon" ? measureUnit.area : measureUnit.distance;
  
    // Fallback to default measureUnit if currentUnit is undefined
    const effectiveUnit = currentUnit || measureUnit;
  
    if (
      inputGeometry.spatialReference.isWebMercator ||
      inputGeometry.spatialReference.isWGS84
    ) {
      if (inputGeometry.type === "polygon") {
        newArea = geometryEngine.geodesicArea(inputGeometry, effectiveUnit);
      } else {
        newLength = geometryEngine.geodesicLength(inputGeometry, effectiveUnit.toLowerCase());
      }
    } else {
      if (inputGeometry.type === "polygon") {
        newArea = geometryEngine.planarArea(inputGeometry, effectiveUnit);
      } else {
        newLength = geometryEngine.planarLength(inputGeometry, effectiveUnit.toLowerCase());
      }
    }
  
    // Combine area and length measurements
    newMeasure = newArea || newLength;
  
    // Log for debugging
    console.log("Measurement Value:", newMeasure, "Unit:", effectiveUnit);
  
    return newMeasure;
  };
  
  // const measureProjectedGeometry = (inputGeometry) => {
  //   let newMeasure = null;
  //   let newArea = null;
  //   let newLength = null;
  //   if (
  //     inputGeometry.spatialReference.isWebMercator ||
  //     inputGeometry.spatialReference.isWGS84
  //   ) {
  //     if (inputGeometry.type === "polygon") {
  //       newArea = geometryEngine.geodesicArea(inputGeometry, measureUnit);
  //     } else {
  //       newLength = geometryEngine.geodesicLength(inputGeometry, measureUnit);
  //     }
  //   } else {
  //     if (inputGeometry.type === "polygon") {
  //       newArea = geometryEngine.planarArea(inputGeometry, measureUnit);
  //     } else {
  //       newLength = geometryEngine.planarLength(inputGeometry, measureUnit);
  //     }
  //   }
  //   // console.log("measuring unit", measureUnit);
  //   newMeasure = newArea || newLength;
  //   return newMeasure;
  // };

  const projectMeasuredResult = (result) => {
    //const mapSpRef = mapview.spatialReference.wkid;
    const resultSpRef = result?.geometry?.spatialReference?.wkid;
    const selectedSpRef = getSpatialReference(selectedCS);
    /**compare selected & current map SR to see if projection is needed
     * compare selected & measure graphic's SR to see if projection is needed
     */
    if (!result) {
      return;
    }
    if (resultSpRef === selectedSpRef) {
      // setNewMeasureResult(result); /**set new measure result to update label on map */
      return;
    }
    // console.log('projecting result', result);
    let outSR = new SpatialReference({ wkid: getSpatialReference(selectedCS) });
    projection.load().then(function () {
      let projectedGeometry = projection.project(result.geometry, outSR);
      var newMeasureResult = measureProjectedGeometry(projectedGeometry);
      setNewMeasureResult(newMeasureResult);
    });
  };

  useEffect(() => {
    if (!measureResult || !selectedCS || !measureUnit) {
      return;
    }
    /**project measure on new result, cs change */
    projectMeasuredResult(measureResult);
    const dropdown = document.querySelector(".esri-unit-select__select");
    const labelComponent = document.querySelector('.esri-unit-select__label');

    if (labelComponent && labelComponent.shadowRoot) {
      const style = document.createElement('style');
      style.textContent = `
        .esri-unit-select__label {
          color: blue; /* Change text color */
          font-size: 0.75rem; /* Change font size */
          font-weight: bold; /* Make it bold */
          font-family: 'Omnes-Medium' !important;
        }
      `;
      // labelComponent.shadowRoot.appendChild(style);
    }


    if (dropdown !== null) {
      const dropdown1 = dropdown
        .shadowRoot.querySelector(".select");

      if (dropdown1) {
        const style = document.createElement("style");
        style.textContent = `
        .select {
          background-color: var(--input-bg) !important;
          color: var(--dark-color1) !important;
          border: 1px solid var(--input-border) !important;
          font-family: 'Omnes-Regular' !important;
          font-size: 0.75rem !important;
          border-radius: 6px !important;
        }
        .icon-container{
            border-inline-width: 0px 0px !important;
        }
        .icon-container .icon{
            color: #000;  
            min-inline-size: 20px;
        }
      `;
        dropdown.shadowRoot.appendChild(style);
      }
    }

  }, [measureResult, selectedCS, measureUnit]);

  const watchMeasurement = (_measureTool) => {
    const handleMeasureWatch = () => {
      const measuredResult = _measureTool.viewModel.activeViewModel.measurement;
      const measuredUnit = _measureTool.viewModel.activeViewModel.unit;
      // console.log("measured Result, Unit", measuredResult, measuredUnit);
      setMeasureResult(measuredResult);
      setMeasureUnit(measuredUnit.toLowerCase());
    };

    const measureUnitWatcher = _measureTool.viewModel.watch(
      "activeViewModel",
      function (activeVMNew, activeVMOld, propertyName, target) {
        if (activeVMNew) {
          switch (activeVMNew.declaredClass) {
            case "esri.widgets.AreaMeasurement2D.AreaMeasurement2DViewModel":
              activeVMNew.unitOptions = measurementConfig.area.unitOptions;
              break;

            case "esri.widgets.DistanceMeasurement2D.DistanceMeasurement2DViewModel":
              activeVMNew.unitOptions = measurementConfig.distance.unitOptions;
              break;
            default:
              break;
          }

          activeVMNew.watch("unit", function (
            newUnit,
            oldUnit,
            propertyName,
            target
          ) {
            if (newUnit && newUnit !== oldUnit) {
              setMeasureUnit(newUnit.toLowerCase());
              const measuredResult =
                _measureTool.viewModel.activeViewModel.measurement;
              setMeasureResult(measuredResult);
            }
          });
        }
      }
    );

    const measureStateWatcher = reactiveUtils.watch(
      () => _measureTool.viewModel.state,
      (state) => {
        if (state === "ready") {
          setShowTooltip(true);
          setTooltipContent(t('clickOnMapToStartDrawing'));
        }
        if (state === "measuring") {
          setTooltipContent(t('clickToContinueOrDoubleClickToFinish'));
        }
        if (state === "measured") {
          /**to get the measured result */
          handleMeasureWatch();
          setTooltipContent('');
          setShowTooltip(false);
          _measureTool.activeTool = activeTool !== "location" ? activeTool : null;
          pointCount.current = 0;
        }
      }
    );

    measureHandles.add([measureUnitWatcher, measureStateWatcher]);

    return () => {
      measureHandles.removeAll();
    };
  };

  const changeLabelOnMap = (newLabel) => {
    const graphicLayers = mapview.map.allLayers.filter((layer) => layer.type === "graphics");
    const gLayersWithGraphics = graphicLayers.filter((glayer) => glayer.graphics.length > 0);
    // console.log('gLayersWithGraphics', gLayersWithGraphics);

    if (gLayersWithGraphics.length > 0) {
      gLayersWithGraphics.forEach((glayer) => {
        glayer.graphics.forEach((graphic) => {
          if (graphic.symbol.type === "text" && graphic.symbol.text !== newLabel) {
            const updatedGraphic = graphic.clone();
            updatedGraphic.symbol.text = newLabel;

            glayer.graphics.remove(graphic);
            glayer.graphics.add(updatedGraphic);
            
          }
        })
      })
    }
  }
  const unitAbbreviations = {
    "square-meters": "m²",
    "square-kilometers": "km²",
    "square-miles": "mi²",
    "square-feet": "ft²",
    "hectares": "ha",
    "meters": "m",
    "kilometers": "km",
    "miles": "mi",
    "feet": "ft",
    "nautical-miles": "nm",
  };
  
  useEffect(() => {
  if (newMeasureResult != null && measureUnit) {
    const measurementValueElement = document.querySelector(
      ".esri-measurement-widget-content__measurement > .esri-measurement-widget-content__measurement-item:first-of-type .esri-measurement-widget-content__measurement-item__value"
    );

    if (measurementValueElement) {
      const currentUnit = activeTool === "area" ? measureUnit.area : measureUnit.distance;
      // Convert unit to its abbreviated form and to uppercase
      const abbreviatedUnit = currentUnit ? (unitAbbreviations[currentUnit] || currentUnit).toLowerCase() : (unitAbbreviations[measureUnit] || measureUnit).toLowerCase();


      // Format the number and create the new measurement value string
      const formattedNumber = formatNumber(newMeasureResult.toFixed(2));
      const newMeasurementValue = `${formattedNumber} ${abbreviatedUnit}`;

      // Update the value in the DOM
      measurementValueElement.innerHTML = newMeasurementValue;

      // Update the map label
      changeLabelOnMap(newMeasurementValue);
    }
  }
}, [newMeasureResult, measureUnit]); // Add measureUnit to dependency array

  
  // useEffect(() => {
  //   if (newMeasureResult) {
  //     /**update new value to the result Div */
  //     const oldMeasurementValue = document.querySelector(
  //       ".esri-measurement-widget-content__measurement > .esri-measurement-widget-content__measurement-item:first-of-type .esri-measurement-widget-content__measurement-item__value"
  //     );
  //     const unit = oldMeasurementValue?.innerHTML?.split(" ")[1];
  //     const formattedNumber = formatNumber(newMeasureResult.toFixed(2));
  //     const newMeasurementValue = formattedNumber + " " + unit;
  //     if (oldMeasurementValue) {
  //       // console.log(
  //       //   `measure value updated from ${oldMeasurementValue.innerHTML} to ${newMeasurementValue}`
  //       // );
  //       oldMeasurementValue.innerHTML = newMeasurementValue;
  //     }

  //     /**update map label with new value */
  //     changeLabelOnMap(newMeasurementValue);
  //   }
  // }, [newMeasureResult]);

  useEffect(() => {
    activeToolRef.current = activeTool;
    measureToolRef.current = measureTool;

    if (!activeTool || !measureTool) {
      setShowTooltip(false);
      return;
    }
    if (measureTool.viewModel.state !== "measured") {
      setShowTooltip(true);
    }
    if (!showTooltip || !tooltipRef || !tooltipRef.current) {
      return;
    }

    if (activeTool === "location") {
      setTooltipContent(t('clickToAddPoint'));
      /**listen for map click to get coordinates */
      reactiveUtils.on(
        () => mapview,
        "click",
        (event) => {
          if (activeToolRef.current === "location") {
            addPointToMap(event);
          }
        }
      );
    } else {
      measureTool.activeTool = activeTool;
      setTooltipContent(t('clickOnMapToStartDrawing'));
    }

    /**watch for changes in measurement widget properties */
    watchMeasurement(measureTool);
  }, [activeTool, measureTool, showTooltip, tooltipRef, t]);


  useEffect(() => {
    if(!mapview || !measureTool || !activeTool || activeTool === 'location') {
      return;
    }
    const handleClick = (event) => {
      if (measureTool.viewModel.state === 'ready' && activeToolRef.current === 'area') {
        pointCount.current += 1;
        if(pointCount.current === 1){
          setTooltipContent(t('clickToContinue'));
        }
      }
    };
    mapview.on('click', handleClick);
  }, [measureTool, activeTool, mapview])

  const switchActiveTool = (tool) => {
    clearMeasurements();
    setActiveTool((prevActiveTool) => {
      if (prevActiveTool && prevActiveTool === tool) {
        return null;
      }
      return tool;
    });
  };

  const clearMeasurements = () => {
    mapview.graphics.removeAll();

    // mapview.map.allLayers.map((layer) => {
    //   if(layer.type === "graphics" && layer.graphics.length > 0) {
    //     layer.graphics.removeAll();
    //   }
    // });

    // setActiveTool(null);
    if (measureTool) {
      measureTool.clear();
    }
    setSelectedCS("wgs84");
    setMeasureResult(null);
    setLocation({});
    setLatLong({});
    setXY({});
    setLocationUnit(coordinateSystems.wgs84.units[0].key);
    if (locationResultRef.current) {
      locationResultRef.current.innerHTML = "";
    }
  };

  const handleCSChange = (e) => {
    setSelectedCS(e.target.value);
  };

  useEffect(() => {
    if (
      !coordinateSystems.wgs84.units ||
      coordinateSystems.wgs84.units.length === 0
    ) {
      return;
    }

    setLocationUnit(coordinateSystems.wgs84.units[0].key);
  }, [coordinateSystems.wgs84.units]);

  const addPointToMap = (evt) => {
    const pointGraphic = new Graphic({
      geometry: {
        type: "point",
        latitude: evt.mapPoint.latitude,
        longitude: evt.mapPoint.longitude,
        spatialReference: evt.mapPoint.spatialReference,
      },
      symbol: {
        type: "simple-marker",
        color: [255, 10, 10],
        outline: {
          color: [255, 255, 255],
          width: 2,
        },
      },
    });
  
    // Create the label graphic
    const labelGraphic = new Graphic({
      geometry: {
        type: "point",
        latitude: evt.mapPoint.latitude,
        longitude: evt.mapPoint.longitude,
        spatialReference: evt.mapPoint.spatialReference,
      },
      symbol: {
        type: "text",
        color: 'black',
        text: `(${evt.mapPoint.longitude.toFixed(3)},${evt.mapPoint.latitude.toFixed(3)})`,
        xoffset: 10,  
        yoffset: 10,
        font: {
          size: 10,
          family: 'Omnes-Regular',
        },
      },
    });
  
    // Remove all graphics and add the new ones
    mapview.graphics.removeAll();
    mapview.graphics.add(pointGraphic);
    mapview.graphics.add(labelGraphic);
  
    // Store the coordinates in state
    mapPoint.current = evt.mapPoint;
    setLatLong({
      long: evt.mapPoint.longitude.toFixed(3),
      lat: evt.mapPoint.latitude.toFixed(3),
    });
    setXY({
      y: evt.mapPoint.y.toFixed(3),
      x: evt.mapPoint.x.toFixed(3),
    
    });
  
    // var graphic = new Graphic({
    //   geometry: {
    //     type: "point",
    //     latitude: evt.mapPoint.latitude,
    //     longitude: evt.mapPoint.longitude,
    //     spatialReference: evt.mapPoint.spatialReference,
    //   },
    //   symbol: {
    //     type: "simple-marker",
    //     color: [255, 10, 10],
    //     outline: {
    //       color: [255, 255, 255],
    //       width: 2,
    //     },
    //   },
    // });
    // mapview.graphics.removeAll();
    // mapview.graphics.add(graphic);

    // /**store all coordinates from locationresult to state */
    // mapPoint.current = evt.mapPoint;
    // setLatLong({
    //   long: evt.mapPoint.longitude.toFixed(3),
    //   lat: evt.mapPoint.latitude.toFixed(3),
    // });
    // setXY({
    //   x: evt.mapPoint.x.toFixed(3),
    //   y: evt.mapPoint.y.toFixed(3),
    // });
    // console.log("location result", evt.mapPoint);
  };

  const projectLocation = () => {
    if (Object.keys(xy).length === 0) {
      return;
    }
    let outSR = new SpatialReference({ wkid: getSpatialReference(selectedCS) });

    projection.load().then(function () {
      // console.log("mapPoint", mapPoint.current);
      let projectedLocation = projection.project(mapPoint.current, outSR);
      // console.log("projected location", projectedLocation);
      setLocation({
        x: projectedLocation.x.toFixed(3),
        y: projectedLocation.y.toFixed(3),
      });
    });
  };

  useEffect(() => {
    if (
      !activeTool ||
      !selectedCS ||
      activeTool !== "location" ||
      Object.keys(latLong).length === 0 ||
      Object.keys(xy).length === 0
    ) {
      return;
    }

    if (selectedCS === "wgs84") {
      setLatLongLocation();
    } else {
      /**TODO: need to project x,y coordinates */
      projectLocation();
      setLocation(xy);
    }
  }, [activeTool, selectedCS, latLong, xy]);

  const handleLocationUnitChange = (evt) => {
    setLocationUnit(evt.target.value);
  };

  const getSpatialReference = (srKey) => {
    if (srKey === "wgs84") {
      // return mapview.spatialReference.wkid;
      return coordinateSystems[srKey].spRef;
    } else {
      return coordinateSystems[srKey].spRef;
    }
  };

  const setLatLongLocation = () => {
    switch (locationUnit) {
      case "dms":
        const degreeLat = latLong.lat;
        const degreeLong = latLong.long;
        const newLat = convertDegreeToDMS(degreeLat);
        const newLong = convertDegreeToDMS(degreeLong);
        setLocation({ long: newLong, lat: newLat });
        break;
      case "dd":
        setLocation(latLong);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!locationUnit || Object.keys(location).length === 0) {
      return;
    }

    setLatLongLocation();
  }, [locationUnit]);

  useEffect(() => {
    return () => {
      if (measureToolRef.current) {
        measureToolRef.current.clear();
        clearMeasurements();
        setActiveTool(null);
        setLatLong({});
        setXY({});
      }
      setShowTooltip(false);
      setActiveTool(null);
      setLatLong({});
      setXY({});
    if(activeToolRef.current){
      activeToolRef.current=null
    }
    };
  }, []);

  const handleReset = () => {
    clearMeasurements();
    setActiveTool(null);
    setShowTooltip(false);
  }

  return (
    <>
      <style>{`
        .icon-container {
          border-inline-width: 0px 0px;
        }
      `}</style>
      <div
        id="measurement"
        className="arcgis-measurement-component controller-wrapper"
      >
        {/* Render the tooltip into the body to break out of the parent’s position */}
        {showTooltip && ReactDOM.createPortal(<div className="measure-tooltip-container" ref={tooltipRef}> {tooltipContent}</div>, document.body)}
        <ul
          className="nav nav-tabs mt-3 EnviroTabs mb-3"
          id="myTab"
          role="tablist"
        >
          <li className="nav-item" role="presentation" title="Area">
            <button
              id="area"
              className={`tool-btn nav-link area ${activeTool === "area" ? "active" : ""
                }`}
              title={t("area")}
              onClick={() => switchActiveTool("area")}
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/${theme === "dark" ? "areadark.svg" : "area.svg"}`}
                className="measureicon"
                alt=""
              />
              {t("area")}
            </button>
          </li>
          <li className="nav-item" role="presentation" title="Area">
            <button
              id="distance"
              className={`tool-btn nav-link distance ${activeTool === "distance" ? "active" : ""
                }`}
              title={t("distance")}
              onClick={() => switchActiveTool("distance")}
            >
              {/* <MdOutlinePolyline size={20} /> */}
              <img src={`${process.env.PUBLIC_URL}/images/${theme === "dark" ? "distancedark.svg" : "distance.svg"}`} className="measureicon" alt="" />
              {t("distance")}
            </button>
          </li>
          <li className="nav-item" role="presentation" title="Area">
            <button
              id="location"
              className={`tool-btn nav-link location ${activeTool === "location" ? "active" : ""
                }`}
              title={t("location")}
              onClick={() => switchActiveTool("location")}
            >
              {/* <GrLocation size={20} /> */}
              <img src={`${process.env.PUBLIC_URL}/images/${theme === "dark" ? "locationdark.svg" : "location.svg"}`} className="measureicon" alt="" />
              {t("location")}
            </button>
          </li>
          <li className="nav-item" role="presentation" title="Area">
            <button
              id="clear"
              className={`tool-btn nav-link clear ${activeTool === "clear" ? "active" : ""
                }`}
              title={t("reset")}
              onClick={handleReset}
            >
              {/* <AiOutlineDelete size={20} /> */}
              <img src={`${process.env.PUBLIC_URL}/images/${theme === "dark" ? "resetDark.svg" : "reset.svg"}`} className="measureicon" alt="" />
              {t("reset")}
            </button>
          </li>
        </ul>
        <div className="panel panelContent measurementPanelScroll">
        {activeTool && (
          // <div className="coordinate-system p-2 d-flex flex-column form-group">
          <div className="">
            <div className="form-group">
              <label className="cs-label mb-1">
                {t("CoordinateSystem")}
              </label>
              <select
                id="cs-select"
                className="cs-select form-select"
                value={selectedCS}
                onChange={handleCSChange}
                style={{fontSize:"12px"}}
              >
                {Object.keys(coordinateSystems).map(
                  (csName, resultIndex) => (
                    <option
                      key={csName}
                      value={csName}
                      className="cs-option"
                      style={{fontSize:"12px"}}
                    >
                      {t(`${csName}`)}
                    </option>
                  )
                )}
              </select>
            </div>
            {activeTool === "location" && (
              <div className="location-content-wrapper p-0">
                {selectedCS === "wgs84" && (
                  <div className="location-units mt-3 form-check d-flex flex-wrap"> {/* Tesmin - Added flex to keep the radio button in a row */}
                    {locationUnits.map((lunitObj, index) => {
                      const lunitKey = lunitObj.key;
                      const lunitLabel = lunitObj.label;
                      return (
                        <div
                          className="location-unit d-flex me-5"
                          key={lunitKey}
                        >
                          <input
                            className="form-check-input"
                            type="radio"
                            name="locationUnit"
                            value={lunitKey}
                            title={lunitLabel}
                            label={lunitLabel}
                            checked={locationUnit === lunitKey}
                            onChange={handleLocationUnitChange}
                          />
                          <label className="location-unit-label">
                            {lunitLabel}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}
                {location && Object.values(location).length > 0 && (
                  <div
                    className="location-result mt-3"
                    ref={locationResultRef}
                  >
                    <h3 className="location-label mb-3">
                      {t("location")}
                    </h3>
                    <div className="coordinates">
                      {Object.entries(location).map(
                        ([coordKey, coordVal]) => {
                          return (
                            <div
                              className={`coord ${coordKey}`}
                              key={coordKey}
                            >
                              <label className="coord-label">
                                {t(`${coordKey}`)}
                              </label>
                              <div className="coord-value">{coordVal}</div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            
          </div>
        )}
      
<div className="">
  <div className="form-group">
   
    <div className="unit-selection">
      {activeTool && (
        <>
          {/* Heading for Area Types */}
          {/* {activeTool === "area" && (
            <div className="unit-heading">
             <label className="cs-label mb-2">{t("Area Types")}</label>
             <div className="area-section mt-1">
              {measurementConfig.area.unitOptions.map((unitOption) => (
                <div className="form-check" key={unitOption}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="measurementUnit"
                    id={`unit-${unitOption}`}
                    value={unitOption}
                    checked={measureUnit === unitOption}
                    onChange={(e) => setMeasureUnit(e.target.value)}
                  />
                  <span className="form-check-label" htmlFor={`unit-${unitOption}`}>
                 {unitOption}
                  </span>
                </div>
              ))}
              </div>
              <div className="">{t('Result')}</div>
            </div>
          )} */}

{activeTool === "area" && (
    <div className="unit-heading">
        <label className="cs-label mb-2">{t("Area Types")}</label>
        <div className="area-section mt-1">
            {measurementConfig.area.unitOptions.map((unitOption, index) => {
                // Determine ESRI unit based on user-friendly option
                let esriUnit;
                switch (unitOption) {
                    case "Sq.kilometers":
                        esriUnit = "square-kilometers";
                        break;
                    case "Sq.Meters":
                        esriUnit = "square-meters";
                        break;
                    case "Sq.Miles":
                        esriUnit = "square-miles";
                        break;
                    case "Sq.Feet":
                        esriUnit = "square-feet";
                        break;
                    case "Hectares":
                        esriUnit = "hectares";
                        break;
                    default:
                        esriUnit = unitOption; // Fallback if not recognized
                }

                return (
                    <div className="form-check" key={`${esriUnit}-${index}`}> {/* Ensure unique key */}
                        <input
                            className="form-check-input"
                            type="radio"
                            name="measurementUnit"
                            id={`unit-${esriUnit}`}
                            value={esriUnit}
                            checked={measureUnit.area === esriUnit}
                            onChange={(e) => handleUnitChange('area', e.target.value)}
                        />
                        <span className="form-check-label" htmlFor={`unit-${esriUnit}`}>
                            {unitOption}
                        </span>
                    </div>
                );
            })}
        </div>
        <div className="">{t('Result')}</div>
    </div>
)}


{activeTool === "distance" && (
  <div className="unit-heading">
    <label className="cs-label mb-2">{t("Distance Types")}</label>
    <div className="distance-section mt-1">
      {measurementConfig.distance.unitOptions.map((unitOption,index) => {
        let esriUnit;
        switch (unitOption) {
          case "Meters":
            esriUnit = "meters";
            break;
          case "Kilometers":
            esriUnit = "kilometers";
            break;
          case "Miles":
            esriUnit = "miles";
            break;
          case "Feet":
            esriUnit = "feet";
            break;
          case "Nautical Miles":
            esriUnit = "nautical-miles";
            break;
          default:
            esriUnit = unitOption; // Fallback if not recognized
        }
        return (
          <div className="form-check" key={`${esriUnit}-${index}`}>
            <input
              className="form-check-input"
              type="radio"
              name="measurementUnit"
              id={`unit-${esriUnit}`}
              value={esriUnit}
              checked={measureUnit.distance  === esriUnit}
                            onChange={(e) => handleUnitChange('distance', e.target.value)} // Update state
            />
            <span className="form-check-label" htmlFor={`unit-${unitOption}`}>
              {unitOption}
            </span>
          </div>
        );
      })}
    </div>
    <div className="">{t('Result')}</div>
  </div>
)}

        </>
      )}
    </div>
  </div>
</div>
 <div className="measure-result" ref={measurementRef}></div>
      </div></div>
    </>
  );
}
