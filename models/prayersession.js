const mongoose = require('mongoose');

const prayerSessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    prayer: { type: mongoose.Schema.Types.ObjectId, ref: 'Prayer', required: true },
    startTime: { type: Date, default: null },
    endTime: { type: Date, default: null },
    status: {
      type: String,
      enum: ['started', 'paused', 'ended'],
      default: 'started',
    },
    timeSpent: { type: Number, default: 0 }, // Total time spent in this session
  }, { timestamps: true });
  
  const PrayerSession = mongoose.model('PrayerSession', prayerSessionSchema);
  module.exports = PrayerSession;
  