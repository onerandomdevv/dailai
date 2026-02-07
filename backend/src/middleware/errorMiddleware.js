/**
 * Global Error Handling Middleware
 * Catches all errors and returns appropriate responses
 */

const { AppError } = require('../utils/errors');

/**
 * Error logging helper
 */
const logError = (err, req) => {
    const timestamp = new Date().toISOString();
    console.error('\n========== ERROR LOG ==========');
    console.error(`[${timestamp}] ${err.name || 'Error'}: ${err.message}`);
    console.error(`Path: ${req.method} ${req.originalUrl}`);
    console.error(`IP: ${req.ip}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.error(`Body:`, JSON.stringify(req.body, null, 2));
    }
    if (err.stack) {
        console.error('Stack:', err.stack);
    }
    console.error('===============================\n');
};

/**
 * Get user-friendly error message
 */
const getUserMessage = (err) => {
    // For operational errors, return the message
    if (err.isOperational) {
        return err.message;
    }

    // For programming errors, return generic message
    return 'Something went wrong. Please try again later.';
};

/**
 * Main error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    // Log the error
    logError(err, req);

    // Default to 500 if no status code
    const statusCode = err.statusCode || 500;
    const message = getUserMessage(err);

    // Determine response format based on request type
    const isUSSD = req.path.includes('ussd');
    const isVoice = req.path.includes('voice');
    const isSMS = req.path.includes('sms');

    // USSD Response
    if (isUSSD) {
        res.set('Content-Type', 'text/plain');
        return res.send(`END ${message}`);
    }

    // Voice Response
    if (isVoice) {
        res.set('Content-Type', 'text/xml');
        return res.send(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>${message}</Say>
</Response>`);
    }

    // SMS or API Response
    if (isSMS) {
        return res.status(200).send('Error processed');
    }

    // Default JSON response for API calls
    res.status(statusCode).json({
        success: false,
        error: {
            message,
            ...(process.env.NODE_ENV === 'development' && {
                stack: err.stack,
                details: err
            })
        }
    });
};

/**
 * 404 Not Found Handler
 */
const notFoundHandler = (req, res, next) => {
    const error = new AppError(`Route ${req.originalUrl} not found`, 404);
    next(error);
};

/**
 * Unhandled Promise Rejection Handler
 */
const handleUnhandledRejection = () => {
    process.on('unhandledRejection', (reason, promise) => {
        console.error('🔥 UNHANDLED REJECTION! Shutting down...');
        console.error('Reason:', reason);
        console.error('Promise:', promise);
        // In production, you might want to gracefully shutdown
        // process.exit(1);
    });
};

/**
 * Uncaught Exception Handler
 */
const handleUncaughtException = () => {
    process.on('uncaughtException', (err) => {
        console.error('🔥 UNCAUGHT EXCEPTION! Shutting down...');
        console.error('Error:', err.name, err.message);
        console.error('Stack:', err.stack);
        // Exit immediately on uncaught exceptions
        process.exit(1);
    });
};

module.exports = {
    errorHandler,
    notFoundHandler,
    handleUnhandledRejection,
    handleUncaughtException
};
