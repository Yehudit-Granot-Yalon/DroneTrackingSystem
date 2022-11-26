import Excel from 'exceljs';
import 'ol/ol.css';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Overlay from 'ol/Overlay';
import { easeOut } from 'ol/easing';
import { fromLonLat } from 'ol/proj';
import { getVectorContext } from 'ol/render';
import { unByKey } from 'ol/Observable';
import proj4 from 'proj4';
import MultiLineString from 'ol/geom/MultiLineString';
import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
import Point from 'ol/geom/Point';
import { getTopRight, returnOrUpdate } from 'ol/extent';
import { Icon } from 'ol/style';
import * as XLSX from 'xlsx';
globalThis.typeOfFile = "";
function init() {
  // alert("init indefine"+level);
}

const input1 = document.getElementById('file');
input1.onchange = async function (e) {
  
  var placeToStart;
  this.file = e.target.files[0]
  const wb = new Excel.Workbook();
  const reader = new FileReader()
  reader.readAsArrayBuffer(this.file)
  reader.onload = () => {
    const buffer = reader.result;
    wb.xlsx.load(buffer).then(workbook => {
      workbook.eachSheet((sheet, id) => {
        
        var startRow="";
        sheet.eachRow((row, rowIndex) => {

         // var startRow;
          for (var i = 1; i < 10; i++) {
            if (row.values[i] == "serial number") {
              placeToStart = rowIndex;
              startRow=i;
              if (row.values[i + 20] == "Height(above ground)")
                typeOfFile  = "ready_file"
                else
                typeOfFile  = "new_file"
              break;

            }
          }
          if (typeOfFile  == "new_file") {
            
            //function search start row
            if (rowIndex == placeToStart) {
             
              var firstRow = [];
              for (var j = 2; j <= 19; j++)
                firstRow.push(row.values[j]);
              firstRow.push("Latitude");
              firstRow.push("Longtitude");
              firstRow.push("Height(above ground)");
              data.push(firstRow);

            }
           
        
        }
        if (rowIndex > placeToStart && row.values[startRow] != undefined) {
          put_point_on_map(row.values,startRow);
        }
          
          
          })

      }
      )
      drawLines();//for last group of point after rows stop
    })
  }

}


function cleanMap() {
  document.getElementById('file').value= null;
  vectorLayer.getSource().clear();
  data = [];
  typeOfFile ="";
  document.getElementById('tableDisplay').innerHTML="";
 	
}
document.getElementById("cleanMap").addEventListener("click", cleanMap);




document.getElementById("writeToExel").addEventListener("click", DownloadFile);
function DownloadFile() {

   if( document.getElementById('file').value=="")
   {
  alert("no data in map");
   }
  else if (typeOfFile  == "ready_file") {

 alert("The file already exists");
   }
   else{
data.sort(sortFunction);//sort the point order to serial number
console.log(data)

  var wb = XLSX.utils.book_new();
  var worksheet = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, worksheet, "page1");
  /* generate array buffer */
  var wbout = XLSX.write(wb, { type: "array", bookType: 'xlsx' });
  /* create data URL */
  var url = URL.createObjectURL(new Blob([wbout], { type: 'application/octet-stream' }));
  /* trigger download with chrome API */
  //chrome.downloads.download({ url: url, filename: "testsheet.xlsx", saveAs: true });
  let filename = "testsheet.xlsx";
  //let text = "Text of the file goes here.\n1";
  let blob = new Blob([wbout], { type: 'application/octet-stream' });
  let link = document.createElement("a");
  link.download = filename;
  //link.innerHTML = "Download File";
  link.href = window.URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(link.href);
  }, 100);
}
}

function sortFunction(a, b) {
  if (a[0] === b[0]) {
      return 0;
  }
  else {
      return (a[0] < b[0]) ? -1 : 1;
  }
}
























