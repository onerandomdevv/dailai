/**
 * Usage limits by subscription tier
 */
const USAGE_LIMITS = {
  free: {
    dailyTextLimit: 5, // USSD + SMS combined
    dailyVoiceLimit: 2,
  },
  pro: {
    dailyTextLimit: 50,
    dailyVoiceLimit: Infinity, // Unlimited
  },
  enterprise: {
    dailyTextLimit: Infinity, // Unlimited
    dailyVoiceLimit: Infinity, // Unlimited
  },
};

/**
 * Check if user has exceeded their usage limit
 * @param {Object} user - User object from database
 * @param {string} channel - 'ussd', 'sms', 'voice', 'web'
 * @returns {Object} { allowed: boolean, message: string }
 */
function checkUsageLimit(user, channel) {
  const tier = user.subscriptionTier || "free";
  const limits = USAGE_LIMITS[tier];

  // Determine if this is a voice or text channel
  const isVoice = channel === "voice";

  if (isVoice) {
    // Check voice limit
    if (user.dailyVoiceCount >= limits.dailyVoiceLimit) {
      return {
        allowed: false,
        message:
          tier === "free"
            ? "Daily voice limit reached (2/2 calls used).\n\n✨ Upgrade to PRO for unlimited voice calls!\n\n📞 Contact: +234XXX or reply UPGRADE"
            : "You have reached your daily voice call limit. Contact support for assistance.",
      };
    }
  } else {
    // Check text limit (USSD, SMS, web)
    if (user.dailyUsageCount >= limits.dailyTextLimit) {
      return {
        allowed: false,
        message:
          tier === "free"
            ? `Daily limit reached (${user.dailyUsageCount}/${limits.dailyTextLimit} requests used).\n\n✨ Upgrade to PRO:\n• 50 requests/day\n• Unlimited voice\n• Priority support\n\n📞 Reply UPGRADE for details`
            : tier === "pro"
              ? `Daily limit reached (${user.dailyUsageCount}/${limits.dailyTextLimit}).\n\n🌟 Upgrade to ENTERPRISE for unlimited access.\n\n📞 Contact sales: +234XXX`
              : "Daily limit reached. Contact support.",
      };
    }
  }

  return { allowed: true, message: null };
}

/**
 * Get upgrade message based on current tier
 */
function getUpgradeMessage(tier) {
  if (tier === "free") {
    return "Upgrade to Pro for 50 daily requests and unlimited voice calls.";
  } else if (tier === "pro") {
    return "Upgrade to Enterprise for unlimited access and priority support.";
  }
  return "";
}

module.exports = {
  USAGE_LIMITS,
  checkUsageLimit,
  getUpgradeMessage,
};
