var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var accountRouter = require('./routes/account');

var app = express();

// Use session middleware to handle user sessions
app.use(session({
  secret: process.env.JWT_SECRET,  // Secret key for session encryption
  resave: false,  // Do not save session if unmodified
  saveUninitialized: true,  // Save uninitialized session
  cookie: { maxAge: 3600000 } // Session duration: 1 hour
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/account', accountRouter);

module.exports = app;
