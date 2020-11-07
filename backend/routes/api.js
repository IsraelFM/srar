const express = require('express');
const router = express.Router();

// Simple GET API listing
router.get('/api', (req, res) => {
    res.send('API works');
});

module.exports = router;