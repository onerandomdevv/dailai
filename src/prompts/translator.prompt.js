const defaultPrompt = `You are a translator.`;
module.exports = (userInput) => {
    let promptTemplate = process.env.PROMPT_TRANSLATOR || defaultPrompt;
    if (promptTemplate.includes("{userInput}")) {
        return promptTemplate.replace("{userInput}", userInput);
    } else {
        return `${promptTemplate}\nUser Input: "${userInput}"\nResponse:`;
    }
};
