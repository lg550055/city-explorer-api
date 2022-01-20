'use strict';

const axios = require('axios');

async function getWeather (req, res) {
  let lat = req.query.lat;
  let lon = req.query.lat;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=7&key=${process.env.WEATHER_KEY}`;
  // try {
  //   let rawInfo = await axios.get(url);
  //   let weatherForecast = rawInfo.data.data.map(e => new Forecast(e));
  //   res.send(weatherForecast);
  // } catch (error) {
  //   res.send(error.response.status, error.response.data.error);
  // }
  axios.get(url)
    .then((wInfo) => wInfo.data.data.map(e => new Forecast(e)))
    .then((wForecast) => res.status(200).send(wForecast))
    .catch(error => res.status(500).send(error));
}

class Forecast {
  constructor(city) {
    this.date = city.datetime;
    this.low = city.low_temp;
    this.high = city.high_temp;
    this.description = city.weather.description;
  }
}

module.exports = getWeather;
