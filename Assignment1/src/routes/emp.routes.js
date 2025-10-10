const express = require('express');
const { body, param, query } = require('express-validator');
const { handleValidation } = require('../middleware/validate');
const ctrl = require('../controllers/emp.controller');

const router = express.Router();

// 3) GET /employees -> 200
router.get('/employees', ctrl.list);

// 4) POST /employees -> 201
router.post(
  '/employees',
  [
    body('first_name').trim().notEmpty().withMessage('first_name is required'),
    body('last_name').trim().notEmpty().withMessage('last_name is required'),
    body('email').isEmail().withMessage('valid email is required'),
    body('position').trim().notEmpty().withMessage('position is required'),
    body('salary').isNumeric().withMessage('salary must be a number'),
    body('date_of_joining').isISO8601().withMessage('date_of_joining must be ISO date'),
    body('department').trim().notEmpty().withMessage('department is required'),
  ],
  handleValidation,
  ctrl.create
);

// 5) GET /employees/:eid -> 200
router.get(
  '/employees/:eid',
  [param('eid').isMongoId().withMessage('invalid employee id')],
  handleValidation,
  ctrl.getById
);

// 6) PUT /employees/:eid -> 200
router.put(
  '/employees/:eid',
  [param('eid').isMongoId().withMessage('invalid employee id')],
  handleValidation,
  ctrl.updateById
);

// 7) DELETE /employees?eid=xxx -> 204
router.delete(
  '/employees',
  [query('eid').isMongoId().withMessage('invalid employee id')],
  handleValidation,
  ctrl.remove
);

module.exports = router;
