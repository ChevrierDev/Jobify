const express = require('express');
const renderOffer = require('../controllers/offer.controller')

const offerRoute = express.Router();

offerRoute.get('/', renderOffer);

module.exports = offerRoute