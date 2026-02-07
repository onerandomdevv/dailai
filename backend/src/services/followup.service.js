const smsService = require('./sms.service');

/**
 * schedules a follow-up SMS to a user.
 * 
 * Note: For this Hackathon MVP, we use setTimeout.
 * In Production, this would use a Job Queue (like BullMQ) or a CRON job backed by a database.
 * 
 * @param {string} phoneNumber 
 * @param {string} symptom 
 */
exports.scheduleFollowup = (phoneNumber, symptom) => {
    const delay = (parseInt(process.env.FOLLOWUP_DELAY_SEC) || 30) * 1000;

    console.log(`[Follow-up] Scheduled for ${phoneNumber} in ${delay / 1000}s (Symptom: ${symptom})`);

    setTimeout(async () => {
        const message = `Hi from DialAI! How is your ${symptom} feeling now? 
1. Better
2. Same
3. Worse (Please visit a clinic)`;

        try {
            await smsService.sendSMS(phoneNumber, message, process.env.SMS_SENDER_ID || process.env.AT_VOICE_NUMBER);
            console.log(`[Follow-up] Sent successfully to ${phoneNumber}`);
        } catch (error) {
            console.error(`[Follow-up] Failed to send:`, error);
        }
    }, delay);
};
