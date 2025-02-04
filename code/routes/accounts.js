const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const connection = require('../app'); // May change

// Route for handling user login
router.post('/login', function (req, res, next) {
    req.pool.getConnection(function (err, connection) {

        if (err) {
            connection.release();
            res.sendStatus(500);
            return;
        }
        const { email, password } = req.body;  // Extract email and password from request body

        const query = 'SELECT * FROM User WHERE email_id = ?';  // SQL query to find user by email
        connection.query(query, [email], function (error, results) {
            if (error) {
                console.error(error);  // Log error to console
                connection.release();
                res.status(500).json({ message: "Internal server error" });  // Send 500 status if there's a server error
                return;
            }

            if (results.length === 0) {
                connection.release();
                res.status(401).json({ message: "Login failed - No User" });  // Send 401 status if no user found
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
                    connection.release();
                    res.status(401).json({ message: "Login failed - Wrong Password" });  // Send 401 status if password doesn't match
                    return;
                }

                connection.release();

                req.session.email = user.email_id; // Store user email in session
                req.session.loggedIn = true; // Store that this user is logged in

                res.json({ message: "Login success" });  // Send success message
            });
        });
    });
});

// Route for handling user signup
router.post('/signup', function (req, res, next) {
    req.pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.sendStatus(500);
            return;
        }
        const { firstName, lastName, email, password, phone, streetNumber, streetAddress, city, state, postalCode } = req.body;  // Extract user details from request body
        const hashedPassword = bcrypt.hashSync(password, saltRounds);  // Hash the password with bcrypt

        // Check if email already exists
        const query = 'SELECT * FROM User WHERE email_id = ?';
        connection.query(query, [email], function (error, results) {
            if (error) {
                console.error(error);  // Log error to console
                connection.release();
                res.status(500).json({ message: "Internal server error" });  // Send 500 status if there's a server error
                return;
            }

            if (results.length > 0) {
                connection.release();
                res.status(400).json({ message: "Email already exists" });  // Send 400 status if email already exists
                return;
            }

            // Insert new address into database
            const insertAddressQuery = 'INSERT INTO Address (street, street_number, city, state, postal_code) VALUES (?, ?, ?, ?, ?)';
            connection.query(insertAddressQuery, [streetAddress, streetNumber, city, state, postalCode], function (error, results) {
                if (error) {
                    console.error(error);  // Log error to console
                    connection.release();
                    res.status(500).json({ message: "Internal server error" });  // Send 500 status if there's a server error
                    return;
                }

                const addressId = results.insertId;  // Get the inserted address ID

                // Insert new user into database
                const insertQuery = 'INSERT INTO User (first_name, last_name, email_id, password, phone_number, address_id) VALUES (?, ?, ?, ?, ?, ?)';
                connection.query(insertQuery, [firstName, lastName, email, hashedPassword, phone, addressId], function (error) {
                    connection.release();
                    if (error) {
                        console.error(error);  // Log error to console
                        res.status(500).json({ message: "Internal server error" });  // Send 500 status if there's a server error
                        return;
                    }

                    req.session.email = email;
                    req.session.loggedIn = true;

                    res.json({ message: "Signup success" });  // Send success message if signup is successful
                });
            });
        });
    });
});


router.get('/login-status', function (req, res) {
    res.json( { loggedIn: req.session.loggedIn } );
});

router.get('/logout', function(req, res){
    req.session.loggedIn = false;
    res.json({ loggedIn: req.session.loggedIn});
});

module.exports = router;
