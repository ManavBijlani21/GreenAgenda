var express = require('express');
const connection = require('../app'); // Adjust path as needed
var router = express.Router();

router.use(function (req, res, next) {
    // Check if user session exists and user is an admin
    if (req.session && req.session.email && req.session.userType === 'admin') {
        next();  // User is logged in as admin, proceed to the next middleware or route handler
    } else {
        res.status(401).json({ message: "Unauthorized" });  // User is not logged in as admin, send unauthorized response
    }
});

router.get('/branches', (req, res) => {
    req.pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        const fetchBranchesQuery = 'SELECT branch_id AS id, branch_name AS name FROM Branch';

        connection.query(fetchBranchesQuery, (error, results) => {
            connection.release();
            if (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(200).json({ branches: results });
        });
    });
});

// Route to add a branch
router.post('/add-branch', (req, res) => {
    const { name, phoneNumber, email, address } = req.body;
    const { street, streetNumber, city, state, postalCode } = address;

    req.pool.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const addAddressQuery = `
            INSERT INTO Address (street, street_number, city, state, postal_code)
            VALUES (?, ?, ?, ?, ?)
        `;

        connection.query(addAddressQuery, [street, streetNumber, city, state, postalCode], (error, results) => {
            if (error) {
                console.error(error);
                connection.release();
                return res.status(500).json({ message: 'Internal server error' });
            }

            const addressId = results.insertId;
            const addBranchQuery = `
                INSERT INTO Branch (branch_name, branch_phone_number, branch_email_id, address_id)
                VALUES (?, ?, ?, ?)
            `;

            connection.query(addBranchQuery, [name, phoneNumber, email, addressId], (error) => {
                connection.release();
                if (error) {
                    console.error(error);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                res.status(200).json({ message: 'Branch added successfully' });
            });
        });
    });
});

// Route to delete a branch
router.post('/delete-branch', (req, res) => {
    const { id } = req.body;

    req.pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        const deleteBranchQuery = `
            DELETE FROM Branch WHERE branch_id = ?
        `;

        connection.query(deleteBranchQuery, [id], (error, results) => {
            connection.release();
            if (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Branch not found' });
            }

            res.status(200).json({ message: 'Branch deleted successfully' });
        });
    });
});

// Route to set a branch manager
router.post('/set-branch-manager', (req, res) => {
    const { branchId, email } = req.body;

    req.pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        const setManagerQuery = `
            UPDATE Branch
            SET manager_id = (SELECT email_id FROM User WHERE email_id = ? AND user_type = 'manager')
            WHERE branch_id = ?
        `;

        connection.query(setManagerQuery, [email, branchId], (error, results) => {
            connection.release();
            if (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Branch or manager not found' });
            }

            res.status(200).json({ message: 'Branch manager set successfully' });
        });
    });
});

router.get('/users', (req, res) => {
    req.pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        const fetchUsersQuery = `
            SELECT first_name AS firstName, last_name AS lastName, email_id AS email, phone_number AS phoneNumber, user_type AS userType
            FROM User
        `;

        connection.query(fetchUsersQuery, (error, results) => {
            connection.release();
            if (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(200).json(results);
        });
    });
});

module.exports = router;
