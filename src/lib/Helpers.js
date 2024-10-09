/**
 * This file contains all the helper functions required for this application
 */
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import React from "react";
import ReactDOM from 'react-dom/client';
//import AlertMessage from "../components/common/Alert/AlertMessage";
//import UpdationModal from "../components/common/Alert/UpdationModal";
import Extent from '@arcgis/core/geometry/Extent';
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
/**--------------------------------GLOBAL VARIABLES----------------------------- */
let highlightLayer = new GraphicsLayer({ id: 'highlightsLayer' });
/**----------------------------------END---------------------------------------- */


/**
 * Method to get graphic symbol based on geometry type
 * @param {string} type 
 * @returns {Object} - The symbol to be used for the given geometry type.
 */
const getSymbolByGeometryType = (type) => {
    switch (type) {
        case 'point':
            return window.graphicSymbols.pointSymbol;
        case 'polygon':
            return window.graphicSymbols.polygonSymbol;
        case 'polyline':
            return window.graphicSymbols.polylineSymbol;
        default:
            return null;
    }
};

/**
 * Adds the given graphics to the layer
 * @param {Object} layer - The layer to which the graphics will be added.
 * @param {Array<Object>} graphicArray - An array of graphics to be added to the layer.
 * @returns {void} - No return value.
 */
export const addGraphicsToLayer = (layer, graphicArray) => {
    graphicArray.forEach(graphic => {
        var graphicGeometry = graphic.geometry;
        let newGraphic = new Graphic({
            geometry: graphicGeometry,
            symbol: getSymbolByGeometryType(graphicGeometry.type),
        });
        layer.graphics.add(newGraphic);
    });
}

export const addGraphicsToMap = (mapview, graphicArray) => {
    graphicArray.forEach(graphic => {
        var graphicGeometry = graphic.geometry;
        let newGraphic = new Graphic({
            geometry: graphicGeometry,
            symbol: getSymbolByGeometryType(graphicGeometry.type),
        });
        mapview.graphics.add(newGraphic);
    });
}

/**
 * Normalizes the keys of an object to lowercase.
 * @param {Object} obj - The original object.
 * @returns {Object} - A new object with lowercase keys.
 */
export const normalizeKeys = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
        acc[key.toLowerCase()] = obj[key];
        return acc;
    }, {});
};

/**
 * Accesses a key in an object with case insensitivity.
 * @param {Object} obj - The original object.
 * @param {string} key - The key to look up.
 * @returns {*} - The value associated with the case-insensitive key, or undefined if not found.
 */
export const getValueCaseInsensitive = (obj, key) => {
    const normalizedObj = normalizeKeys(obj);
    return normalizedObj[key.toLowerCase()];
};

/**
 * Method to highlight and zoom to given features using layer view
 * @param {*} features 
 * @param {*} mapview 
 * @param {*} highlightOptions 
 */
export const highlightAndZoomToFeatureUsingLayerView = (features, mapview, highlightOptions) => {
    // Remove any previous highlights
    mapview.graphics.removeAll()
    highlightLayer.graphics.removeAll();

    // Create highlight graphics for each feature and add to the highlight layer
    let highlightGraphics = features.map((feature) => {
        let newGraphic = new Graphic({
            geometry: feature.geometry,
            symbol: getSymbolByGeometryType(feature.geometry.type),
        });
        return newGraphic;
    });

    highlightLayer.graphics.addMany(highlightGraphics);
    mapview.map.add(highlightLayer);

    // Calculate the combined extent for all features
    let extents = features.map(feature => feature.geometry.extent).filter(extent => extent !== null);

    // Handle geometries without extent, e.g., points
    features.forEach(feature => {
        if (feature.geometry.type === 'point') {
            const point = feature.geometry;
            extents.push(new Extent({
                xmin: point.x - 1,
                ymin: point.y - 1,
                xmax: point.x + 1,
                ymax: point.y + 1,
                spatialReference: point.spatialReference
            }));
        }
    });

    // Combine all extents
    if (extents.length > 0) {
        const combinedExtent = extents.reduce((acc, curr) => geometryEngine.union(acc, curr), extents[0]);

        // Zoom to the combined extent
        mapview.goTo(combinedExtent).catch(error => {
            console.error('Error zooming to combined extent:', error);
        });
    } else {
        console.warn('No valid extents available for zooming');
    }
};

