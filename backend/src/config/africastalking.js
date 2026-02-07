const AfricasTalking = require('africastalking');

const credentials = {
  username: process.env.AT_USERNAME,
  apiKey: process.env.AT_API_KEY
};

// SECURITY: Never log credentials
module.exports = AfricasTalking(credentials);
