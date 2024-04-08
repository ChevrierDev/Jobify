const express = require("express");
const {
  getOffers,
  getOfferByID,
  postNewOffer,
  deleteOffer,
  updateOffer,
} = require("../controllers/offers.controller");

const offersRoute = express.Router();

offersRoute.get("/", getOffers);
offersRoute.get("/:offerID", getOfferByID);
offersRoute.post("/", postNewOffer);
offersRoute.delete("/", deleteOffer);
offersRoute.patch("/", updateOffer);

module.exports = offersRoute;
