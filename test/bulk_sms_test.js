// Load env vars first
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { sendSMS } = require('../src/services/sms.service');

const testBulkSMS = async () => {
    console.log('--- Testing Bulk SMS ---');

    // Example recipients (using test numbers)
    const recipients = ['+254711XXXYYY', '+254733YYYZZZ'];
    const message = "I'm a lumberjack and its ok, I sleep all night and I work all day";
    const senderId = 'XXYYZZ'; // Optional: Replace with valid ShortCode/SenderID if available

    console.log(`Sending to: ${recipients}`);
    console.log(`Message: "${message}"`);
    console.log(`From: ${senderId}`);

    const result = await sendSMS(recipients, message, senderId);

    console.log('Result:', result);
};

testBulkSMS();
