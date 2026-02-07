/**
 * Async Handler Wrapper
 * Wraps async route handlers to automatically catch errors and pass them to error middleware
 * Eliminates the need for try-catch blocks in every controller
 */

const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

module.exports = asyncHandler;
