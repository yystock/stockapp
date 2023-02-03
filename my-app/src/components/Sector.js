import React from "react";
import SectorRotation from "./SectorRotation";
import SectorIntraday from "./SectorIntraday";
import SectorHeatMap from "./chart/SectorHeatmap"
function Sector(){
   
    return (
        <div className="sector-page">
       
        <div className="sector-left">
           <div><h1>Sector</h1></div>
            <SectorRotation/>
            <h4>Sector Heatmap</h4><SectorHeatMap/>
        </div>
        <div className="sector-right">
            <SectorIntraday/>
        </div>       
        </div>
        )
}
export default Sector;