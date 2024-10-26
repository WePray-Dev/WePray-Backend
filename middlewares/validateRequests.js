const validateRequest = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ status: 'error', message: 'Bad request sent. Please check and try again.', data: errors });
      }
      next();
    };
  };
  
  module.exports = validateRequest;
  