const express = require('express');
const recruterRoute = express.Router();

recruterRoute.get('/', (req, res) => {
    res.render('layouts/recruter_page', {
        title: 'Jobify pour recruteur'
    });
})



module.exports = recruterRoute;