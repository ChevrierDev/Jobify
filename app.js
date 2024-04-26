if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const initializePassport = require("./config/passport.config");

const express = require("express");
const passport = require("passport");
const session = require("express-session");

const path = require("path");
const helmet = require("helmet");
const flash = require("express-flash");
const methodOverride = require('method-override')

const logger = require("morgan");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(flash());

//initialise user session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3 * 60 * 60 * 1000,
      httpOnly: true 
    }
  })
);

app.use(passport.session() );
app.use(passport.initialize());


app.use(methodOverride('_method'))

//auth the user in the DB
initializePassport(passport);

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); 
  } else {
    res.redirect("/login/recruter"); 
  }
};

const checkNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log("L'utilisateur n'est pas authentifié.");
    return next(); 
  } else {
    console.log("L'utilisateur est déjà authentifié."); 
    console.log('user type check ---->', req.user.userType)
    res.redirect("/recruter/dashboard");
  }
};

const staticFilesPath = path.join(__dirname, 'views');

app.use(helmet());
app.use(express.json());

app.use(express.static(path.join(__dirname, "views")));
app.use("views", express.static(path.join(__dirname, "views", "public")));
app.use(express.static(staticFilesPath, { type: 'application/javascript' }));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(logger("tiny"));

module.exports = { app, checkAuthenticated, checkNotAuthenticated };
