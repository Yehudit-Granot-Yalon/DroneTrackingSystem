

import { io } from "socket.io-client";
// import {  express  } from "express";

// var express = require('express')
//  http = require('http')
// , os = require('os')
// , path = require('path')
//import { fs } from "fs";
import * as fs from 'fs';
// , fs = require('fs')
// , Chance = require('chance'),
// WebSocket = require('ws');
//var filename = require('filename');
// import data from './data.json' assert { type: 'JSON' };
//  console.log(data);
 const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const data = loadJSON('./data.json');
const fileName = 'data.json';

// import filename from "filename";
//  var file= filename("data.json");
// // equal
// var name = filename(__filename);


//const file = require(fileName);

// import file from "filename";



data.points=[];
var ioClient = io.connect("http://localhost:8000");

ioClient.on("seq-num", (msg) =>{
    console.info(msg);
   // data.points[data.points.length-1]=msg;
   data.points.push(msg);
   //data.numPoint.push(2);
    //file.data[0]=msg;
    //console.info(msg);
    fs.writeFile(fileName, JSON.stringify(data), function writeJSON(err) {
        if (err) return console.log(err);
    
    }); 
    
    

}
);
