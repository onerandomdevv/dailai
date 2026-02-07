/**
 * Custom Error Classes for DialAI
 * Provides structured error handling with appropriate HTTP status codes
 */

class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // Distinguishes operational errors from programming errors
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends AppError {
    constructor(message = 'Invalid input provided') {
        super(message, 400);
        this.name = 'ValidationError';
    }
}

class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

class RateLimitError extends AppError {
    constructor(message = 'Too many requests. Please try again later.') {
        super(message, 429);
        this.name = 'RateLimitError';
    }
}

class ExternalAPIError extends AppError {
    constructor(message = 'External service is unavailable', service = 'Unknown') {
        super(message, 502);
        this.name = 'ExternalAPIError';
        this.service = service;
    }
}

class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized access') {
        super(message, 401);
        this.name = 'UnauthorizedError';
    }
}

module.exports = {
    AppError,
    ValidationError,
    NotFoundError,
    RateLimitError,
    ExternalAPIError,
    UnauthorizedError
};
