const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res.status(400).json({ status: false, message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });
    return res.status(201).json({
      message: 'User created successfully.',
      user_id: user._id.toString()
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    const query = email ? { email } : { username };
    const user = await User.findOne(query).select('+password');
    if (!user) {
      return res.status(400).json({ status: false, message: 'Invalid Username and password' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ status: false, message: 'Invalid Username and password' });
    }

    return res.status(200).json({
      message: 'Login successful.',
      jwt_token: 'Optional implementation'
    });
  } catch (err) {
    next(err);
  }
};
