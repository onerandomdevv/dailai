const model = require('../config/gemini');

const generateResponse = async (prompt) => {
  try {
    // prompt can be a string or an array of parts (for multimodal)
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    // Check for rate limit (429) or overload (503) errors to give better feedback
    if (error.status === 503 || error.status === 429 || error.message.includes('overloaded')) {
      console.warn(`[AI Service] Rate limit hit. Info: Free Tier limit is ~15 RPM.`);
      return "I am a bit busy right now. Please try again in a moment.";
    }
    console.error(`[AI Service] Error: ${error.message}`);
    return "Sorry, I am having trouble thinking right now. Please try again later.";
  }
};

/**
 * Accept structured input (symptom, severity, context)
 * Apply strict safety rules & spoken-friendly responses
 */
const generateStructuredHealthResponse = async (symptom, severity, context = "General") => {
  const safetyPrompt = process.env.PROMPT_HEALTH.replace('{userInput}', `Symptom: ${symptom}, Severity: ${severity}, Context: ${context}`);

  // Enforce spoken-friendly style via system addition if not in .env
  const spokenRules = "\nConstraint: Respond in exactly 1-3 spoken sentences. Be warm and calm. NO lists.";

  return await generateResponse(safetyPrompt + spokenRules);
};

module.exports = { generateResponse, generateStructuredHealthResponse };
