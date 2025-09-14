const express = require('express');
const otpController = require('../controllers/otp-controller');
const router = express.Router();

router.post('/send-email-otp', otpController.sendEmailOtp);
router.post('/verify-otp', otpController.verifyOtp);

module.exports = router;