# DialAI Backend - Complete API Documentation for Frontend

## 🏗️ Architecture Overview

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                        DialAI Backend                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   USSD       │  │     SMS      │  │    Voice     │      │
│  │  Channel     │  │   Channel    │  │   Channel    │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                  │                  │              │
│         └──────────────────┼──────────────────┘              │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │  Controllers    │                        │
│                   └────────┬────────┘                        │
│                            │                                 │
│         ┌──────────────────┼──────────────────┐             │
│         │                  │                  │             │
│  ┌──────▼──────┐  ┌────────▼────────┐  ┌─────▼──────┐      │
│  │   USSD      │  │      SMS        │  │   Voice    │      │
│  │  Service    │  │    Service      │  │  Service   │      │
│  └──────┬──────┘  └────────┬────────┘  └─────┬──────┘      │
│         │                  │                  │             │
│         └──────────────────┼──────────────────┘             │
│                            │                                │
│                   ┌────────▼────────┐                       │
│                   │   AI Service    │                       │
│                   │  (Gemini API)   │                       │
│                   └─────────────────┘                       │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Utilities & Middleware                   │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │ • Error Handling  • Rate Limiting                    │  │
│  │ • Context Tracking • Interaction Tracking            │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📡 API Endpoints

### Base URL
- **Development:** `http://localhost:3000`
- **Production:** `https://your-app.onrender.com`

---

### 1. Health Check

#### `GET /health`
Check if the server is running.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-02-07T11:29:17.123Z",
  "uptime": 1234.56,
  "environment": "development"
}
```

**Use Case:** Frontend can ping this to check backend status.

---

### 2. Outbound Voice Call

#### `POST /api/call`
Initiate an outbound voice call to a phone number.

**Request Body:**
```json
{
  "phoneNumber": "+2349135334779"
}
```

**Validation:**
- Phone number must include country code (start with `+`)
- Phone number is required

**Success Response (200):**
```json
{
  "success": true,
  "message": "Call initiated to +2349135334779",
  "details": {
    "status": "Queued",
    "phoneNumber": "+2349135334779",
    "sessionId": "ATVId_..."
  }
}
```

**Error Response (400):**
```json
{
  "error": "Phone number must include country code (e.g., +234...)"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Insufficient balance"
}
```

**Frontend Integration:**
```javascript
const initiateCall = async (phoneNumber) => {
  const response = await fetch('http://localhost:3000/api/call', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber })
  });
  return await response.json();
};
```

---

### 3. USSD Webhook

#### `POST /ussdRoutes`
**Note:** This is called by Africa's Talking, not your frontend.

**Request Body (from AT):**
```json
{
  "sessionId": "ATUid_...",
  "serviceCode": "*347*157#",
  "phoneNumber": "+2347013504022",
  "text": "1*I have a headache"
}
```

**Response Format:**
```
CON Welcome to DialAI
1. Health
2. Translator
3. Guide
```
or
```
END Request received. Health advice will come via SMS.
```

**Frontend Impact:** None directly, but you can display USSD code for users.

---

### 4. SMS Webhooks

#### `POST /sms/incoming`
**Note:** Called by Africa's Talking when SMS is received.

**Request Body (from AT):**
```json
{
  "from": "+2347013504022",
  "text": "I have a headache",
  "to": "12345",
  "date": "2026-02-07 10:30:00",
  "id": "ATXid_...",
  "linkId": "SampleLinkId123"
}
```

**SMS Reply Logic:**
1. **Follow-up Response:** If text is `1`, `2`, or `3`
   - `1` = Better → Positive acknowledgment
   - `2` = Same → Monitoring advice
   - `3` = Worse → Urgent clinic visit

2. **Contextual Reply:** If conversation context exists
   - Continues conversation with AI
   - Uses previous service (Health/Translator)

3. **New Conversation:** If no context
   - Detects intent from message
   - Routes to appropriate service
   - Stores context for future replies

**Frontend Impact:** None directly, but you can show SMS interaction history.

---

#### `POST /sms/delivery`
**Note:** Called by Africa's Talking for delivery reports.

**Request Body (from AT):**
```json
{
  "id": "ATXid_...",
  "status": "Success",
  "phoneNumber": "+2347013504022",
  "retryCount": 0
}
```

---

### 5. Voice Webhook

#### `POST /voice`
**Note:** Called by Africa's Talking during voice calls.

**Request Body (from AT):**
```json
{
  "isActive": "1",
  "sessionId": "ATVId_...",
  "phoneNumber": "+2347013504022",
  "digits": "1",
  "recordingUrl": "https://..."
}
```

**Response Format (XML):**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <GetDigits timeout="10" finishOnKey="#" callbackUrl="...">
    <Say>Welcome to Dial AI. For Health guidance, press 1...</Say>
  </GetDigits>
</Response>
```

