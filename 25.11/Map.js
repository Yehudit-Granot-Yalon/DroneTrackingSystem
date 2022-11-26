import 'ol/ol.css';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { OSM, Vector as VectorSource,Vector } from 'ol/source';
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
import XYZ from 'ol/source/XYZ';

//import * as fs from 'fs';
// , fs = require('fs')
// , Chance = require('chance'),
// WebSocket = require('ws');
//var filename = require('filename');
// import data from './data.json' assert { type: 'JSON' };
//  console.log(data);
//  const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

// const data = loadJSON('./data.json');
// console.info(data.points[0]);
//Importing your data 
// const data = import.meta.glob('data.json')

// //Ref helps with promises I think. I'm sure there are more elegant ways.
// const imp = ref([{}])

// // From https://github.com/vitejs/vite/issues/77
// // by LiuQixuan commented on Jun 20

// for (const path in data) {
//     data[path]().then((mod) => { 
//         imp.value.push(mod)
//     })
// // }
// // 
 import data from './data.json';
 
 
//  globalThis.realTime=function(point){
// alert(point)
// count++;
//  }
//  var count=0;
//alert(data);
//console.log(data);
//  realTime(data.points[count])
 //realTime(data.points[count++])
alert(data.points[0])
//data.points=[];
//const filePromise = import(/* @vite-ignore */ `./${meta.file}.json`);
// alert(filePromise)
// var mydata = JSON.parse(data);
// alert(mydata);


//import * as olLoadingstrategy from 'ol/loadingstrategy';


//import Strategy from 'ol/Map';
//strategies: [new OpenLayers.Strategy.Fixed()],
//globalThis.drawLines=function(){
//alert("map");

// var level=1ף

///////comix start
/**
 * Elements that make up the popup.
 */
 const container = document.getElementById('popup');
 const content = document.getElementById('popup-content');
 const closer = document.getElementById('popup-closer');
 
 

/**
 * Create an overlay to anchor the popup to the map.
 */
 const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};
////////////comix stop


// var map = new ol.Map({
//   layers: [
//     new ol.layer.Tile({
//       // This illustrates a custom tiles source but for using
//       // official OpenStreetMap server new ol.source.OSM()
//       // instead of new ol.source.XYZ(...) is enough
//       source: new ol.source.XYZ({
//         attributions: [
//         ol.source.OSM.ATTRIBUTION,
//           'Tiles courtesy of ' +
//           '<a href="http://openstreetmap.org">' +
//           'OpenStreetMap' +
//           '</a>'
//         ],
//         url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//       })
//     })
//   ],





globalThis.vectorSource = new VectorSource({
 //features: [iconFeature],
 
//  strategies: [new Fixed()],
//   protocol: new OpenLayers.Protocol.HTTP({
//       url: "myosmfile.osm",   //<-- relative or absolute URL to your .osm file
//       format: new OpenLayers.Format.OSM()
//   }),
//   projection: new OpenLayers.Projection("EPSG:4326")







});




globalThis.image = new CircleStyle({
  radius: 5,
  fill: new Fill({color: 'black'}),
  stroke: new Stroke({color: 'red', width: 1}),
  
  // radius: 5,
  // fill: new Fill({color: 'black'}),
  // stroke: new Stroke({ color: 'black', width: 2 }),
});
globalThis.styles = {
  'Point': new Style({
    image: new Icon({
      //anchor: [0.5, 46],
      //anchorXUnits: 'fraction',
     // anchorYUnits: 'pixels',
      src: 'Icons/a2.png',
    }),
  }),
  'MultiLineString': new Style({
    stroke: new Stroke({
      color: 'black',
      width: 2,
    }),
  }),
};
globalThis.styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};

globalThis.vectorLayer = new VectorLayer({
  
  // {
  //   strategies: [new OpenLayers.Strategy.Fixed()],
  //   protocol: new OpenLayers.Protocol.HTTP({
  //       url: "myosmfile.osm",   //<-- relative or absolute URL to your .osm file
  //       format: new OpenLayers.Format.OSM()
    
  //   }
  
  source: vectorSource,
  style: styleFunction,

});











