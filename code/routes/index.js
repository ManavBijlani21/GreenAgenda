var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/default', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/default.html'));
});

module.exports = router;