**Voice Flow:**
1. **Main Menu:** Press 1 (Health) or 2 (Translation)
2. **Recording:** User speaks after beep (10 seconds max)
3. **AI Processing:** Audio → Gemini API → Text response
4. **Response:** Text-to-Speech via Africa's Talking

---

## 🎯 Services & Business Logic

### 1. AI Service (`ai.service.js`)

**Purpose:** Interface with Google Gemini API

**Main Function:**
```javascript
generateResponse(prompt) → Promise<string>
```

**Input:**
- String prompt (text)
- OR Array of parts (multimodal: text + audio)

**Output:**
- AI-generated text response

**Error Handling:**
- Rate limit (429/503) → "I am a bit busy right now..."
- Other errors → "Sorry, I am having trouble..."

**Frontend Integration:**
Not directly called by frontend. Used by backend services.

---

### 2. SMS Service (`sms.service.js`)

**Purpose:** Send SMS via Africa's Talking

**Main Function:**
```javascript
sendSMS(to, message, from) → Promise<result>
```

**Parameters:**
- `to`: Phone number(s) - string or array
- `message`: SMS text content
- `from`: Sender ID (optional) - defaults to `SMS_SENDER_ID` or `AT_VOICE_NUMBER`

**Example:**
```javascript
await sendSMS('+2347013504022', 'Hello from DialAI!', 'ATAlert');
```

**Response:**
```json
{
  "SMSMessageData": {
    "Message": "Sent to 1/1 Total Cost: NGN 0.8000",
    "Recipients": [{
      "statusCode": 101,
      "number": "+2347013504022",
      "status": "Success",
      "cost": "NGN 0.8000",
      "messageId": "ATXid_..."
    }]
  }
}
```

---

### 3. USSD Service (`ussd.service.js`)

**Purpose:** Process async USSD requests (send SMS with AI responses)

**Main Function:**
```javascript
processAsyncRequest(phoneNumber, promptText, contextLabel)
```

**Flow:**
1. Store conversation context
2. Send confirmation SMS
3. Generate AI response
4. Send result SMS
5. Schedule follow-up (if health-related)

**Context Labels:**
- `[DialAI Health]`
- `[DialAI Translate]`
- `[DialAI Guide]`

---

### 4. Follow-up Service (`followup.service.js`)

**Purpose:** Schedule follow-up SMS for health queries

**Main Function:**
```javascript
scheduleFollowup(phoneNumber, symptom)
```

**Delay:**
- Development: 30 seconds (`FOLLOWUP_DELAY_SEC=30`)
- Production: 24 hours (`FOLLOWUP_DELAY_SEC=86400`)

**Follow-up Message:**
```
Hi from DialAI! How is your condition feeling now?
1. Better
2. Same
3. Worse (Please visit a clinic)
```

**Note:** Uses `setTimeout` (in-memory). In production, use job queue.

---

## 🛠️ Utilities

### 1. Rate Limiter (`rateLimiter.js`)

**Purpose:** Prevent abuse (fraud protection)

**Function:**
```javascript
isAllowed(phoneNumber) → boolean
```

**Limits:**
- 5 requests per day per phone number
- Resets daily (based on date string)

**Storage:** In-memory Map (use Redis in production)

**Frontend Impact:** Show error if user exceeds limit.

---

### 2. Interaction Tracker (`interactionTracker.js`)

**Purpose:** Track interaction counts per phone number

**Functions:**
```javascript
trackInteraction(phoneNumber, service) → number
getCount(phoneNumber) → number
getStats() → object
```

**Services:** `'USSD'`, `'SMS'`, `'VOICE'`

**Console Output:**
```
📊 [Interaction Tracker] USSD
   Phone: +2347013504022
   Count: 3 interactions
   Total unique users: 5
```

