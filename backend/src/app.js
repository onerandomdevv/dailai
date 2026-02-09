const express = require("express");
const cors = require("cors");
const ussdRoutes = require("./routes/ussd.routes");
const smsRoutes = require("./routes/sms.routes");
const {
  errorHandler,
  notFoundHandler,
} = require("./middleware/errorMiddleware");

const app = express();

// CORS configuration - Allow frontend domain
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://dailai.vercel.app",
    ];

    // Check if origin is in allowed list or is a Vercel deployment
    if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Root route - API information
app.get("/", (req, res) => {
  res.json({
    name: "DialAI Backend API",
    version: "1.0.0",
    status: "running",
    description: "Multi-channel AI healthcare assistant",
    endpoints: {
      health: "/health",
      call: "POST /api/call",
      ussd: "POST /ussdRoutes",
      sms: {
        incoming: "POST /sms/incoming",
        delivery: "POST /sms/delivery",
      },
      voice: "POST /voice",
    },
    documentation: "https://github.com/your-repo/dialai",
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Routes
app.use("/ussdRoutes", ussdRoutes);
app.use("/sms", smsRoutes);
app.use("/voice", require("./routes/voice.routes"));
app.use("/api", require("./routes/call.routes"));

// 404 Handler (must be after all routes)
app.use(notFoundHandler);

// Global Error Handler (must be last)
app.use(errorHandler);

module.exports = app;
