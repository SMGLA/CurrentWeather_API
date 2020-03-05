//jshint esversion:6
const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require ('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res) {
  // res.send("Server is working");
  var query = req.body.cityName;
  const apiKey = "c3f53dee4a3db3b3e19c1addfba0f1a4";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  // const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c3f53dee4a3db3b3e19c1addfba0f1a4&units=metric";
  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      var weatherData = JSON.parse(data);
      var temp = weatherData.main.temp;
      console.log(temp);

      var desc = weatherData.weather[0].description;
      console.log(desc);

      var icon = weatherData.weather[0].icon;
      console.log(icon);

    res.write("<h1>Weather Report</h1>");
    res.write("<p>Current temperature in " + query + " is " + temp + " degrees, with " + desc + ".</p>");
    res.write("<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>");
    res.send();

    });
  });
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
