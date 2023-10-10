import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";
// import maplibreGl from "maplibre-gl";

export default function Map() {

  const mapContainer = useRef(null);
  // const map = useRef(null);
  const lng =139.753;
  const lat = 35.6844;
  const zoom = 14;
  const API_KEY = "9OtZMzivFN1ge2FV3UAL";

  useEffect(() => {


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
      <div className="DisplayZoomLevel">
        <p>
          niveau de zoom: <span className="spanZoom">{zoom}</span>
        
        </p>
      </div>
    </div>
  );
}
