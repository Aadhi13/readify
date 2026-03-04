const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/readify',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret',
  GOOGLE_BOOKS_API_KEY: process.env.GOOGLE_BOOKS_API_KEY || '',
};
