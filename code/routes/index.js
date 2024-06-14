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
  req.session.branch = req.query.branch;
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

router.get('/settings', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/settings.html'));
});

module.exports = router;
