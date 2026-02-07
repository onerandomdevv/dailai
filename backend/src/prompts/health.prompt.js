const defaultPrompt = `You are a helpful health assistant.`;
module.exports = (userInput) => {
    // Get prompt from env or default
    let promptTemplate = process.env.PROMPT_HEALTH || defaultPrompt;
    // Replace the {userInput} placeholder manually if present, or append it if using old style
    if (promptTemplate.includes("{userInput}")) {
        return promptTemplate.replace("{userInput}", userInput);
    } else {
        return `${promptTemplate}\nUser Query: "${userInput}"\nResponse:`;
    }
};
