// controllers/prayerAnalyticsController.js
const Prayer = require('../models/prayers');
const prayerService = require('../services/prayers');

exports.createPrayer = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const prayerData = req.body;
    const prayer = await prayerService.createPrayer(userId, prayerData);
    res.status(201).json(prayer);
  } catch (error) {
    next(error)
  }
};

// Update an existing prayer
exports.updatePrayer = async (req, res, next) => {
  try {
    const { prayerId } = req.params;
    const userId = req.user._id; // Assuming user ID is available via authentication middleware
    const prayerData = req.body;
    const updatedPrayer = await prayerService.updatePrayer(prayerId, prayerData, userId);
    res.status(200).json(updatedPrayer);
  } catch (error) {
    next(error)
  }
};

// Delete a prayer
exports.deletePrayer = async (req, res, next) => {
  try {
    const { prayerId } = req.params;
    const userId = req.user._id; // Assuming user ID is available via authentication middleware
    await prayerService.deletePrayer(prayerId, userId);
    res.status(204).json(); // No content response
  } catch (error) {
    next(error)
  }
};

// controllers/prayerController.js
exports.getPrayerAnalytics = async (req, res, next) => {
  const { prayerId } = req.params;

  try {
    const interactionMetrics = await Prayer.findById(prayerId).select('interactionMetrics');
    if (!interactionMetrics) return res.status(404).json({ message: 'Prayer not found' });

    res.json({ data: interactionMetrics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getPrayerHistory = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { filter } = req.query;
    const history = await prayerService.getPrayerHistory(userId, filter);
    res.status(200).json({ prayerHistory: Object.values(history) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsersWhoPrayed = async (req, res, next) => {
  try {
    const { prayerId } = req.params;
    const users = await prayerService.getUsersWhoPrayed(prayerId);
    res.status(200).json({ users: Object.values(users) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
