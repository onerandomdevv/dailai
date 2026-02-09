# DialAI

AI-powered USSD application using Africa's Talking and Google Gemini.

## Features

- **Health Assistant**: AI-powered symptom checker.
- **Translator**: English to Swahili translator.
- **Health Assistant**: AI-powered symptom checker.
- **Translator**: Multilingual voice and text translator.
- **Voice AI**: Interactive phone menu with spoken AI guidance.
- **Guidance Service**: Encouraging step-by-step practical tips.

## Prerequisites

- Node.js (v18+)
- Africa's Talking Account (Live or Sandbox)
- Google Gemini API Key

## Setup

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Create a `.env` file (see `.env.example` for required variables).
4.  Expose your local server: `ngrok http 3000`

## Configuration

Inside the Africa's Talking Dashboard, set the following Callback URLs:

- **USSD Callback**: `https://ducal-isaiah-sappiest.ngrok-free.dev/ussdRoutes`
- **Voice Callback**: `https://ducal-isaiah-sappiest.ngrok-free.dev/voice`

## How to Demo (Hackathon Script)

### 1. USSD Flow (The Offline Assistant)

- **Dial**: `*347*157#` (or your code).
- **Test**: Select "Health", describe a symptom like "headache".
- **Result**: Sessions ends with a "Thinking" message; advice arrives via SMS.

### 2. Voice Flow (The "Call a Friend" AI)

- **Action**: Trigger an outbound call via API:
  ```bash
  POST /api/call
  { "phoneNumber": "+234..." }
  ```
- **Test**: Answer the call, press '1' for Health. Describe a symptom after the beep.
- **Result**: Gemini listens to your audio and speaks back natural, calm advice.

### 3. Translator Flow

- **Action**: Call and press '2' (Voice) or select Menu 2 (USSD).
- **Test**: Speak/Type "Hello, how are you?".
- **Result**: Instant Swahili translation ("Jambo, habari yako?").

## Vision

DialAI is built for inclusivity. By combining USSD, Voice, and Gemini AI, we bridge the digital divide—providing life-saving information to anyone with a basic phone and no internet.
