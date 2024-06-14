var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const session = require('express-session');
//Use mysql in this app
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var accountsRouter = require('./routes/accounts');
var usersRouter = require('./routes/users');
var managersRouter = require('./routes/managers');
var adminsRouter = require('./routes/admins');
var branchesRouter = require('./routes/branches');  // Import the branches router

//Create a pool (group) of connections to be used for connecting with SQL server
var dbConnectionPool = mysql.createPool({
    host : 'localhost', //Location of database
    user: 'root', // Add your MySQL username
    password: 'your_password', // Add your MySQL password
    database : 'Website_Database'
});

var app = express();

//Express will run this function on every request
//For all requests that we handle in index.js, we'll be able to access the pool of connections using req.pool
app.use(function(req,res,next){
    req.pool = dbConnectionPool; //pool value can be changed if needed.
    next();
});

// Use session middleware to handle user sessions
app.use(session({
  secret: process.env.JWT_SECRET || 'meow',  // Secret key for session encryption
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
app.use('/accounts', accountsRouter);
app.use('/users', usersRouter);
app.use('/managers', managersRouter);
app.use('/admins', adminsRouter);
app.use('/branches', branchesRouter);

module.exports = app;
