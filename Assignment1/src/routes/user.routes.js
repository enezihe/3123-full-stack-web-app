const express = require('express');
const { body, oneOf } = require('express-validator');
const { handleValidation } = require('../middleware/validate');
const ctrl = require('../controllers/user.controller');

const router = express.Router();

// The model is responsible only for the data schema and password hashing.

// Input validation happens at the route layer when the HTTP request arrives
// that way: catch bad input early and return a 400.

router.post(
  '/signup',
  [
    body('username').trim().notEmpty().withMessage('username is required'),
    body('email').isEmail().withMessage('valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('password min length 6')
  ],
  handleValidation,
  ctrl.signup
);

router.post(
  '/login',
  [
    oneOf(
      [body('email').isEmail(), body('username').trim().notEmpty()],
      'email or username is required'
    ),
    body('password').notEmpty().withMessage('password is required')
  ],
  handleValidation,
  ctrl.login
);

module.exports = router;
