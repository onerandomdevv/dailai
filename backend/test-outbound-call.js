require('dotenv').config();
const africastalking = require('./src/config/africastalking');
const voice = africastalking.VOICE;

// Get phone number from command line argument
const phoneNumber = process.argv[2];

if (!phoneNumber) {
    console.error('❌ Error: Please provide a phone number');
    console.log('Usage: node test-outbound-call.js +234XXXXXXXXXX');
    process.exit(1);
}

// Validate phone number format (basic check)
if (!phoneNumber.startsWith('+')) {
    console.error('❌ Error: Phone number must start with + and include country code');
    console.log('Example: +2349135334779');
    process.exit(1);
}

async function makeCall(number) {
    try {
        const options = {
            callFrom: process.env.AT_VOICE_NUMBER || '+2342017000885',
            callTo: [number],
        };

        console.log(`📞 Making outbound call to ${number}...`);
        const result = await voice.call(options);
        console.log('✅ Call initiated:', JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('❌ Call failed:', error);
    }
}

makeCall(phoneNumber);
