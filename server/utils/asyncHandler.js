/**
 * Wraps an async route handler to catch errors and forward to Express error handler.
 * Eliminates try/catch in every controller method.
 * @param {Function} fn - Async route handler
 * @returns {Function} Express middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
