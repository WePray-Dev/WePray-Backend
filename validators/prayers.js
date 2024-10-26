const Joi = require('joi');

const createPrayerSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Title should be a type of text',
    'string.empty': 'Title cannot be empty',
    'string.min': 'Title should have a minimum length of 3 characters',
    'any.required': 'Title is required'
  }),
  content: Joi.string().min(10).required().messages({
    'string.base': 'Content should be a type of text',
    'string.empty': 'Content cannot be empty',
    'string.min': 'Content should have a minimum length of 10 characters',
    'any.required': 'Content is required'
  }),
  tags: Joi.array().items(Joi.string()).optional(),
  privacy: Joi.string().valid('public', 'private').default('private').messages({
    'any.only': 'Privacy must be either "public" or "private"'
  })
});

module.exports = {
  createPrayerSchema
};
