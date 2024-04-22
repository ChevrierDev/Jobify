const express = require("express");
const recruterRoute = express.Router();
const passport = require("passport");
const { checkAuthenticated } = require('../../app')

recruterRoute.get("/", (req, res) => {
  res.render("layouts/recruter/recruter_page", {
    title: "Jobify pour recruteur",
  });
});


recruterRoute.get('/logout', (req, res) => {
  req.logout(); 
  res.redirect('/home'); 
});


recruterRoute.get(
  "/dashboard",
  (req, res) => {
    res.render("layouts/recruter/recruter_dashboard", {
      title: "Votre tableau de bord",
      user: req.user,
    });
  }
);

module.exports = recruterRoute;
