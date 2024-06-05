const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const connection = require('../app'); // May change

// Route for handling user login
router.post('/login', function (req, res, next) {
    const { email, password } = req.body;  // Extract email and password from request body

    const query = 'SELECT * FROM User WHERE email_id = ?';  // SQL query to find user by email
    connection.query(query, [email], function (error, results) {
        if (error) {
            console.error(error);  // Log error to console
            res.status(500).json({ message: "Internal server error" });  // Send 500 status if there's a server error
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ message: "Login failed" });  // Send 401 status if no user found
            return;
        }

        const user = results[0];  // Get user data
        bcrypt.compare(password, user.password, function (error, result) {  // Compare password with hashed password
            if (error) {
                console.error(error);  // Log error to console
                res.status(500).json({ message: "Internal server error" });  // Send 500 status if there's a server error
                return;
            }

            if (!result) {
                res.status(401).json({ message: "Login failed" });  // Send 401 status if password doesn't match
                return;
            }

            req.session.userId = user.id; // Store user ID in session
            req.session.email = user.email_id; // Store user email in session

            res.json({ message: "Login success" });  // Send success message
        });
    });
});

// Route for handling user signup
router.post('/signup', function (req, res, next) {
    const { firstName, lastName, email, password, phone, streetAddress, city, state, postCode } = req.body;  // Extract user details from request body
    const hashedPassword = bcrypt.hashSync(password, saltRounds);  // Hash the password with bcrypt

    // Check if email already exists
    const query = 'SELECT * FROM User WHERE email_id = ?';
    connection.query(query, [email], function (error, results) {
        if (error) {
            console.error(error);  // Log error to console
            res.status(500).json({ message: "Internal server error" });  // Send 500 status if there's a server error
            return;
        }

        if (results.length > 0) {
            res.status(400).json({ message: "Email already exists" });  // Send 400 status if email already exists
            return;
        }

        // Insert new user into database
        const insertQuery = 'INSERT INTO User (first_name, last_name, email_id, password, phone, street_address, city, state, post_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        connection.query(insertQuery, [firstName, lastName, email, hashedPassword, phone, streetAddress, city, state, postCode], function (error) {
            if (error) {
                console.error(error);  // Log error to console
                res.status(500).json({ message: "Internal server error" });  // Send 500 status if there's a server error
                return;
            }

            res.json({ message: "Signup success" });  // Send success message if signup is successful
        });
    });
});

module.exports = router;
