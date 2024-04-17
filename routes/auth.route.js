const express = require('express');


const authRoute = express.Router();
const {
    getAuth,
    recruterGetAuth,
}= require('../controllers/auth.controller')

authRoute.get('/', getAuth);
authRoute.get('/recruter',  recruterGetAuth);


module.exports = authRoute;