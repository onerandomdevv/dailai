const axios = require("axios");
const aiService = require("../services/ai.service");
const interactionTracker = require("../utils/interactionTracker");

exports.handleVoice = async (req, res) => {
  const { isActive, recordingUrl, dtmfDigits, phoneNumber } = req.body;
  const digits = dtmfDigits; // Africa's Talking sends digits as 'dtmfDigits'
  const rateLimiter = require("../utils/rateLimiter");

  // Track this interaction
  interactionTracker.trackInteraction(phoneNumber, "VOICE");

  console.log(`\n--- [Voice Call Log] ---`);
  console.log(`[DEBUG] Full request body:`, JSON.stringify(req.body, null, 2));
  console.log(`[DEBUG] Query params:`, JSON.stringify(req.query, null, 2));
  console.log(`[Status] Active: ${isActive}, From: ${phoneNumber}`);
  console.log(`[DEBUG] Digits value:`, digits, `(type: ${typeof digits})`);
  console.log(`[DEBUG] RecordingUrl:`, recordingUrl);

  if (digits) console.log(`[Input] User pressed: "${digits}"`);
  if (recordingUrl)
    console.log(`[Audio] Recording URL: ${recordingUrl.substring(0, 50)}...`);

  // Rate Limiting Check (Fraud Prevention)
  if (!rateLimiter.isAllowed(phoneNumber)) {
    console.warn(`[Blocked] Rate limit exceeded for ${phoneNumber}`);
    res.set("Content-Type", "text/xml");
    return res.send(
      `<?xml version="1.0" encoding="UTF-8"?><Response><Say>Sorry, you have reached your daily limit for DialAI. Goodbye.</Say></Response>`,
    );
  }

  let responseAction = "";

  try {
    // 1. New Call - Main Menu
    if ((isActive === "1" || isActive === 1) && !digits) {
      console.log(`[Step] New Call: Showing Main Menu`);
      responseAction = `
                <GetDigits timeout="10" finishOnKey="#" callbackUrl="https://${req.get("host")}/voice">
                    <Say>Welcome to Dial AI. For Health guidance, press 1. For Translation, press 2.</Say>
                </GetDigits>
                <Say>We did not receive any input. Goodbye.</Say>`;
    }
    // 2. Handle Menu Choice
    else if (digits) {
      if (digits === "1") {
        console.log(`[Step] Mode Selected: Health`);
        responseAction = `
                    <Say>Health mode active. Describe your symptoms after the beep.</Say>
                    <Record maxLength="10" trimSilence="true" playBeep="true" callbackUrl="https://${req.get("host")}/voice?mode=health"/>`;
      } else if (digits === "2") {
        console.log(`[Step] Mode Selected: Translation`);
        responseAction = `
                    <Say>Translation mode active. Speak the phrase you want to translate after the beep.</Say>
                    <Record maxLength="10" trimSilence="true" playBeep="true" callbackUrl="https://${req.get("host")}/voice?mode=translator"/>`;
      } else {
        console.warn(`[Step] Invalid Choice Received: ${digits}`);
        responseAction = `<Say>Invalid choice. Goodbye.</Say>`;
      }
    }
    // 3. Process Recording - Step 1: Acknowledge and redirect
    else if (recordingUrl && !req.query.processing) {
      const mode = req.query.mode || "health";
      console.log(
        `[Step] Recording received for ${mode}, redirecting to processing...`,
      );

      // Immediately respond with "please wait" and redirect to processing endpoint
      responseAction = `
        <Say>Please wait while I process your request.</Say>
        <Redirect>https://${req.get("host")}/voice?mode=${mode}&recordingUrl=${encodeURIComponent(recordingUrl)}&processing=true&phoneNumber=${phoneNumber}</Redirect>`;
    }
    // 3. Process Recording - Step 2: Actually process the AI request
    else if (req.query.processing === "true" && req.query.recordingUrl) {
      const mode = req.query.mode || "health";
      const recordingUrl = req.query.recordingUrl;
      console.log(`[Step] Processing ${mode.toUpperCase()} audio recording...`);

      try {
        // Download audio
        const audioData = await axios.get(recordingUrl, {
          responseType: "arraybuffer",
        });
        const base64Audio = Buffer.from(audioData.data).toString("base64");
        console.log(`[Audio] Audio downloaded and converted to Base64`);

        // Select Prompt
        let promptText =
          process.env.PROMPT_VOICE ||
          "You are a helpful assistant. Speak briefly.";
        if (mode === "translator") {
          promptText =
            process.env.PROMPT_VOICE_TRANSLATOR ||
            "You are a translator. Translate the audio strictly.";
        }

        const parts = [
          { text: promptText },
          { inlineData: { mimeType: "audio/mp3", data: base64Audio } },
        ];

        console.log(`[AI] Sending to Google Gemini...`);
        const aiText = await aiService.generateResponse(parts);
        console.log(`[AI Response] "${aiText}"`);

        responseAction = `<Say>${aiText}</Say>`;
      } catch (error) {
        console.error("[AI Processing Error]", error);
        responseAction = `<Say>Sorry, I had trouble processing that. Please try again.</Say>`;
      }
    }
    // 4. Fallback / Hangup
    else {
      console.log(`[Step] Call closing / Fallback`);
      responseAction = `<Say>Thank you for calling Dial AI. Goodbye.</Say>`;
    }
  } catch (error) {
    console.error("[Voice Error Log]", error.message);
    responseAction = `<Say>I am having trouble. Please try again later.</Say>`;
  }

  // Send XML
  const response = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    ${responseAction}
</Response>`;

  console.log(`[Outbound XML sent to AT]`);
  res.set("Content-Type", "text/xml");
  res.send(response);
};
