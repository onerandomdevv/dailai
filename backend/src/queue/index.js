const { Queue, Worker } = require("bullmq");
const Redis = require("ioredis");
const logger = require("../utils/logger");

// Redis connection
const connection = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379",
  {
    maxRetriesPerRequest: null,
  },
);

// Create queues
const voiceProcessingQueue = new Queue("voice-processing", { connection });
const followupQueue = new Queue("followup", { connection });

// Export queues
module.exports = {
  voiceProcessingQueue,
  followupQueue,
  connection,
};
