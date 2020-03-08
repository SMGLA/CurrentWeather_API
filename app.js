//jshint esversion: 6
const express = require('express');
const app = express();
const https = require('https');

app.get("/", (req,res) => {

  const url = "https://api.openweathermap.org/data/2.5/weather?q=Glasgow,uk&appid=c3f53dee4a3db3b3e19c1addfba0f1a4&units=metric";
  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      var weatherData = JSON.parse(data);
      var temp = weatherData.main.temp;
      console.log(temp);

      var desc = weatherData.weather[0].description;
      console.log(desc);

      var icon = weatherData.weather[0].icon;
      console.log(icon);

    res.write("<h1>Weather Forecast</h1>");
    res.write("<p>Current temperature in Glasgow is " + temp + " degrees, with " + desc + ".</p>");
    res.write("<img src='http://openweathermap.org/img/wn/" + icon + "@2x.png'>");
    res.send();
  });
});
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
