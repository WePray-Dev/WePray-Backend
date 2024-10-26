const userService = require('../services/users');
const { ValidationError, DatabaseError } = require('../utils/errors');
const { registrationSchema, loginSchema } = require('../validators/auth')

const registerUser = async (req, res, next) => {
  try {
    const { error } = registrationSchema.validate(req.body);
    if (error) throw new ValidationError(error.details.map(e => e.message).join(', '));

    const user = await userService.register(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) throw new ValidationError(error.details.map(e => e.message).join(', '));

    const token = await userService.login(req.body);
    res.status(200).json({ message: 'User logged in successfully', token });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser };
