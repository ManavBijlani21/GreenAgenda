var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/homepage.html'));
});

router.get('/homepage', function(req, res, next){
  res.sendFile(path.join(__dirname, '../public/homepage.html'));
});

router.get('/landingpage', function(req, res, next){
  res.sendFile(path.join(__dirname, '../public/homepage.html'));
});

router.get('/branch', function(req, res, next){
  res.sendFile(path.join(__dirname, '../public/branch.html'));
});

router.get('/joinBranch', function(req, res, next){
  res.sendFile(path.join(__dirname, '../public/joinBranch.html'));
});

router.get('/default', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/default.html'));
});

router.get('/test', function(req, res, next){
  res.send("Hello World2!");
});

router.get('/testLogIn', function(req, res, next){
  res.send(true);
});

module.exports = router;