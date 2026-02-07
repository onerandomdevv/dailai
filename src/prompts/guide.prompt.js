const defaultPrompt = `You are a guide.`;
module.exports = (topic) => {
    let promptTemplate = process.env.PROMPT_GUIDE || defaultPrompt;
    if (promptTemplate.includes("{topic}")) {
        return promptTemplate.replace("{topic}", topic);
    } else {
        return `${promptTemplate}\nUser Logic: "${topic}"\nResponse:`;
    }
};
