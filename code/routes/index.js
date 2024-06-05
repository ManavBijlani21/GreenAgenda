var express = require('express');
const { read } = require('fs');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/homepage.html'));
});

router.get('/homepage', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/homepage.html'));
});

router.get('/landingpage', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/homepage.html'));
});

router.get('/about', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/about.html'));
});

router.get('/support', function(req, res, next){
  res.sendFile(path.join(__dirname, '../public/support.html'));
});

router.get('/branch', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/branch.html'));
});

router.get('/joinBranch', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/joinBranch.html'));
});

router.get('/login', function(req, res, next){
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/signup', function(req, res, send){
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});

router.get('/default', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/default.html'));
});

router.get('/test', function (req, res, next) {
  res.send("Hello World2!");
});

router.get('/testLogIn', function (req, res, next) {
  res.send(true);
});

router.get('/settings', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/settings.html'));
});

//Establishing the connection with the database
router.get('/result', function(req, res){
  //Connect to the database
  req.pool.getConnection(function(err, connection){
    //General error handling
    if (err){
      res.sendStatus(500);
      return;
    }

    //If no error in connection, execute the queries given below
    //Template query
    var query = "SHOW TABLES";
    connection.query(query, function(err, rows,fields){
      connection.release();
      if (err){
        res.sendStatus(500);
        return;
      }
      res.json(rows); //Send response
    })
  });
});

module.exports = router;
