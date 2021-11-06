'use strict';
const axios = require('axios');
const Forecast = require('./classes/forecastclass');
const cache = require('./cache.js');

async function handleWeather(req, res) {

    if (cache[req.query.lat, req.query.lon] && (Date.now() - cache[req.query.lat, req.query.lon].timestamp) < 300000) {
        console.log('weather cache hit!');
        res.status(200).send(cache[req.query.lat, req.query.lon]);
    } else {
        console.log('weather cache miss');
        const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.lat}&lon=${req.query.lon}&key=${process.env.WEATHER_API_KEY}&units=I&days=7`
        try {
            let weatherResults = await axios.get(url);
            let clientWeather = weatherResults.data.data.map(weather => new Forecast(weather));
            if (clientWeather) {
                cache[req.query.lat, req.query.lon] = clientWeather;
                cache[req.query.lat, req.query.lon].timestamp = Date.now();
                res.status(200).send(clientWeather);
            } else {
                res.status(404).send('not found fam');
            }
        } catch (e) {
            res.status(500).send('Error: Could not locate weather data on server.')
        }
    }
}

module.exports = handleWeather;