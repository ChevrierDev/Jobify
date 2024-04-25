const express = require("express");
const usersRoute = express.Router();
const passport = require("passport");
const { checkAuthenticated } = require("../../app");


usersRoute.post("/dashboard/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/login");
  });
});

usersRoute.get("/dashboard", (req, res) => {
    console.log(req.body.userType)
  res.render("layouts/users/users_dashboard", {
    title: "votre espace personnel",
    user: req.user,
  });
});

module.exports = usersRoute;

