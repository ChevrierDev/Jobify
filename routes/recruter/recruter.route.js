const express = require("express");
const recruterRoute = express.Router();
const passport = require("passport");
const { checkAuthenticated } = require('../../app')

recruterRoute.get("/", (req, res) => {
  res.render("layouts/recruter/recruter_page", {
    title: "Jobify pour recruteur",
  });
});

recruterRoute.get(
  "/dashboard", 
  passport.authenticate("local"),
  function (req, res, next) {
    res.render("layouts/recruter/recruter_dashboard", {
      title: "Votre espace personnel",
    });
    next();
  }
);

module.exports = recruterRoute;
