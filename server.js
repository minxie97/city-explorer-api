'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT;

app.get('/weather', handleWeather);
app.get('/movie', handleMovie);
app.get('./*', (req, res) => res.status(404).send('not found'));

class Forecast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}

class Movies {
    constructor(obj) {
        this.title = obj.title;
        this.overview = obj.overview;
        this.averageVotes = obj.vote_average;
        this.totalVotes = obj.vote_count;
        this.imageUrl = `https://image.tmdb.org/t/p/w500${obj.poster_path}`;
        this.popularity = obj.popularity;
        this.releast = obj.release_date;
    }
}

async function handleWeather(req, res) {

    const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.lat}&lon=${req.query.lon}&key=${process.env.WEATHER_API_KEY}`
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

async function handleMovie(req, res) {

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${req.query.searchQuery}`
    try {
        let movieResults = await axios.get(url);
        let clientMovie = movieResults.data.results.map(movie => new Movies(movie));
        if (clientMovie) {
            res.status(200).send(clientMovie);
        } else {
            res.status(404).send('not found fam');
        }
    } catch (e) {
        res.status(500).send('rip');
    }

}

app.listen(PORT, () => console.log(`listening from ${PORT}`));
