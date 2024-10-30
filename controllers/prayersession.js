// controllers/prayerController.js
const PrayerService = require('../services/prayersession');

async function startPrayerSession(req, res, next) {
  try {
    const session = await PrayerService.startPrayerSession(req.user._id, req.params.prayerId);
    res.json({ message: 'Prayer session started', session });
  } catch (error) {
    next(error)
  }
}

async function pausePrayerSession(req, res, next) {
  try {
    const session = await PrayerService.pausePrayerSession(req.user._id, req.params.prayerId);
    res.json({ message: 'Prayer session paused', session });
  } catch (error) {
    next(error)
  }
}

async function endPrayerSession(req, res, next) {
  try {
    const session = await PrayerService.endPrayerSession(req.user._id, req.params.prayerId);
    res.json({ message: 'Prayer session ended', session });
  } catch (error) {
    next(error)
  }
}

async function getPrayerAnalytics(req, res, next) {
  try {
    const analytics = await PrayerService.getPrayerAnalytics(req.params.prayerId);
    res.json({ analytics });
  } catch (error) {
    next(error)
  }
}

module.exports = {
  startPrayerSession,
  pausePrayerSession,
  endPrayerSession,
  getPrayerAnalytics
};
