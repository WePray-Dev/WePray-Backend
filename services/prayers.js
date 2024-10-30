// services/prayerService.js
const Prayer = require('../models/prayers');
const PrayerSession = require('../models/prayersession');

// Create a new prayer
exports.createPrayer = async (userId, prayerData) => {
  const newPrayer = new Prayer({
    user: userId,
    ...prayerData
  });
  return newPrayer.save();
};

// Update an existing prayer
exports.updatePrayer = async (prayerId, prayerData, userId) => {
  const prayer = await Prayer.findOneAndUpdate(
    { _id: prayerId, user: userId },
    { $set: prayerData },
    { new: true }
  );
  if (!prayer) throw new Error('Prayer not found or user not authorized');
  return prayer;
};

// Delete a prayer
exports.deletePrayer = async (prayerId, userId) => {
  const prayer = await Prayer.findOneAndDelete({ _id: prayerId, user: userId });
  if (!prayer) throw new Error('Prayer not found or user not authorized');
  return prayer;
};

exports.getPrayerAnalytics = async (prayerId) => {
  const prayer = await Prayer.findById(prayerId).populate('user', 'fullName email');
  if (!prayer) throw new Error('Prayer not found');

  return {
    prayer,
    analytics: {
      totalTimeSpent: prayer.interactionMetrics.totalTimeSpent,
      prayedCount: prayer.interactionMetrics.prayedCount,
      sharedCount: prayer.interactionMetrics.sharedCount,
      answered: prayer.interactionMetrics.answered,
    }
  };
};

exports.getPrayerHistory = async (userId, filter) => {
  let dateFilter = {};
  const today = new Date();

  if (filter === 'Today') {
    dateFilter = { createdAt: { $gte: new Date(today.setHours(0, 0, 0, 0)) } };
  } else if (filter === 'Weekly') {
    dateFilter = { createdAt: { $gte: new Date(today.setDate(today.getDate() - 7)) } };
  } else if (filter === 'Monthly') {
    dateFilter = { createdAt: { $gte: new Date(today.setMonth(today.getMonth() - 1)) } };
  }

  const sessions = await PrayerSession.find({ user: userId, ...dateFilter }).populate('prayer', 'title description');

  return sessions.reduce((acc, session) => {
    if (!acc[session.prayer._id]) {
      acc[session.prayer._id] = { prayer: session.prayer, timeSpent: 0, sessionCount: 0 };
    }
    acc[session.prayer._id].timeSpent += session.timeSpent;
    acc[session.prayer._id].sessionCount += 1;
    return acc;
  }, {});
};

exports.getUsersWhoPrayed = async (prayerId) => {
  const sessions = await PrayerSession.find({ prayer: prayerId }).populate('user', 'fullName email');

  return sessions.reduce((acc, session) => {
    const userId = session.user._id.toString();
    if (!acc[userId]) {
      acc[userId] = { user: session.user, totalTimeSpent: 0 };
    }
    acc[userId].totalTimeSpent += session.timeSpent;
    return acc;
  }, {});
};
