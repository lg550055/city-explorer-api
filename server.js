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
    res.send(error.response.status, error.response.data.error);
  }
});

app.get('/movies', async (req, res) => {
  let city = req.query.city;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${city}`;
  try {
    let movieInfo = await axios.get(url);
    let movieData = movieInfo.data.results.map(e => new Movie(e));
    res.send(movieData);
  } catch (error) {
    res.status(500).send(error.response.status);
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

class Movie {
  constructor(film) {
    this.title = film.original_title;
    this.date = film.release_date;
    this.popularity = film.popularity;
  }
}

// instruct server to start listening for requests/specific rout calls
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
