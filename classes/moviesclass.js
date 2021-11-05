'use strict';

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

module.exports = Movies;