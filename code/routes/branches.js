var express = require('express');
var router = express.Router();

router.post('/join', async (req, res) => {
    const userId = req.session.user && req.session.user.id;  // Assuming user ID is stored in session
    const branchName = req.body.branchName;
    const pool = req.pool;  // Get the pool from the request

    if (!userId) {
        return res.status(401).json({ error: 'User not logged in' });
    }

    try {
        // Find the branch ID based on the branch name
        pool.query('SELECT branch_id FROM Branch WHERE branch_name = ?', [branchName], (err, results) => {
            if (err) {
                console.error('Error finding branch:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            
            if (results.length === 0) {
                return res.status(404).json({ error: 'Branch not found' });
            }

            const branchId = results[0].branch_id;

            // Insert the user into the UserBranch table
            pool.query('INSERT INTO UserBranch (user_id, branch_id) VALUES (?, ?)', [userId, branchId], (err, results) => {
                if (err) {
                    console.error('Error joining branch:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                res.json({ success: true, message: `Joined branch ${branchName}` });
            });
        });
    } catch (error) {
        console.error('Error joining branch:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
