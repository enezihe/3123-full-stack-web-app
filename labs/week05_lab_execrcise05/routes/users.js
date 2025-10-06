// routes/users.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const routerUser = express.Router();

// Small helper to read user.json safely
function readUserFile() {
  const file = path.join(__dirname, '..', 'user.json');
  const raw = fs.readFileSync(file, 'utf-8');
  return JSON.parse(raw);
}

/*
 * GET /api/v1/user/profile
 * - Return all details from user.json file in JSON format
 */
routerUser.get('/profile', (req, res, next) => {
  try {
    const user = readUserFile();
    res.json(user); // sends the full JSON content
  } catch (err) {
    next(err);
  }
});

/*
 * POST /api/v1/user/login
 * - Accept { "username": "...", "password": "..." } as JSON body
 * - Read data from user.json
 * - Validate and return messages as specified
 */
routerUser.post('/login', (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    const user = readUserFile();

    // Basic input check
    if (!username || !password) {
      return res.status(400).json({
        status: false,
        message: 'username and password are required',
      });
    }

    // Compare with user.json fields
    if (username !== user.username) {
      return res.json({
        status: false,
        message: 'User Name is invalid',
      });
    }

    if (password !== user.password) {
      return res.json({
        status: false,
        message: 'Password is invalid',
      });
    }

    // Both correct
    return res.json({
      status: true,
      message: 'User Is valid',
    });
  } catch (err) {
    next(err);
  }
});

/*
 * GET /api/v1/user/logout/:username
 * - Accept username as a route param
 * - Return HTML message like: <b>${username} successfully logout.</b>
 */
routerUser.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res
    .status(200)
    .send(`<b>${username} successfully logout.</b>`);
});

module.exports = routerUser;
