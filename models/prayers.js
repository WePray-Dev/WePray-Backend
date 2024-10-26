const mongoose = require('mongoose');

const PrayerSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    minlength: 10
  },
  tags: {
    type: [String],
    default: []
  },
  privacy: {
    type: String,
    enum: ['public', 'private'],
    default: 'private'
  },
  interactionMetrics: {
    timeSpent: {
      type: Number,
      default: 0, // Track total time spent on this prayer (in seconds)
    },
    lastInteracted: {
      type: Date,
      default: Date.now,
    },
    prayedForCount: {
      type: Number,
      default: 0 // Track how many times others have prayed for this prayer
    },
    sharedCount: {
      type: Number,
      default: 0 // Track how many times this prayer was shared
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Prayer', PrayerSchema);
