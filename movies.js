'use strict';

const axios = require('axios');
let cache = require('./cache');

function getMovies (req, res) {
  let city = req.query.city;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${city}&include_adult=false`;

  if (cache[city] && Date.now() - cache[city].timestamp < 1000*3600*30) {
    console.log('cache hit');
    res.send(cache[city].movies);
  } else {
    console.log('cache miss');
    axios.get(url)
      .then((movieInfo) => movieInfo.data.results.map(e => new Movie(e)))
      .then((movieData) => {
        res.status(200).send(movieData);
        cache[city] = {
          movies: movieData,
          timestamp: Date.now()
        };
      })
      .catch(error => res.status(500).send(error));
  }
}

class Movie {
  constructor(film) {
    this.title = film.original_title;
    this.date = film.release_date;
    this.popularity = film.popularity;
  }
}

module.exports = getMovies;
