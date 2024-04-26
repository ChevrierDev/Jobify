const express = require("express");
const passport = require("passport");
const flash = require("express-flash");

const authRoute = express.Router();
const {
  postNewRecruterAuth,
  validate,
  recruterAuthValidationRule,
  postNewUserAuth,
  userAuthValidationRule,
} = require("../../controllers/auth.controller");
const { checkAuthenticated, checkNotAuthenticated } = require("../../app");

//User render login routes
authRoute.get("/", (req, res) => {
  res.render("auth/users/login", {
    title: "Connectez vous.",
  });
});

//User register routes
authRoute.get("/register", (req, res) => {
  res.render("auth/users/register", {
    title: "Créer un compte utilisateur",
  });
});

//User authentification routes
authRoute.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/user/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);


//user registration route
authRoute.post(
  "/register",
  userAuthValidationRule(),
  validate,
  postNewUserAuth
);




//Recruter Auth routes
authRoute.get("/recruter", checkNotAuthenticated, (req, res) => {
  //recruter login
  console.log("Route de connexion pour les recruteurs. Vérification de l'authentification en cours...");
  res.render("auth/recruter/recruter_login", {
    title: "Connectez vous en tant que recruteur.",
    messages: req.flash("error"),
  });
});

//recruter login route
authRoute.post(
  "/recruter",
  (req, res, next) => {
    console.log("Tentative de connexion...");
    next(); // Passe au middleware suivant (passport.authenticate)
  },
  passport.authenticate("local", {
    successRedirect: "/recruter/dashboard",
    failureRedirect: "/login/recruter",
    failureFlash: true,
  })
);

authRoute.get("/recruter/register", checkNotAuthenticated, (req, res) => {
  //recruter register
  res.render("auth/recruter/recruter_register", {
    title: "Créer un compte recruteur",
  });
});

authRoute.post(
  "/recruter/register",
  recruterAuthValidationRule(),
  validate,
  postNewRecruterAuth
);

//Admin Auth routes

module.exports = authRoute;
