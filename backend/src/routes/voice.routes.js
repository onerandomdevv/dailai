const express = require('express');
const router = express.Router();
const voiceController = require('../controllers/voice.controller');

// Africa's Talking sends POST requests for voice callbacks
router.post('/', voiceController.handleVoice);

module.exports = router;
