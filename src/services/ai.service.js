const model = require('../config/gemini');

const generateResponse = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    // Check for rate limit (429) or overload (503) errors to give better feedback
    if (error.status === 503 || error.status === 429 || error.message.includes('overloaded')) {
      console.warn(`[AI Service] Rate limit hit (${error.status || 'Overloaded'}). Info: Free Tier limit is ~15 RPM.`);
      return "I am a bit busy right now. Please try again in a moment.";
    }

    // unexpected error
    console.error(`[AI Service] Error: ${error.message}`);

    return "Sorry, I am having trouble thinking right now. Please try again later.";
  }
};

module.exports = { generateResponse };
