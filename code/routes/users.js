var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
  /* Run the check to see if user logged in */
  // there is a token in the header
  if (req.headers.authToken === "test") {
    next();
  }
  else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
