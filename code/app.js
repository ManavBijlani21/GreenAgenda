var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Use mysql in this app
var mysql = require('mysql');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Create a pool (group) of connections to be used for connecting with SQL server
var dbConnectionPool = mysql.createPool({
    host : 'localhost', //Location of database
    database : 'Website_Database'
})

var app = express();

//Express will run this function on every request
//For all requests that we handle in index.js, we'll be able to access the pool of connections using req.pool
app.use(function(req,res,next){
    req.pool = dbConnectionPool; //pool value can be changed if needed.
    next();

})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;