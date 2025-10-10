const Employee = require('../models/emp.model');
const mongoose = require('mongoose');

const toDto = (doc) => ({
  employee_id: doc._id.toString(),
  first_name: doc.first_name,
  last_name: doc.last_name,
  email: doc.email,
  position: doc.position,
  salary: doc.salary,
  date_of_joining: doc.date_of_joining,
  department: doc.department,
});

exports.list = async (_req, res, next) => {
  try {
    const items = await Employee.find().sort({ created_at: -1 });
    return res.status(200).json(items.map(toDto));
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const emp = await Employee.create(req.body);
    return res.status(201).json({
      message: 'Employee created successfully.',
      employee_id: emp._id.toString(),
    });
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const emp = await Employee.findById(req.params.eid);
    if (!emp) return res.status(404).json({ status: false, message: 'Not Found' });
    return res.status(200).json(toDto(emp));
  } catch (err) { next(err); }
};

exports.updateById = async (req, res, next) => {
  try {
    const emp = await Employee.findByIdAndUpdate(
      req.params.eid,
      req.body,
      { new: true, runValidators: true }
    );
    if (!emp) return res.status(404).json({ status: false, message: 'Not Found' });
    return res.status(200).json({ message: 'Employee details updated successfully.' });
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const { eid } = req.query;
    if (!eid || !mongoose.isValidObjectId(eid)) {
      return res.status(400).json({ status: false, message: 'Invalid employee id' });
    }
    const del = await Employee.findByIdAndDelete(eid);
    if (!del) return res.status(404).json({ status: false, message: 'Not Found' });
    return res.status(204).send();
  } catch (err) { next(err); }
};
