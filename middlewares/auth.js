// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user.model');
const { AuthError } = require('../utils/errors');

const JWT_SECRET = config.jwt_secret;

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return next(new AuthError('Access denied. No token provided.'));
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return next(new AuthError('Invalid or expired token'));
    }

    try {
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      req.user = user; 
      next(); 
    } catch (error) {
      next(error);
    }
  });
};

module.exports = authenticateUser;
