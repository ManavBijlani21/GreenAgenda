var express = require('express');
const connection = require('../app'); // May change
var router = express.Router();

router.use(function (req, res, next) {
    // Check if user session exists
    console.log(req.session);
    if (req.session && req.session.email && req.session.userType === 'manager') {
        next();  // User is logged in, proceed to the next middleware or route handler
    } else {
        res.status(401).json({ message: "Unauthorized" });  // User is not logged in, send unauthorized response
    }
});

/* find the branch being managed */
router.use(function (req, res, next) {
    const query = 'SELECT branch_id FROM Branch WHERE manager_id = ?';
    req.pool.query(query, [req.session.email], function (error, results) {
        if (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: "Branch not found" });
            return;
        }
        req.branchId = results[0].branch_id;
        next();
    });
});


// Route to add an event
router.post('/add-event', (req, res) => {
    const { title, description, date, location, visibility } = req.body;

    if (!title || !description || !date || !location || !visibility) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    req.pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error - aaa' });
        }

        const query = `
            INSERT INTO Event (title, description, date, location, accessibility_status, branch_id, email_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(query, [title, description, date, location, visibility, req.branchId, req.session.email], (error) => {
            connection.release();

            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(200).json({ message: 'Event added successfully' });
        });
    });
});



/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