globalThis.tileLayer=new TileLayer({
  
   
    
  //  source: new XYZ({//!!!!!
      // attributions: [
      // //ol.source.OSM.ATTRIBUTION,
      //   'Tiles courtesy of ' +
      //   '<a href="http://openstreetmap.org">' +
      //   'OpenStreetMap' +
      //   '</a>'
      // ],
     // http://localhost/tile/17/78247/53098.png
     // url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    // url: 'http://localhost/tile/{z}/{x}/{y}.png'//!!!!!
   // }),//!!!!
    source: new OSM(),
    wrapX: false,
  })
const israel=fromLonLat([34.90643994, 32.30232145]);
globalThis.view = new View({
  center: israel,
  zoom: 17,
});

globalThis.map = new Map({
  layers: [
    tileLayer,
    vectorLayer,
  ],
  overlays: [overlay],
  target: 'map',
  view: view,
  multiWorld: true,
});

globalThis.dataArr=[];
globalThis.points=[];
globalThis.groupNumberSave=1;




function init() {
  alert("init");
}




globalThis.drawLines=function(){
  var thing = new MultiLineString([points]);
  
  var featurething = new Feature({
    name: "Thing",
    geometry: thing,
  });
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  featurething.setStyle(
    new Style({
      stroke: new Stroke({
        //color: '#2a1f1c',
        color: '#'+randomColor,
        width: 2
      })
    })
  );
  
  vectorSource.addFeature( featurething );
  //vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));
  }
  

  globalThis.put_point_on_map=function(row,startRow){
   // var startRow=2;
  var data_row=[];
  
  var groupNumber=row[startRow+1];
  var lon;
  var lat;
  if(typeOfFile =="new_file"){
  var east=row[startRow+5];
var north=row[startRow+6];
let pointArr=converting_to_wgs84(east,north)
 lon=pointArr[0];
 lat=pointArr[1];
  }
  if(typeOfFile =="ready_file"){
     lon=row[startRow+19];
 lat=row[startRow+18];
  }
const point = new Point(fromLonLat([lon, lat]));
const feature = new Feature(point);

if(groupNumber!=groupNumberSave){
  drawLines();
  points=[fromLonLat([lon, lat])];
  }
  else{
    points.push(fromLonLat([lon, lat]));
  }
  groupNumberSave=groupNumber;
  if(typeOfFile =="new_file"){
 
  set_height(lon,lat).then(val => {
  // got value here
 var height_above_ground=val;
  feature.setProperties({"serial number": row[startRow], "consec trck": row[startRow+1], "buffer": row[startRow+2], "WinN": row[startRow+3],
   "plot number": row[startRow+4],"East": parseFloat(row[startRow+5]).toFixed(0),"North":parseFloat(row[startRow+6]).toFixed(0),"Alt msl(z)":  parseFloat(row[startRow+7]).toFixed(0),
   "range": parseFloat(row[startRow+8]).toFixed(0),"Vx": parseFloat(row[startRow+9]).toFixed(1),"Vy": parseFloat(row[startRow+10]).toFixed(1),
   "Vz": parseFloat(row[startRow+11]).toFixed(1),"V": parseFloat(row[startRow+12]).toFixed(1),"AZ AOA": parseFloat(row[startRow+13]).toFixed(1),
   "EL AOA":parseFloat(row[startRow+14]).toFixed(1),"MRC SNR": parseFloat(row[startRow+15]).toFixed(1),"rMRC": parseFloat(row[startRow+16]).toFixed(2),
  "dMRC":parseFloat(row[startRow+17]).toFixed(2),"Latitude":parseFloat(lat).toFixed(7),"Longitude":parseFloat(lon).toFixed(7),"Height":height_above_ground})
  vectorSource.addFeature(feature);
  map.getView().setCenter( fromLonLat([lon, lat]));
  var i;
  for(i=2;i<=19;i++){
    data_row.push(row[i]);
  }
  data_row.push(lat);
  data_row.push(lon);
  data_row.push(height_above_ground);
  //console.log(data_row);
 dataArr.push(data_row);
  

}).catch(e => {
  // error
  console.log(e);
});; 
  }
  if(typeOfFile =="ready_file"){
    feature.setProperties({"serial number": row[startRow], "consec trck": row[startRow+1], "buffer": row[startRow+2], "WinN": row[startRow+3],
    "plot number": row[startRow+4],"East": parseFloat(row[startRow+5]).toFixed(0),"North":parseFloat(row[startRow+6]).toFixed(0),"Alt msl(z)":  parseFloat(row[startRow+7]).toFixed(0),
    "range": parseFloat(row[startRow+8]).toFixed(0),"Vx": parseFloat(row[startRow+9]).toFixed(1),"Vy": parseFloat(row[startRow+10]).toFixed(1),
    "Vz": parseFloat(row[startRow+11]).toFixed(1),"V": parseFloat(row[startRow+12]).toFixed(1),"AZ AOA": parseFloat(row[startRow+13]).toFixed(1),
    "EL AOA":parseFloat(row[startRow+14]).toFixed(1),"MRC SNR": parseFloat(row[startRow+15]).toFixed(1),"rMRC": parseFloat(row[startRow+16]).toFixed(2),
   "dMRC":parseFloat(row[startRow+17]).toFixed(2),"Latitude":parseFloat(row[startRow+18]).toFixed(7),"Longitude":parseFloat(row[startRow+19]).toFixed(7),"Height":row[startRow+20]})
     //
     feature.setProperties({ "a": row[startRow+0], "b": row[startRow+1], "c": row[startRow+2], "d": row[startRow+3], "e": row[startRow+4],"f": row[startRow+5],"g": row[startRow+6],"h":  row[startRow+7],"i": row[startRow+8],"j": row[startRow+9],"k": row[startRow+10],"l": row[startRow+11],"m": row[startRow+12],"n": row[startRow+13],"o": row[startRow+14],"p": row[startRow+15],"q": row[startRow+16],"r":row[startRow+17],"s":row[startRow+18],"t":row[startRow+19],"u":row[startRow+20]})
     vectorSource.addFeature(feature);
     map.getView().setCenter( fromLonLat([lon, lat]));
  }

 
}

