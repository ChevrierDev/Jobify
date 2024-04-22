const express = require("express");
const passport = require('passport');
const flash = require('express-flash')

const authRoute = express.Router();
const {
  postNewRecruterAuth,
  validate,
  recruterAuthValidationRule,
} = require("../../controllers/auth.controller");
const { checkAuthenticated } = require("../../app");

//User Auth routes
authRoute.get("/", (req, res) => {
  res.render("auth/users/login", {
    title: "Connectez vous.",
  });
});

//Recruter Auth routes 
authRoute.get("/recruter", (req, res) => {//recruter login
 
  res.render("auth/recruter/recruter_login", {
    title: "Connectez vous en tant que recruteur.",
    messages: req.flash('error')
  });
});

authRoute.post(
  "/recruter",
  (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const userType = req.body.userType;

    console.log("Email:", email);
    console.log("Password:", password);
    console.log("UserType:", userType);

    // Passez à la prochaine fonction de middleware
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/recruter/dashboard",
    failureRedirect: "/login/recruter",
    failureFlash: true,
  })
);

authRoute.get("/recruter/register", (req, res) => {//recruter register
  res.render("auth/recruter/recruter_register", {
    title: "Créer un compte recruteur",
  })
});

authRoute.post(
  "/recruter/register",
  recruterAuthValidationRule(),
  validate,
  postNewRecruterAuth
);

//Admin Auth routes

module.exports = authRoute;
