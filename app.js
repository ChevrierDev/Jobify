const express = require("express");
const db = require("./config/db");

const passport = require("passport");
const session = require("express-session");

const LocalStrategy = require("passport-local").Strategy;

const path = require("path");
const helmet = require("helmet");
const bcrypt = require("bcrypt");

const logger = require("morgan");

const app = express();

//initialise user session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//auth the user in the DB
const authUser = async (email, password, userType, done) => {
  try {
    let user;
    let tableName;

    switch (userType) {
      case "recruteur":
        tableName = "recruteur";
        break;
      case "users":
        tableName = "users";
        break;
      case "admin":
        tableName = "admin";
        break;
      default:
        return done(new Error("User type invalid"));
    }
    const query = `SELECT * FROM ${userType} WHERE email = $1`;
    const results = db.query(query, [email]);
    user = user.rows[0];

    if (!user) {
      return done(null, false, { message: "incorrect email adress" });
    }

    const passwordMatched = await bcrypt.compare(user, user.passport);
    if (!passwordMatched) {
      return done(null, false, { message: "incorrect password" });
    }

    return done(null, user);
  } catch (err) {
    return done.err;
  }
};

passport.use(new LocalStrategy(authUser));

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "views")));
app.use("views", express.static(path.join(__dirname, "views", "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(logger("tiny"));

module.exports = app;
