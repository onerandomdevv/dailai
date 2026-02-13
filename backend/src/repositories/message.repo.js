const prisma = require("../db");
const logger = require("../utils/logger");

class MessageRepository {
  /**
   * Create a new message
   */
  async create(
    conversationId,
    role,
    inputText,
    outputText,
    inputType = "text",
    latencyMs = null,
  ) {
    try {
      const message = await prisma.message.create({
        data: {
          conversationId,
          role,
          inputText,
          outputText,
          inputType,
          latencyMs,
        },
      });

      logger.info("Message created", {
        messageId: message.id,
        conversationId,
        role,
      });

      return message;
    } catch (error) {
      logger.error("Error creating message", {
        conversationId,
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Get conversation history
   */
  async getHistory(conversationId, limit = 50) {
    return await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
      take: limit,
    });
  }

  /**
   * Get analytics for a conversation
   */
  async getAnalytics(conversationId) {
    const messages = await prisma.message.findMany({
      where: { conversationId },
    });

    const avgLatency =
      messages.reduce((sum, m) => sum + (m.latencyMs || 0), 0) /
        messages.length || 0;

    return {
      totalMessages: messages.length,
      avgLatencyMs: Math.round(avgLatency),
      inputTypes: messages.reduce((acc, m) => {
        acc[m.inputType] = (acc[m.inputType] || 0) + 1;
        return acc;
      }, {}),
    };
  }
}

module.exports = new MessageRepository();
