const express = require('express');
const router = express.Router();
const { checkoutOrder, updateOrderStatus, getOrdersByCustomer} = require('../controllers/order-controller');
const {protect} = require('../middleware/auth');

router.post('/checkout', protect, checkoutOrder);

router.patch('/:orderId/status', protect, updateOrderStatus);

router.get('/customer/:cid',protect, getOrdersByCustomer);

module.exports = router