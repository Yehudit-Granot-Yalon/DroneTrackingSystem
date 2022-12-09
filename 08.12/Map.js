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
import MultiLineString from 'ol/geom/MultiLineString';
import XYZ from 'ol/source/XYZ';

import { getTopRight, returnOrUpdate } from 'ol/extent';
import {Icon} from 'ol/style';

import {KalmanFilter} from 'kalman-filter'


globalThis.newFile="new_file";
globalThis.readyFile="ready_file";
globalThis.realTime="realTime";
 const observations = [];
 //const retracking
 
 
//
//globalThis.typeOfFile = "";
function enterArrKalman(point){
  observations.push(point)
  console.log(" observations",observations);
const kFilter = new KalmanFilter({observation: 2});
 
const res = kFilter.filterAll(observations)

console.log("res",res)
return res[res.length-1];
  //return observations[observations[observations.length-1]];
}




 

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







globalThis.vectorSource = new VectorSource({
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
  // 'Point': new Style({
  //   image: image,
  // }),
  'Point': new Style({
    image: new Icon({
        //anchor: [0.5, 46],
        //anchorXUnits: 'fraction',
       // anchorYUnits: 'pixels',
        src: 'Icons/a2.png',
      }),
    
   }),
  // image: new Icon({
    //   //anchor: [0.5, 46],
    //   //anchorXUnits: 'fraction',
    //  // anchorYUnits: 'pixels',
    //   src: 'Icons/a2.png',
    // }),
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
  source: vectorSource,
  style: styleFunction,

});











