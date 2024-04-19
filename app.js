const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const passport = require("passport");
const localStrategy = require("passport-local");
const session = require('express-session');
const path = require('path');

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'views')));
app.use('views', express.static(path.join(__dirname, 'views', 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




app.use(logger('tiny'));

module.exports = app;