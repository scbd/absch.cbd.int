import attribution from './attribution.html';
import L from   'leaflet';
import 'proj4leaflet';


var my_EPSG_4326 = new L.Proj.CRS(
    "EPSG:4326","+proj=longlat +datum=WGS84 +no_defs +type=crs", {
          origin: [-180, 90],
          resolutions: [
            0.5625,
            0.28125,
            0.140625,
            0.0703125,
            0.03515625,
            0.017578125,
            0.0087890625,
            0.00439453125,
            0.002197265625
          ],
          bounds: L.bounds(
            L.point(-180, -90),
            L.point(180, 90)
          )
    }
);    

export const mapConfig = {
    tileLayer: 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/BlueMarble_ShadedRelief_Bathymetry/default//500m/{z}/{y}/{x}.jpeg',
    maxZoom : 7,
    tileSize: 512,
    attribution: attribution,
    worldCopyJump: true,
    crs: my_EPSG_4326,
    reuseTiles : true, 
    repeatingX : true,
};
