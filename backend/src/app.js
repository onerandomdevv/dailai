const express = require('express');
const ussdRoutes = require('./routes/ussd.routes');
const smsRoutes = require('./routes/sms.routes');
const { errorHandler, notFoundHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Root route - API information
app.get('/', (req, res) => {
    res.json({
        name: 'DialAI Backend API',
        version: '1.0.0',
        status: 'running',
        description: 'Multi-channel AI healthcare assistant',
        endpoints: {
            health: '/health',
            call: 'POST /api/call',
            ussd: 'POST /ussdRoutes',
            sms: {
                incoming: 'POST /sms/incoming',
                delivery: 'POST /sms/delivery'
            },
            voice: 'POST /voice'
        },
        documentation: 'https://github.com/your-repo/dialai'
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Routes
app.use('/ussdRoutes', ussdRoutes);
app.use('/sms', smsRoutes);
app.use('/voice', require('./routes/voice.routes'));
app.use('/api', require('./routes/call.routes'));

// 404 Handler (must be after all routes)
app.use(notFoundHandler);

// Global Error Handler (must be last)
app.use(errorHandler);

module.exports = app;
