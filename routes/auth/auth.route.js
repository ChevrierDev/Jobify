const express = require("express");
const passport = require("passport");
const flash = require("express-flash");

const authRoute = express.Router();
const {
  postNewRecruterAuth,
  postNewUserAuth,
  postAdminAuth,
} = require("../../controllers/auth.controller");
const { checkAuthenticated, checkNotAuthenticated } = require("../../app");
const {
  recruterAuthValidationRule,
  userAuthValidationRule,
  adminAuthValidationRule,
  validate,
} = require("../../config/validationRule");

//User render login routes
authRoute.get("/", checkNotAuthenticated, (req, res) => {
  res.render("auth/users/login", {
    title: "Connectez vous.",
  });
});

//User register routes
authRoute.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("auth/users/register", {
    title: "Créer un compte utilisateur",
  });
});

//User authentification routes
authRoute.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/users/dashboard",
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
  res.render("auth/recruter/recruter_login", {
    title: "Connectez vous en tant que recruteur.",
    messages: req.flash("error"),
  });
});

//recruter login route
authRoute.post(
  "/recruter",
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
authRoute.get("/admin", checkNotAuthenticated, (req, res) => {
  //admin login page
  res.render("auth/admin/admin_login", {
    title: "Connectez vous en tant qu'Administrateur",
  });
});

//admin post login credential
authRoute.post(
  "/admin",
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/home",
    failureFlash: true,
  })
);

//admin register page
authRoute.get("/admin/register", checkNotAuthenticated, (req, res) => {
  res.render("auth/admin/admin_register", {
    title: "Créez vous un compte administrateur",
  });
});


//create new admin
authRoute.post(
  "/admin/register",
  adminAuthValidationRule(),
  validate,
  postAdminAuth
);


module.exports = authRoute;
