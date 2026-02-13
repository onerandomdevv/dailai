const logger = require("./logger");

/**
 * Analytics event tracker for monitoring user behavior and limits
 */
class AnalyticsTracker {
  /**
   * Track when a user hits their usage limit
   * @param {Object} user - User object
   * @param {string} channel - Channel where limit was hit
   * @param {string} limitType - 'text' or 'voice'
   */
  trackLimitHit(user, channel, limitType) {
    const event = {
      eventType: "LIMIT_HIT",
      userId: user.id,
      phoneNumber: user.phoneNumber,
      subscriptionTier: user.subscriptionTier,
      channel,
      limitType,
      dailyUsageCount: user.dailyUsageCount,
      dailyVoiceCount: user.dailyVoiceCount,
      countryCode: user.countryCode,
      networkProvider: user.networkProvider,
      timestamp: new Date().toISOString(),
    };

    // Log for analytics
    logger.info("Analytics: Limit Hit", event);

    // TODO: Send to analytics service (e.g., Mixpanel, Amplitude, Google Analytics)
    // Example: analyticsService.track('limit_hit', event);

    return event;
  }

  /**
   * Track successful upgrade conversion
   * @param {Object} user - User object
   * @param {string} fromTier - Previous tier
   * @param {string} toTier - New tier
   */
  trackUpgrade(user, fromTier, toTier) {
    const event = {
      eventType: "UPGRADE",
      userId: user.id,
      phoneNumber: user.phoneNumber,
      fromTier,
      toTier,
      countryCode: user.countryCode,
      timestamp: new Date().toISOString(),
    };

    logger.info("Analytics: Upgrade", event);
    return event;
  }

  /**
   * Track usage patterns
   * @param {Object} user - User object
   * @param {string} channel - Channel used
   * @param {string} service - Service type (Health, Translator, Guide)
   */
  trackUsage(user, channel, service) {
    const event = {
      eventType: "USAGE",
      userId: user.id,
      subscriptionTier: user.subscriptionTier,
      channel,
      service,
      dailyUsageCount: user.dailyUsageCount,
      dailyVoiceCount: user.dailyVoiceCount,
      timestamp: new Date().toISOString(),
    };

    logger.debug("Analytics: Usage", event);
    return event;
  }

  /**
   * Get analytics summary for a user
   * @param {string} userId - User ID
   * @returns {Object} Analytics summary
   */
  async getUserAnalytics(userId) {
    // TODO: Query from analytics database or service
    // For now, return placeholder
    return {
      userId,
      totalLimitHits: 0,
      lastLimitHit: null,
      conversionPotential: "high", // high, medium, low
    };
  }
}

module.exports = new AnalyticsTracker();