globalThis.put_point_on_map2=function(row){
  var startRow=1;
  var groupNumber= row[startRow+1];
// var lon=row[startRow+19];
// var lat=row[startRow+18];
 var lon=parseFloat(row[startRow+19]).toFixed(3);
 var lat=parseFloat(row[startRow+18]).toFixed(3);
parseFloat(row[startRow+5]).toFixed(0)
const point = new Point(fromLonLat([lon, lat]));
const feature = new Feature(point);

if(groupNumber!=groupNumberSave){
  drawLines();
  points=[fromLonLat([lon, lat])];
  }
  else{
    points.push(fromLonLat([lon, lat]));
  }
  groupNumberSave=groupNumber;
  ;
  
 var startRow=1;
 feature.setProperties({"serial number": row[startRow], "consec trck": row[startRow+1], "buffer": row[startRow+2], "WinN": row[startRow+3],
 "plot number": row[startRow+4],"East": parseFloat(row[startRow+5]).toFixed(0),"North":parseFloat(row[startRow+6]).toFixed(0),"Alt msl(z)":  parseFloat(row[startRow+7]).toFixed(0),
 "range": parseFloat(row[startRow+8]).toFixed(0),"Vx": parseFloat(row[startRow+9]).toFixed(1),"Vy": parseFloat(row[startRow+10]).toFixed(1),
 "Vz": parseFloat(row[startRow+11]).toFixed(1),"V": parseFloat(row[startRow+12]).toFixed(1),"AZ AOA": parseFloat(row[startRow+13]).toFixed(1),
 "EL AOA":parseFloat(row[startRow+14]).toFixed(1),"MRC SNR": parseFloat(row[startRow+15]).toFixed(1),"rMRC": parseFloat(row[startRow+16]).toFixed(2),
"dMRC":parseFloat(row[startRow+17]).toFixed(2),"Latitude":parseFloat(row[startRow+18]).toFixed(7),"Longitude":parseFloat(row[startRow+19]).toFixed(7),"Height":row[startRow+20]})
  //
  feature.setProperties({ "a": row[startRow+0], "b": row[startRow+1], "c": row[startRow+2], "d": row[startRow+3], "e": row[startRow+4],"f": row[startRow+5],"g": row[startRow+6],"h":  row[startRow+7],"i": row[startRow+8],"j": row[startRow+9],"k": row[startRow+10],"l": row[startRow+11],"m": row[startRow+12],"n": row[startRow+13],"o": row[startRow+14],"p": row[startRow+15],"q": row[startRow+16],"r":row[startRow+17],"s":row[startRow+18],"t":row[startRow+19],"u":row[startRow+20]})
  vectorSource.addFeature(feature);
  map.getView().setCenter( fromLonLat([lon, lat]));




 
}


