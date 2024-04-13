const express = require("express");
const renderOfferById = require("../controllers/offer.controller");

const offerRoute = express.Router();

offerRoute.get("/:id", renderOfferById);

module.exports = offerRoute;
