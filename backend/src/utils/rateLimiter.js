// In-memory request tracker (Placeholders for Redis in Production)
const requestCounts = new Map();
const MAX_REQUESTS = 5; // Hackathon limit: 5 requests per day per number

/**
 * Checks if a phone number has exceeded the daily limit.
 * @param {string} phoneNumber 
 * @returns {boolean}
 */
exports.isAllowed = (phoneNumber) => {
    if (!phoneNumber) return true; // Safety

    const today = new Date().toDateString();
    const key = `${phoneNumber}:${today}`;

    const count = requestCounts.get(key) || 0;

    if (count >= MAX_REQUESTS) {
        console.warn(`[Rate Limit] Blocked: ${phoneNumber} (Count: ${count})`);
        return false;
    }

    requestCounts.set(key, count + 1);
    return true;
};
