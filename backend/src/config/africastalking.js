const AfricasTalking = require('africastalking');

const credentials = {
  username: process.env.AT_USERNAME,
  apiKey: process.env.AT_API_KEY
}
console.log({ credentials })
module.exports = AfricasTalking(credentials);
