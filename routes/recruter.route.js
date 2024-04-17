const express = require('express');
const getRecruterPage = require('../controllers/recruter.controller');
const recruterRoute = express.Router();

recruterRoute.get('/', getRecruterPage)



module.exports = recruterRoute;