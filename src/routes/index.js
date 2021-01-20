const express = require("express");
const routes = express.Router();

const Controller = require("../app/controllers/index");

routes.get("/", Controller.index);
routes.get("/create-point", Controller.createPoint);
routes.get("/search", Controller.search);

routes.post("/savepoint", Controller.savePoint);

module.exports = routes;
