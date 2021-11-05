'use strict';
const axios = require('axios');

async function handleYelp(req, res) {

    const url = `https://api.yelp.com/v3/businesses/search?location=${req.query.searchQuery}&term=restaurants&limit=${5}`

    try {
        let yelpResults = await axios.get(url,{ headers: { 'Authorization': `Bearer ${process.env.YELP_API_KEY}` } })
        let clientYelp = yelpResults.data.businesses.map(food => new Yelp(food));
        if (clientYelp) {
            res.status(200).send(clientYelp);
        } else {
            res.status(404).send('Error: location not found');
        }
    } catch (e) {
        res.status(500).send('Nope')
    }
}

class Yelp {
    constructor(obj) {
        this.name = obj.name;
        this.imageUrl = obj.image_url;
        this.price = obj.price;
        this.rating = obj.rating;
        this.url = obj.url;
    }
}

module.exports = handleYelp;