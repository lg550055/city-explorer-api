'use strict';

const express = require('express');
// app instance of express
const app = express();
// Middleware
require('dotenv').config();
const PORT = process.env.PORT || 3002;

const cors = require('cors');
app.use(cors());

const getWeather = require('./weather');
const getMovies = require('./movies');
// Routes
app.get('/', (req, res) => {
  res.send('Serves says Hello!');
});
// API endpoint
app.get('/weather', getWeather);

app.get('/movies', getMovies);

// catch all route
app.get('*', (req, res) => {
  res.status(404).send('Endpoint not found, please check your intended url');
});

// instruct server to start listening for requests/specific rout calls
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
