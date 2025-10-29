const express = require('express');
const router = express.Router();
const { getTransactionByOrderId } = require('../controllers/transaction-controller');
const { protect } = require('../middleware/auth');

router.get('/:orderId', protect, getTransactionByOrderId);

module.exports = router;