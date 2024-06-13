var express = require('express');
const connection = require('../app'); // May change
const bcrypt = require('bcrypt');
const saltRounds = 10;
var router = express.Router();

router.use(function (req, res, next) {
    // Check if user session exists
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
    if (req.session && req.session.email) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});

router.get('/user-type', function (req, res) {
    if (req.session && req.session.userType) {
        res.json({ userType: req.session.userType });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
});

// Route to get user information
router.get('/user-info', (req, res) => {
    if (!req.session.email) {
        res.status(401).json({ message: 'Not logged in' });
        return;
    }

    const email = req.session.email;

    req.pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        const query = `
            SELECT
                User.first_name AS firstName,
                User.last_name AS lastName,
                User.email_id AS email,
                User.phone_number AS phoneNumber,
                Address.street AS street,
                Address.street_number AS streetNumber,
                Address.city AS city,
                Address.state AS state,
                Address.postal_code AS postalCode
            FROM User
            JOIN Address ON User.address_id = Address.address_id
            WHERE User.email_id = ?
        `;

        connection.query(query, [email], (error, results) => {
            connection.release();

            if (error) {
                res.status(500).json({ message: 'Internal server error' });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const user = results[0];
            res.json(user);
        });
    });
});

// Route to update user information
router.post('/update-user', (req, res) => {
    if (!req.session.email) {
        res.status(401).json({ message: 'Not logged in' });
        return;
    }

    const email = req.session.email;
    const { password, firstName, lastName, phoneNumber, address } = req.body;
    const { street, streetNumber, city, state, postalCode } = address;

    req.pool.getConnection((err, connection) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        // Update address
        const updateAddressQuery = `
            UPDATE Address
            SET street = ?, street_number = ?, city = ?, state = ?, postal_code = ?
            WHERE address_id = (SELECT address_id FROM User WHERE email_id = ?)
        `;
        connection.query(updateAddressQuery, [street, streetNumber, city, state, postalCode, email], (error) => {
            if (error) {
                connection.release();
                res.status(500).json({ message: 'Internal server error' });
                return;
            }

            // Update user information
            const updateUserQuery = `
                UPDATE User
                SET first_name = ?, last_name = ?, phone_number = ?
                WHERE email_id = ?
            `;
            connection.query(updateUserQuery, [firstName, lastName, phoneNumber, email], (error) => {
                if (error) {
                    connection.release();
                    res.status(500).json({ message: 'Internal server error' });
                    return;
                }

                // Check if password is provided
                if (password) {
                    const hashedPassword = bcrypt.hashSync(password, saltRounds);
                    const updatePasswordQuery = `
                        UPDATE User
                        SET password = ?
                        WHERE email_id = ?
                    `;
                    connection.query(updatePasswordQuery, [hashedPassword, email], (error) => {
                        connection.release();
                        if (error) {
                            res.status(500).json({ message: 'Internal server error' });
                            return;
                        }
                        res.json({ message: 'User information updated successfully' });
                    });
                } else {
                    connection.release();
                    res.json({ message: 'User information updated successfully' });
                }
            });
        });
    });
});



module.exports = router;
