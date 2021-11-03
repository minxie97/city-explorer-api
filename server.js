'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

app.listen(PORT, ()=>console.log(`listening from ${PORT}`));
app.get('/weather', handleWeather);

function handleWeather(req, res) {
    res.status(200).send(weatherData);
}
