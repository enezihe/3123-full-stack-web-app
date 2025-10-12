const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const noteRoutes = require('./routes/noteRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// health
app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'notes-api' });
});

// routes mounted 
app.use('/api/notes', noteRoutes);

module.exports = app;
