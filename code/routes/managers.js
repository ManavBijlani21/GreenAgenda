var express = require('express');
const connection = require('../app'); // Adjust path as needed
var router = express.Router();
const nodemailer = require('nodemailer');

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

// Route to fetch all events for the manager's branch
router.get('/events', (req, res) => {
    const query = 'SELECT event_id AS id, title FROM Event WHERE branch_id = ?';
    req.pool.query(query, [req.branchId], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.status(200).json({ events: results });
    });
});

// Route to fetch event details by ID
router.get('/get-event/:id', (req, res) => {
    const eventId = req.params.id;
    const query = 'SELECT * FROM Event WHERE event_id = ? AND branch_id = ?';
    req.pool.query(query, [eventId, req.branchId], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: "Event not found" });
            return;
        }
        res.status(200).json(results[0]);
    });
});

// Helper function to send email notifications
const sendEmail = (managerEmail, user, eventName, eventDescription, eventDate) => {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Replace with your SMTP host
        port: 587, // gmail SMTP port is 587
        secure: false,
        auth: {
            user: 'serenitysanctuary001@gmail.com',
            pass: 'WDCProjectGrp21'
        }
    });

    // Define the email options
    const mailOptions = {
        from: `"Serenity Sanctuary Branch Manager" <${managerEmail}>`,
        to: user.email,
        replyTo: managerEmail,
        subject: `New Event: ${eventName}`,
        text: `Hi ${user.name},\n\nThere is a new event: ${eventName}.\n\nDescription: ${eventDescription}\nDate: ${eventDate}\n\nBest regards,\nBranch Manager`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error); // Log error if email fails to send
        }
        console.log(`Email sent to ${user.email}: ${info.response}`); // Log success message
    });
};

// Route to add an event
router.post('/add-event', (req, res) => {
    const { title, description, date, location, visibility } = req.body;

    if (!title || !description || !date || !location || !visibility) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    req.pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        const query = `
            INSERT INTO Event (title, description, date, location, accessibility_status, branch_id, email_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        connection.query(query, [title, description, date, location, visibility, req.branchId, req.session.email], (error) => {
            if (error) {
                connection.release();
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            // After successfully adding the event, notify branch members
            const getUsersByBranch = `
                SELECT u.email_id AS email, u.first_name AS name
                FROM User u
                JOIN UserBranch ub ON u.email_id = ub.user_id
                WHERE ub.branch_id = ?
            `;

            connection.query(getUsersByBranch, [req.branchId], (error, results) => {
                connection.release(); // Release the connection after all queries are done
                if (error) {
                    console.error('Error fetching users:', error);
                    return res.status(500).json({ message: 'Internal server error' });
                }

                // Send email to each user
                results.forEach(user => {
                    sendEmail(req.session.email, user, title, description, date);
                });

                res.status(200).json({ message: 'Event added and notifications sent successfully' });
            });
        });
    });
});

router.post('/modify-event', (req, res) => {
    const { id, title, description, date, location, visibility } = req.body;

    if (!id || !title || !description || !date || !location || !visibility) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    req.pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        const query = `
            UPDATE Event
            SET title = ?, description = ?, date = ?, location = ?, accessibility_status = ?
            WHERE event_id = ? AND branch_id = ?
        `;

        connection.query(query, [title, description, date, location, visibility, id, req.branchId], (error, results) => {
            connection.release();

            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Event not found' });
            }

            res.status(200).json({ message: 'Event updated successfully' });
        });
    });
});

// Route to fetch branch members
router.get('/members', (req, res) => {
    const query = `
        SELECT u.first_name AS firstName, u.last_name AS lastName, u.email_id AS email, u.phone_number AS phoneNumber
        FROM User u
        JOIN UserBranch ub ON u.email_id = ub.user_id
        WHERE ub.branch_id = ?
    `;
    req.pool.query(query, [req.branchId], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.status(200).json({ members: results });
    });
});

// Route to add a member to the branch
router.post('/add-member', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    req.pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        const query = 'INSERT INTO UserBranch (user_id, branch_id) VALUES (?, ?)';

        connection.query(query, [email, req.branchId], (error) => {
            connection.release();

            if (error) {
                console.error(error);
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'User already a member of this branch' });
                }
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.status(200).json({ message: 'Member added successfully' });
        });
    });
});

// Route to remove a member from the branch
router.post('/remove-member', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    req.pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        const query = 'DELETE FROM UserBranch WHERE user_id = ? AND branch_id = ?';

        connection.query(query, [email, req.branchId], (error, results) => {
            connection.release();

            if (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'User not found in this branch' });
            }

            res.status(200).json({ message: 'Member removed successfully' });
        });
    });
});

// Route to fetch RSVPs for a specific event
router.get('/rsvps/:eventId', (req, res) => {
    const eventId = req.params.eventId;

    const query = `
        SELECT u.first_name AS firstName, u.last_name AS lastName, u.email_id AS email, r.status
        FROM RSVP r
        JOIN User u ON r.email_id = u.email_id
        WHERE r.event_id = ?
    `;

    req.pool.query(query, [eventId], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        res.status(200).json({ rsvps: results });
    });
});

module.exports = router;
