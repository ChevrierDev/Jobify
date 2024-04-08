const express = require('express');
const {
    getOffer,
    postNewOffer,
    deleteOffer,
    updateOffer
} = require('../controllers/offers.controller');

const offersRoute = express.Router();

offersRoute.get('/', getOffer);
offersRoute.post('/', postNewOffer);
offersRoute.delete('/', deleteOffer);
offersRoute.patch('/', updateOffer);

module.exports = offersRoute;