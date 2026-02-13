const { Worker } = require("bullmq");
const logger = require("../utils/logger");
const { connection } = require("./index");
const aiService = require("../ai/gemini.service");
const smsService = require("../services/sms.service");

// Voice Processing Worker
const voiceWorker = new Worker(
  "voice-processing",
  async (job) => {
    const { phoneNumber, recordingUrl, conversationId } = job.data;

    logger.info("Processing voice job", {
      jobId: job.id,
      phoneNumber,
      conversationId,
    });

    try {
      // Download audio, convert to base64, send to Gemini
      const axios = require("axios");
      const audioResponse = await axios.get(recordingUrl, {
        responseType: "arraybuffer",
      });
      const audioBase64 = Buffer.from(audioResponse.data).toString("base64");

      // Generate AI response
      const aiResponse = await aiService.generateResponse([
        {
          inlineData: {
            mimeType: "audio/wav",
            data: audioBase64,
          },
        },
      ]);

      logger.info("AI response generated", {
        jobId: job.id,
        responseLength: aiResponse.length,
      });

      // Send response via SMS
      await smsService.sendSMS(phoneNumber, aiResponse);

      return { success: true, response: aiResponse };
    } catch (error) {
      logger.error("Voice processing failed", {
        jobId: job.id,
        error: error.message,
      });
      throw error;
    }
  },
  { connection },
);

// Followup Worker
const followupWorker = new Worker(
  "followup",
  async (job) => {
    const { phoneNumber, symptom } = job.data;

    logger.info("Processing followup job", {
      jobId: job.id,
      phoneNumber,
    });

    try {
      const message = `Hi from DialAI! How is your condition feeling now?\n1. Better\n2. Same\n3. Worse (Please visit a clinic)`;
      await smsService.sendSMS(phoneNumber, message);

      return { success: true };
    } catch (error) {
      logger.error("Followup processing failed", {
        jobId: job.id,
        error: error.message,
      });
      throw error;
    }
  },
  { connection },
);

voiceWorker.on("completed", (job) => {
  logger.info("Voice job completed", { jobId: job.id });
});

voiceWorker.on("failed", (job, err) => {
  logger.error("Voice job failed", { jobId: job?.id, error: err.message });
});

followupWorker.on("completed", (job) => {
  logger.info("Followup job completed", { jobId: job.id });
});

followupWorker.on("failed", (job, err) => {
  logger.error("Followup job failed", { jobId: job?.id, error: err.message });
});

module.exports = {
  voiceWorker,
  followupWorker,
};
