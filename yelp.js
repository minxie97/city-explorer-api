'use strict';
const axios = require('axios');
const Yelp = require('./classes/yelpclass.js');
const cache = require('./cache.js');

async function handleYelp(req, res) {

    if (cache[req.query.city] && (Date.now() - cache[req.query.city].timestamp) < 300000) {
        console.log('yelp cache hit!');
        res.status(200).send(cache[req.query.city]);
    } else {
        console.log('yelp cache miss');
        const url = `https://api.yelp.com/v3/businesses/search?location=${req.query.city}&term=restaurants&limit=${5}`
        try {
            let yelpResults = await axios.get(url, { headers: { 'Authorization': `Bearer ${process.env.YELP_API_KEY}` } })
            let clientYelp = yelpResults.data.businesses.map(food => new Yelp(food));
            if (clientYelp) {
                cache[req.query.city] = clientYelp;
                cache[req.query.city].timestamp = Date.now();
                res.status(200).send(clientYelp);
            } else {
                res.status(404).send('Error: location not found');
            }
        } catch (e) {
            res.status(500).send('Nope')
        }
    }
}
module.exports = handleYelp;