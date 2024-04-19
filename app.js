const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'views')));
app.use('views', express.static(path.join(__dirname, 'views', 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




app.use(logger('tiny'));

module.exports = app;