var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    // Check if user session exists
    if (req.session && req.session.userId && req.session.clearance) {
        next();  // User is logged in, proceed to the next middleware or route handler
    } else {
        res.status(401).json({ message: "Unauthorized" });  // User is not logged in, send unauthorized response
    }
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
