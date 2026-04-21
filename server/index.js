const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { authLimiter, generalLimiter } = require('./middleware/rateLimiter');

const app = express();

// Connect to MongoDB
connectDB();

// ── Security middleware ──
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));

// ── Body parsing ──
app.use(express.json({ limit: '10kb' }));  // reject oversized payloads
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ── Rate limiting ──
app.use('/api/auth', authLimiter);   // strict — applied before routes
app.use('/api', generalLimiter);     // general — applied to everything else

// ── Routes ──
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));

// ── Health check ──
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV });
});

// ── Global error handler — always last ──
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Never expose stack traces outside development
  res.status(statusCode).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});