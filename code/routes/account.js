var express = require('express');
var router = express.Router();

router.post('/login', function (req, res, next) {
    const { email, password } = req.body;

    if (email === "test@test.com" && password === "password") {
        res.json({ token: "test" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

router.post('/signup', function (req, res, next) {
    const { firstName, lastName, email, password, phone, streetAddress, city, state, postCode } = req.body;

    res.json({ message: "Signup success" });

});


module.exports = router;