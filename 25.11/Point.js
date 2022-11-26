import 'ol/ol.css';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Point from 'ol/geom/Point';
import Overlay from 'ol/Overlay';
import {easeOut} from 'ol/easing';
import {fromLonLat} from 'ol/proj';
import {getVectorContext} from 'ol/render';
import {unByKey} from 'ol/Observable';
import proj4 from 'proj4';
import MultiLineString from 'ol/geom/MultiLineString';

import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';

import { getTopRight, returnOrUpdate } from 'ol/extent';
import {Icon} from 'ol/style';
import * as XLSX from 'xlsx';


//globalThis.drawLines=function(){
  globalThis.pointDetails = [];   
// function init() {
// alert("init in point");
// extractPointDetails() 
// showTable();
// }
globalThis.extractPointDetails=function(properties){
  var array = Object.values(properties);
for (var i = 1; i < 22; i++) {
      //  console.log(properties)
        pointDetails[i-1] = array[i];
     }
  }
      //set_height(34.9039905,32.2995900);
//set_height(34.9029356,32.3007508);
//to read tif file

  globalThis.set_height=async function(lon,lat){ 
const response = await fetch("a1-30m-DEM.tif");
const arrayBuffer = await response.arrayBuffer();
const tiff = await fromArrayBuffer(arrayBuffer);
const imag = await tiff.getImage();
const bbox = imag.getBoundingBox(); 
const pixelWidth = imag.getWidth(); 
const pixelHeight = imag.getHeight(); 
const bboxWidth = bbox[ 2 ] - bbox[ 0 ]; 
const bboxHeight = bbox[ 3 ] - bbox[ 1 ];
const widthPct = ( lon - bbox[ 0 ] ) / bboxWidth;
const heightPct = ( lat - bbox[ 1 ] ) / bboxHeight;
const xPx = Math.floor( pixelWidth * widthPct );
const yPx = Math.floor( pixelHeight * ( 1 - heightPct ) );
const window = [ xPx, yPx, xPx + 1, yPx + 1 ];
const dataHeigth = await imag.readRasters( {window} );
const height_above_ground=dataHeigth[0][0];
return  height_above_ground;
}
 
globalThis.converting_to_wgs84=function(east, north){//the fuction return convert point in arr with lat and lon

 // var firstProjection ="+proj=tmerc +lat_0=31.73439361111111 +lon_0=35.20451694444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 +towgs84=-24.0024,-17.1032,-17.8444,-0.33009,-1.85269,1.66969,5.4248 +units=m +no_defs";
  var firstProjection ="+proj=tmerc +lat_0=31.7343936111111 +lon_0=35.2045169444445 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 +towgs84=-24.0024,-17.1032,-17.8444,-0.33077,-1.85269,1.66969,5.4248 +units=m +no_defs"
  var secondProjection = proj4("WGS84");
  var pointConvertArr=proj4(firstProjection,secondProjection,[east,north]);
  return pointConvertArr;
}