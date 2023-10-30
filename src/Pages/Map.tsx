import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";
import ZoomLevel from "../Components/ZoomLevel";
import geojson from "geojson";



export default function Map() {
  const mapContainer = useRef(null);

  const lng = 135.502;
  const lat = 34.693;

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
map.on('load', ()=>{
  map.addSource('japan', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
              [
                [135.3460693359375, 34.709726932134586],
                [135.4844284057617, 34.59110646239981],
                [135.54725646972656, 34.79970851207568],
                [135.41301727294922, 34.77151167170742],
                [135.3460693359375, 34.709726932134586],
              ],
            ],
          },
        },
        {
          'type': 'Feature',
          'properties': {
            'title': 'OSAKA',
          },
          'geometry': { 
            'type': 'Point',
            'coordinates': [135.502, 34.693]
          
          },
        },
        {
          'type': 'Feature',
          'properties': {
            'title': 'YODOGAWA',
          },
          'geometry': {
            'type': 'Point',
            'coordinates': [135.291, 34.435],
          },
        },
        {
          'type': 'Feature',
          'properties': {
            'title': 'AMAGASAKI',
          },
          'geometry': {
            'type': 'point',
            'coordinates': [135.25, 34.43],
          },
        },
      ],
    },
  });
  
})


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
