import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";
import ZoomLevel from "../Components/ZoomLevel";
import geojson from "geojson";



export default function Map() {
  const mapContainer = useRef(null);

  const lng = 139.753;
  const lat = 35.6844;

  const defaultZoomLevel = 14;
  const [zoomLevel, setZoomLevel] = useState<number>(defaultZoomLevel);

  const API_KEY = "UdqcpQrjVZzZzvNptXPW";



  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current || "",
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: defaultZoomLevel,
    });

// var featureLayer = L.mapbox.featureLayer(geojson).addTo(map);
// featureLayer.loadUrl()

  map.on("moveend", () => {
    let currentMapZoom = map.getZoom();
    setZoomLevel(Number(currentMapZoom.toFixed(1)));
  });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([lng, lat])
      .addTo(map);
  }, []);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
      <div className="DisplayZoomLevel">
        <p>
          <ZoomLevel zoom={zoomLevel} />
        </p>
      </div>
    </div>
  );
}
