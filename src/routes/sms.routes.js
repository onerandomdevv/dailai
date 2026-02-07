const express = require('express');
const router = express.Router();
const smsController = require('../controllers/sms.controller');

// Incoming SMS
router.post('/incoming', smsController.handleIncomingSMS);

// Delivery Reports
router.post('/delivery', smsController.handleDeliveryReport);

module.exports = router;
