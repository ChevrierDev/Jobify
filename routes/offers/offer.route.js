const express = require("express");
const { fetchofferData } = require("../../controllers/offer.controller");

const offerRoute = express.Router();

offerRoute.get("/:id", fetchofferData);

module.exports = offerRoute;
