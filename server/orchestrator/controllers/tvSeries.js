const Redis = require("ioredis");
const redis = new Redis();
const axios = require("axios");

class MoviesController {
  static async findAll(req, res) {
    const tvSeriesCache = await redis.get("tvSeries");
    if (tvSeriesCache) {
      console.log("dariChace");
      res.send(JSON.parse(tvSeriesCache));
    } else {
      try {
        console.log("dariAxios");
        const tvSeries = await axios.get("http://localhost:3002/tv");
        await redis.set("tvSeries", JSON.stringify(tvSeries.data));
        await redis.del("entertainme");
        res.send(tvSeries.data);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  static async findOne(req, res) {
    const tvSeriesCache = await redis.get(`tvSeriesById${req.params.id}`);
    if (tvSeriesCache) {
      console.log("dariChace");
      res.send(JSON.parse(tvSeriesCache));
    } else {
      try {
        console.log("dariAxios");
        const tvSeries = await axios.get(
          `http://localhost:3002/tv/${req.params.id}`
        );
        await redis.set(
          `tvSeriesById${req.params.id}`,
          JSON.stringify(tvSeries.data)
        );
        await redis.del("entertainme");
        res.send(tvSeries.data);
      } catch (err) {
        res.status(500).send(err);
      }
    }
  }

  static insertOne(req, res) {
    const data = req.body;
    axios
      .post("http://localhost:3002/tv", data)
      .then((data) => {
        redis.del("tvSeries");
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
      .put(`http://localhost:3002/tv/${req.params.id}`, data)
      .then((data) => {
        console.log(typeof data.config.data);
        redis.del("tvSeries");
        redis.del("entertainme");
        redis.set(`tvSeriesById${req.params.id}`, data.config.data);
        res.send(data.data);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static deleteOne(req, res) {
    axios
      .delete(`http://localhost:3002/tv/${req.params.id}`)
      .then((data) => {
        redis.del("tvSeries");
        redis.del("entertainme");
        redis.del(`tvSeriesById${req.params.id}`);
        res.send(data.data);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = MoviesController;
