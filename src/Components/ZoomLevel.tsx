import React from "react";
import "./ZoomLevel.css";

 interface ZoomLevelProps {
 
  zoom: number;
 }


const ZoomLevel = ({zoom}: ZoomLevelProps) =>{


     return (
       <div>
         <p>
           niveau de zoom:
           <span className="spanZoom">{zoom}</span>
         </p>
       </div>
     );
    
    }
   

export default ZoomLevel;