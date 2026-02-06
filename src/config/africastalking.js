const AfricasTalking = require('africastalking');

module.exports = AfricasTalking({
  username: process.env.AT_USERNAME,
  apiKey: process.env.AT_API_KEY
});
