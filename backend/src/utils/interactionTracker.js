/**
 * Phone Number Interaction Tracker
 * Tracks how many times each phone number has interacted with the system
 */

const interactionCounts = new Map();

/**
 * Track an interaction for a phone number
 * @param {string} phoneNumber - The phone number to track
 * @param {string} service - The service used (USSD, SMS, Voice)
 * @returns {number} - The current count for this phone number
 */
const trackInteraction = (phoneNumber, service = 'UNKNOWN') => {
    if (!phoneNumber) return 0;

    const currentCount = interactionCounts.get(phoneNumber) || 0;
    const newCount = currentCount + 1;
    interactionCounts.set(phoneNumber, newCount);

    console.log(`\n📊 [Interaction Tracker] ${service}`);
    console.log(`   Phone: ${phoneNumber}`);
    console.log(`   Count: ${newCount} interaction${newCount > 1 ? 's' : ''}`);
    console.log(`   Total unique users: ${interactionCounts.size}\n`);

    return newCount;
};

/**
 * Get the interaction count for a specific phone number
 * @param {string} phoneNumber - The phone number to check
 * @returns {number} - The interaction count
 */
const getCount = (phoneNumber) => {
    return interactionCounts.get(phoneNumber) || 0;
};

/**
 * Get all interaction statistics
 * @returns {Object} - Statistics object
 */
const getStats = () => {
    const stats = {
        totalUniqueUsers: interactionCounts.size,
        totalInteractions: Array.from(interactionCounts.values()).reduce((sum, count) => sum + count, 0),
        users: Array.from(interactionCounts.entries()).map(([phone, count]) => ({
            phoneNumber: phone,
            interactions: count
        })).sort((a, b) => b.interactions - a.interactions)
    };

    return stats;
};

/**
 * Reset all counts (useful for testing)
 */
const reset = () => {
    interactionCounts.clear();
    console.log('📊 [Interaction Tracker] All counts reset');
};

module.exports = {
    trackInteraction,
    getCount,
    getStats,
    reset
};
