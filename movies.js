'use strict';
const axios = require('axios');
const Movies = require('./classes/moviesclass');

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

module.exports = handleMovie;