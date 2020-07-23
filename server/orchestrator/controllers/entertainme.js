const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios");

class EntertainmeControllers {
  static async findAll(req, res) {
    const entertainmeCache = await redis.get("entertainme");
    const moviesCache = await redis.get("movies");
    const tvSeriesCache = await redis.get("tvSeries");
    if (entertainmeCache) {
      res.send(JSON.parse(entertainmeCache));
    } else {
      try {
        const movies = await axios.get("http://localhost:3001/movies");
        const tvSeries = await axios.get("http://localhost:3002/tv");
        res.status(200).json({ movies: movies.data, tvSeries: tvSeries.data });
      } catch (err) {
        if (moviesCache || tvSeriesCache) {
          res.status(200).json({
            movies: JSON.parse(moviesCache),
            tvSeries: JSON.parse(tvSeriesCache),
          });
        } else {
          res.status(500).json(err);
        }
      }
    }
  }
}

module.exports = EntertainmeControllers;
