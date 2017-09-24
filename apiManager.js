var request = require('request'); 
var fs = require('fs');
var csv = require("csv");
var parse = require('csv-parse');

var ipArcs = [];
var origins = [{latitude: "51.5092", longitude : "-0.0955" }, 
               {latitude:"35.685" , longitude: "139.7514"},
               {latitude :"40.6614", longitude: "-73.9583"}]

var parser = parse(function(err, data){
    var apiRequest = "http://freegeoip.net/json/" + data[1];
    var thisArc = new Object;
    thisArc.site = data[1];
    
      request(apiRequest, function requestCallback(err, resp, body) {
          if (err) {throw err;}
          
        //console.log(JSON.parse(body));
          thisArc.destination = {
              latitude : JSON.parse(body).latitude,
              longitude : JSON.parse(body).longitude,
          }
          console.log(thisArc);
      });
//   data.forEach(function(element){
//       console.log(element);
//   })

    
});

fs.createReadStream('data/uniqueUrls.csv').pipe(parser);