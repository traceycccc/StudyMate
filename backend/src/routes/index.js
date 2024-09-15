const express = require('express');
const router = express.Router();

const admin = require('firebase-admin'); // Ensure Firebase Admin is accessible

// Example route for testing
router.get('/api/test', (req, res) => {
    res.json({ message: "API is working at the rout /index.js!" });
});
// Route to check if user exists by email
// router.post('/api/checkUserExists', async (req, res) => {
//     const { email } = req.body; // Get email from request body

//     try {
//         const userRecord = await admin.auth().getUserByEmail(email); // Check if the user exists in Firebase Auth
//         res.status(200).json({ exists: true, userRecord }); // If user exists, return the user record
//     } catch (error) {
//         if (error.code === 'auth/user-not-found') {
//             res.status(200).json({ exists: false }); // If user doesn't exist
//         } else {
//             console.error('Error fetching user:', error);
//             res.status(500).json({ error: 'Error checking user existence' });
//         }
//     }
// });

router.post('/api/checkUserExists', async (req, res) => {
    const { email } = req.body;

    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        res.status(200).json({ exists: true, userRecord });
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            res.status(200).json({ exists: false });
        } else {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Error checking user existence' });
        }
    }
});
module.exports = router;
