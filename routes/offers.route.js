const express = require("express");
const {
  getOffers,
  getOfferByID,
  postNewOffer,
  deleteOffer,
  updateOffer,
  offerValidationRule,
  validate,
} = require("../controllers/offers.controller");

const offersRoute = express.Router();

offersRoute.get("/", getOffers);
offersRoute.get("/:offerID", getOfferByID);
offersRoute.post("/", offerValidationRule(), validate, postNewOffer);
offersRoute.delete("/", deleteOffer);
offersRoute.patch("/",offerValidationRule(),validate, updateOffer);

module.exports = offersRoute;
