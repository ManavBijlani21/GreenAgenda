var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    // Check if user session exists
    console.log('Session data:', req.session);  // Logging session info
    if (req.session && req.session.email) {
        next();  // User is logged in, proceed to the next middleware or route handler
    } else {
        res.status(401).json({ message: "Unauthorized" });  // User is not logged in, send unauthorized response
    }
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/login-status', function (req, res) {
    console.log('Session data:', req.session);  // Logging session info
    if (req.session && req.session.email) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});
module.exports = router;
