// services/prayerService.js
const Prayer = require('../models/prayers');
const PrayerSession = require('../models/prayersession');
const { AuthError, ValidationError } = require('../utils/errors')

async function startPrayerSession(userId, prayerId) {
 const startedSession = await PrayerSession.findOne({ user: userId, prayer: prayerId, status: 'started' });
  if (startedSession) { throw new ValidationError('An active session for this prayer already exists for this user.')}
  
  let session = await PrayerSession.findOne({ user: userId, prayer: prayerId, status: { $in: ['paused', 'ended'] }});

  if (session) {
    session.status = 'started';
  } else {
    session = new PrayerSession({ user: userId, prayer: prayerId, startTime: new Date() });
  }

  return session.save();
}

async function pausePrayerSession(userId, prayerId) {
  const session = await PrayerSession.findOne({ user: userId, prayer: prayerId, status: 'started' });
  if (!session) throw new ValidationError('Active session not found');

  // Calculate time spent up to this pause point
  const now = new Date();
  session.timeSpent += Math.floor((now - session.startTime) / 1000); // time in seconds
  session.status = 'paused';
  return session.save();
}

async function endPrayerSession(userId, prayerId) {
  const session = await PrayerSession.findOne({ user: userId, prayer: prayerId, status: { $in: ['started', 'paused'] } });
  if (!session) throw new AuthError('Active session not found');

  const now = new Date();
  if (session.status === 'started') {
    session.timeSpent += Math.floor((now - session.startTime) / 1000); // time in seconds
  }
  session.status = 'ended';
  session.endTime = now;
  await session.save();

  // Update general prayer analytics
  const prayer = await Prayer.findById(prayerId);
  prayer.interactionMetrics.timeSpent += session.timeSpent;
  prayer.interactionMetrics.prayedCount += 1;
  await prayer.save();

  return session;
}

async function getPrayerAnalytics(prayerId) {
  const prayer = await Prayer.findById(prayerId).select('interactionMetrics');
  if (!prayer) throw new AuthError('Prayer not found');
  return prayer.interactionMetrics;
}

module.exports = {
  startPrayerSession,
  pausePrayerSession,
  endPrayerSession,
  getPrayerAnalytics
};
