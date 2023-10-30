import React, { useRef, useEffect, useState } from "react";
import maplibregl, { Marker } from "maplibre-gl";
import mapboxgl from "mapbox-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";
import ZoomLevel from "../Components/ZoomLevel";
import geoJson from "../../feature.json";



export default function Map() {
  const mapContainer = useRef(null);

  const lng = 135.502;
  const lat = 34.693;

  const defaultZoomLevel = 14;
  const [zoomLevel, setZoomLevel] = useState<number>(defaultZoomLevel);

  const API_KEY = "UdqcpQrjVZzZzvNptXPW";

  const disabledMarkers = document.querySelector(".disableMarker");
  const enabledMarkers = document.querySelector(".enableMarker");
const geoJson = 
{
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
    }


  


  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current || "",
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: defaultZoomLevel,
    });


    // geoJson.features.map((feature) => new map)
// var featureLayer = L.mapbox.featureLayer(geojson).addTo(map);
// featureLayer.loadUrl()
map.on('load', ()=>{
  map.addSource("japan", {
    type: "geojson",
    data: geoJson
    // {
    //   type: "FeatureCollection",
    //   features: [
    //     {
    //     //   type: "Feature",
    //     //   properties: {},
    //     //   geometry: {
    //     //     type: "Polygon",
    //     //     coordinates: [
    //     //       [
    //     //         [135.3460693359375, 34.709726932134586],
    //     //         [135.4844284057617, 34.59110646239981],
    //     //         [135.54725646972656, 34.79970851207568],
    //     //         [135.41301727294922, 34.77151167170742],
    //     //         [135.3460693359375, 34.709726932134586],
    //     //       ],
    //     //     ],
    //     //   },
    //     // },
    //     // {
    //       type: "Feature",
    //       properties: {
    //         title: "OSAKA",
    //       },
    //       geometry: {
    //         type: "Point",
    //         coordinates: [135.502, 34.693],
    //       },
    //     },
    //     {
    //       type: "Feature",
    //       properties: {
    //         title: "SUITA",
    //       },
    //       geometry: {
    //         type: "Point",
    //         coordinates: [135.529, 34.7614],
    //       },
    //     },
    //     {
    //       type: "Feature",
    //       properties: {
    //         title: "AMAGASAKI",
    //       },
    //       geometry: {
    //         type: "Point",
    //         coordinates: [135.4095, 34.7069],
    //       },
    //     },
    //   ],
    // },
  });
  // map.addLayer({
  //   'id': 'polygone',
  //   'type': 'fill',
  //   'source': 'japan',
  //   'paint': {
  //     "fill-color": '#888888',
  //     "fill-opacity": 0.4,
  //   },
  //   'filter': ['==', '$type', 'Polygon'],
  // });

  map.addLayer({
    'id': 'points',
    'type':'circle',
    'source':'japan',
    'paint': {
      'circle-radius': 6,
      'circle-color': '#B42222'
    },
    'filter': ['==','$type','Point']
  });
})
console.log(geoJson.features)
 const tab: Marker[] = [];
  geoJson.features.forEach((feature) => {
    if (feature.geometry.type === "Point" && feature.geometry.coordinates) {
      const coordinates = feature.geometry.coordinates;
     
       tab.push(new maplibregl.Marker({ color: "#FF0000" })
         .setLngLat([coordinates[0],coordinates[1]])
         .addTo(map));

    }
     disabledMarkers?.addEventListener('click',()=> {
      // const coordinates = feature.geometry.coordinates;
       tab.forEach((marker)=>{
        console.log("marker")
        marker.remove();
       })
    })

       enabledMarkers?.addEventListener("click", () => {
         // const coordinates = feature.geometry.coordinates;
         tab.forEach((marker) => {
           marker.addTo(map);
         });
       });


  });
  map.on("moveend", () => {
    let currentMapZoom = map.getZoom();
    setZoomLevel(Number(currentMapZoom.toFixed(1)));
  });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    // new maplibregl.Marker({ color: "#FF0000" })
    //   .setLngLat([lng, lat])
    //   .addTo(map);
  
    
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
