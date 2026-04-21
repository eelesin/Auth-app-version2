const rateLimit = require('express-rate-limit');

// Skip rate limiting in development
const skip = () => process.env.NODE_ENV === 'development';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  skip,                       // ← bypasses limiter in dev
  message: {
    message: 'Too many attempts from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  skip,                       // ← bypasses limiter in dev
  message: {
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { authLimiter, generalLimiter };