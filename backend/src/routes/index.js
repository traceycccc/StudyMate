const express = require('express');
const router = express.Router();

// Example route for testing
router.get('/api/test', (req, res) => {
    res.json({ message: "API is working at the rout /index.js!" });
});

module.exports = router;
