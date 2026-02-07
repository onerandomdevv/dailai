/**
 * Conversation Context Tracker
 * Stores conversation context for SMS reply handling
 * In production, replace with Redis for multi-server support
 */

class ConversationContext {
    constructor() {
        // Map: phoneNumber -> { service, lastMessage, timestamp, followUpState }
        this.contexts = new Map();
        this.TTL = 30 * 60 * 1000; // 30 minutes in milliseconds

        // Cleanup expired contexts every 5 minutes
        setInterval(() => this.cleanup(), 5 * 60 * 1000);
    }

    /**
     * Store conversation context
     */
    set(phoneNumber, data) {
        const context = {
            ...data,
            timestamp: Date.now()
        };
        this.contexts.set(phoneNumber, context);
        console.log(`[Context] Stored for ${phoneNumber}:`, data.service);
    }

    /**
     * Get conversation context
     */
    get(phoneNumber) {
        const context = this.contexts.get(phoneNumber);

        if (!context) {
            return null;
        }

        // Check if expired
        const age = Date.now() - context.timestamp;
        if (age > this.TTL) {
            this.contexts.delete(phoneNumber);
            console.log(`[Context] Expired for ${phoneNumber}`);
            return null;
        }

        return context;
    }

    /**
     * Update existing context
     */
    update(phoneNumber, updates) {
        const existing = this.get(phoneNumber);
        if (existing) {
            this.set(phoneNumber, { ...existing, ...updates });
        }
    }

    /**
     * Delete context
     */
    delete(phoneNumber) {
        this.contexts.delete(phoneNumber);
        console.log(`[Context] Deleted for ${phoneNumber}`);
    }

    /**
     * Check if context exists and is valid
     */
    has(phoneNumber) {
        return this.get(phoneNumber) !== null;
    }

    /**
     * Cleanup expired contexts
     */
    cleanup() {
        const now = Date.now();
        let cleaned = 0;

        for (const [phoneNumber, context] of this.contexts.entries()) {
            const age = now - context.timestamp;
            if (age > this.TTL) {
                this.contexts.delete(phoneNumber);
                cleaned++;
            }
        }

        if (cleaned > 0) {
            console.log(`[Context] Cleaned up ${cleaned} expired context(s)`);
        }
    }

    /**
     * Get statistics
     */
    getStats() {
        return {
            activeContexts: this.contexts.size,
            contexts: Array.from(this.contexts.entries()).map(([phone, ctx]) => ({
                phoneNumber: phone,
                service: ctx.service,
                age: Math.round((Date.now() - ctx.timestamp) / 1000) + 's'
            }))
        };
    }
}

// Export singleton instance
module.exports = new ConversationContext();
