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

const login = async (data) => {
  try {
    const { email, password } = data;    
    const user = await User.findOne({ email });
    
    // Check if user exists and verify password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AuthError('Invalid email or password');
    }

    // const userObject = user.toString();
    delete user.password;
    
    const token = jwt.sign({ id: user._id }, config.jwt_secret, { expiresIn: '1h' });
    return { token, user }
  } catch (error) {
    throw new AuthError(error.message || 'Error logging into Application')
  }
};

module.exports = { register, login };
