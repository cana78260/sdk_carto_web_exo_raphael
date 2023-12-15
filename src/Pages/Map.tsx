import React, { useRef, useEffect, useState } from "react";
import maplibregl, {  MapLibreGL, Marker } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

import "./Map.css";

import ZoomLevel from "../Components/ZoomLevel";
import MarkerButtons from "../Components/MarkerButtons";



const LNG = 135.502;
const LAT = 34.693;
const DEFAULT_ZOOM_LEVEL = 11;
const API_KEY = "UdqcpQrjVZzZzvNptXPW";



export default function Map() {

  const mapContainer = useRef(null);
  const [zoomLevel, setZoomLevel] = useState<number>(DEFAULT_ZOOM_LEVEL);
 

 const map = useRef<maplibregl.Map|null>(null);

  const geoJson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          title: "OSAKA",
        },
        geometry: {
          type: "Point",
          coordinates: [135.502, 34.693],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "SUITA",
        },
        geometry: {
          type: "Point",
          coordinates: [135.529, 34.7614],
        },
      },
      {
        type: "Feature",
        properties: {
          title: "AMAGASAKI",
        },
        geometry: {
          type: "Point",
          coordinates: [135.4095, 34.7069],
        },
      },
    ],
  };

  useEffect(() => {
    //  const disabledMarkers = document.querySelector(".disableMarker");
    //  const enabledMarkers = document.querySelector(".enableMarker");

      map.current = new maplibregl.Map({
      container: mapContainer.current || "",
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [LNG, LAT],
      zoom: DEFAULT_ZOOM_LEVEL,
    });
   
    
    map.current.on("load", () => {
  
      map.current!.loadImage(
        "marker.png",
        (err, img) => {
          if (err) throw err;
          if (img) map.current!.addImage("marker", img);
          console.log(img);
          map.current!.addSource("japan", {
            type: "geojson",
            data: geoJson,
          });
          map.current!.addLayer({
            id: "japan",
            type: "symbol",
            source: "japan",
            layout: {
              "icon-image": "marker",
              "icon-size": 0.04,
            },
            // filter: ["==", "icon", "cat"],
          });
        }
      );
      // map.addSource("japan", {
      //   type: "geojson",
      //   data: geoJson,
      // });

      // map.addLayer({
      //   id: "points",
      //   type: "circle",
      //   source: "japan",
      //   paint: {
      //     "circle-radius": 6,
      //     "circle-color": "#B42222",
      //   },
      //   filter: ["==", "$type", "Point"],
      // });
    });
    console.log("feature", geoJson.features);
    // const tab: Marker[] = [];
    // geoJson.features.forEach((feature) => {
    // const marker = document.createElement("div");
    // marker.className = "marker";
    // if (feature.geometry.type === "Point" && feature.geometry.coordinates) {
    // const coordinates = feature.geometry.coordinates;
    // enabledMarkers?.addEventListener("click", () => {
    //   map.addLayer()

    //   disabledMarkers?.addEventListener("click", () => {
    //     map.removeLayer()
    //   });

    // new maplibregl.Marker({ element: marker })
    //   .setLngLat([coordinates[0], coordinates[1]])
    //   .addTo(map);
    // });
    // }
    // if (feature.geometry.type === "Point" && feature.geometry.coordinates) {
    //   const coordinates = feature.geometry.coordinates;

    //   tab.push(
    //     new maplibregl.Marker({ color: "#FF0000" })
    //       .setLngLat([coordinates[0], coordinates[1]])
    //       .addTo(map)
    //   );
    // }
    //visibility: "visible"| "none"

    // disabledMarkers?.addEventListener("click", () => {
    //   tab.forEach((marker) => {
    //     marker.remove();
    //   });
    // });

    // enabledMarkers?.addEventListener("click", () => {
    //   tab.forEach((marker) => {
    //     marker.addTo(map);
    //   });
    // });
    // });

    map.current.on("moveend", () => {
      let currentMapZoom = map.current!.getZoom();
      setZoomLevel(Number(currentMapZoom.toFixed(1)));
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    // setEnableLayerEventButton(enableEventButton)
  
  }, []);

const disableEventButton = (e: React.MouseEvent<HTMLButtonElement>) => {
  if (e) map.current!.setLayoutProperty("japan", "visibility", "none");
};


    const enableEventButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    map.current!.setLayoutProperty("japan", "visibility", "visible");

    };



  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
      <div className="DisplayZoomLevel">
        <p>
          <ZoomLevel zoom={zoomLevel} />
        </p>
      </div>
      <div>
        <MarkerButtons
          handleEnableClickProps={enableEventButton}
          handleDisableClickProps={disableEventButton}
        />
      </div>
    </div>
  );
}
