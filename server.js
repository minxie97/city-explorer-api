'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`listening from ${PORT}`));
app.get('/weather', handleWeather);

class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}

function handleWeather(req, res) {
    
    let weatherArr = [];

    let weatherResult = weatherData.find(element => element.city_name.toLowerCase() === req.query.searchQuery && Math.round(Number(element.lat)) === Math.round(Number(req.query.lat)) && Math.round(Number(element.lon)) === Math.round(Number(req.query.lon))); 

    if (weatherResult) {
        let cityData = weatherData.find(element => element.city_name.toLowerCase() === req.query.searchQuery);
        for (let i = 0; i < cityData.data.length; i++) {
            let forecast = new Forecast(cityData.data[i].datetime, cityData.data[i].weather.description);
            weatherArr.push(forecast);
        }
        res.status(200).send(weatherArr);
    } else {
        res.status(500).send('Error: Could not locate weather data on server.')
    }

}
