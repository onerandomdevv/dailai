const smsService = require("./sms.service");
const aiService = require("./ai.service");
const conversationContext = require("../utils/conversationContext");

/**
 * Handles the asynchronous process of sending a confirmation SMS,
 * generating an AI response, and sending the final result.
 *
 * @param {string} phoneNumber - The user's phone number.
 * @param {string} promptText - The text to send to the AI.
 * @param {string} contextLabel - The label for the final SMS (e.g., "[DialAI Health]").
 */
const processAsyncRequest = async (phoneNumber, promptText, contextLabel) => {
  try {
    // Determine service type from context label
    let service = 'Health';
    if (contextLabel.includes('Translate')) {
      service = 'Translator';
    } else if (contextLabel.includes('Guide')) {
      service = 'Guide';
    }

    // Store conversation context for SMS replies
    conversationContext.set(phoneNumber, {
      service,
      lastMessage: promptText,
      source: 'USSD'
    });

    // 1. Send immediate confirmation SMS
    await smsService.sendSMS(
      phoneNumber,
      "DialAI: Processing your request. You'll receive a response shortly.",
      process.env.SMS_SENDER_ID || process.env.AT_VOICE_NUMBER
    );

    // 2. Generate AI response
    const aiResponse = await aiService.generateResponse(promptText);
    console.log("AI Response Generated:", aiResponse); // Log the AI output for the user to see

    // 3. Send final result SMS
    await smsService.sendSMS(
      phoneNumber,
      `${contextLabel}\n${aiResponse}`,
      process.env.SMS_SENDER_ID || process.env.AT_VOICE_NUMBER
    );

    // 4. Schedule Follow-up (Patient Care Engagement)
    if (contextLabel.includes("Health")) {
      const followupService = require("./followup.service");
      // Extract the core symptom from the prompt text if possible, or just use "condition"
      followupService.scheduleFollowup(phoneNumber, "condition");
    }
  } catch (error) {
    console.error("Error in processAsyncRequest:", error);
    // Optionally send an error SMS to the user if critical
  }
};

module.exports = {
  processAsyncRequest,
};
