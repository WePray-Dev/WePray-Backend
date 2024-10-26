const express = require('express');
const authController = require('../controllers/auth');
const validateRequest = require('../middlewares/validateRequests');
const { registrationSchema, loginSchema } = require('../validators/auth');

const router = express.Router();

router.post('/register', validateRequest(registrationSchema), authController.registerUser);
router.post('/login', validateRequest(loginSchema), authController.loginUser);

module.exports = router;
