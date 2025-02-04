var express = require('express');
var router = express.Router();

//Do something to make sure the user is logged in
router.post('/register', function (req, res, next) {
    req.pool.getConnection(function (err, connection) {
        if (err) {
            console.log("Database Server error!", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        const { firstName, lastName, feedback } = req.body;

        const query = 'UPDATE User SET feedback = ? WHERE first_name = ? AND last_name = ?';

        connection.query(query, [feedback, firstName, lastName], function (error, results) {
            connection.release(); // Release the connection after the query

            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "User not found or feedback not updated" });
            }

            return res.json({ message: "Feedback Added!" });
        });
    });
});


//Fetch the User information
router.get('/feedbacks', function (req, res) {
    req.pool.getConnection(function (err, connection) {
        if (err) {
            console.log("Database connection error", err);
            return res.status(500).json({ message: "Database error" });
        }

        const query = 'SELECT first_name, last_name, feedback FROM User WHERE feedback IS NOT NULL';

        connection.query(query, function (error, results) {
            connection.release();

            if (error) {
                console.error("Error fetching feedbacks:", error);
                return res.status(500).json({ message: "Error fetching feedbacks" });
            }

            // Render the feedbacks to the front-end
            res.status(200).json(results);
        });
    });
});


module.exports = router;
