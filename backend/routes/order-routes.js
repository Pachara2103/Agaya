const express = require('express');
const router = express.Router();
const { checkoutOrder, updateOrderStatus, getOrdersByCustomer, getOrdersByVendor} = require('../controllers/order-controller');
const {protect, authorize} = require('../middleware/auth');

router.post('/checkout', protect, authorize("customer") , checkoutOrder);

router.patch('/:orderId/status', protect, updateOrderStatus);

router.get('/customer/:cid',protect, authorize("customer", "admin"), getOrdersByCustomer);

router.get('/vendor/:vid',protect, authorize("vendor", "admin"), getOrdersByVendor);

module.exports = router