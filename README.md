# DialAI

AI-powered USSD application using Africa's Talking and Google Gemini.

## Features
- **Health Assistant**: AI-powered symptom checker.
- **Translator**: English to Swahili translator.
- **Guide**: Life hacks and event planning tips.
- **Bulk SMS**: Send notifications to multiple users.

## Prerequisites
- Node.js (v18+)
- Africa's Talking Account (Live or Sandbox)
- Google Gemini API Key

## Setup
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory:
    ```ini
    PORT=3000
    AT_USERNAME=your_africastalking_username
    AT_API_KEY=your_africastalking_api_key
    GEMINI_API_KEY=your_gemini_api_key
    # Optional: Africa's Talking Sender ID (to bypass DND)
    SMS_SENDER_ID=YourSenderID
    ```

## Usage
### Development
Start the server with hot-reloading:
```bash
npm run dev
```

### Live USSD
1.  Expose your local server using Ngrok:
    ```bash
    ngrok http 3000
    ```
2.  Configure your Africa's Talking USSD callback URL:
    `http://<your-ngrok-url>/ussdRoutes`
3.  Dial your USSD code (e.g., `*347*157#`).

## Deployment
This project is ready to be deployed to platforms like Heroku, Render, or Railway.
Ensure you set the environment variables in your deployment dashboard.
