const express = require("express");
const usersRoute = express.Router();
const passport = require("passport");
const { checkAuthenticated } = require("../../app");


usersRoute.post("/dashboard/logout", checkAuthenticated, (req, res) => {
  req.logout(() => {
    res.redirect("/login/recruter");
  });
});

usersRoute.get("/dashboard", checkAuthenticated, (req, res) => {
  res.render("layouts/recruter/recruter_dashboard", {
    title: "votre espace personnel",
    user: req.user,
  });
});

module.exports = usersRoute;

