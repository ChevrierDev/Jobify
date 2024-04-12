const express = require("express");

const { displayDataToHome } = require("../controllers/home.controller");

const homeRouter = express.Router();

homeRouter.get("/", displayDataToHome);

module.exports = homeRouter;
