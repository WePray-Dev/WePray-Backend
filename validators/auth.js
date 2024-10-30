const Joi = require('joi');

const registrationSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().messages({
    'string.base': 'First name should be a type of text',
    'string.empty': 'First name cannot be an empty field',
    'string.min': 'First name should have a minimum length of 2',
    'any.required': 'First name is required'
  }),
  lastName: Joi.string().min(2).max(30).required().messages({
    'string.base': 'Last name should be a type of text',
    'string.empty': 'Last name cannot be an empty field',
    'string.min': 'Last name should have a minimum length of 2',
    'any.required': 'Last name is required'
  }),
  phone: Joi.string().pattern(/^[0-9]{10,15}$/).required().messages({
    'string.pattern.base': 'Phone number must be between 10-15 digits',
    'string.empty': 'Phone number cannot be empty',
    'any.required': 'Phone number is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password should be at least 6 characters long',
    'any.required': 'Password is required'
  }),
  address: Joi.object({
    address: Joi.string().required().messages({ 'any.required': 'Address is required' }),
    street: Joi.string().required().messages({ 'any.required': 'Street is required' }),
    city: Joi.string().required().messages({ 'any.required': 'City is required' }),
    state: Joi.string().required().messages({ 'any.required': 'State is required' }),
    country: Joi.string().required().messages({ 'any.required': 'Country is required' }),
    latLon: Joi.object({
      lat: Joi.string().min(2).required().messages({
        'string.empty': 'Latitude cannot be empty',
        'string.min': 'Location Latitude should be at least 2 characters long',
        'any.required': 'Location Latitude is required'
      }),
      long: Joi.string().min(2).required().messages({
        'string.empty': 'Long cannot be empty',
        'string.min': 'Location Longitude should be at least 2 characters long',
        'any.required': 'Location Longitude is required'
      })
    }),
  }).required().messages({
    'object.base': 'Address should be an object with required fields',
    'any.required': 'Address is required'
  }),
  type: Joi.string().valid('Individual', 'Organization').required().messages({
    'any.only': 'Type must be either "Individual" or "Organization"',
    'any.required': 'Type is required'
  }),
  subscriptionPlan: Joi.string().valid('Free', 'Premium', 'Enterprise').optional()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email cannot be empty',
      'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password should be at least 6 characters long',
      'any.required': 'Password is required'
    })
  });

module.exports = {
  registrationSchema,
  loginSchema
};
