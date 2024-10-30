// models/prayer.js
const mongoose = require('mongoose');

const PrayerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, minlength: 3, maxlength: 100 },
  description: { type: String, required: true, minlength: 10 },
  tag: { type: String, default: 'regular' },
  isPrivate: { type: Boolean, default: true },
  interactionMetrics: {
    timeSpent: { type: Number, default: 0 }, // Total time across all users
    prayedCount: { type: Number, default: 0 }, // Number of times prayed by all users
    sharedCount: { type: Number, default: 0 },
    answered: { type: Boolean, default: false },
  },
}, { timestamps: true });

const Prayer = mongoose.model('Prayer', PrayerSchema);
module.exports = Prayer;
