var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
  /* Run the check to see if user logged in */
  // there is a token in the header
  const token = req.headers['authorization'];

  if (token) {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) {
        // If verification fails, send an unauthorized response
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        // If verification succeeds, proceed to the next middleware or route handler
        req.decoded = decoded;
        next();
      }
    });
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
