const prisma = require("../db");
const logger = require("../utils/logger");
const {
  detectCountry,
  detectNigerianNetwork,
  shouldResetDailyUsage,
} = require("../utils/phoneUtils");

class UserRepository {
  /**
   * Find or create a user by phone number with auto-detection and usage tracking
   */
  async findOrCreate(phoneNumber, data = {}) {
    try {
      // Check if user exists
      let user = await prisma.user.findUnique({
        where: { phoneNumber },
      });

      if (user) {
        // User exists - handle daily usage reset and increment
        const isVoice = data.channel === "voice";
        const resetTextUsage = shouldResetDailyUsage(user.lastUsageDate);
        const resetVoiceUsage = shouldResetDailyUsage(user.lastVoiceUsageDate);

        const updateData = {
          channelLastUsed: data.channel || user.channelLastUsed,
          updatedAt: new Date(),
        };

        // Handle text usage (USSD, SMS, web)
        if (!isVoice) {
          if (resetTextUsage) {
            updateData.dailyUsageCount = 1;
            updateData.lastUsageDate = new Date();
            logger.info("Daily text usage reset", {
              userId: user.id,
              phoneNumber,
            });
          } else {
            updateData.dailyUsageCount = user.dailyUsageCount + 1;
            updateData.lastUsageDate = new Date();
          }
        }

        // Handle voice usage
        if (isVoice) {
          if (resetVoiceUsage) {
            updateData.dailyVoiceCount = 1;
            updateData.lastVoiceUsageDate = new Date();
            logger.info("Daily voice usage reset", {
              userId: user.id,
              phoneNumber,
            });
          } else {
            updateData.dailyVoiceCount = user.dailyVoiceCount + 1;
            updateData.lastVoiceUsageDate = new Date();
          }
        }

        user = await prisma.user.update({
          where: { phoneNumber },
          data: updateData,
        });

        logger.info("User updated", {
          userId: user.id,
          phoneNumber,
          dailyUsageCount: user.dailyUsageCount,
          dailyVoiceCount: user.dailyVoiceCount,
        });
      } else {
        // New user - detect country and network
        const country = detectCountry(phoneNumber);
        const networkProvider =
          country.code === "NG" ? detectNigerianNetwork(phoneNumber) : null;

        user = await prisma.user.create({
          data: {
            phoneNumber,
            preferredLanguage: data.preferredLanguage || "en",
            channelLastUsed: data.channel,
            countryCode: country.code,
            countryName: country.name,
            networkProvider,
            subscriptionTier: "free",
            dailyUsageCount: 1,
            lastUsageDate: new Date(),
          },
        });

        logger.info("User created", {
          userId: user.id,
          phoneNumber,
          countryCode: country.code,
          networkProvider,
        });
      }

      return user;
    } catch (error) {
      logger.error("Error in findOrCreate user", {
        phoneNumber,
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Get user by phone number
   */
  async findByPhoneNumber(phoneNumber) {
    return await prisma.user.findUnique({
      where: { phoneNumber },
      include: {
        conversations: {
          where: { status: "active" },
          orderBy: { startedAt: "desc" },
          take: 1,
        },
      },
    });
  }

  /**
   * Update user preferences
   */
  async updatePreferences(userId, preferences) {
    return await prisma.user.update({
      where: { id: userId },
      data: preferences,
    });
  }

  /**
   * Update subscription tier
   */
  async updateSubscription(userId, tier) {
    if (!["free", "pro", "enterprise"].includes(tier)) {
      throw new Error("Invalid subscription tier");
    }

    return await prisma.user.update({
      where: { id: userId },
      data: { subscriptionTier: tier },
    });
  }

  /**
   * Get user usage stats
   */
  async getUsageStats(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        dailyUsageCount: true,
        lastUsageDate: true,
        subscriptionTier: true,
        _count: {
          select: { conversations: true },
        },
      },
    });

    return {
      dailyUsageCount: user.dailyUsageCount,
      lastUsageDate: user.lastUsageDate,
      subscriptionTier: user.subscriptionTier,
      totalConversations: user._count.conversations,
    };
  }
}

module.exports = new UserRepository();
