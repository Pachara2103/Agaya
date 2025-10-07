const express = require('express');
const router = express.Router();
const { checkoutOrder, updateOrderStatus, getOrdersByCustomer} = require('../controllers/order-controller');
const {protect, authorize} = require('../middleware/auth');

router.post('/checkout', protect, authorize("customer") , checkoutOrder);

router.patch('/:orderId/status', protect, updateOrderStatus);

router.get('/customer/:cid',protect, getOrdersByCustomer);

module.exports = router