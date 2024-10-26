const prayerService = require('../services/prayers');
const { createPrayerSchema } = require('../validators/prayers');

// Create a new prayer
const createPrayer = async (req, res) => {
  try {
    const { error } = createPrayerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details.map(d => d.message) });

    const prayerData = { 
      ...req.body, 
      user: req.user.id 
    };
    const newPrayer = await prayerService.createPrayer(prayerData);
    res.status(201).json({ message: 'Prayer created successfully', prayer: newPrayer });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create prayer' });
  }
};

// Update prayer interaction (e.g., incrementing prayedForCount, updating timeSpent)
const updatePrayerInteraction = async (req, res) => {
  try {
    const { prayerId } = req.params;
    const interactionData = req.body; // This should include fields like prayedForCount, sharedCount, timeSpent
    const updatedPrayer = await prayerService.updatePrayerInteraction(prayerId, interactionData);
    if (!updatedPrayer) return res.status(404).json({ error: 'Prayer not found' });

    res.status(200).json({ message: 'Prayer interaction updated', prayer: updatedPrayer });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update prayer interaction' });
  }
};

module.exports = {
  createPrayer,
  updatePrayerInteraction
};
