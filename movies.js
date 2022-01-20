'use strict';

const axios = require('axios');

function getMovies (req, res) {
  let city = req.query.city;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${city}`;
  axios.get(url)
    .then((movieInfo) => movieInfo.data.results.map(e => new Movie(e)))
    .then((movieData) => res.status(200).send(movieData))
    .catch(error => res.status(500).send(error));
}

class Movie {
  constructor(film) {
    this.title = film.original_title;
    this.date = film.release_date;
    this.popularity = film.popularity;
  }
}

module.exports = getMovies;
