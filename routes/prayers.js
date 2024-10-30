// routes/prayerAnalyticsRoutes.js
const express = require('express');
const router = express.Router();
const prayerController = require('../controllers/prayers');
const prayerSessionController = require('../controllers/prayersession');
const authenticateUser = require('../middlewares/auth');
const validateRequest = require('../middlewares/validateRequests');
const { createPrayerSchema, updatePrayerSchema, deletePrayerSchema } = require('../validators/prayers')


// Create a new prayer
router.post('/', authenticateUser, validateRequest(createPrayerSchema), prayerController.createPrayer);

// Update an existing prayer
router.put('/:prayerId', authenticateUser, validateRequest(updatePrayerSchema), prayerController.updatePrayer);

// Delete a prayer
router.delete('/:prayerId', authenticateUser, validateRequest(deletePrayerSchema), prayerController.deletePrayer);

router.post('/:prayerId/session/start', authenticateUser, prayerSessionController.startPrayerSession);

router.post('/:prayerId/session/pause', authenticateUser, prayerSessionController.pausePrayerSession);

router.post('/:prayerId/session/end', authenticateUser, prayerSessionController.endPrayerSession);

// Get detailed analytics for a specific prayer
router.get('/:prayerId/analytics', authenticateUser, prayerController.getPrayerAnalytics);

// Get prayer history for a user (filtered by Today, Weekly, Monthly)
router.get('/:userId/history', authenticateUser, prayerController.getPrayerHistory);

// Get list of users who prayed a specific prayer with their total time
router.get('/:prayerId/users', authenticateUser, prayerController.getUsersWhoPrayed);

module.exports = router;
