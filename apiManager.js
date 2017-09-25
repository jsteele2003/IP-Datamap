var request = require('request'); 
var fs = require('fs');
var csv = require("csv");
var parse = require('csv-parse');
var async = require('async');

var ipArcs = [];
var originNames = ["UK", "Japan", "NY", "India"];
var origins = [{latitude: 51.5092, longitude : -0.0955 }, //UK 
               {latitude:35.685 , longitude: 139.7514}, //Japan
               {latitude :40.6614, longitude: -73.9583}, //NY
               {latitude :28.6, longitude: 77.2}]; //India
var fills = ['#DD1C77', '#42FF33', '#33E9FF', "#FF33CE"];

var parser = parse(function(err, data){
     async.eachSeries(data, function asyncIteratee(value, callback) {
        //console.log(value);
        var apiRequest = "http://freegeoip.net/json/" + value;
        var thisArc = new Object;
        thisArc.site = value[0];
        var oIndex = Math.floor(Math.random()*origins.length);
        thisArc.origin = origins[oIndex];
        thisArc.location = originNames[oIndex];
        thisArc.options = {strokeColor : fills[oIndex]};
        
          request(apiRequest, function requestCallback(err, resp, body) {
              if (err) {throw err;}
              
            //console.log(JSON.parse(body));
              thisArc.destination = {
                  latitude : JSON.parse(body).latitude,
                  longitude : JSON.parse(body).longitude,
              }
              //console.log(thisArc);
              ipArcs.push(thisArc);
          });
        
        setTimeout(callback, 50); 
     }, function asyncCallback(){
        //console.log(ipArcs);
        var myJsonString = JSON.stringify(ipArcs);
        console.log(myJsonString);
    })
    
});

fs.createReadStream('data/uniqueUrls.csv').pipe(parser);