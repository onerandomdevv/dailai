const orchestrator = require("../../orchestrator");
const aiService = require("../../ai/gemini.service");
const smsService = require("../../services/sms.service");
const healthPrompt = require("../../prompts/health.prompt");
const translatorPrompt = require("../../prompts/translator.prompt");
const guidePrompt = require("../../prompts/guide.prompt");
const interactionTracker = require("../../utils/interactionTracker");
const rateLimiter = require("../../utils/rateLimiter");
const logger = require("../../utils/logger");

/**
 * Handle USSD webhook with database-backed conversation tracking and usage limits
 */
exports.handleUSSD = async (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  // Track this interaction
  interactionTracker.trackInteraction(phoneNumber, "USSD");

  // Rate Limiting Check (Fraud Prevention)
  if (!rateLimiter.isAllowed(phoneNumber)) {
    res.set("Content-Type", "text/plain");
    return res.send(
      "END Sorry, you have exceeded the daily limit for DialAI. Please try again tomorrow.",
    );
  }

  logger.info("Incoming USSD Request", { sessionId, phoneNumber, text });

  let response = "";

  // Split the text string to determine the user's "path"
  const textArray = text ? text.split("*") : [];

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
    const userQuery = textArray.slice(1).join(" ");

    // Track in database and check usage limits
    const result = await orchestrator.handleMessage(
      phoneNumber,
      "ussd",
      userQuery,
      "dtmf",
      { sessionId, service: "Health" },
    );

    // Check if usage limit exceeded
    if (!result.allowed) {
      res.set("Content-Type", "text/plain");
      return res.send(`END ${result.limitMessage}`);
    }

    response = `END Request received. Health advice will come via SMS.`;

    // Process asynchronously only if allowed
    processAsyncRequest(
      phoneNumber,
      healthPrompt(userQuery),
      "[DialAI Health]",
      "Health",
    );
  }

  // --- 2. TRANSLATOR ---
  else if (text === "2") {
    response = `CON Enter text to translate (Eng/Swa):`;
  } else if (textArray[0] === "2") {
    const userQuery = textArray.slice(1).join(" ");

    // Track in database and check usage limits
    const result = await orchestrator.handleMessage(
      phoneNumber,
      "ussd",
      userQuery,
      "dtmf",
      { sessionId, service: "Translator" },
    );

    // Check if usage limit exceeded
    if (!result.allowed) {
      res.set("Content-Type", "text/plain");
      return res.send(`END ${result.limitMessage}`);
    }

    response = `END Processing. Translation sending via SMS.`;

    processAsyncRequest(
      phoneNumber,
      translatorPrompt(userQuery),
      "[DialAI Translate]",
      "Translator",
    );
  }

  // --- 3. GUIDED ASSISTANCE ---
  else if (text === "3") {
    response = `CON Select Topic:
1. Health Tips
2. Life Hacks
3. Event Planning`;
  } else if (textArray[0] === "3") {
    const selection = textArray[1];
    let topic = "";

    if (selection === "1") topic = "General Health Tips";
    else if (selection === "2")
      topic = "Daily Life Hacks (Productivity/Savings)";
    else if (selection === "3") topic = "Event Planning Basics";
    else {
      response = `END Invalid choice. Try again.`;
      res.set("Content-Type", "text/plain");
      res.send(response);
      return;
    }

    // Track in database and check usage limits
    const result = await orchestrator.handleMessage(
      phoneNumber,
      "ussd",
      topic,
      "dtmf",
      { sessionId, service: "Guide" },
    );

    // Check if usage limit exceeded
    if (!result.allowed) {
      res.set("Content-Type", "text/plain");
      return res.send(`END ${result.limitMessage}`);
    }

    response = `END Sending "${topic}" tips via SMS.`;

    processAsyncRequest(
      phoneNumber,
      guidePrompt(topic),
      "[DialAI Guide]",
      "Guide",
    );
  }

  // --- INVALID INPUT ---
  else {
    response = `END Invalid input. Try again.`;
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
};

/**
 * Process async request with AI and send SMS response
 * Stores conversation in database
 */
async function processAsyncRequest(
  phoneNumber,
  promptText,
  contextLabel,
  service,
) {
  try {
    const startTime = Date.now();

    // 1. Send immediate confirmation SMS
    await smsService.sendSMS(
      phoneNumber,
      "DialAI: Processing your request. You'll receive a response shortly.",
      process.env.SMS_SENDER_ID || process.env.AT_VOICE_NUMBER,
    );

    // 2. Generate AI response
    const aiResponse = await aiService.generateResponse(promptText);
    const latency = Date.now() - startTime;

    logger.info("AI Response Generated", {
      phoneNumber,
      service,
      latencyMs: latency,
    });

    // 3. Get conversation from orchestrator to store response
    const userRepo = require("../../repositories/user.repo");
    const conversationRepo = require("../../repositories/conversation.repo");

    const user = await userRepo.findByPhoneNumber(phoneNumber);
    if (user) {
      const conversation = await conversationRepo.getActive(user.id, "ussd");
      if (conversation) {
        await orchestrator.storeResponse(conversation.id, aiResponse, latency);
      }
    }

    // 4. Send final result SMS
    await smsService.sendSMS(
      phoneNumber,
      `${contextLabel}\n${aiResponse}`,
      process.env.SMS_SENDER_ID || process.env.AT_VOICE_NUMBER,
    );

    // 5. Schedule Follow-up (Patient Care Engagement)
    if (contextLabel.includes("Health")) {
      const followupService = require("../../services/followup.service");
      followupService.scheduleFollowup(phoneNumber, "condition");
    }
  } catch (error) {
    logger.error("Error in processAsyncRequest", {
      phoneNumber,
      error: error.message,
    });
  }
}