**Frontend Use:** Could display user interaction stats.

---

### 3. Conversation Context (`conversationContext.js`)

**Purpose:** Track conversation context for SMS replies

**Functions:**
```javascript
set(phoneNumber, data)
get(phoneNumber) → context | null
update(phoneNumber, updates)
delete(phoneNumber)
has(phoneNumber) → boolean
getStats() → object
```

**Context Data:**
```javascript
{
  service: 'Health',        // or 'Translator', 'Guide'
  lastMessage: 'I have a headache',
  timestamp: 1707305357123,
  source: 'USSD'           // or 'SMS'
}
```

**TTL:** 30 minutes (auto-cleanup)

**Frontend Use:** Could show active conversation status.

---

### 4. Error Middleware (`errorMiddleware.js`)

**Purpose:** Global error handling

**Features:**
- Catches all unhandled errors
- Format-specific responses (USSD/Voice/SMS/API)
- Structured error logging
- User-friendly messages

**Error Classes:**
- `ValidationError` (400)
- `NotFoundError` (404)
- `RateLimitError` (429)
- `ExternalAPIError` (502)
- `UnauthorizedError` (401)

---

## 📊 Data Flow Examples

### Example 1: USSD Health Query

```
User dials *347*157#
    ↓
[USSD Controller] Shows main menu
    ↓
User selects 1 (Health)
    ↓
[USSD Controller] Prompts for symptom
    ↓
User enters "headache"
    ↓
[USSD Controller] Ends session, calls USSD Service
    ↓
[USSD Service] 
  1. Stores conversation context
  2. Sends confirmation SMS
  3. Calls AI Service with health prompt
  4. Sends AI response via SMS
  5. Schedules follow-up (30s dev / 24h prod)
    ↓
User receives SMS with health advice
    ↓
[30 seconds later]
    ↓
[Follow-up Service] Sends follow-up SMS
    ↓
User replies "1" (Better)
    ↓
[SMS Controller] Detects follow-up response
    ↓
Sends acknowledgment SMS
```

---

### Example 2: SMS Reply Conversation

```
User receives SMS from USSD query
    ↓
User replies: "What about fever?"
    ↓
[SMS Controller] Receives incoming SMS
    ↓
Checks conversation context
    ↓
Context found: { service: 'Health', ... }
    ↓
Calls AI Service with health prompt
    ↓
Sends AI response via SMS
    ↓
Updates conversation context timestamp
```

---

### Example 3: Voice Call

```
User calls +2342017000885
    ↓
[Voice Controller] Plays main menu
    ↓
User presses 1 (Health)
    ↓
[Voice Controller] Prompts for recording
    ↓
User speaks: "I have stomach pain"
    ↓
[Voice Controller]
  1. Downloads audio from AT
  2. Converts to base64
  3. Sends to AI Service (multimodal)
  4. Receives text response
  5. Returns XML with <Say> tag
    ↓
Africa's Talking speaks AI response to user
```

---

## 🎨 Frontend Integration Guide

### 1. Display USSD Code

```jsx
<div className="ussd-info">
  <h3>Access DialAI via USSD</h3>
  <p>Dial: <strong>*347*157#</strong></p>
  <ul>
    <li>1. Health Guidance</li>
    <li>2. Language Translation</li>
    <li>3. Practical Guides</li>
  </ul>
</div>
```

---

### 2. Initiate Voice Call

```jsx
const CallButton = () => {
  const [calling, setCalling] = useState(false);
  const [result, setResult] = useState(null);

  const handleCall = async () => {
    setCalling(true);
    try {
      const response = await fetch('http://localhost:3000/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phoneNumber: '+2349135334779' 
        })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, error: error.message });
    } finally {
      setCalling(false);
    }
  };

  return (
    <div>
      <button onClick={handleCall} disabled={calling}>
        {calling ? 'Calling...' : 'Call Me'}
      </button>
      {result && (
        <p>{result.success ? result.message : result.error}</p>
      )}
    </div>
  );
};
```

---

### 3. Health Check Status

```jsx
const ServerStatus = () => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('http://localhost:3000/health');
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        setStatus({ status: 'offline' });
      }
    };
    
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`status ${status?.status}`}>
      {status?.status === 'healthy' ? '🟢 Online' : '🔴 Offline'}
    </div>
  );
};
```

