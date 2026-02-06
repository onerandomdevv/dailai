const model = require('../config/gemini');

const generateResponse = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating AI response:', error);
    return "Sorry, I am having trouble thinking right now. Please try again later.";
  }
};

module.exports = { generateResponse };
