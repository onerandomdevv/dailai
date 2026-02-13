const prisma = require("../db");
const logger = require("../utils/logger");

class ConversationRepository {
  /**
   * Create a new conversation
   */
  async create(userId, channel, contextJson = {}) {
    try {
      const conversation = await prisma.conversation.create({
        data: {
          userId,
          channel,
          status: "active",
          contextJson,
          turnCount: 0,
        },
      });

      logger.info("Conversation created", {
        conversationId: conversation.id,
        userId,
        channel,
      });

      return conversation;
    } catch (error) {
      logger.error("Error creating conversation", {
        userId,
        channel,
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Get active conversation for user
   */
  async getActive(userId, channel) {
    return await prisma.conversation.findFirst({
      where: {
        userId,
        channel,
        status: "active",
      },
      orderBy: { startedAt: "desc" },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          take: 10, // Last 10 messages for context
        },
      },
    });
  }

  /**
   * Update conversation context
   */
  async updateContext(conversationId, contextJson) {
    return await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        contextJson,
        turnCount: { increment: 1 },
      },
    });
  }

  /**
   * End a conversation
   */
  async end(conversationId) {
    return await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        status: "completed",
        endedAt: new Date(),
      },
    });
  }

  /**
   * Timeout inactive conversations
   */
  async timeoutInactive(minutesInactive = 30) {
    const cutoffTime = new Date(Date.now() - minutesInactive * 60 * 1000);

    const result = await prisma.conversation.updateMany({
      where: {
        status: "active",
        startedAt: {
          lt: cutoffTime,
        },
      },
      data: {
        status: "timeout",
        endedAt: new Date(),
      },
    });

    logger.info("Timed out inactive conversations", { count: result.count });
    return result;
  }
}

module.exports = new ConversationRepository();
