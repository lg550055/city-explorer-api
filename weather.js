'use strict';
// this module fetches weather forecast info from weatherbit API

const axios = require('axios');
let cache = require('./cache');

function getWeather (req, res) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=7&key=${process.env.WEATHER_KEY}`;
  let key = `${Math.round(lat*10)/10},${Math.round(lon*10)/10}`;

  // to mimimize API calls, it checks if the cache has the requested info
  if (cache[key] && Date.now() - cache[key].timestamp < 1000*3600*9) {
    console.log('cache hit');
    res.send(cache[key].forecast);
  } else {
    console.log('cache miss');
    axios.get(url)
      .then((wInfo) => wInfo.data.data.map(e => new Forecast(e)))
      .then((wForecast) => {
        res.status(200).send(wForecast);
        cache[key] = {
          forecast: wForecast,
          timestamp: Date.now()
        };
      })
      .catch(error => res.status(500).send(error));
  }
}

class Forecast {
  constructor(location) {
    this.date = location.datetime;
    this.low = location.low_temp;
    this.high = location.high_temp;
    this.description = location.weather.description;
  }
}

module.exports = getWeather;
