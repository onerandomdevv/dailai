const express = require('express');
const router = express.Router();
const africastalking = require('../config/africastalking');
const voice = africastalking.VOICE;

/**
 * POST /api/call
 * Body: { "phoneNumber": "+234XXXXXXXXXX" }
 */
router.post('/call', async (req, res) => {
    const { phoneNumber } = req.body;

    // Validation
    if (!phoneNumber) {
        return res.status(400).json({
            error: 'Phone number is required',
            example: { phoneNumber: '+2349135334779' }
        });
    }

    if (!phoneNumber.startsWith('+')) {
        return res.status(400).json({
            error: 'Phone number must include country code (e.g., +234...)'
        });
    }

    try {
        const options = {
            callFrom: process.env.AT_VOICE_NUMBER || '+2342017000885',
            callTo: [phoneNumber],
        };

        console.log(`[Outbound Call] Initiating call to ${phoneNumber}`);
        const result = await voice.call(options);

        res.json({
            success: true,
            message: `Call initiated to ${phoneNumber}`,
            details: result
        });
    } catch (error) {
        console.error('[Outbound Call Error]', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
