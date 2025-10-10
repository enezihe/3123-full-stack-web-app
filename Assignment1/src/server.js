// src/server.js
require('dotenv').config();
const http = require('http');
const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 8081;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';

const server = http.createServer(app);

(async () => {
  try {
    await connectDB(MONGO_URI);
    server.listen(PORT, () => {
      console.log(`Web Server is listening at port ${PORT}`);
    });
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
})();
