import React, { useRef, useEffect, useState } from "react";
import maplibregl, { MapLibreGL, Marker } from "maplibre-gl";

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

  const map = useRef<maplibregl.Map | null>(null);

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
      if (map.current) {
        map.current.loadImage("marker.png", (err, img) => {
          if (map.current) {
            if (err) throw err;
            if (img) map.current!.addImage("marker", img);
            console.log(img);
            map.current.addSource("japan", {
              type: "geojson",
              data: geoJson,
            });
            map.current.addLayer({
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
        });
      }
    });

    map.current.on("moveend", () => {
      let currentMapZoom = map.current!.getZoom();

      setZoomLevel(Number(currentMapZoom.toFixed(1)));
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");

    //---------------------------------------------------!!!!!!!!!!!!!!!!!!-------------------------------------------------------
    //La clean-up fonction permet d'éviter les effets de bord éventuels lors de la fin du cycle de vie du composant, le double render inhérent aux nouvelles versions de react est géré via ces fonctions
    //React 18 introduit la notion d'accès concurrent aux renders qui ne sont plus séquentiels (on n'attend plus la fin d'un render pour passer à un autre => blocking rendering/concurrent features)
    //Il réduit les ré-renders à 1 seul si un groupe de setters (setLoading(...), setError(...), setData(...)) se trouvent dans une promesse, un setTimeout() ou un eventhandler natif
    //  <Suspense fallback={<.../>}>
    //     <myComponent/>
    //  </Suspense> permet d'introduire avec un code limité les echecs éventuels ou différer le render d'un composant lent car complexe à render ou issu d'une connexion lente côté client
    //Gérer le caractère urgent ou non-urgent d'un state avec startTransition(()=>{setState(...)})
    //----------------------------------------------------------------------------------------------------------------------------
    return () => {
      map.current?.remove();
    };
  }, []);

  const disableEventButton = () => {
    map.current?.setLayoutProperty("japan", "visibility", "none");
  };

  const enableEventButton = () => {
    map.current?.setLayoutProperty("japan", "visibility", "visible");
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
