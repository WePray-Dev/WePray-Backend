const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    long: { type: Number, required: true }
  }
});

// Main User schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  phone: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: {
      validator: function(v) {
        return /\d{10,15}/.test(v);  // Adjust based on the required phone number format
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  address: addressSchema,
  status: {
    type: String,
    enum: ['online', 'offline'],
    default: 'offline'
  },
  type: {
    type: String,
    enum: ['Individual', 'Organization'],
    required: true
  },
  subscriptionPlan: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscription"
  }]
}, { timestamps: true });

// Virtual field for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
