// Core modules / libs
const path = require('path');
const express = require('express');

const app = express();

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Parse JSON request bodies
app.use(express.json());

// Import routers
const userRouter = require('./routes/users');

// Root route
app.get('/', (req, res) => {
  res.send('<h1>Hello, World!</h1>');
});

// Return a static HTML page
app.get('/home', (req, res) => {
  // __dirname points to current folder where index.js lives
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Mount user routes under /api/v1/user
// NOTE: path must start with a leading slash
app.use('/api/v1/user', userRouter);

// Fallback 404 handler (no route matched)
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Centralized error handler (must have 4 params)
app.use((err, req, res, next) => {
  console.error('[ERROR]:', err);
  res.status(500).send('Server Error');
});

// Use uppercase PORT (common convention for env vars)
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Web Server is listening at port ${PORT}`);
});
