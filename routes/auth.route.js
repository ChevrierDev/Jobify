const express = require('express');


const authRoute = express.Router();
const getAuth = require('../controllers/auth.controller')

authRoute.get('/', getAuth)


module.exports = authRoute;