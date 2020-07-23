const routes = require("express").Router();
const tvSeries = require("../controllers");

routes.get("/tv", tvSeries.findAll);
routes.post("/tv", tvSeries.insertOne);
routes.get("/tv/:id", tvSeries.findOne);
routes.put("/tv/:id", tvSeries.updateOne);
routes.delete("/tv/:id", tvSeries.deleteOne);

module.exports = routes;
