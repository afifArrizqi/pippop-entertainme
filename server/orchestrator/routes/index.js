const routes = require("express").Router();
const entertainme = require("./entertainme");
const movies = require("./movies");
const tvSeries = require("./tvSeries");

routes.use("/entertainme", entertainme);
routes.use("/movies", movies);
routes.use("/tv", tvSeries);

module.exports = routes;
