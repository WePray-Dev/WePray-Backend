const User = require('../models/user.model');

class UserService {
    async createUser(userData) {
      const user = new User(userData);
      return await user.save();
    }
  
    async getUserByEmail(email) {
      return await User.findOne({ email });
    }
  
    async loginUser(email, password) {
      const user = await this.getUserByEmail(email);
      if (!user) return null;
      
      const isPasswordValid = await user.comparePassword(password);
      return isPasswordValid ? user : null;
    }
  }

module.exports = new UserService();
