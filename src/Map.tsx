import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./Map.css";

// import maplibreGl from "maplibre-gl";

export default function Map() {
  const mapContainer = useRef(null);

  const lng = 139.753;
  const lat = 35.6844;

  let defaultZoomLevel = 14;
  const [zoomLevel, setZoomLevel] = useState<number>(defaultZoomLevel);
  const API_KEY = "UdqcpQrjVZzZzvNptXPW";

  // zoomIn?.addEventListener("click",function(event){
  //   console.log("zoom+")
  //  event.preventDefault();
  // //  setTimeout(() => {
  // //    console.log("zoom+");
  // //  }, 2000);

  //   // defaultZoomLevel+=1
  //   // setZoomLevel(zoomLevel);
  //   // event.preventDefault()

  // })

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current || "",
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: defaultZoomLevel,
    });

    // let getMapZoom = map.getZoom();
    // let getCurrentZoomValue:number;
    // console.log("getMapZoom",getMapZoom);
    // map.on("moveend", function () {
    //   console.log(getMapZoom +=1);
    // });
    // document?.querySelector('maplibregl-ctrl-zoom-in').addEventListener('click', () => {
    //    map.setZoom(getMapZoom +1)    })

    map.on("moveend", () => {
      let getMapZoom = map.getZoom();
      if (getMapZoom !== defaultZoomLevel) {
        console.log("getCurrent", getMapZoom);
        setZoomLevel(Number(getMapZoom.toFixed(1)));
        console.log("afterSet", getMapZoom);
      }
    });

    // map.on("click", ()=>{

    // })

    // console.log("current", zoomLevel);
    map.addControl(new maplibregl.NavigationControl(), "top-right");
    new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat([139.7525, 35.6846])
      .addTo(map);
  }, []);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
      <div className="DisplayZoomLevel">
        <p>
          niveau de zoom:
          <span className="spanZoom">{zoomLevel}</span>
        </p>
      </div>
    </div>
  );
}
