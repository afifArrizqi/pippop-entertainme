const routes = require("express").Router();
const entertainme = require("../controllers/entertainme");

routes.get("/", entertainme.findAll);

module.exports = routes;
