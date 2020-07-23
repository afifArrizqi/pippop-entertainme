const routes = require("express").Router();
const movies = require("../controllers");

routes.get("/movies", movies.findAll);
routes.post("/movies", movies.insertOne);
routes.get("/movies/:id", movies.findOne);
routes.put("/movies/:id", movies.updateOne);
routes.delete("/movies/:id", movies.deleteOne);

module.exports = routes;
