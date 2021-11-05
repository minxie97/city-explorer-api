'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const handleWeather = require('./weather.js');
const handleMovie = require('./movies.js');
const handleYelp = require('./yelp.js');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

app.get('/weather', handleWeather);
app.get('/movie', handleMovie);
app.get('/yelp', handleYelp);
app.get('./*', (req, res) => res.status(404).send('not found'));

app.listen(PORT, () => console.log(`listening from ${PORT}`));
