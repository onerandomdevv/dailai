const africastalking = require('../config/africastalking');
const sms = africastalking.SMS;

const sendSMS = async (to, message) => {
  try {
    const options = {
      to: [to],
      message: message
    };
    const result = await sms.send(options);
    console.log('SMS sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending SMS:', error);
    return null; // Don't crash the app if SMS fails, just log it.
  }
};

module.exports = { sendSMS };
