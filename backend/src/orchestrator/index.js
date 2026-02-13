const userRepo = require("../repositories/user.repo");
const conversationRepo = require("../repositories/conversation.repo");
const messageRepo = require("../repositories/message.repo");
const logger = require("../utils/logger");
const { checkUsageLimit } = require("../utils/usageLimits");
const analyticsTracker = require("../utils/analyticsTracker");

class Orchestrator {
  /**
   * Handle incoming message from any channel with tier-based usage enforcement
   * @param {string} phoneNumber - User's phone number
   * @param {string} channel - 'ussd', 'sms', 'voice', 'web'
   * @param {string} inputText - User's input
   * @param {string} inputType - 'text', 'dtmf', 'speech'
   * @param {object} context - Additional context (service type, etc.)
   * @returns {object} { user, conversation, allowed, limitMessage, latencyMs }
   */
  async handleMessage(
    phoneNumber,
    channel,
    inputText,
    inputType = "text",
    context = {},
  ) {
    const startTime = Date.now();

    try {
      // 1. Find or create user (this handles daily usage reset and increment)
      const user = await userRepo.findOrCreate(phoneNumber, { channel });

      // 2. Check usage limits BEFORE processing
      const limitCheck = checkUsageLimit(user, channel);

      if (!limitCheck.allowed) {
        // Track limit hit event for analytics
        const limitType = channel === "voice" ? "voice" : "text";
        analyticsTracker.trackLimitHit(user, channel, limitType);

        logger.warn("Usage limit exceeded", {
          userId: user.id,
          phoneNumber,
          channel,
          tier: user.subscriptionTier,
          dailyUsageCount: user.dailyUsageCount,
          dailyVoiceCount: user.dailyVoiceCount,
        });

        return {
          user,
          conversation: null,
          allowed: false,
          limitMessage: limitCheck.message,
          latencyMs: Date.now() - startTime,
        };
      }

      // 3. Get or create active conversation
      let conversation = await conversationRepo.getActive(user.id, channel);

      if (!conversation) {
        conversation = await conversationRepo.create(user.id, channel, {
          service: context.service || "general",
          ...context,
        });
      }

      // 4. Store user message
      await messageRepo.create(
        conversation.id,
        "user",
        inputText,
        null,
        inputType,
      );

      // 5. Update conversation context
      await conversationRepo.updateContext(conversation.id, {
        ...conversation.contextJson,
        lastUserMessage: inputText,
        lastInteraction: new Date().toISOString(),
        ...context,
      });

      const latency = Date.now() - startTime;

      // Track successful usage for analytics
      analyticsTracker.trackUsage(user, channel, context.service || "general");

      logger.info("Message handled", {
        userId: user.id,
        conversationId: conversation.id,
        channel,
        allowed: true,
        latencyMs: latency,
      });

      return {
        user,
        conversation,
        allowed: true,
        limitMessage: null,
        latencyMs: latency,
      };
    } catch (error) {
      logger.error("Error handling message", {
        phoneNumber,
        channel,
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Store AI response
   */
  async storeResponse(conversationId, responseText, latencyMs = null) {
    try {
      await messageRepo.create(
        conversationId,
        "assistant",
        null,
        responseText,
        "text",
        latencyMs,
      );

      logger.info("Response stored", { conversationId });
    } catch (error) {
      logger.error("Error storing response", {
        conversationId,
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Get conversation history for context
   */
  async getConversationHistory(conversationId, limit = 10) {
    return await messageRepo.getHistory(conversationId, limit);
  }

  /**
   * End conversation
   */
  async endConversation(conversationId) {
    return await conversationRepo.end(conversationId);
  }
}

module.exports = new Orchestrator();
