// src/middleware/validate.js
const { validationResult } = require('express-validator');

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      message: errors.array().map(e => e.msg).join(', ')
    });
  }
  next();
}
module.exports = { handleValidation };
