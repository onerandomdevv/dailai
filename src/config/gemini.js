const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use gemini-2.0-flash as proven working
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

module.exports = model;
