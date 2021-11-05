'use strict';

class Forecast {
    constructor(obj) {
        this.date = obj.datetime;
        this.description = obj.weather.description;
        this.icon = obj.weather.icon;
        this.high = obj.max_temp;
        this.low = obj.low_temp;
    }
}

module.exports = Forecast;