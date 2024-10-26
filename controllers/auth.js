const userService = require('../services/users');

class UserController {
  async registerUser(req, res) {
    try {
      const { firstName, lastName, email, phone, address, password, type, subscriptionPlan } = req.body;

      if (!firstName || !lastName || !email || !password || !address || !type) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists' });
      }

      const userData = { firstName, lastName, email, phone, password, address, type, subscriptionPlan };
      const newUser = await userService.createUser(userData);

      return res.status(201).json({ message: 'User registered successfully', data: newUser });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const user = await userService.loginUser(email, password);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      return res.status(200).json({ message: 'Login successful', data: user });
    } catch (error) {
      console.error('Error logging in user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new UserController();
