const express=require("express");
const app=express();
const https = require('https');//native node module to send request from our server to external api
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html");

})

app.listen(3000,function(){
  console.log("Server running on port 3000.");
});

app.post("/",function(req,res){
var cityName=req.body.cityName;
const apiKey="f7de3772b5f3210997f26e6d23967c09";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName+"&appid=" +apiKey;//external api for openweather
https.get(url, function(response){

    response.on("data",function(data){
      const weatherData=JSON.parse(data);//JSON.parse converts data string to JSON object
      // JSON.stringify converts JSON object to String format
      const temp=weatherData.main.temp;
      const description=weatherData.weather[0].description;
      const iconid=weatherData.weather[0].icon;
      const imageUrl= "http://openweathermap.org/img/wn/"+iconid+"@2x.png";
      res.write("<h1>Temp is " + temp +"</h1>")
      res.write("<p>Weather Description: "+description+"</p>");
      res.write("<img src="+imageUrl+">");
      res.send();
    })
  })

})
