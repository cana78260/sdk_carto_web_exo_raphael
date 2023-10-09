import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";
// import maplibreGl from "maplibre-gl";

export default function Map() {
  const mapContainer = useRef(null);
  // const map = useRef(null);
  const [lng] = useState(139.753);
  const [lat] = useState(35.6844);
  const [zoom] = useState(14);
  const [API_KEY] = useState("9OtZMzivFN1ge2FV3UAL");

  useEffect(() => {
    // if (map.current) return; // stops map from intializing more than once

  const map = new maplibregl.Map({
      container: mapContainer.current || "",
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    
    });
    map.addControl(new maplibregl.NavigationControl(), "top-right");
       new maplibregl.Marker({ color: "#FF0000" })
         .setLngLat([139.7525, 35.6846])
         .addTo(map);
  }, [API_KEY, lng, lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}