---

### 4. Display Features

```jsx
const Features = () => {
  const features = [
    {
      icon: '📞',
      title: 'Voice Calls',
      description: 'Call our AI assistant for instant health guidance',
      action: 'Call Now',
      endpoint: '/api/call'
    },
    {
      icon: '📱',
      title: 'USSD Access',
      description: 'No internet? Dial *347*157# from any phone',
      action: 'Learn More',
      code: '*347*157#'
    },
    {
      icon: '💬',
      title: 'SMS Replies',
      description: 'Reply to our messages for follow-up questions',
      action: 'How it Works',
      info: 'Automatic context tracking'
    },
    {
      icon: '🌍',
      title: 'Multi-Language',
      description: 'Supports English, Pidgin, Yoruba, Hausa, Swahili',
      action: 'See Languages',
      languages: ['English', 'Pidgin', 'Yoruba', 'Hausa', 'Swahili']
    }
  ];

  return (
    <div className="features-grid">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
};
```

---

## 🔐 Environment Variables

Your frontend should know about these for configuration:

```env
# Backend URL
NEXT_PUBLIC_API_URL=http://localhost:3000

# USSD Code (for display)
NEXT_PUBLIC_USSD_CODE=*347*157#

# Voice Number (for display)
NEXT_PUBLIC_VOICE_NUMBER=+2342017000885

# Features Enabled
NEXT_PUBLIC_ENABLE_VOICE=true
NEXT_PUBLIC_ENABLE_SMS=true
NEXT_PUBLIC_ENABLE_USSD=true
```

---

## 📱 User Flows to Showcase

### 1. Health Consultation Flow
```
1. User dials USSD code
2. Selects Health option
3. Describes symptoms
4. Receives AI health advice via SMS
5. Gets follow-up check-in after 24h
6. Can reply with status (1/2/3)
7. Can ask follow-up questions via SMS
```

### 2. Translation Flow
```
1. User dials USSD code
2. Selects Translation option
3. Enters text in any language
4. Receives translation via SMS
5. Can reply with more text to translate
```

### 3. Voice Call Flow
```
1. User clicks "Call Me" on website
2. Receives call from DialAI
3. Hears main menu
4. Presses 1 for Health or 2 for Translation
5. Speaks after beep
6. Hears AI response
```

---

## 🎯 Key Features to Highlight

1. **No Internet Required** - USSD works on any phone
2. **Multi-Channel** - USSD, SMS, Voice, Web
3. **Context-Aware** - Remembers conversations
4. **Multi-Language** - Supports 5+ languages
5. **Follow-Up Care** - Automatic health check-ins
6. **24/7 Available** - Always accessible
7. **Privacy-First** - No database (currently)
8. **Rate Limited** - Prevents abuse

---

## 🚀 Frontend Pages Suggestions

### 1. Home Page
- Hero with USSD code
- "Call Me" button
- Feature highlights
- How it works section

### 2. How It Works
- Step-by-step guide for each channel
- Screenshots/animations
- FAQ section

### 3. Features Page
- Detailed feature explanations
- Use cases
- Testimonials (if available)

### 4. Demo Page
- Live call button
- USSD code display
- SMS interaction example
- Voice call simulator

### 5. About Page
- Mission statement
- Technology stack
- Team (if applicable)
- Contact information

---

## 📊 Analytics to Display

If you want to show stats (from backend):

```javascript
// Pseudo-code for stats dashboard
const stats = {
  totalUsers: interactionTracker.getStats().totalUniqueUsers,
  totalInteractions: interactionTracker.getStats().totalInteractions,
  activeConversations: conversationContext.getStats().activeContexts,
  servicesUsed: {
    ussd: 150,
    sms: 89,
    voice: 45
  }
};
```

---

## 🎨 Design Recommendations

### Color Scheme
- Primary: Health/Medical blue (#0066CC)
- Secondary: Success green (#00CC66)
- Accent: Warning orange (#FF9900)
- Background: Clean white/light gray

### Typography
- Headings: Bold, clear (Inter, Roboto)
- Body: Readable, accessible
- Code: Monospace for USSD codes

### Components
- Large, tappable buttons
- Clear call-to-action
- Mobile-first design
- Accessibility (WCAG AA)

---

**Your backend is fully functional and ready for frontend integration!** 🚀
