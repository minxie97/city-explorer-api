'use strict';

class Yelp {
    constructor(obj) {
        this.name = obj.name;
        this.imageUrl = obj.image_url;
        this.price = obj.price;
        this.rating = obj.rating;
        this.url = obj.url;
    }
}

module.exports = Yelp;