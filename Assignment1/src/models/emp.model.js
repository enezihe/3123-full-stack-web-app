// src/models/emp.model.js
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
  {
    first_name:      { type: String, required: true, trim: true },
    last_name:       { type: String, required: true, trim: true },
    email:           { type: String, required: true, lowercase: true, trim: true },
    position:        { type: String, required: true, trim: true },
    salary:          { type: Number, required: true, min: 0 },
    date_of_joining: { type: Date,   required: true },
    department:      { type: String, required: true, trim: true }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// turns model
const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;            // <-- not  { Employee }, model!