/**
 * Method to remove all the highlights added to the map 
 */
export function removeAllHighlights() {
    if (highlightLayer && highlightLayer.graphics) {
        highlightLayer.graphics.removeAll();
    }
}

/**
 * example 1234567 => 12,34,567 (en-IN)
 * example 1234567 => 1,234,567 (en-US)
 * @param {*} inputNumber 
 * @returns formattedNumber
 */
export function formatNumber(inputNumber) {
    const _formatter = (number, locale = 'en-US', options = {}) => {
        return new Intl.NumberFormat(locale, options).format(number);
    }
    var formattedNumber = _formatter(inputNumber, 'en-US', { style: 'decimal' });
    return formattedNumber;
}

export const convertDegreeToDMS = (degree) => {
    return [0 | degree, '° ', 0 | (degree < 0 ? degree = -degree : degree) % 1 * 60, "' ", 0 | degree * 60 % 1 * 60, '"'].join('');
}

export const removeMapGraphics = (mapview) => {
    if (mapview) {
        mapview.graphics?.removeAll();
    }
}

// export const showAlert = (message, type) => {
//     const container = document.createElement('div');
//     document.body.appendChild(container);

//     const handleClose = () => {
//         root.unmount(container);
//         container.remove();
//     };

//     const alert = (
//         <AlertMessage message={{ text: message, type: type }} closeMessage={handleClose} />
//     );

//     const root = ReactDOM.createRoot(container);
//     root.render(alert);
// };

// export const showUpdationModal = (title, type, navigate, navigateTo) => {
//     const container = document.createElement('div');
//     document.body.appendChild(container);

//     const handleClose = () => {
//         root.unmount(container);
//         container.remove();
//     };

//     const modal = (
//         <UpdationModal message={{ title: title }} type={type} onClose={handleClose} navigate={navigate} navigateTo={navigateTo} />
//     );

//     const root = ReactDOM.createRoot(container);
//     root.render(modal);
// };

/**
 * You can use this function to find the item with the matching key value and return the desired property value:
 * @param {*} array 
 * @param {*} key 
 * @param {*} keyValue 
 * @param {*} property 
 * @returns 
 * 
 * Example usage: 

const items = [
    { id: 1, name: "Apple", color: "Red" },
    { id: 2, name: "Banana", color: "Yellow" },
    { id: 3, name: "Cherry", color: "Red" },
    { id: 4, name: "Date", color: "Brown" }
];
const key = 'id';
const keyValue = 3;
const property = 'name';
const result = getPropertyValue(items, key, keyValue, property);
console.log(result); // Output: "Cherry"

 */
export const getPropertyValue = (array, key, keyValue, property) => {
    const foundItem = array.find(item => item[key] === keyValue);
    return foundItem ? foundItem[property] : null;
}

/**This method is created to update the map cursor tooltip text during draw/sketch
 * adjust the tooltip text as per the sketch state
 */
export const updateTooltipText = (event, sketchTool, tooltipRef, t) => {
    if (!event || !sketchTool || !tooltipRef || !tooltipRef.current) return;

    if(event.tool === "point"){
        tooltipRef.current.innerHTML = t('clickToAddPoint');
        return;
    }
    if (event.toolEventInfo && event.toolEventInfo.type === "vertex-add") {

        tooltipRef.current.innerHTML = t('clickToContinue');

        if (event.tool === "polyline") {
            let vertices = event.graphic.geometry.paths[0].length;
            if (vertices && vertices > 1) {
                tooltipRef.current.innerHTML = t('doubleClickToFinish');
                return;
            }
        }
        if (event.tool === "polygon") {
            let vertices = event.graphic.geometry.rings[0].length;
            if (vertices && vertices > 2) {
                tooltipRef.current.innerHTML = t('doubleClickToFinish');
                return;
            }
        }


    } else if (event.state === "ready" || event.state === "start") {

        tooltipRef.current.innerHTML = t('clickOnMapToStartDrawing');

    } else if (event.state === "complete") {

        if (sketchTool.state === "ready" && sketchTool.creationMode === "continuous") {
            tooltipRef.current.innerHTML = t('clickOnMapToStartDrawing');
        } 

    } else if (event.state === "cancel") {

        if (sketchTool.state === "ready" && sketchTool.creationMode === "continuous") {
            tooltipRef.current.innerHTML = t('clickOnMapToStartDrawing');
        } 

    }
}