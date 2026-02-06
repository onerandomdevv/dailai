const aiService = require("../services/ai.service");
const smsService = require("../services/sms.service");
const ussdService = require("../services/ussd.service");
const healthPrompt = require("../prompts/health.prompt");
const translatorPrompt = require("../prompts/translator.prompt");
const guidePrompt = require("../prompts/guide.prompt");

exports.handleUSSD = async (req, res) => {
  // Read the variables sent via POST from our API
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  let response = "";

  // Split the text string to determine the user's "path"
  // e.g., "1*headache" -> ["1", "headache"]
  const textArray = text ? text.split("*") : [];
  const level = textArray.length;

  // --- MAIN MENU ---
  if (text === "") {
    response = `CON DialAI
1. Health
2. Translator
3. Guide`;
  }

  // --- 1. HEALTH ASSISTANT ---
  else if (text === "1") {
    response = `CON Describe your symptom:`;
  } else if (textArray[0] === "1") {
    // User has entered a concern
    const userQuery = textArray.slice(1).join(" "); // Rejoin in case they used * in text (unlikely but safe)

    // Immediate response to end USSD session
    response = `END Request received. Health advice will come via SMS.`;

    // Process AI and SMS asynchronously
    // Note: In production, use a queue. For Hackathon, direct call is fine.
    ussdService.processAsyncRequest(
      phoneNumber,
      healthPrompt(userQuery),
      "[DialAI Health]",
    );
  }

  // --- 2. TRANSLATOR ---
  else if (text === "2") {
    response = `CON Enter text to translate (Eng/Swa):`;
  } else if (textArray[0] === "2") {
    const userQuery = textArray.slice(1).join(" ");

    response = `END Processing. Translation sending via SMS.`;

    (async () => {
      ussdService.processAsyncRequest(
        phoneNumber,
        translatorPrompt(userQuery),
        "[DialAI Translate]",
      );
    })();
  }

  // --- 3. GUIDED ASSISTANCE ---
  else if (text === "3") {
    response = `CON Select Topic:
1. Health Tips
2. Life Hacks
3. Event Planning`;
  } else if (textArray[0] === "3") {
    // User selected a sub-topic
    const selection = textArray[1];
    let topic = "";

    if (selection === "1") topic = "General Health Tips";
    else if (selection === "2")
      topic = "Daily Life Hacks (Productivity/Savings)";
    else if (selection === "3") topic = "Event Planning Basics";
    else {
      // Invalid selection fallback
      response = `END Invalid choice. Try again.`;
      res.set("Content-Type", "text/plain");
      res.send(response);
      return;
    }

    response = `END Sending "${topic}" tips via SMS.`;

    (async () => {
      ussdService.processAsyncRequest(
        phoneNumber,
        guidePrompt(topic),
        "[DialAI Guide]",
      );
    })();
  }

  // --- INVALID INPUT ---
  else {
    response = `END Invalid input. Try again.`;
  }

  // Send the response back to the API
  res.set("Content-Type", "text/plain");
  res.send(response);
};
