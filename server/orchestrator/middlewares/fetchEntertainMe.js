const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios");

async function fetchMovies() {
  const moviesCache = await redis.get("movies");
  try {
    const movies = await axios.get("http://localhost:3001/movies");
    return movies.data;
  } catch (err) {
    if (moviesCache) {
      return JSON.parse(moviesCache);
    } else {
      return null;
    }
  }
}

async function fetchTVSeries() {
  try {
    const tvSeries = await axios.get("http://localhost:3002/tv");
    return tvSeries.data;
  } catch (err) {
    if (moviesCache || tvSeriesCache) {
      return JSON.parse(tvSeriesCache);
    } else {
      return null;
    }
  }
}

module.exports = { fetchMovies, fetchTVSeries };
