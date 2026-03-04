const express = require('express');
const cors = require('cors');

const authRoutes = require('./modules/auth/auth.routes');
const bookRoutes = require('./modules/books/book.routes');
const libraryRoutes = require('./modules/library/library.routes');
const statsRoutes = require('./modules/stats/stats.routes');

const app = express();

// --------------- Middleware ---------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --------------- Routes ---------------
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/stats', statsRoutes);

// --------------- Health Check ---------------
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --------------- Global Error Handler ---------------
app.use((err, _req, res, _next) => {
    console.error('💥 Unhandled error:', err.message);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;
