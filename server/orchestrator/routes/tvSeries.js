const routes = require("express").Router();
const tvSeries = require("../controllers/tvSeries");

routes.get("/", tvSeries.findAll);
routes.post("/", tvSeries.insertOne);
routes.get("/:id", tvSeries.findOne);
routes.put("/:id", tvSeries.updateOne);
routes.delete("/:id", tvSeries.deleteOne);

module.exports = routes;
