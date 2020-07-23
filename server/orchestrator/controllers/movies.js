const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios");

class MoviesController {
  static async findAll(req, res) {
    const moviesCache = await redis.get("movies");
    if (moviesCache) {
      res.send(JSON.parse(moviesCache));
    } else {
      try {
        const movies = await axios.get("http://localhost:3001/movies");
        await redis.set("movies", JSON.stringify(movies.data));
        res.send(movies.data);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  static async findOne(req, res) {
    const movieCache = await redis.get(`movieById${req.params.id}`);
    if (movieCache) {
      console.log("dariChace");
      res.send(JSON.parse(movieCache));
    } else {
      try {
        console.log("dariAxios");
        const movie = await axios.get(
          `http://localhost:3001/movies/${req.params.id}`
        );
        await redis.set(
          `movieById${req.params.id}`,
          JSON.stringify(movie.data)
        );
        res.send(movie.data);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  static insertOne(req, res) {
    const data = req.body;
    axios
      .post("http://localhost:3001/movies", data)
      .then((data) => {
        redis.del("movies");
        redis.del("entertainme");
        res.send(data.data);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static updateOne(req, res) {
    const data = req.body;
    axios
      .put(`http://localhost:3001/movies/${req.params.id}`, data)
      .then((data) => {
        console.log(typeof data.config.data);
        redis.del("movies");
        redis.del("entertainme");
        redis.set(`movieById${req.params.id}`, data.config.data);
        res.send(data.data);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static deleteOne(req, res) {
    axios
      .delete(`http://localhost:3001/movies/${req.params.id}`)
      .then((data) => {
        redis.del("movies");
        redis.del("entertainme");
        redis.del(`movieById${req.params.id}`);
        res.send(data.data);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = MoviesController;
