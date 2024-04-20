const express = require('express');
const recruterRoute = express.Router();

recruterRoute.get('/', (req, res) => {
    res.render('layouts/recruter/recruter_page', {
        title: 'Jobify pour recruteur'
    });
});

recruterRoute.get('/dashboard', (req, res) => {
    res.render('layouts/recruter/recruter_dashboard', {
        title: 'Votre espace personnel'
    });
});



module.exports = recruterRoute;