const routes = require("express").Router();
const movies = require("../controllers/movies");

routes.get("/", movies.findAll);
routes.post("/", movies.insertOne);
routes.get("/:id", movies.findOne);
routes.put("/:id", movies.updateOne);
routes.delete("/:id", movies.deleteOne);

module.exports = routes;
