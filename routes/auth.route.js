const express = require("express");

const authRoute = express.Router();
const {
  postNewRecruterAuth,
  validate,
  recruterAuthValidationRule,
} = require("../controllers/auth.controller");

//User Auth routes
authRoute.get("/", (req, res) => {
  res.render("auth/login", {
    title: "Connectez vous.",
  });
});

//Recruter Auth routes
authRoute.get("/recruter", (req, res) => {
  res.render("auth/recruter/recruter_login", {
    title: "Connectez vous en tant que recruteur.",
  });
});
authRoute.get("/recruter/register", (req, res) => {
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
