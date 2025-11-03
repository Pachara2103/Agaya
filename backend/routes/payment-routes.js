const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment-controller');
const { protect } = require('../middleware/auth');

router.post('/create-checkout-session', protect, paymentController.createCheckoutSession);
router.post('/verify-payment', protect, paymentController.verifyPayment);

module.exports = router;