globalThis.tileLayer=new TileLayer({
  
   
    
    //source: new XYZ({//!!!!!
      // attributions: [
      // //ol.source.OSM.ATTRIBUTION,
      //   'Tiles courtesy of ' +
      //   '<a href="http://openstreetmap.org">' +
      //   'OpenStreetMap' +
      //   '</a>'
      // ],
     // http://localhost/tile/17/78247/53098.png
     // url: 'http://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  //  url: 'http://localhost/tile/{z}/{x}/{y}.png'//!!!!!
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
  
  
  globalThis.row_to_arr=function(row,startRow){
    var dataExcelPoint=[];
    var numValues;
    if(typeOfFile==newFile){
      numValues=18
    }
    if(typeOfFile==readyFile){
      numValues=20
    }


    for(var i=startRow;i<numValues+startRow;i++){
     dataExcelPoint.push(row[i]);
    
    }
return  dataExcelPoint;
  }


  
  
  var countPoint=0;
 
 
  globalThis.put_point_on_map3=function(row){
 // var startRow=2;
 countPoint++;
 var data_row=[];
  
 var groupNumber=row[1];
 var lon;
 var lat;
 if(typeOfFile ==newFile||typeOfFile ==realTime){
 var east=row[5];
var north=row[6];
//var itmPoint=[east,north]
//let pointArr=enterArrKalman(itmPoint);
//console.log("kalman",pointArr[0]);
var pointAfrerConvert=converting_to_wgs84(east,north);
var pointsAfterFilter=enterArrKalman(pointAfrerConvert);
lon=pointsAfterFilter[0];
lat=pointsAfterFilter[1];
 }
 if(typeOfFile ==readyFile){
    lon=row[19];
    lat=row[18];
    console.log("lon",lon)
    console.log("lat",lat)
 }
const point = new Point(fromLonLat([lon, lat]));

//
//point.setStyle();
// if(countPoint>-1){
//   vectorSource.getFeatures()[countPoint].setStyle(new ({
//   image: new Style({
//     image: image,
//   })
// }));
// }
countPoint++;
const feature = new Feature(point);


//feature.setId( countPoint);//!!!!!
if(groupNumber!=groupNumberSave){
 drawLines();
 points=[fromLonLat([lon, lat])];
 }
 else{
   points.push(fromLonLat([lon, lat]));
 }
 groupNumberSave=groupNumber;
 if(typeOfFile ==newFile||typeOfFile ==realTime){

 set_height(lon,lat).then(val => {
 // got value here
var height_above_ground=val;
 feature.setProperties({"serial number": row[0], "consec trck": row[1], "buffer": row[2], "WinN": row[3],
  "plot number": row[4],"East": parseFloat(row[5]).toFixed(0),"North":parseFloat(row[6]).toFixed(0),"Alt msl(z)":  parseFloat(row[7]).toFixed(0),
  "range": parseFloat(row[8]).toFixed(0),"Vx": parseFloat(row[9]).toFixed(1),"Vy": parseFloat(row[10]).toFixed(1),
  "Vz": parseFloat(row[11]).toFixed(1),"V": parseFloat(row[12]).toFixed(1),"AZ AOA": parseFloat(row[13]).toFixed(1),
  "EL AOA":parseFloat(row[14]).toFixed(1),"MRC SNR": parseFloat(row[15]).toFixed(1),"rMRC": parseFloat(row[16]).toFixed(2),
 "dMRC":parseFloat(row[17]).toFixed(2),"Latitude":parseFloat(lat).toFixed(7),"Longitude":parseFloat(lon).toFixed(7),"Height":height_above_ground})
 feature.setId(countPoint)
 vectorSource.addFeature(feature);
//  if(countPoint>1){

//   // featurething.setStyle(
//   //   new Style({
//   //     stroke: new Stroke({
//   //       //color: '#2a1f1c',
//   //       color: '#'+randomColor,
//   //       width: 2
//   //     })
//   //   })
//   // );
//   console.log(vectorSource.getFeatureById(countPoint-1))
//   vectorSource.getFeatureById(countPoint-1).setStyle(
//   //   {
//    new Style({
//     image: image,
//   }),
//   //     image: new Icon({
//   //         //anchor: [0.5, 46],
//   //         //anchorXUnits: 'fraction',
//   //        // anchorYUnits: 'pixels',
//   //         src: 'Icons/a2.png',
//   //       }),
      
//   //    }

//   )


  
  
//  }
//console.log(vectorSource.getFeaturesAtCoordinate([lon, lat]));
//console.log(vectorSource.getFeatures().;
//console.log(vectorSource.getFeatures());
 
 var i;
 for(i=0;i<=17;i++){
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


 if(typeOfFile ==readyFile){
  console.log("redy file");
   feature.setProperties({"serial number": row[0], "consec trck": row[1], "buffer": row[2], "WinN": row[3],
   "plot number": row[4],"East": parseFloat(row[5]).toFixed(0),"North":parseFloat(row[6]).toFixed(0),"Alt msl(z)":  parseFloat(row[7]).toFixed(0),
   "range": parseFloat(row[8]).toFixed(0),"Vx": parseFloat(row[9]).toFixed(1),"Vy": parseFloat(row[10]).toFixed(1),
   "Vz": parseFloat(row[11]).toFixed(1),"V": parseFloat(row[12]).toFixed(1),"AZ AOA": parseFloat(row[13]).toFixed(1),
   "EL AOA":parseFloat(row[14]).toFixed(1),"MRC SNR": parseFloat(row[15]).toFixed(1),"rMRC": parseFloat(row[16]).toFixed(2),
  "dMRC":parseFloat(row[17]).toFixed(2),"Latitude":parseFloat(row[18]).toFixed(7),"Longitude":parseFloat(row[19]).toFixed(7),"Height":row[20]})
    //
    //feature.setProperties({ "a": row[startRow+0], "b": row[startRow+1], "c": row[startRow+2], "d": row[startRow+3], "e": row[startRow+4],"f": row[startRow+5],"g": row[startRow+6],"h":  row[startRow+7],"i": row[startRow+8],"j": row[startRow+9],"k": row[startRow+10],"l": row[startRow+11],"m": row[startRow+12],"n": row[startRow+13],"o": row[startRow+14],"p": row[startRow+15],"q": row[startRow+16],"r":row[startRow+17],"s":row[startRow+18],"t":row[startRow+19],"u":row[startRow+20]})
    
    //map.getView().setCenter( fromLonLat([lon, lat]));
 }
 
 
    vectorSource.addFeature(feature);
    //console.log(vectorSource.getFeatureById(countPoint));
 
 map.getView().setCenter( fromLonLat([lon, lat]));





  }
  
  
  
  
var tebleDisplayId = document.getElementById("tableDisplay");
globalThis.showEmptyTable=function() {
  var str = '<table id="tableOfCountry"';
  str += '<tr>'
  str += '<th><p>' + 'serial <br> number' + '</p></th><th><p>' + 'consec <br> trck' + '</p></th>'+'<th><p>' + '<br> buffer#'+'</p></th>'+'<th><p>' + ' <br> WinN'+'</p></th>'+'<th><p>' + ' plot <br> number'+'</p></th>'
  + '<th><p>' + ' <br> Eest (x)'+'</p></th>' +'<th><p>'+ ' <br> North (y)'+'</p></th>' +'<th><p>' + 'Alt msl <br> (z)'+'</p></th>' +'<th><p>'+ ' <br> range'+'</p></th>'  +'<th><p>'+ ' <br> Vx'+'</p></th>' +'<th><p>' + ' <br> Vy'+'</p></th>' +'<th><p>' + ' <br> Vz'+'</p></th>'
  +'<th><p>' + ' <br>V '+'</p></th>' +'<th><p>' + ' <br>AZ AOA '+'</p></th>' +'<th><p>' + ' <br>EL AOA'+'</p></th>' +'<th><p>' + 'MRC <br>SNR '+'</p></th>' +'<th><p>' + ' <br>rMRC '+'</p></th>'+'<th><p>' + ' <br>dMRC '+'</p></th>' +'<th><p>' + ' <br>Latitude '
  +'<th><p>' + ' <br>Longtitude '+'</p></th>'+'<th><p>' + 'Height <br>(above  <br> ground) '+'</p></th>' ;
  str += '</tr>'
  str += '<tr>'//second row of details
  for (var i = 0; i < 21; ++i) {
    str += '<td><p>' +'|'+'</p></td>' ;
  }
str += '</tr>'
var tebleDisplayId = document.getElementById("tableDisplay");
tebleDisplayId.innerHTML=str;




}

showEmptyTable();



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
 tebleDisplayId.innerHTML=str;
 //tebleDisplayId.innerHTML="7";
  }
  function showShortTable() {
    var str ="";
    //var tebleDisplayId = document.getElementById("tableDisplay");
    //tebleDisplayId.innerHTML=str;
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
    
 
    }


var savePoints=[0, 0, 1, 2, 4, 0, 0, 79.1195212511709, 98.5, 0.138878751851735, -7.91738065332174, -0.186484577293029, 7.92079416566783, 6.5, -10.5, 15.0035758309174, 19.72, 73.9482064258576];

var numDroneToStop=-1;
function setRandomPoint(json) {
  var serialNumber=json.points[0][0];
  var groupDrone=json.points[0][1];
  console.log("new point",json.points[0])
console.log("save point",savePoints)
// if(savePoints[0]==0&&countRealTimePoint==0){//mikre kaze no data but show save point
//   countRealTimePoint++;
//   console.log("the save point still from example")
// return;
// }


if(ifStopDrone==true){
  numDroneToStop=groupDrone;
console.log("next numDroneToStop",numDroneToStop)
ifStopDrone=false;
//   if(json.points[0][1]==savePoints[1])
 }
  
 
if(serialNumber==savePoints[0]){
  console.log("same point not do");
 }


 if(serialNumber!=savePoints[0]){
  if(savePoints[0]!=0){
  
  if(groupDrone==numDroneToStop){
    console.log("stop it!!!! numDroneToStop",numDroneToStop)
  }

  
  if(groupDrone!=numDroneToStop){
  console.log(json.points[0][0]);
    console.log("new point")
   
    put_point_on_map3(json.points[0]);
  }
    
    
   
}
}


savePoints=json.points[0];///////////
}
    
   
function addRandomFeature() {//animation 
      fetch('./data.json')
      .then((response) => response.json())
      .then((json) => setRandomPoint(json)
      )
    }

    document.getElementById("realTime").addEventListener("click", actRealTime);
    globalThis.realTimeState=false;
    var myInterval;
    document.getElementById('stopDrone').style.visibility = 'hidden';
    function actRealTime() {
      console.log(realTimeState)
      var strReal=document.getElementById("realTime")
      
      if(realTimeState==false){
        typeOfFile  = realTime;
        dataArr = [];//If the arr not empty because another real time
        dataArr.push(firstRow);// enter title row
       // vectorSource
    vectorSource.on('addfeature', function (e) {
  flash(e.feature);

  
});
    strReal.innerHTML="Stop Real Time!";
   
    document.getElementById('stopDrone').style.visibility = 'visible';
       myInterval=setInterval(addRandomFeature, 5000);
      realTimeState=true;
      typeOfFile=realTime;
    
    }
      else{ 
       
        realTimeState=false;
        drawLines();
        strReal.innerHTML="Real Time!";
        document.getElementById('stopDrone').style.visibility = 'hidden';
        window.clearInterval(myInterval);
       

      }
    }

    document.getElementById("stopDrone").addEventListener("click", stopDroneInRealTime);
    var ifStopDrone=false;
    
    var myInterval;
    function  stopDroneInRealTime() {
      ifStopDrone=true;
      
      console.log("stop drone number")
      
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

// vectorSource.on('addfeature', function (e) {
//   flash(e.feature);
// });
var i=0;

drawLines();

///////sof animation

//


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
      // else{
      //   showEmptyTable()
      // }
    
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
      const coordinate = evt.coordinate;
      var properties = feature.getProperties()
  
 extractPointDetails(properties); 
// console.log(pointDetails[0]);
 
   const str="Lat: "+pointDetails[18]+"<br>Lon: "+pointDetails[19]+"<br>AGL: "+pointDetails[20]+"<br>Velocity: "+pointDetails[12]+"<br>Range: "+pointDetails[8]
   content.innerHTML = '<p>Coordinate Details</p><code>' + str + '</code>';
  overlay.setPosition(coordinate);
     
    //   showShortTable();
     }
   
    } 
   else {
    
    
    
    //to hide the popup
    overlay.setPosition(undefined);
    closer.blur();
    return false;
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