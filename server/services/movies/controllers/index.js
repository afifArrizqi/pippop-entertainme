const moviesModel = require("../models");

class MoviesControllers {
  static async findAll(req, res) {
    try {
      const movies = await moviesModel.findAll();
      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async findOne(req, res) {
    try {
      const movie = await moviesModel.findOne(req.params.id);
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async insertOne(req, res) {
    try {
      const data = req.body;
      const movies = await moviesModel.insertOne(data);
      res.status(201).json(movies);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async updateOne(req, res) {
    try {
      const data = req.body;
      const { id } = req.params;
      const movies = await moviesModel.updateOne(id, data);
      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteOne(req, res) {
    try {
      const { id } = req.params;
      const movies = await moviesModel.deleteOne(id);
      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = MoviesControllers;
