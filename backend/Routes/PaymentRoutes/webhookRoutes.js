const express = require('express');
const router = express.Router();
const { handleStripeWebhook } = require('../../Controllers/Payment/webhook');

// Raw body middleware must be applied only to this route
router.post('/', express.raw({ type: 'application/json' }), handleStripeWebhook);

module.exports = router;
