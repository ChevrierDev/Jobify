const express = require("express");
const recruterRoute = express.Router();
const passport = require("passport");
const { checkAuthenticated } = require("../../app");
const { postNewOffer } = require('../../controllers/offers.controller')

//render recruter home page
recruterRoute.get("/", (req, res) => {
  res.render("layouts/recruter/recruter_page", {
    title: "Jobify pour recruteur",
  });
});


//render poste offer page
recruterRoute.get("/poster_offre", checkAuthenticated('recruteur'), (req, res) => {
  res.render("layouts/recruter/poste_offre", {
    title: "Poster une offre d'emplois.",
    user: req.user,
  });
});


//recruter post new offer 
recruterRoute.post('/poster_offre', checkAuthenticated('recruteur'),  postNewOffer, (req, res) => {
  res.redirect('/dashboard/recruter')
})

//recruter logout systeme
recruterRoute.post("/dashboard/logout", checkAuthenticated('recruteur'), (req, res) => {
  req.logout(() => {
    res.redirect("/login/recruter");
  });
});

//render recruter dashboard
recruterRoute.get("/dashboard", checkAuthenticated('recruteur'),   (req, res) => {
  res.render("layouts/recruter/recruter_dashboard", {
    title: "Votre tableau de bord",
    user: req.user,
  });
});

module.exports = recruterRoute;

