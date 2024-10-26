const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { DatabaseError, AuthError } = require('../utils/errors');
const config = require('../config')

const register = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new DatabaseError(error.message || 'Error saving user to the database');
  }
};

const login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new AuthError('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AuthError('Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw new DatabaseError(error.message || 'Error during user login');
  }
};

module.exports = { register, login };
