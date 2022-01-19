'use strict';

const express = require('express');

// app instance of express
const app = express();

// Middleware
require('dotenv').config();
const PORT = process.env.PORT || 3002;

const cors = require('cors');
app.use(cors());

const axios = require('axios');

// Routes
app.get('/', (req, res) => {
  res.send('Serves says Hello!');
});

// weather API endpoint
app.get('/weather', async (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lat;
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=7&key=${process.env.WEATHER_KEY}`;
  try {
    let rawInfo = await axios.get(url);
    let weatherForecast = rawInfo.data.data.map(e => new Forecast(e));
    res.send(weatherForecast);
  } catch (error) {
    res.status(400).send(error.code);
  }
});

// catch all route
app.get('*', (req, res) => {
  res.status(404).send('Endpoint not found, please check your intended url');
});

class Forecast {
  constructor(city) {
    this.date = city.datetime;
    this.low = city.low_temp;
    this.high = city.high_temp;
    this.description = city.weather.description;
  }
}

// instruct server to start listening for requests/specific rout calls
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
