// validations/prayerValidation.js
const Joi = require('joi');

// Schema for creating a new prayer
const createPrayerSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title cannot exceed 100 characters'
  }),
  description: Joi.string().min(10).required().messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 10 characters'
  }),
  tag: Joi.string().optional(),
  isPrivate: Joi.boolean().optional()
});

// Schema for updating an existing prayer
const updatePrayerSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  privacy: Joi.string().valid('public', 'private').optional()
});

// Schema for deleting a prayer (no body needed, so use an empty schema)
const deletePrayerSchema = Joi.object({});

module.exports = {
  createPrayerSchema,
  updatePrayerSchema,
  deletePrayerSchema
};