function showTable() {
   
  var str = '<table id="tableOfCountry"';
  str += '<tr>'
  str += '<th><p>' + 'serial <br> number' + '</p></th><th><p>' + 'consec <br> trck' + '</p></th>'+'<th><p>' + '<br> buffer#'+'</p></th>'+'<th><p>' + ' <br> WinN'+'</p></th>'+'<th><p>' + ' plot <br> number'+'</p></th>'
  + '<th><p>' + ' <br> Eest (x)'+'</p></th>' +'<th><p>'+ ' <br> North (y)'+'</p></th>' +'<th><p>' + 'Alt msl <br> (z)'+'</p></th>' +'<th><p>'+ ' <br> range'+'</p></th>'  +'<th><p>'+ ' <br> Vx'+'</p></th>' +'<th><p>' + ' <br> Vy'+'</p></th>' +'<th><p>' + ' <br> Vz'+'</p></th>'
  +'<th><p>' + ' <br>V '+'</p></th>' +'<th><p>' + ' <br>AZ AOA '+'</p></th>' +'<th><p>' + ' <br>EL AOA'+'</p></th>' +'<th><p>' + 'MRC <br>SNR '+'</p></th>' +'<th><p>' + ' <br>rMRC '+'</p></th>'+'<th><p>' + ' <br>dMRC '+'</p></th>' +'<th><p>' + ' <br>Latitude '
  +'<th><p>' + ' <br>Longtitude '+'</p></th>'+'<th><p>' + 'Height <br>(above  <br> ground) '+'</p></th>' ;
  str += '</tr>'
  str += '<tr>'//second row of details
    for (var i = 0; i < 21; ++i) {
      str += '<td><p>' + pointDetails[i] + '</p></td>' ;
    }
  str += '</tr>'
  var tebleDisplayId = document.getElementById("tableDisplay");
  tebleDisplayId.innerHTML=str;
 
  }
  function showShortTable() {
    var str ="";
    var tebleDisplayId = document.getElementById("tableDisplay");
    tebleDisplayId.innerHTML=str;
    str = '<table id="shortTableDisplay"';
    str += '<tr>'
    str += '<th><p>'  + ' <br> East (x)' + '</p></th><th><p>' +  ' <br> North (y)'+ '</p></th>'+'<th><p>' + ' <br> V'+'</p></th>'+'<th><p>' + ' <br> range'+'</p></th>'+'<th><p>' +  'Alt msl <br> (z)'+'</p></th>'
    + '<th><p>' + 'Height <br>(above <br> ground) '+'</p></th>' +'<th><p>'+ ' <br>AZ AOA '+'</p></th>' +'<th><p>' + ' <br>EL AOA'+'</p></th>' ;
    str += '</tr>'
    str += '<tr>'//second row of details
    str += '<td><p>' + pointDetails[5] + '</p></td>' ;
    str += '<td><p>' + pointDetails[6] + '</p></td>' ;
    str += '<td><p>' + pointDetails[12] + '</p></td>' ;
    str += '<td><p>' + pointDetails[8] + '</p></td>' ;
    str += '<td><p>' + pointDetails[7] + '</p></td>' ;
    str += '<td><p>' + pointDetails[20] + '</p></td>' ;
    str += '<td><p>' + pointDetails[13] + '</p></td>' ;
    str += '<td><p>' + pointDetails[14] + '</p></td>' ;
     // for (var i = 0; i < 21; ++i) {
       // str += '<td><p>' + pointDetails[i] + '</p></td>' ;
     // }
    str += '</tr>'
    var tebleDisplayId = document.getElementById("tableDisplay");
    tebleDisplayId.innerHTML=str;
    let lon=pointDetails[19];
    let lat=pointDetails[18];
 
    }
    




























  









