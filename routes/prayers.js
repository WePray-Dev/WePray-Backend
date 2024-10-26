const express = require('express');
const prayerController = require('../controllers/prayers');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

// POST /prayers - Create a new prayer
router.post('/prayers', authenticate, prayerController.createPrayer);

// PATCH /prayers/:prayerId/interactions - Update prayer interactions
router.patch('/prayers/:prayerId/interactions', authenticate, prayerController.updatePrayerInteraction);

module.exports = router;
