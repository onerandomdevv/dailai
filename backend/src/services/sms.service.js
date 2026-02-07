const africastalking = require('../config/africastalking');
const sms = africastalking.SMS;

const sendSMS = async (to, message, from = null) => {
  try {
    // If 'to' is already an array, use it; otherwise wrap it in an array.
    const recipients = Array.isArray(to) ? to : [to];

    console.log(`[SMS Service] Attempting to send SMS to ${recipients} with sender ID: ${from || 'DEFAULT'}`);

    const options = {
      to: recipients,
      message: message,
      // 'from' is optional (Short Code or Sender ID)
      ...(from && { from })
    };
    const result = await sms.send(options);
    console.log('SMS sent successfully. Result:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return null; // Don't crash the app if SMS fails, just log it.
  }
};

module.exports = { sendSMS };
