'use strict';
const axios = require('axios');
const Movies = require('./classes/moviesclass');
const cache = require('./cache.js');

async function handleMovie(req, res) {

    if (cache[req.query.searchQuery] && (Date.now() - cache[req.query.searchQuery].timestamp) < 300000) {
        console.log('movie cache hit!');
        res.status(200).send(cache[req.query.searchQuery]);
    } else {
        console.log('movie cache miss');
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${req.query.searchQuery}`
        try {
            let movieResults = await axios.get(url);
            let clientMovie = movieResults.data.results.map(movie => new Movies(movie));
            if (clientMovie) {
                cache[req.query.searchQuery] = clientMovie;
                cache[req.query.searchQuery].timestamp = Date.now();
                res.status(200).send(clientMovie);
            } else {
                res.status(404).send('not found fam');
            }
        } catch (e) {
            res.status(500).send('rip');
        }
    }
}

module.exports = handleMovie;