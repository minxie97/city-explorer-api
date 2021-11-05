'use strict';
const axios = require('axios');
const Forecast = require('./classes/forecastclass');

async function handleWeather(req, res) {

    const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.lat}&lon=${req.query.lon}&key=${process.env.WEATHER_API_KEY}&days=7`
    try {
        let weatherResults = await axios.get(url);
        let clientWeather = weatherResults.data.data.map(weather => new Forecast(weather.datetime, weather.weather.description));
        if (clientWeather) {
            res.status(200).send(clientWeather);
        } else {
            res.status(404).send('not found fam');
        }
    } catch (e) {
        res.status(500).send('Error: Could not locate weather data on server.')
    }
}

module.exports = handleWeather;