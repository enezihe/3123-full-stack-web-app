// src/app.js

// (optional) smoke test – ensures models load without crashing
require('./models/user.model');
require('./models/emp.model');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'comp3123-assignment1' });
});

// mount routes
app.use('/api/v1/user', require('./routes/user.routes'));
app.use('/api/v1/emp', require('./routes/emp.routes'));



// 404
app.use((req, res) => {
  res.status(404).json({ status: false, message: 'Not Found' });
});

// central error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ status: false, message: 'Internal Server Error' });
});

module.exports = app;
