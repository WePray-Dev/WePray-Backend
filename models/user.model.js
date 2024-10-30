const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const addressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  latLon: { 
    lat: { type: String, required: true },
    long: { type: String, required: true }
  },
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: addressSchema, required: true },
  status: { type: String, enum: ['online', 'offline'], default: 'offline' },
  type: { type: String, enum: ['Individual', 'Organization'], required: true },
  subscriptionPlan: {
    type: String,
    enum: ['Free', 'Premium', 'Enterprise'],
    default: 'Free',
  },
});

// Pre-save hook for hashing passwords
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.fullName = `${this.firstName} ${this.lastName}`;
  next();
});

// Method to compare password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
