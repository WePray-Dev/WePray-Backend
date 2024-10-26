const { AppError } = require('../utils/errors');
const winston = require('winston');

// Initialize logger with winston
const logger = winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'errors.log' })
  ]
});

const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error(err.message, { metadata: err });

  // If error is operational, send structured error response
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ status: 'error', message: err.message, data: null });
  }

  // Unexpected errors
  return res.status(500).json({ error: 'An unexpected error occurred' });
};

module.exports = errorHandler;
