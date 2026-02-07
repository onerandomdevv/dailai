# DialAI 🌍📞

**AI-Powered Healthcare Assistant for Everyone, Everywhere**

DialAI bridges the digital divide by providing AI-powered health assistance, translation, and guidance through USSD, SMS, and Voice—accessible on any phone, even without internet.

Built for the Africa's Talking Hackathon to demonstrate how AI can serve underserved communities.

---

## 🎯 Project Overview

DialAI is a monorepo containing:
- **Backend**: Node.js server with Africa's Talking and Google Gemini integration
- **Frontend**: Next.js demo-day presentation website

### The Problem
Millions across Africa lack internet access but need reliable health information and support.

### The Solution
DialAI uses USSD and Voice channels to deliver AI-powered assistance through basic phones, requiring zero data.

---

## 📁 Repository Structure

```
dailai/
├── backend/          # Node.js backend with AT & Gemini integration
│   ├── src/          # Source code (routes, services, controllers)
│   ├── .env.example  # Environment variables template
│   └── README.md     # Backend documentation
│
├── frontend/         # Next.js demo website
│   ├── app/          # Next.js app directory
│   ├── public/       # Static assets
│   └── README.md     # Frontend documentation
│
└── README.md         # This file
```

---

## 🚀 Quick Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Expose your local server (for testing):
   ```bash
   ngrok http 3000
   ```

📖 **Full backend documentation**: [backend/README.md](./backend/README.md)

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser:
   ```
   http://localhost:3000
   ```

📖 **Full frontend documentation**: [frontend/README.md](./frontend/README.md)

---

## ✨ Features

- **🏥 Health Assistant**: AI-powered symptom checker with safety guardrails
- **🌐 Translator**: Multilingual translation (English, Swahili, Pidgin)
- **🎙️ Voice AI**: Interactive phone menu with spoken responses
- **📱 USSD Access**: Works on any phone, no smartphone required
- **💬 SMS Delivery**: Responses sent via text for offline access
- **🔒 Safety First**: No diagnoses, only guidance and encouragement

---

## 🛠️ Technologies Used

### Backend
- Node.js & Express
- Africa's Talking API (USSD, SMS, Voice)
- Google Gemini AI
- dotenv for configuration

### Frontend
- Next.js 15
- TypeScript
- TailwindCSS
- React

---

## 🌟 Vision

DialAI demonstrates that AI can be inclusive and accessible. By leveraging existing infrastructure (USSD, SMS, Voice), we can deliver cutting-edge AI assistance to anyone with a basic phone.

**Our goal**: Empower underserved communities with AI-powered support, regardless of internet access or device capabilities.

---

## 📞 How to Demo

### USSD Flow
1. Dial `*347*157#` (or your configured code)
2. Select "Health Assistant"
3. Describe a symptom
4. Receive AI-powered advice via SMS

### Voice Flow
1. Call your Africa's Talking number
2. Press '1' for Health Assistant
3. Describe your symptom after the beep
4. Listen to AI-generated advice

---

## 🤝 Contributing

This project was built for the Africa's Talking Hackathon. Contributions, suggestions, and feedback are welcome!

---

## 📄 License

MIT License - feel free to use this project as inspiration for your own inclusive AI solutions.

---

**Built with ❤️ for Africa's Talking Hackathon**

*Bridging the digital divide, one call at a time.*