//map.getView().setCenter( fromLonLat([32.30302603362039, 34.90598004775353]));




  
 



var x1=34.9035930;
var y2=32.3025085;
function addRandomFeature() {//animation 
  const coordinate = [34.9035930,32.3025085];
   x1+=0.003;
   y2+=0.001;
   i++;
   const location = fromLonLat([x1,y2]);
   
   if(i==30)
   window.clearInterval(myInterval);

   const point = new Point(fromLonLat([x1, y2]));
   const feature = new Feature(point);
   feature.setProperties({ "x": x1, "y": y2, "height": 1000, "velocity": 98, "direction": 80})
    vectorSource.addFeature(feature);

  }
  
  const duration = 3000;
function flash(feature) {
  const start = Date.now();
  const flashGeom = feature.getGeometry().clone();
  const listenerKey = tileLayer.on('postrender', animate);

  function animate(event) {
    const frameState = event.frameState;
    const elapsed = frameState.time - start;
    if (elapsed >= duration) {
      unByKey(listenerKey);
      return;
    }
     const vectorContext = getVectorContext(event);
    const elapsedRatio = elapsed / duration;
    // radius will be 5 at start and 30 at end.
    const radius = easeOut(elapsedRatio) * 25 + 5;
    const opacity = easeOut(1 - elapsedRatio);

    const style = new Style({
      image: new CircleStyle({
        radius: radius,
        stroke: new Stroke({
          color: 'rgba(255, 0, 0, ' + opacity + ')',
          width: 0.25 + opacity,
        }),
      }),
    });

    vectorContext.setStyle(style);
    vectorContext.drawGeometry(flashGeom);
    // tell OpenLayers to continue postrender animation
    map.render();
  }
}

vectorSource.on('addfeature', function (e) {
  flash(e.feature);
});
var i=0;
var myInterval=setInterval(addRandomFeature, 2000);
drawLines();

///////sof animation




map.on('click', function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
     return feature;
   });

   if (feature) {
    var type= feature.getGeometry().getType();
     if(type=="Point"){
       var properties = feature.getProperties()
     extractPointDetails(properties); 
     showTable();
     
      }
    
     } 
 });
 
 
 map.on('pointermove', function (evt) {//mouseover
   const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
     
    return feature;
   });
   if (feature) {
   var type= feature.getGeometry().getType();
    if(type=="Point"){
      // change mouse cursor when over marker
    //  map.on('pointermove', function (e) {
        // const pixel = map.getEventPixel(evt.originalEvent);
        // const hit = map.hasFeatureAtPixel(pixel);
        // map.getTarget().style.cursor = hit ? 'pointer' : '';
      //});

    var properties = feature.getProperties()
    extractPointDetails(properties); 
      showShortTable();
     }
   
    } 
   else {//to hide the popup
    // overlay.setPosition(undefined);
    // closer.blur();
    // return false;
  // var str ="";
  //   var tebleDisplayId = document.getElementById("shortTableDisplay");
  //   tebleDisplayId.innerHTML=str;
    
 }
 });






// const geojsonObject = {
//   'type': 'FeatureCollection',
//   'crs': {
//     'type': 'name',
//     'properties': {
//       'name': 'EPSG:3857',
//     },
//   },
//   'features': [
//     // {
//     //   'type': 'Feature',
//     //   'geometry': {
//     //     'type': 'Point',
//     //     'coordinates':  fromLonLat([-0.12755,51.507222]),
//     //   },
//     // },
//     // {
//     //   'type': 'Feature',
//     //   'geometry': {
//     //     'type': 'LineString',
//     //     'coordinates': [
         
//     //         fromLonLat( [-0.12755,51.507222]),
//     //         fromLonLat( [-0.12755+0.003,51.507222+0.001]),
//     //     ],
//     //   },
//     // },
//   ],
// };
// const vectorSource = new VectorSource({
//   features: new GeoJSON().readFeatures(geojsonObject),
//   wrapX: false,
// });