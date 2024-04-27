const express = require("express");
const adminRoute = express.Router();
const passport = require("passport");
const { checkAuthenticated } = require("../../app");


adminRoute.post(
  "/dashboard/logout",
  checkAuthenticated("admin"),
  (req, res) => {
    req.logout(() => {
      res.redirect("/login");
    });
  }
);

adminRoute.get("/dashboard", checkAuthenticated("admin"), (req, res) => {
  console.log(req.body.userType);
  res.render("layouts/admin/admin_dashboard", {
    title: "votre espace Administrateur",
    user: req.user,
  });
});

module.exports = adminRoute;
