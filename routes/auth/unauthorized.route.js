const express = require("express");
const passport = require("passport");
const flash = require("express-flash");

const unauthorizedRoute = express.Router();

unauthorizedRoute.get('/', (req, res) => {
    res.render('layouts/unauthorized', {
        title: "403-Access Forbidden"
    });
})


module.exports = unauthorizedRoute;
