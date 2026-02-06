const express = require('express');
const router = express.Router();
const ussdController = require('../controllers/ussd.controller');

// Africa's Talking USSD callback URL
router.post('/', ussdController.handleUSSD);

// Health check
router.get('/', (req, res) => {
    res.send('DialAI USSD Service is running.');
});

module.exports = router;
