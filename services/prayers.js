const Prayer = require('../models/prayers');

const createPrayer = async (data) => {
  const prayer = new Prayer(data);
  return await prayer.save();
};

const updatePrayerInteraction = async (prayerId, updateData) => {
  return await Prayer.findByIdAndUpdate(
    prayerId, 
    { $set: updateData, 'interactionMetrics.lastInteracted': new Date() }, 
    { new: true }
  );
};

module.exports = {
  createPrayer,
  updatePrayerInteraction
};
