const tvSeriesModel = require("../models");

class TVSeriesControllers {
  static async findAll(req, res) {
    try {
      const tvSeries = await tvSeriesModel.findAll();
      res.status(200).json(tvSeries);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async findOne(req, res) {
    try {
      const tvSeries = await tvSeriesModel.findOne(req.params.id);
      res.status(200).json(tvSeries);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async insertOne(req, res) {
    try {
      const data = req.body;
      const tvSeries = await tvSeriesModel.insertOne(data);
      res.status(201).json(tvSeries);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async updateOne(req, res) {
    try {
      const data = req.body;
      const { id } = req.params;
      const tvSeries = await tvSeriesModel.updateOne(id, data);
      res.status(200).json(tvSeries);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteOne(req, res) {
    try {
      const { id } = req.params;
      const tvSeries = await tvSeriesModel.deleteOne(id);
      res.status(200).json(tvSeries);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = TVSeriesControllers;
