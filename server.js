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
  let city = req.query.city;
  console.log(city);
});

// instruct server to start listening for requests
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));