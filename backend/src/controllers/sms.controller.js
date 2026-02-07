const interactionTracker = require('../utils/interactionTracker');
const conversationContext = require('../utils/conversationContext');
const smsService = require('../services/sms.service');
const aiService = require('../services/ai.service');
const healthPrompt = require('../prompts/health.prompt');
const translatorPrompt = require('../prompts/translator.prompt');

const handleIncomingSMS = async (req, res) => {
    try {
        const { from, text, to, date, id, linkId } = req.body;

        // Track this interaction
        interactionTracker.trackInteraction(from, 'SMS');

        console.log(`\n📨 [SMS Received] From: ${from}`);
        console.log(`   Message: "${text}"`);

        // Trim and normalize input
        const userInput = text.trim();

        // Check if this is a follow-up response (1, 2, or 3)
        if (/^[123]$/.test(userInput)) {
            await handleFollowUpResponse(from, userInput);
            return res.status(200).send('SMS Received');
        }

        // Check for conversation context
        const context = conversationContext.get(from);

        if (context) {
            console.log(`   [Context Found] Service: ${context.service}`);
            await handleContextualReply(from, userInput, context);
        } else {
            console.log(`   [No Context] Treating as new conversation`);
            await handleNewConversation(from, userInput);
        }

        res.status(200).send('SMS Received');
    } catch (error) {
        console.error('Error processing incoming SMS:', error);
        res.status(500).send('Error processing SMS');
    }
};

/**
 * Handle follow-up responses (1=Better, 2=Same, 3=Worse)
 */
const handleFollowUpResponse = async (phoneNumber, response) => {
    const context = conversationContext.get(phoneNumber);

    let message = '';

    if (response === '1') {
        message = "Great to hear you're feeling better! 🎉 Take care and stay healthy. If you need help again, just text us!";
        console.log(`   [Follow-up] User feeling BETTER ✅`);
    } else if (response === '2') {
        message = "I see you're feeling the same. Keep monitoring your symptoms. If they persist or worsen, please visit a clinic. Stay hydrated and rest well.";
        console.log(`   [Follow-up] User feeling SAME ⚠️`);
    } else if (response === '3') {
        message = "⚠️ Your symptoms are getting worse. Please visit a clinic or hospital as soon as possible. If it's an emergency, call 112 or go to the nearest emergency room immediately.";
        console.log(`   [Follow-up] User feeling WORSE 🚨`);
    }

    // Send response
    await smsService.sendSMS(
        phoneNumber,
        message,
        process.env.SMS_SENDER_ID || process.env.AT_VOICE_NUMBER
    );

    // Clear context after follow-up
    conversationContext.delete(phoneNumber);
};

/**
 * Handle contextual reply (continuing a conversation)
 */
const handleContextualReply = async (phoneNumber, userInput, context) => {
    let prompt = '';
    let label = '';

    // Route based on previous service
    if (context.service === 'Health') {
        prompt = healthPrompt(userInput);
        label = '[DialAI Health]';
    } else if (context.service === 'Translator') {
        prompt = translatorPrompt(userInput);
        label = '[DialAI Translate]';
    } else {
        // Default to health
        prompt = healthPrompt(userInput);
        label = '[DialAI]';
    }

    console.log(`   [AI Processing] Using ${context.service} context...`);

    // Generate AI response
    const aiResponse = await aiService.generateResponse(prompt);

    // Send response
    await smsService.sendSMS(
        phoneNumber,
        `${label}\n${aiResponse}`,
        process.env.SMS_SENDER_ID || process.env.AT_VOICE_NUMBER
    );

    // Update context timestamp
    conversationContext.update(phoneNumber, { lastMessage: userInput });
};

/**
 * Handle new conversation (no context)
 */
const handleNewConversation = async (phoneNumber, userInput) => {
    // Try to detect intent from the message
    const lowerInput = userInput.toLowerCase();

    let service = 'Health'; // Default to health
    let prompt = '';
    let label = '';

    // Simple intent detection
    if (lowerInput.includes('translate') || lowerInput.includes('language')) {
        service = 'Translator';
        prompt = translatorPrompt(userInput);
        label = '[DialAI Translate]';
    } else {
        // Default to health assistant
        service = 'Health';
        prompt = healthPrompt(userInput);
        label = '[DialAI Health]';
    }

    console.log(`   [New Conversation] Detected service: ${service}`);

    // Store context
    conversationContext.set(phoneNumber, {
        service,
        lastMessage: userInput
    });

    // Generate AI response
    const aiResponse = await aiService.generateResponse(prompt);

    // Send response
    await smsService.sendSMS(
        phoneNumber,
        `${label}\n${aiResponse}`,
        process.env.SMS_SENDER_ID || process.env.AT_VOICE_NUMBER
    );
};

const handleDeliveryReport = async (req, res) => {
    try {
        console.log('📬 [SMS Delivery Report]:', req.body);
        res.status(200).send('Report Received');
    } catch (error) {
        console.error('Error processing delivery report:', error);
        res.status(500).send('Error processing report');
    }
};

module.exports = {
    handleIncomingSMS,
    handleDeliveryReport
};
