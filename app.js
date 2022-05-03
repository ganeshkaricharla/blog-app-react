const express = require("express")
const https = require("https")
const bodyParser = require("body-parser");


const apikey = "910737fc08010873cc25c1d4514e14af";

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/", function (req, res) {
    var path = __dirname + "\\index.html";
    res.sendFile(path);
});

app.post("/", function (req, res) {
    const city = req.body.cityName;
    const units = "metric";
    const endpoint = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey + "&units =" + units;
    https.get(endpoint, function (response) {
        console.log(response.statusCode)

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;

            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>Location:"+ city +" and Temperature :" + temp + "Celsius and Description:" + weatherDescription + "</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        })
        
    })
    
})




app.get("/", function (req, res) {
    console.log(endpoint)
    https.get(endpoint, function (response) {
        console.log(response.statusCode)

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;

            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>Location:London and Temperature :" + temp + "Kelvins and Description:" + weatherDescription + "</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        })
    })
})


app.listen(3000, function () {
    console.log("Server is up and running");
})