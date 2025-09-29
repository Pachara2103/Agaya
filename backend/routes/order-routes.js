const express = require('express');
const router = express.Router();
const { checkoutOrder, updateOrderStatus } = require('../controllers/order-controller');

router.post('/checkout', checkoutOrder);

router.patch('/:orderId/status', updateOrderStatus);

module.exports = router