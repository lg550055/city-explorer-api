'use strict';

const express = require('express');

// app instance of express
const app = express();

// Middleware
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 3002;

// read data from weather.json
const weatherData = require('./data/weather.json');

app.get('/', (req, res) => {
  res.send('Serves says Hello!');
});

// API endpoint
app.get('/weather', (req, res) => {
  let city = req.query.city.toLowerCase();
  try {
    let targetCity = weatherData.filter(e => e.city_name.toLowerCase() === city);
    let weatherForecast = targetCity[0].data.map(e => new Forecast(e));
    res.send(weatherForecast);
  } catch (error) {
    res.send(`There is no info on ${city}. Try Seattle, Paris or Amman`);
  }
});

app.get('*', (req, res) => {
  res.status(404).send('Endpoint not found, please check your intended url');
});

class Forecast {
  constructor(city) {
    this.date = city.datetime;
    this.description = city.weather.description;
  }
}

// instruct server to start listening for requests
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
